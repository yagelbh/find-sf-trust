// Shopify Storefront API Configuration
export const SHOPIFY_CONFIG = {
  STORE_DOMAIN: 'bydv1g-jx.myshopify.com',
  API_VERSION: '2025-07',
  STOREFRONT_TOKEN: 'feabfe2c6bf80b457bbd8c8c9419c169',
  get STOREFRONT_URL() {
    return `https://${this.STORE_DOMAIN}/api/${this.API_VERSION}/graphql.json`;
  }
};

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    tags: string[];
    productType: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    compareAtPriceRange?: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          compareAtPrice?: {
            amount: string;
            currencyCode: string;
          } | null;
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      tags
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 30) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

export async function storefrontApiRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(SHOPIFY_CONFIG.STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Shopify API Error: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchProducts(first: number = 20): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<{
    data: { products: { edges: ShopifyProduct[] } };
  }>(PRODUCTS_QUERY, { first });
  
  return data.data.products.edges;
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  const data = await storefrontApiRequest<{
    data: { product: ShopifyProduct['node'] | null };
  }>(PRODUCT_BY_HANDLE_QUERY, { handle });
  
  return data.data.product;
}

// Cart mutations
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createCheckout(items: Array<{ variantId: string; quantity: number }>): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const data = await storefrontApiRequest<{
    data: {
      cartCreate: {
        cart: { checkoutUrl: string } | null;
        userErrors: Array<{ field: string; message: string }>;
      };
    };
  }>(CART_CREATE_MUTATION, { input: { lines } });

  if (data.data.cartCreate.userErrors.length > 0) {
    throw new Error(data.data.cartCreate.userErrors.map(e => e.message).join(', '));
  }

  if (!data.data.cartCreate.cart?.checkoutUrl) {
    throw new Error('No checkout URL returned');
  }

  const url = new URL(data.data.cartCreate.cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}

// Category mapping from tags
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Electronics': ['electronics', 'electronic', 'tech', 'gadget', 'phone', 'computer', 'laptop'],
  'Home & Garden': ['home', 'garden', 'furniture', 'decor', 'kitchen', 'household'],
  'Beauty & Health': ['beauty', 'health', 'skincare', 'makeup', 'cosmetic', 'wellness'],
  'Fashion - Women': ['women', 'womens', "women's", 'ladies', 'female'],
  'Fashion - Men': ['men', 'mens', "men's", 'male'],
  'Fashion - Kids': ['kids', 'children', 'baby', 'toddler', 'infant'],
  'Bags & Luggage': ['bag', 'bags', 'luggage', 'backpack', 'purse', 'handbag'],
  'Sports & Outdoors': ['sports', 'outdoor', 'fitness', 'exercise', 'gym', 'athletic'],
  'Toys & Games': ['toys', 'games', 'toy', 'game', 'puzzle', 'play'],
  'Pet Supplies': ['pet', 'pets', 'dog', 'cat', 'animal'],
  'Automotive': ['automotive', 'car', 'auto', 'vehicle', 'motor'],
  'Jewelry & Accessories': ['jewelry', 'jewellery', 'accessory', 'accessories', 'watch', 'watches'],
  'Office & School': ['office', 'school', 'stationery', 'desk'],
  'Tools & Hardware': ['tools', 'hardware', 'tool', 'drill', 'wrench'],
};

// Extract category from product tags
export function getCategoryFromTags(tags: string[], productType?: string): string {
  // First, check if any tag directly matches a category name
  const normalizedTags = tags.map(t => t.toLowerCase().trim());
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    // Check exact category name match in tags
    if (normalizedTags.some(tag => tag === category.toLowerCase())) {
      return category;
    }
    // Check keyword matches
    for (const keyword of keywords) {
      if (normalizedTags.some(tag => tag.includes(keyword))) {
        return category;
      }
    }
  }
  
  // Fallback to productType if available
  if (productType) {
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      const normalizedType = productType.toLowerCase();
      if (normalizedType === category.toLowerCase()) return category;
      if (keywords.some(kw => normalizedType.includes(kw))) return category;
    }
  }
  
  // Default fallback
  return tags[0] || productType || 'General Products';
}

// Check if product has promotional tag
export function hasPromotionalTag(tags: string[], tagName: string): boolean {
  return tags.some(t => t.toLowerCase().includes(tagName.toLowerCase()));
}
