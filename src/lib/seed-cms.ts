import { db } from "./db";
import {
  siteSettings,
  carouselCards,
  futureLaunches,
} from "../db/schema";
import { generateId } from "./utils";

async function seedCms() {
  console.log("Seeding CMS data...");

  // Site Settings
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

  // Carousel Cards
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

  // Future Launches
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

  console.log("CMS seed completed!");
}

seedCms().catch(console.error);
