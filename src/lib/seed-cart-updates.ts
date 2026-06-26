import { db } from "./db";
import { cartUpdates } from "../db/schema";

const defaultImages = [
  { id: "1s6o6ZMb40xpKHgGpoyHz0h4D4t322n5h", title: "Cart Update 1", sortOrder: 0 },
  { id: "1NZynhjRnhTSUAzQUjtLNrLout68fAD29", title: "Cart Update 2", sortOrder: 1 },
  { id: "1NSoyj4SXU406i3KJzvL0IE4vwByB9Puz", title: "Cart Update 3", sortOrder: 2 },
  { id: "1ev6s4Q3zNKvnwYSR5BPqyK6ZOa0NgtZc", title: "Cart Update 4", sortOrder: 3 },
  { id: "1u0YhjwAdBXeudi9dZB_sJTr20ze6CK4F", title: "Cart Update 5", sortOrder: 4 },
];

async function seed() {
  console.log("Seeding cart updates...");
  
  for (const img of defaultImages) {
    const id = `cart_seed_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    await db.insert(cartUpdates).values({
      id,
      imageUrl: `https://drive.google.com/file/d/${img.id}/view`,
      title: img.title,
      linkUrl: null,
      sortOrder: img.sortOrder,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(`Inserted: ${img.title}`);
  }
  
  console.log("Done!");
}

seed().catch(console.error);
