export interface Subcategory {
  name: string;
  image: string;
}

export interface Category {
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    name: "Electronics",
    icon: "📱",
    subcategories: [
      { name: "Smartphones & Accessories", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop" },
      { name: "Laptops & Computers", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
      { name: "Tablets & E-readers", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=120&h=120&fit=crop" },
      { name: "Cameras & Photography", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
      { name: "Audio & Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop" },
      { name: "Wearable Technology", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=120&h=120&fit=crop" },
      { name: "Gaming Consoles", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=120&h=120&fit=crop" },
      { name: "Smart Home Devices", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=120&h=120&fit=crop" },
      { name: "Drones & RC Devices", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Fashion - Women",
    icon: "👗",
    subcategories: [
      { name: "Dresses & Skirts", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=120&h=120&fit=crop" },
      { name: "Tops & Blouses", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=120&h=120&fit=crop" },
      { name: "Pants & Jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=120&h=120&fit=crop" },
      { name: "Outerwear & Jackets", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=120&h=120&fit=crop" },
      { name: "Activewear & Sportswear", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=120&h=120&fit=crop" },
      { name: "Lingerie & Sleepwear", image: "https://images.unsplash.com/photo-1617331140180-e8262094733a?w=120&h=120&fit=crop" },
      { name: "Swimwear & Beachwear", image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=120&h=120&fit=crop" },
      { name: "Maternity Clothing", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Fashion - Men",
    icon: "👔",
    subcategories: [
      { name: "Shirts & T-Shirts", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=120&h=120&fit=crop" },
      { name: "Pants & Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&h=120&fit=crop" },
      { name: "Suits & Blazers", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=120&h=120&fit=crop" },
      { name: "Outerwear & Jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=120&h=120&fit=crop" },
      { name: "Activewear & Sportswear", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&h=120&fit=crop" },
      { name: "Underwear & Sleepwear", image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=120&h=120&fit=crop" },
      { name: "Swimwear", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Fashion - Kids",
    icon: "🧒",
    subcategories: [
      { name: "Baby Clothing (0-24m)", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=120&h=120&fit=crop" },
      { name: "Toddler Clothing (2-4y)", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=120&h=120&fit=crop" },
      { name: "Kids Clothing (5-12y)", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=120&h=120&fit=crop" },
      { name: "Teen Clothing (13+)", image: "https://images.unsplash.com/photo-1516627145497-ae6968895b40?w=120&h=120&fit=crop" },
      { name: "School Uniforms", image: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=120&h=120&fit=crop" },
      { name: "Costumes & Dress-up", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Shoes - Women",
    icon: "👠",
    subcategories: [
      { name: "Sneakers & Athletic", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop" },
      { name: "Heels & Pumps", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=120&h=120&fit=crop" },
      { name: "Boots & Booties", image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=120&h=120&fit=crop" },
      { name: "Flats & Loafers", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=120&h=120&fit=crop" },
      { name: "Sandals & Flip Flops", image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=120&h=120&fit=crop" },
      { name: "Slippers", image: "https://images.unsplash.com/photo-1631984564919-1f6b2313a71c?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Shoes - Men",
    icon: "👞",
    subcategories: [
      { name: "Sneakers & Athletic", image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=120&h=120&fit=crop" },
      { name: "Dress Shoes", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=120&h=120&fit=crop" },
      { name: "Boots", image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=120&h=120&fit=crop" },
      { name: "Casual Shoes", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=120&h=120&fit=crop" },
      { name: "Sandals & Slides", image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=120&h=120&fit=crop" },
      { name: "Slippers", image: "https://images.unsplash.com/photo-1602001494572-7c7c6d2ee53a?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Shoes - Kids",
    icon: "👟",
    subcategories: [
      { name: "Baby Shoes", image: "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=120&h=120&fit=crop" },
      { name: "Toddler Shoes", image: "https://images.unsplash.com/photo-1519967758-7ef9c2f4f6dc?w=120&h=120&fit=crop" },
      { name: "Kids Sneakers", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=120&h=120&fit=crop" },
      { name: "School Shoes", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=120&h=120&fit=crop" },
      { name: "Boots", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Bags & Luggage",
    icon: "👜",
    subcategories: [
      { name: "Handbags & Purses", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=120&h=120&fit=crop" },
      { name: "Backpacks", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop" },
      { name: "Wallets & Card Holders", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=120&h=120&fit=crop" },
      { name: "Suitcases & Travel Bags", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
      { name: "Laptop Bags & Cases", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=120&h=120&fit=crop" },
      { name: "Duffel Bags", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=120&h=120&fit=crop" },
      { name: "Cosmetic Bags", image: "https://images.unsplash.com/photo-1591375462077-250a9e41c47a?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Jewelry",
    icon: "💍",
    subcategories: [
      { name: "Necklaces & Pendants", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&h=120&fit=crop" },
      { name: "Earrings", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=120&h=120&fit=crop" },
      { name: "Bracelets & Bangles", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=120&h=120&fit=crop" },
      { name: "Rings", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&h=120&fit=crop" },
      { name: "Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=120&h=120&fit=crop" },
      { name: "Jewelry Sets", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&h=120&fit=crop" },
      { name: "Body Jewelry", image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Accessories",
    icon: "🕶️",
    subcategories: [
      { name: "Sunglasses & Eyewear", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&h=120&fit=crop" },
      { name: "Belts", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=120&h=120&fit=crop" },
      { name: "Hats & Caps", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=120&h=120&fit=crop" },
      { name: "Scarves & Wraps", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=120&h=120&fit=crop" },
      { name: "Gloves & Mittens", image: "https://images.unsplash.com/photo-1545170241-e489f464bfd2?w=120&h=120&fit=crop" },
      { name: "Hair Accessories", image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=120&h=120&fit=crop" },
      { name: "Ties & Bow Ties", image: "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Beauty & Personal Care",
    icon: "💄",
    subcategories: [
      { name: "Skincare", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=120&h=120&fit=crop" },
      { name: "Makeup & Cosmetics", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&h=120&fit=crop" },
      { name: "Hair Care", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=120&h=120&fit=crop" },
      { name: "Fragrances & Perfumes", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=120&h=120&fit=crop" },
      { name: "Nail Care", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=120&h=120&fit=crop" },
      { name: "Bath & Body", image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=120&h=120&fit=crop" },
      { name: "Men's Grooming", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=120&h=120&fit=crop" },
      { name: "Beauty Tools", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Health & Wellness",
    icon: "💊",
    subcategories: [
      { name: "Vitamins & Supplements", image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=120&h=120&fit=crop" },
      { name: "Medical Supplies", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=120&h=120&fit=crop" },
      { name: "Fitness Equipment", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=120&fit=crop" },
      { name: "Massage & Relaxation", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=120&h=120&fit=crop" },
      { name: "First Aid", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=120&h=120&fit=crop" },
      { name: "Mobility Aids", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Home & Kitchen",
    icon: "🏠",
    subcategories: [
      { name: "Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop" },
      { name: "Kitchen Appliances", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" },
      { name: "Cookware & Bakeware", image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=120&h=120&fit=crop" },
      { name: "Kitchen Tools", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=120&h=120&fit=crop" },
      { name: "Tableware & Dinnerware", image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=120&h=120&fit=crop" },
      { name: "Storage & Organization", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Home Décor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Furniture",
    icon: "🛋️",
    subcategories: [
      { name: "Living Room Furniture", image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=120&h=120&fit=crop" },
      { name: "Bedroom Furniture", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=120&h=120&fit=crop" },
      { name: "Dining Room Furniture", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=120&h=120&fit=crop" },
      { name: "Office Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=120&h=120&fit=crop" },
      { name: "Outdoor Furniture", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=120&h=120&fit=crop" },
      { name: "Kids Furniture", image: "https://images.unsplash.com/photo-1518012312832-96aea3c91144?w=120&h=120&fit=crop" },
      { name: "Storage Furniture", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Home Décor",
    icon: "🖼️",
    subcategories: [
      { name: "Wall Art & Posters", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=120&h=120&fit=crop" },
      { name: "Candles & Fragrance", image: "https://images.unsplash.com/photo-1602607688398-908a5afbd8be?w=120&h=120&fit=crop" },
      { name: "Vases & Decorative Objects", image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=120&h=120&fit=crop" },
      { name: "Mirrors", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=120&h=120&fit=crop" },
      { name: "Clocks", image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=120&h=120&fit=crop" },
      { name: "Throw Pillows & Blankets", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=120&h=120&fit=crop" },
      { name: "Curtains & Window", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Bedding & Bath",
    icon: "🛏️",
    subcategories: [
      { name: "Bed Sheets & Pillowcases", image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=120&h=120&fit=crop" },
      { name: "Comforters & Duvets", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=120&h=120&fit=crop" },
      { name: "Pillows & Mattress Pads", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=120&h=120&fit=crop" },
      { name: "Towels & Bathrobes", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=120&h=120&fit=crop" },
      { name: "Shower Curtains", image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=120&h=120&fit=crop" },
      { name: "Bath Mats & Rugs", image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Kitchen & Dining",
    icon: "🍳",
    subcategories: [
      { name: "Small Kitchen Appliances", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=120&h=120&fit=crop" },
      { name: "Coffee & Espresso Makers", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&h=120&fit=crop" },
      { name: "Blenders & Mixers", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=120&h=120&fit=crop" },
      { name: "Cookware Sets", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=120&h=120&fit=crop" },
      { name: "Bakeware", image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=120&h=120&fit=crop" },
      { name: "Utensils & Gadgets", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" },
      { name: "Food Storage", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Garden & Outdoor",
    icon: "🌿",
    subcategories: [
      { name: "Garden Tools", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop" },
      { name: "Plants & Seeds", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=120&h=120&fit=crop" },
      { name: "Outdoor Décor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Patio Furniture", image: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=120&h=120&fit=crop" },
      { name: "Grills & Outdoor Cooking", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=120&h=120&fit=crop" },
      { name: "Lawn Care", image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=120&h=120&fit=crop" },
      { name: "Garden Hoses & Watering", image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Sports & Outdoors",
    icon: "⚽",
    subcategories: [
      { name: "Fitness & Exercise", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=120&fit=crop" },
      { name: "Camping & Hiking", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=120&h=120&fit=crop" },
      { name: "Cycling Equipment", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=120&h=120&fit=crop" },
      { name: "Water Sports", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=120&h=120&fit=crop" },
      { name: "Winter Sports", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=120&h=120&fit=crop" },
      { name: "Team Sports", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&h=120&fit=crop" },
      { name: "Outdoor Recreation", image: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Athletic Apparel",
    icon: "🏃",
    subcategories: [
      { name: "Running & Jogging", image: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=120&h=120&fit=crop" },
      { name: "Yoga & Pilates", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&h=120&fit=crop" },
      { name: "Gym & Training", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=120&h=120&fit=crop" },
      { name: "Swimming & Water Sports", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=120&h=120&fit=crop" },
      { name: "Cycling Apparel", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=120&h=120&fit=crop" },
      { name: "Sports Bras", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=120&h=120&fit=crop" },
      { name: "Compression Wear", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Toys & Games",
    icon: "🎮",
    subcategories: [
      { name: "Action Figures & Playsets", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
      { name: "Dolls & Accessories", image: "https://images.unsplash.com/photo-1613483187636-c2dcfcc39df1?w=120&h=120&fit=crop" },
      { name: "Building Toys & Blocks", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=120&h=120&fit=crop" },
      { name: "Board Games & Puzzles", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=120&h=120&fit=crop" },
      { name: "Educational Toys", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=120&h=120&fit=crop" },
      { name: "Outdoor Play", image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=120&h=120&fit=crop" },
      { name: "Electronic Toys", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Baby Products",
    icon: "👶",
    subcategories: [
      { name: "Baby Gear", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=120&h=120&fit=crop" },
      { name: "Diapering", image: "https://images.unsplash.com/photo-1584839404042-8bc21d240e51?w=120&h=120&fit=crop" },
      { name: "Baby Health & Safety", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=120&h=120&fit=crop" },
      { name: "Nursery Furniture", image: "https://images.unsplash.com/photo-1518012312832-96aea3c91144?w=120&h=120&fit=crop" },
      { name: "Baby Feeding", image: "https://images.unsplash.com/photo-1584839404042-8bc21d240e51?w=120&h=120&fit=crop" },
      { name: "Baby Bath & Skincare", image: "https://images.unsplash.com/photo-1584839404042-8bc21d240e51?w=120&h=120&fit=crop" },
      { name: "Baby Toys", image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Pet Supplies",
    icon: "🐾",
    subcategories: [
      { name: "Dog Supplies", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=120&h=120&fit=crop" },
      { name: "Cat Supplies", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=120&h=120&fit=crop" },
      { name: "Bird Supplies", image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=120&h=120&fit=crop" },
      { name: "Fish & Aquarium", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=120&h=120&fit=crop" },
      { name: "Small Animal Supplies", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=120&h=120&fit=crop" },
      { name: "Pet Food", image: "https://images.unsplash.com/photo-1585846416120-3a7354ed7d39?w=120&h=120&fit=crop" },
      { name: "Pet Health & Wellness", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Books & Media",
    icon: "📚",
    subcategories: [
      { name: "Fiction Books", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=120&fit=crop" },
      { name: "Non-Fiction Books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=120&fit=crop" },
      { name: "Children's Books", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=120&h=120&fit=crop" },
      { name: "E-books & Audiobooks", image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=120&h=120&fit=crop" },
      { name: "Magazines", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=120&h=120&fit=crop" },
      { name: "Movies & TV Shows", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=120&h=120&fit=crop" },
      { name: "Music & Vinyl", image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Office Supplies",
    icon: "📎",
    subcategories: [
      { name: "Writing Instruments", image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=120&h=120&fit=crop" },
      { name: "Paper & Notebooks", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=120&h=120&fit=crop" },
      { name: "Office Electronics", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=120&h=120&fit=crop" },
      { name: "Desk Accessories", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=120&h=120&fit=crop" },
      { name: "Filing & Organization", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=120&h=120&fit=crop" },
      { name: "Presentation Supplies", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=120&h=120&fit=crop" },
      { name: "Office Furniture", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Arts & Crafts",
    icon: "🎨",
    subcategories: [
      { name: "Painting Supplies", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop" },
      { name: "Drawing & Sketching", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop" },
      { name: "Sewing & Needlework", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Scrapbooking", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop" },
      { name: "Jewelry Making", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&h=120&fit=crop" },
      { name: "Kids Crafts", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=120&h=120&fit=crop" },
      { name: "Art Tools & Equipment", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Musical Instruments",
    icon: "🎸",
    subcategories: [
      { name: "Guitars & Strings", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=120&h=120&fit=crop" },
      { name: "Keyboards & Pianos", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=120&h=120&fit=crop" },
      { name: "Drums & Percussion", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=120&h=120&fit=crop" },
      { name: "Wind Instruments", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "DJ & Electronic Music", image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=120&h=120&fit=crop" },
      { name: "Recording Equipment", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=120&h=120&fit=crop" },
      { name: "Instrument Accessories", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Automotive",
    icon: "🚗",
    subcategories: [
      { name: "Car Electronics", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=120&h=120&fit=crop" },
      { name: "Car Accessories", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=120&h=120&fit=crop" },
      { name: "Car Care & Cleaning", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=120&h=120&fit=crop" },
      { name: "Tires & Wheels", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Interior Accessories", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=120&h=120&fit=crop" },
      { name: "Exterior Accessories", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=120&h=120&fit=crop" },
      { name: "Tools & Equipment", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Tools & Home Improvement",
    icon: "🔧",
    subcategories: [
      { name: "Power Tools", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Hand Tools", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Hardware & Fasteners", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Electrical Equipment", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Plumbing Supplies", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Paint & Supplies", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=120&h=120&fit=crop" },
      { name: "Safety Equipment", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Industrial & Scientific",
    icon: "🔬",
    subcategories: [
      { name: "Lab Equipment", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=120&h=120&fit=crop" },
      { name: "Safety & Security", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Industrial Supplies", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Test & Measurement", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=120&h=120&fit=crop" },
      { name: "Material Handling", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=120&h=120&fit=crop" },
      { name: "Janitorial & Sanitation", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" },
      { name: "Professional Medical", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Grocery & Gourmet",
    icon: "🛒",
    subcategories: [
      { name: "Fresh Produce", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
      { name: "Meat & Seafood", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=120&h=120&fit=crop" },
      { name: "Dairy & Eggs", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=120&h=120&fit=crop" },
      { name: "Snacks & Candy", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=120&h=120&fit=crop" },
      { name: "Beverages", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=120&h=120&fit=crop" },
      { name: "Pantry Staples", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" },
      { name: "International Foods", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Beverages",
    icon: "☕",
    subcategories: [
      { name: "Coffee & Tea", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=120&h=120&fit=crop" },
      { name: "Soft Drinks", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=120&h=120&fit=crop" },
      { name: "Water & Sparkling Water", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=120&h=120&fit=crop" },
      { name: "Juices", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=120&h=120&fit=crop" },
      { name: "Energy Drinks", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=120&h=120&fit=crop" },
      { name: "Drink Mixes", image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Food & Snacks",
    icon: "🍿",
    subcategories: [
      { name: "Chips & Crisps", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=120&h=120&fit=crop" },
      { name: "Chocolate & Candy", image: "https://images.unsplash.com/photo-1575377427642-087cf684f29d?w=120&h=120&fit=crop" },
      { name: "Cookies & Biscuits", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=120&h=120&fit=crop" },
      { name: "Nuts & Seeds", image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=120&h=120&fit=crop" },
      { name: "Dried Fruit", image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=120&h=120&fit=crop" },
      { name: "Healthy Snacks", image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=120&h=120&fit=crop" },
      { name: "International Snacks", image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Party Supplies",
    icon: "🎉",
    subcategories: [
      { name: "Party Decorations", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&h=120&fit=crop" },
      { name: "Balloons & Banners", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&h=120&fit=crop" },
      { name: "Tableware & Serving", image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=120&h=120&fit=crop" },
      { name: "Party Favors", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&h=120&fit=crop" },
      { name: "Birthday Supplies", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&h=120&fit=crop" },
      { name: "Holiday Decorations", image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=120&h=120&fit=crop" },
      { name: "Event Planning", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Seasonal & Holiday",
    icon: "🎄",
    subcategories: [
      { name: "Christmas Decorations", image: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?w=120&h=120&fit=crop" },
      { name: "Halloween Costumes", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120&h=120&fit=crop" },
      { name: "Easter Supplies", image: "https://images.unsplash.com/photo-1520213926620-52ae48e03692?w=120&h=120&fit=crop" },
      { name: "Valentine's Day", image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=120&h=120&fit=crop" },
      { name: "Summer & Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=120&fit=crop" },
      { name: "Back to School", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&h=120&fit=crop" },
      { name: "Thanksgiving", image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Collectibles",
    icon: "🏆",
    subcategories: [
      { name: "Sports Memorabilia", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=120&h=120&fit=crop" },
      { name: "Movie & TV Collectibles", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
      { name: "Trading Cards", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
      { name: "Coins & Currency", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=120&h=120&fit=crop" },
      { name: "Stamps", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=120&h=120&fit=crop" },
      { name: "Vintage Items", image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=120&h=120&fit=crop" },
      { name: "Autographs", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Handmade & Artisan",
    icon: "✨",
    subcategories: [
      { name: "Handmade Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=120&h=120&fit=crop" },
      { name: "Custom Artwork", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop" },
      { name: "Handcrafted Furniture", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=120&h=120&fit=crop" },
      { name: "Artisan Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop" },
      { name: "Handmade Clothing", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Personalized Gifts", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop" },
      { name: "Vintage Crafts", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Photography & Video",
    icon: "📷",
    subcategories: [
      { name: "DSLR Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
      { name: "Mirrorless Cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
      { name: "Camera Lenses", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
      { name: "Tripods & Supports", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
      { name: "Lighting & Studio", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
      { name: "Camera Bags & Cases", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop" },
      { name: "Video Equipment", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Travel Accessories",
    icon: "✈️",
    subcategories: [
      { name: "Travel Bags & Luggage", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
      { name: "Travel Pillows & Comfort", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
      { name: "Luggage Tags & Organizers", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
      { name: "Travel Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop" },
      { name: "Travel Adapters", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop" },
      { name: "Guidebooks & Maps", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=120&h=120&fit=crop" },
      { name: "Travel Security", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Hobbies & Creative",
    icon: "🎯",
    subcategories: [
      { name: "Model Building", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
      { name: "RC Cars & Drones", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=120&h=120&fit=crop" },
      { name: "Collectible Figures", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
      { name: "Puzzles", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=120&h=120&fit=crop" },
      { name: "Magic & Novelties", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=120&h=120&fit=crop" },
      { name: "Educational Kits", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=120&h=120&fit=crop" },
      { name: "DIY Projects", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Gift Cards",
    icon: "🎁",
    subcategories: [
      { name: "E-Gift Cards", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop" },
      { name: "Physical Gift Cards", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop" },
      { name: "Store Credit", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop" },
      { name: "Subscription Boxes", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop" },
      { name: "Experience Gifts", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Software & Digital",
    icon: "💻",
    subcategories: [
      { name: "Operating Systems", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
      { name: "Productivity Software", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
      { name: "Security & Antivirus", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
      { name: "Design Software", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
      { name: "Gaming Software", image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=120&h=120&fit=crop" },
      { name: "Mobile Apps", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=120&h=120&fit=crop" },
      { name: "Cloud Services", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Services & Subscriptions",
    icon: "📦",
    subcategories: [
      { name: "Streaming Services", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=120&h=120&fit=crop" },
      { name: "Meal Kit Subscriptions", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=120&h=120&fit=crop" },
      { name: "Beauty Box Subscriptions", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=120&h=120&fit=crop" },
      { name: "Book Clubs", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=120&fit=crop" },
      { name: "Online Courses", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&h=120&fit=crop" },
      { name: "Gym Memberships", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=120&fit=crop" },
      { name: "Premium Accounts", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Specialty Diets",
    icon: "🥗",
    subcategories: [
      { name: "Organic Foods", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
      { name: "Gluten-Free", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
      { name: "Vegan & Vegetarian", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
      { name: "Keto & Low-Carb", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=120&h=120&fit=crop" },
      { name: "Diabetic-Friendly", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
      { name: "Baby & Toddler Food", image: "https://images.unsplash.com/photo-1584839404042-8bc21d240e51?w=120&h=120&fit=crop" },
      { name: "Allergen-Free", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
    ]
  },
  {
    name: "Sustainable & Eco-Friendly",
    icon: "🌱",
    subcategories: [
      { name: "Reusable Products", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
      { name: "Eco-Friendly Cleaning", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=120&h=120&fit=crop" },
      { name: "Sustainable Fashion", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop" },
      { name: "Zero Waste Living", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
      { name: "Organic & Natural Products", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120&h=120&fit=crop" },
      { name: "Solar & Green Energy", image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=120&h=120&fit=crop" },
      { name: "Recycled Materials", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=120&h=120&fit=crop" },
    ]
  },
];
