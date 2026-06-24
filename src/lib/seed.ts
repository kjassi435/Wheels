import { db } from "./db";
import { hash } from "bcryptjs";
import {
  users,
  categories,
  products,
  testimonials,
  siteSettings,
  carouselCards,
  futureLaunches,
} from "../db/schema";
import { generateId } from "./utils";

async function seed() {
  console.log("Seeding database...");

  const adminId = generateId();
  const hashedPassword = await hash(process.env.ADMIN_PASSWORD || "Admin@123", 12);
  await db.insert(users).values({
    id: adminId,
    name: "Admin",
    email: process.env.ADMIN_EMAIL || "admin@welcomeonwheels.com",
    password: hashedPassword,
    role: "admin",
  });
  console.log("Admin user created");

  const categoryData = [
    { name: "Food Carts", slug: "food-carts", description: "Mobile food carts for your business", iconName: "ChefHat", sortOrder: 1 },
    { name: "Food Vans", slug: "food-vans", description: "Fully equipped food vans", iconName: "Truck", sortOrder: 2 },
    { name: "Electric Vehicle Carts", slug: "electric-vehicle-carts", description: "Eco-friendly electric carts", iconName: "Zap", sortOrder: 3 },
    { name: "Food Trailers", slug: "food-trailers", description: "Towed food trailers for events", iconName: "Container", sortOrder: 4 },
    { name: "Motorbike Operated Carts", slug: "motorbike-operated-carts", description: "Compact motorbike carts", iconName: "Bike", sortOrder: 5 },
    { name: "Kiosks", slug: "kiosks", description: "Stationary kiosk solutions", iconName: "Building2", sortOrder: 6 },
    { name: "Electric Tricycle Carts", slug: "electric-tricycle-carts", description: "Three-wheeled electric carts", iconName: "BatteryCharging", sortOrder: 7 },
    { name: "Ice Cream Carts", slug: "ice-cream-carts", description: "Mobile ice cream vending carts", iconName: "IceCream", sortOrder: 8 },
    { name: "Mobile Accessory Cart", slug: "mobile-accessory-cart", description: "Carts for mobile phone accessories and repairs", iconName: "Smartphone", sortOrder: 9 },
    { name: "Cosmetic Cart", slug: "cosmetic-cart", description: "Beauty and cosmetic product display carts", iconName: "Sparkles", sortOrder: 10 },
    { name: "Grocery Cart", slug: "grocery-cart", description: "Mobile grocery and vegetable vending carts", iconName: "ShoppingBag", sortOrder: 11 },
    { name: "Garment Shop Cart", slug: "garment-shop-cart", description: "Mobile garment and clothing display carts", iconName: "Shirt", sortOrder: 12 },
    { name: "Footwear Cart", slug: "footwear-cart", description: "Shoe and footwear retail carts", iconName: "Footprints", sortOrder: 13 },
  ];

  const categoryIds: Record<string, string> = {};
  for (const cat of categoryData) {
    const id = generateId();
    categoryIds[cat.slug] = id;
    await db.insert(categories).values({ id, ...cat, imageUrl: null });
  }
  console.log("Categories created");

  const productData = [
    {
      name: "Deluxe Food Cart",
      slug: "deluxe-food-cart",
      description: "Premium stainless steel food cart with built-in cooking setup, refrigerator, and storage. Perfect for street food, fast food, and beverages.",
      shortDescription: "Premium stainless steel mobile food cart",
      categorySlug: "food-carts",
      price: 185000,
      dimensions: "8ft x 4ft x 7ft",
      weight: "350 kg",
      features: ["Stainless steel body", "Built-in cooking range", "Refrigerator storage", "Water tank 50L", "Umbrella attachment", "Lockable wheels"],
      isFeatured: true,
      isNew: true,
    },
    {
      name: "Compact Food Van",
      slug: "compact-food-van",
      description: "Fully customized food van with kitchen setup, serving counter, and branding options. Ideal for catering businesses.",
      shortDescription: "Fully customized food van with kitchen",
      categorySlug: "food-vans",
      price: 450000,
      dimensions: "12ft x 6ft x 8ft",
      weight: "1200 kg",
      features: ["Full kitchen setup", "Serving counter", "Custom branding", "Generator included", "LED lighting", "Storage cabinets"],
      isFeatured: true,
    },
    {
      name: "Electric Food Cart EV",
      slug: "electric-food-cart-ev",
      description: "Battery-operated electric food cart with zero emissions. Comes with solar charging option and long-range battery.",
      shortDescription: "Zero-emission electric food cart",
      categorySlug: "electric-vehicle-carts",
      price: 320000,
      dimensions: "7ft x 4ft x 6ft",
      weight: "400 kg",
      features: ["Electric motor 1000W", "Lithium battery 60V", "Solar charging ready", "Range 80km", "Digital display", "Regenerative braking"],
      isFeatured: true,
      isNew: true,
    },
    {
      name: "Premium Food Trailer",
      slug: "premium-food-trailer",
      description: "Heavy-duty food trailer with dual axle, full kitchen, and outdoor serving window. Great for events and festivals.",
      shortDescription: "Heavy-duty food trailer for events",
      categorySlug: "food-trailers",
      price: 680000,
      dimensions: "16ft x 7ft x 8ft",
      weight: "2000 kg",
      features: ["Dual axle chassis", "Full commercial kitchen", "Outdoor serving window", "GREASE trap", "Fire suppression system", "Electric hookup"],
    },
    {
      name: "Motorbike Street Cart",
      slug: "motorbike-street-cart",
      description: "Compact cart attached to a motorbike for mobile vending. Easy to maneuver through narrow streets.",
      shortDescription: "Compact motorbike-attached cart",
      categorySlug: "motorbike-operated-carts",
      price: 95000,
      dimensions: "4ft x 3ft x 4ft",
      weight: "120 kg",
      features: ["Motorbike attachment", "Lightweight frame", "Weather cover", "Lockable storage", "Foldable design", "Easy detach"],
    },
    {
      name: "Modular Kiosk",
      slug: "modular-kiosk",
      description: "Modern modular kiosk with digital menu board, LED display, and climate control. Suitable for malls and high-footfall areas.",
      shortDescription: "Modern modular retail kiosk",
      categorySlug: "kiosks",
      price: 250000,
      dimensions: "6ft x 4ft x 7ft",
      weight: "500 kg",
      features: ["Digital menu board", "LED display screen", "Climate control", "Security shutters", "Payment terminal ready", "Custom branding"],
    },
    {
      name: "Electric Tricycle Cart",
      slug: "electric-tricycle-cart",
      description: "Three-wheeled electric cart perfect for local deliveries and mobile vending. Easy to park and operate.",
      shortDescription: "Three-wheeled electric vending cart",
      categorySlug: "electric-tricycle-carts",
      price: 175000,
      dimensions: "6ft x 3ft x 5ft",
      weight: "250 kg",
      features: ["500W electric motor", "48V battery", "Cargo capacity 300kg", "Roof cover", "LED headlights", "Horn & indicators"],
      isNew: true,
    },
    {
      name: "Classic Ice Cream Cart",
      slug: "classic-ice-cream-cart",
      description: "Traditional ice cream cart with freezer box, umbrella, and bell. Nostalgic design with modern cooling technology.",
      shortDescription: "Traditional ice cream vending cart",
      categorySlug: "ice-cream-carts",
      price: 85000,
      dimensions: "4ft x 3ft x 6ft",
      weight: "150 kg",
      features: ["Freezer box -18°C", "Classic umbrella", "Bell included", "Mobile battery", "Lockable wheels", "Ice cream display"],
    },
    {
      name: "Mobile Accessory Display Cart",
      slug: "mobile-accessory-display-cart",
      description: "Modern display cart for mobile phone accessories, chargers, cases, and repair services. Features glass display counters and secure storage.",
      shortDescription: "Display cart for mobile accessories & repairs",
      categorySlug: "mobile-accessory-cart",
      price: 75000,
      dimensions: "5ft x 3ft x 6ft",
      weight: "120 kg",
      features: ["Glass display counters", "Lockable storage drawers", "Built-in charging points", "LED strip lighting", "Foldable side table", "Branding panels"],
      isNew: true,
    },
    {
      name: "Cosmetic Beauty Cart",
      slug: "cosmetic-beauty-cart",
      description: "Stylish cosmetic cart with mirrored display, shelves for products, and a built-in sink. Perfect for beauty product retail and makeup services.",
      shortDescription: "Beauty product retail cart with mirror display",
      categorySlug: "cosmetic-cart",
      price: 95000,
      dimensions: "5ft x 3ft x 7ft",
      weight: "140 kg",
      features: ["Mirrored back panel", "Adjustable glass shelves", "Built-in sink with water tank", "LED mirror lighting", "Product display hooks", "Lockable wheels"],
      isNew: true,
    },
    {
      name: "Fresh Grocery Cart",
      slug: "fresh-grocery-cart",
      description: "Mobile grocery cart with spacious shelving, weighing scale area, and shaded canopy. Ideal for fresh vegetables, fruits, and packaged goods.",
      shortDescription: "Mobile grocery vending cart with canopy",
      categorySlug: "grocery-cart",
      price: 85000,
      dimensions: "6ft x 4ft x 7ft",
      weight: "180 kg",
      features: ["Multi-tier display shelves", "Built-in weighing scale platform", "Waterproof canopy", "Storage bins for produce", "Collapsible side table", "Anti-slip mat flooring"],
    },
    {
      name: "Garment Display Cart",
      slug: "garment-display-cart",
      description: "Spacious garment cart with hanging rods, foldable shelves, and changing room attachment. Perfect for clothing retail at markets and events.",
      shortDescription: "Clothing retail cart with hanging display",
      categorySlug: "garment-shop-cart",
      price: 110000,
      dimensions: "7ft x 4ft x 7ft",
      weight: "200 kg",
      features: ["Stainless steel hanging rods", "Foldable display shelves", "Attachable changing room", "Mirror panel", "Storage compartments", "Branding signage area"],
      isFeatured: true,
    },
    {
      name: "Footwear Display Cart",
      slug: "footwear-display-cart",
      description: "Purpose-built footwear cart with angled shoe shelves, seating for customers, and storage for stock. Great for shoe retail at markets and fairs.",
      shortDescription: "Shoe retail cart with seating & display",
      categorySlug: "footwear-cart",
      price: 90000,
      dimensions: "5ft x 4ft x 6ft",
      weight: "160 kg",
      features: ["Angled shoe display shelves", "Customer seating bench", "Under-counter stock storage", "Foldable canopy", "Mirror panel", "LED accent lighting"],
      isNew: true,
    },
  ];

  for (const prod of productData) {
    const id = generateId();
    await db.insert(products).values({
      id,
      name: prod.name,
      slug: prod.slug,
      description: prod.description,
      shortDescription: prod.shortDescription,
      categoryId: categoryIds[prod.categorySlug],
      price: prod.price,
      dimensions: prod.dimensions,
      weight: prod.weight,
      features: JSON.stringify(prod.features),
      images: JSON.stringify([]),
      isFeatured: prod.isFeatured ?? false,
      isNew: prod.isNew ?? false,
      stockQuantity: 10,
    });
  }
  console.log("Products created");

  const testimonialData = [
    {
      name: "Ajay Garg",
      content: "Welcome on Wheels provided me with an amazing food cart. The quality is outstanding and my business has grown tremendously. Highly recommended!",
      rating: 5,
      designation: "Food Cart Owner",
    },
    {
      name: "Pooja Rani",
      content: "I purchased an electric tricycle cart for my business. It's eco-friendly, easy to operate, and looks great. The team was very supportive throughout.",
      rating: 5,
      designation: "Small Business Owner",
    },
    {
      name: "Nikita Joshi",
      content: "The food van I ordered exceeded my expectations. The customization options were fantastic and the delivery was on time. Thank you Welcome on Wheels!",
      rating: 5,
      designation: "Catering Business Owner",
    },
  ];

  for (const t of testimonialData) {
    await db.insert(testimonials).values({
      id: generateId(),
      ...t,
      isFeatured: true,
      status: "approved",
    });
  }
  console.log("Testimonials created");

  // CMS: Site Settings
  const settingsData = [
    { key: "company_phone", value: "+916376671590", category: "contact" },
    { key: "company_email", value: "info@welcomeonwheels.com", category: "contact" },
    { key: "company_address", value: "61, Mithila Vihar, Jaipur, Rajasthan", category: "contact" },
    { key: "social_instagram", value: "https://www.instagram.com/welcomeon_wheels?igsh=azBjcmQyYXExc2Jk", category: "social" },
    { key: "social_youtube", value: "https://youtube.com/@welcomeonwheels?si=tTKBRi-F2pN5i1Qx", category: "social" },
    { key: "social_facebook", value: "https://www.facebook.com/share/1DQgy9fU3r/", category: "social" },
    { key: "hero_title", value: "Premium Mobile Business Solutions", category: "hero" },
    { key: "hero_subtitle", value: "Handcrafted mobile carts, food vans & electric vehicles for entrepreneurs who demand the best.", category: "hero" },
  ];
  for (const s of settingsData) {
    await db.insert(siteSettings).values({ id: generateId(), ...s, updatedAt: new Date() });
  }
  console.log("Site settings created");

  // CMS: Carousel Cards
  const carouselData = [
    { title: "Food Carts", description: "Premium stainless steel mobile food carts for street food business", imageUrl: "/carousel/food-carts.png", linkUrl: "/products?category=food-carts", sortOrder: 0 },
    { title: "Food Vans", description: "Fully equipped food vans with kitchen setup and serving counter", imageUrl: "/carousel/food-vans.png", linkUrl: "/products?category=food-vans", sortOrder: 1 },
    { title: "EV Carts", description: "Zero-emission electric carts with solar charging option", imageUrl: "/carousel/ev-carts.png", linkUrl: "/products?category=electric-vehicle-carts", sortOrder: 2 },
    { title: "Food Trailers", description: "Heavy-duty trailers for events, festivals and catering", imageUrl: "/carousel/food-trailers.png", linkUrl: "/products?category=food-trailers", sortOrder: 3 },
    { title: "Motorbike Carts", description: "Compact motorbike-attached carts for narrow streets", imageUrl: "/carousel/motorbike-carts.png", linkUrl: "/products?category=motorbike-operated-carts", sortOrder: 4 },
    { title: "Kiosks", description: "Modern modular kiosks for malls and high-footfall areas", imageUrl: "/carousel/kiosks.png", linkUrl: "/products?category=kiosks", sortOrder: 5 },
    { title: "E-Tricycle", description: "Three-wheeled electric carts for local deliveries and vending", imageUrl: "/carousel/e-tricycle.png", linkUrl: "/products?category=electric-tricycle-carts", sortOrder: 6 },
    { title: "Ice Cream Carts", description: "Mobile ice cream vending carts with freezer storage", imageUrl: "", linkUrl: "/products?category=ice-cream-carts", sortOrder: 7 },
    { title: "Mobile Accessory Cart", description: "Mobile accessory & repair carts for electronics", imageUrl: "", linkUrl: "/products?category=mobile-accessory-cart", sortOrder: 8 },
    { title: "Cosmetic Cart", description: "Beauty & cosmetic display carts for retail", imageUrl: "", linkUrl: "/products?category=cosmetic-cart", sortOrder: 9 },
    { title: "Grocery Cart", description: "Mobile grocery vending carts for fresh produce", imageUrl: "", linkUrl: "/products?category=grocery-cart", sortOrder: 10 },
    { title: "Garment Cart", description: "Clothing display carts for apparel retail", imageUrl: "", linkUrl: "/products?category=garment-shop-cart", sortOrder: 11 },
    { title: "Footwear Cart", description: "Shoe retail carts for footwear business", imageUrl: "", linkUrl: "/products?category=footwear-cart", sortOrder: 12 },
  ];
  for (const c of carouselData) {
    await db.insert(carouselCards).values({ id: generateId(), ...c, isActive: true, createdAt: new Date(), updatedAt: new Date() });
  }
  console.log("Carousel cards created");

  // CMS: Future Launches
  const launchesData = [
    { name: "Solar-Powered EV Cart", description: "Eco-friendly electric cart with integrated solar panels for off-grid operation. Perfect for remote locations.", quarter: "Q3 2026", icon: "🚀", sortOrder: 0 },
    { name: "Smart Kiosk with AI Ordering", description: "Next-gen kiosk with AI-powered ordering, digital payments, and inventory management integration.", quarter: "Q4 2026", icon: "👁️", sortOrder: 1 },
    { name: "Luxury Food Truck", description: "Premium food truck with full commercial kitchen, designer interior, and outdoor serving counter.", quarter: "Q1 2027", icon: "🚀", sortOrder: 2 },
    { name: "Compact Bubble Tea Cart", description: "Specialized cart for bubble tea and beverages with built-in refrigeration and sealing machine.", quarter: "Q2 2027", icon: "👁️", sortOrder: 3 },
  ];
  for (const l of launchesData) {
    await db.insert(futureLaunches).values({ id: generateId(), ...l, isActive: true, createdAt: new Date(), updatedAt: new Date() });
  }
  console.log("Future launches created");

  console.log("Seed completed successfully!");
}

seed().catch(console.error);
