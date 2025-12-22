export interface Subcategory {
  name: string;
  image: string;
  isHot?: boolean;
  children?: string[];
}

export interface Category {
  name: string;
  icon: string;
  image: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    name: "Women's Clothing",
    icon: "shirt",
    image: "https://images.unsplash.com/photo-1558171813-01ed289a814b?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Tops", image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=200&h=200&fit=crop", isHot: true },
      { name: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop", isHot: true },
      { name: "Activewear", image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=200&h=200&fit=crop" },
      { name: "Loungewear", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop" },
      { name: "Jackets & Outerwear", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=200&fit=crop", isHot: true },
      { name: "Leggings", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=200&h=200&fit=crop" },
      { name: "Swimwear", image: "https://images.unsplash.com/photo-1570976447640-ac859083963f?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Men's Clothing",
    icon: "user",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Shirts & Tops", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop", isHot: true },
      { name: "Hoodies & Sweatshirts", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop", isHot: true },
      { name: "Pants & Shorts", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=200&h=200&fit=crop" },
      { name: "Activewear", image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop" },
      { name: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop" },
      { name: "Underwear", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop" },
      { name: "Workwear", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Kids Clothing",
    icon: "baby",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Boys Clothing", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=200&h=200&fit=crop", isHot: true },
      { name: "Girls Clothing", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=200&h=200&fit=crop", isHot: true },
      { name: "Baby Clothing", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&h=200&fit=crop" },
      { name: "Sleepwear", image: "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?w=200&h=200&fit=crop" },
      { name: "Seasonal Clothing", image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Unisex",
    icon: "users",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    subcategories: [
      { name: "T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop", isHot: true },
      { name: "Hoodies", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&h=200&fit=crop", isHot: true },
      { name: "Streetwear", image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Beauty & Personal Care",
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
    subcategories: [
      { 
        name: "Skin Care Tools", 
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop",
        isHot: true,
        children: ["Face rollers", "Microdermabrasion tools", "Facial cleansing devices"]
      },
      { 
        name: "Hair Styling Tools", 
        image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=200&h=200&fit=crop",
        children: ["Straighteners", "Curlers", "Men's grooming trimmers"]
      },
      { name: "Makeup Tools", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop", isHot: true },
      { name: "Nail Tools", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop" },
      { name: "Grooming & Shaving (Men)", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Home & Kitchen",
    icon: "home",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Kitchen Tools & Gadgets", image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=200&h=200&fit=crop", isHot: true },
      { name: "Cookware & Bakeware", image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop" },
      { name: "Home Decor", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop", isHot: true },
      { name: "Storage & Organization", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop" },
      { name: "Cleaning Tools", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Electronics",
    icon: "smartphone",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Phone Accessories", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop", isHot: true },
      { name: "Computer Accessories", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop" },
      { name: "Smart Home Devices", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop", isHot: true },
      { name: "Audio Devices", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop" },
      { name: "Wearables", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200&h=200&fit=crop" },
      { name: "Portable Tech", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Sports & Outdoors",
    icon: "dumbbell",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Fitness Equipment", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop", isHot: true },
      { name: "Yoga & Pilates", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop" },
      { name: "Camping Gear", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&h=200&fit=crop" },
      { name: "Cycling Accessories", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=200&h=200&fit=crop" },
      { name: "Water Sports Gear", image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Health & Household",
    icon: "heart-pulse",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Massagers", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop", isHot: true },
      { name: "Pain Relief Tools", image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=200&h=200&fit=crop" },
      { name: "Sleep Accessories", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop" },
      { name: "Braces & Supports", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&h=200&fit=crop" },
      { name: "First Aid Items", image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Baby Products",
    icon: "baby",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Feeding Accessories", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=200&h=200&fit=crop" },
      { name: "Safety Products", image: "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=200&h=200&fit=crop", isHot: true },
      { name: "Stroller Accessories", image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=200&fit=crop" },
      { name: "Toys & Learning", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop" },
      { name: "Nursery Items", image: "https://images.unsplash.com/photo-1518012312832-96aea3c91144?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Pet Supplies",
    icon: "paw-print",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Pet Toys", image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=200&h=200&fit=crop", isHot: true },
      { name: "Grooming Tools", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop" },
      { name: "Beds & Houses", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=200&h=200&fit=crop" },
      { name: "Feeding Bowls", image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=200&h=200&fit=crop" },
      { name: "Training Gear", image: "https://images.unsplash.com/photo-1558929996-da64ba858215?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Automotive",
    icon: "car",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Car Organizers", image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=200&fit=crop" },
      { name: "Cleaning Tools", image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=200&h=200&fit=crop" },
      { name: "Phone Mounts", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=200&fit=crop", isHot: true },
      { name: "Seat Covers", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=200&fit=crop" },
      { name: "Exterior Accessories", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Office Products",
    icon: "briefcase",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Desk Organizers", image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop" },
      { name: "Productivity Tools", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=200&h=200&fit=crop", isHot: true },
      { name: "Stationery", image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?w=200&h=200&fit=crop" },
      { name: "Writing Tools", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=200&fit=crop" },
      { name: "School Supplies", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Tools & Home Improvement",
    icon: "wrench",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Hand Tools", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&h=200&fit=crop", isHot: true },
      { name: "Power Tool Accessories", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop" },
      { name: "Measuring Tools", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=200&h=200&fit=crop" },
      { name: "Repair Kits", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=200&h=200&fit=crop" },
      { name: "Electrical Accessories", image: "https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Patio, Lawn & Garden",
    icon: "flower",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Gardening Tools", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop", isHot: true },
      { name: "Plant Pots", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop" },
      { name: "Outdoor Decor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
      { name: "Pest Control", image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=200&h=200&fit=crop" },
      { name: "Watering Accessories", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Travel & Luggage",
    icon: "luggage",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Travel Organizers", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
      { name: "Suitcases & Bags", image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=200&h=200&fit=crop", isHot: true },
      { name: "Packing Cubes", image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=200&h=200&fit=crop" },
      { name: "Travel Pillows", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop" },
      { name: "Safety & Security Items", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Arts, Crafts & Sewing",
    icon: "palette",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=200&h=200&fit=crop",
    subcategories: [
      { name: "DIY Kits", image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=200&h=200&fit=crop", isHot: true },
      { name: "Painting Supplies", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop" },
      { name: "Sewing Tools", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
      { name: "Craft Storage", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop" },
      { name: "Resin Art Tools", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Toys & Games",
    icon: "gamepad-2",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Outdoor Toys", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=200&h=200&fit=crop" },
      { name: "STEM Toys", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&h=200&fit=crop", isHot: true },
      { name: "Learning Games", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&h=200&fit=crop" },
      { name: "Puzzles", image: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?w=200&h=200&fit=crop" },
      { name: "Collectibles", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Gifts & Seasonal",
    icon: "gift",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Gifts for Men", image: "https://images.unsplash.com/photo-1549465220-1ab2a1c593e8?w=200&h=200&fit=crop" },
      { name: "Gifts for Women", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=200&h=200&fit=crop", isHot: true },
      { name: "Holiday Decorations", image: "https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=200&h=200&fit=crop", isHot: true },
      { name: "Event & Party Supplies", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200&h=200&fit=crop" },
      { name: "Personalized Gifts", image: "https://images.unsplash.com/photo-1607469256872-48f64c5cc795?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Smart Gadgets",
    icon: "lightbulb",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop",
    subcategories: [
      { name: "LED Gadgets", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
      { name: "USB Gadgets", image: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?w=200&h=200&fit=crop", isHot: true },
      { name: "Smart Trackers", image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=200&h=200&fit=crop" },
      { name: "Mini Projectors", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=200&h=200&fit=crop" },
      { name: "Portable Tech Gadgets", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Cleaning & Storage",
    icon: "archive",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Cleaning Gadgets", image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop", isHot: true },
      { name: "Storage Items", image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&h=200&fit=crop" },
      { name: "Laundry Tools", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=200&h=200&fit=crop" },
      { name: "Home Organization", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop" },
      { name: "Air Freshening Products", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Security & Surveillance",
    icon: "camera",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Cameras", image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=200&h=200&fit=crop", isHot: true },
      { name: "Smart Doorbells", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop" },
      { name: "Locks & Anti-Theft Devices", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
      { name: "Motion Sensors", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop" },
      { name: "Alarms", image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=200&h=200&fit=crop" },
    ]
  },
  {
    name: "Small Appliances",
    icon: "plug",
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop",
    subcategories: [
      { name: "Blenders", image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200&h=200&fit=crop" },
      { name: "Air Fryers", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop", isHot: true },
      { name: "Coffee Makers", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop" },
      { name: "Electric Kettles", image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=200&h=200&fit=crop" },
      { name: "Mini Appliances", image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=200&h=200&fit=crop" },
    ]
  },
];

// Helper function to get all category names for tag matching
export const getAllCategoryNames = (): string[] => {
  const names: string[] = [];
  categories.forEach(cat => {
    names.push(cat.name);
    cat.subcategories.forEach(sub => {
      names.push(sub.name);
      if (sub.children) {
        sub.children.forEach(child => names.push(child));
      }
    });
  });
  return names;
};

// Helper function to find category by name (fuzzy match)
export const findCategoryByName = (name: string): Category | undefined => {
  const lowerName = name.toLowerCase();
  return categories.find(cat => 
    cat.name.toLowerCase().includes(lowerName) || 
    lowerName.includes(cat.name.toLowerCase())
  );
};

// Helper function to find subcategory by name
export const findSubcategoryByName = (name: string): { category: Category; subcategory: Subcategory } | undefined => {
  const lowerName = name.toLowerCase();
  for (const cat of categories) {
    const sub = cat.subcategories.find(s => 
      s.name.toLowerCase().includes(lowerName) || 
      lowerName.includes(s.name.toLowerCase())
    );
    if (sub) {
      return { category: cat, subcategory: sub };
    }
  }
  return undefined;
};
