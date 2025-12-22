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
    createdAt?: string;
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
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          createdAt
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

const TOP_SELLERS_QUERY = `
  query GetTopSellers($first: Int!, $query: String) {
    products(first: $first, sortKey: BEST_SELLING, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          productType
          createdAt
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

export async function fetchProducts(first: number = 20, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<{
    data: { products: { edges: ShopifyProduct[] } };
  }>(PRODUCTS_QUERY, { first, query });

  return data.data.products.edges;
}

export async function fetchTopSellers(first: number = 20, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest<{
    data: { products: { edges: ShopifyProduct[] } };
  }>(TOP_SELLERS_QUERY, { first, query });

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

import { categories, Category, Subcategory } from '@/data/categories';

// Category path represents the full hierarchy
export interface CategoryPath {
  category: string;
  subcategory?: string;
  child?: string;
}

// Find the best matching category path from product tags/type
export function getCategoryPath(tags: string[], productType?: string): CategoryPath {
  const combinedText = [...tags, productType || ''].map(t => t.toLowerCase()).join(' ');
  
  let bestMatch: { path: CategoryPath; score: number } = {
    path: { category: 'General Products' },
    score: 0
  };
  
  for (const cat of categories) {
    const catNameLower = cat.name.toLowerCase();
    
    // Check for exact category match first
    if (tags.some(t => t.toLowerCase() === catNameLower)) {
      return { category: cat.name };
    }
    
    for (const sub of cat.subcategories) {
      const subNameLower = sub.name.toLowerCase();
      
      // Check for exact subcategory match
      if (tags.some(t => t.toLowerCase() === subNameLower)) {
        return { category: cat.name, subcategory: sub.name };
      }
      
      // Check children if any
      if (sub.children) {
        for (const child of sub.children) {
          const childLower = child.toLowerCase();
          if (combinedText.includes(childLower)) {
            return { category: cat.name, subcategory: sub.name, child };
          }
        }
      }
      
      // Score by keyword matches
      let score = 0;
      const subWords = subNameLower.split(/[\s&,]+/).filter(w => w.length > 2);
      for (const word of subWords) {
        if (combinedText.includes(word)) {
          score += word.length;
        }
      }
      
      if (score > bestMatch.score) {
        bestMatch = { path: { category: cat.name, subcategory: sub.name }, score };
      }
    }
    
    // Also check category-level keywords
    const catWords = catNameLower.split(/[\s&,]+/).filter(w => w.length > 2);
    let catScore = 0;
    for (const word of catWords) {
      if (combinedText.includes(word)) {
        catScore += word.length;
      }
    }
    
    if (catScore > bestMatch.score) {
      bestMatch = { path: { category: cat.name }, score: catScore };
    }
  }
  
  if (bestMatch.score > 0) {
    return bestMatch.path;
  }
  
  // Fallback
  return { category: productType || tags[0] || 'General Products' };
}

// Legacy function for backward compatibility - returns just the category name
export function getCategoryFromTags(tags: string[], productType?: string): string {
  const path = getCategoryPath(tags, productType);
  return path.category;
}

// Check if product has promotional tag
export function hasPromotionalTag(tags: string[], tagName: string): boolean {
  return tags.some(t => t.toLowerCase().includes(tagName.toLowerCase()));
}
