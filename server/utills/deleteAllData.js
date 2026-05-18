const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Delete in correct order to respect foreign key constraints
    
    // 1. First delete tables with foreign key dependencies
    console.log("Deleting wishlist items...");
    await prisma.wishlist.deleteMany({});
    
    console.log("Deleting order products...");
    await prisma.customer_order_product.deleteMany({});
    
    console.log("Deleting notifications...");
    await prisma.notification.deleteMany({});
    
    console.log("Deleting images...");
    await prisma.image.deleteMany({});
    
    // 2. Then delete tables that were referenced by the above
    console.log("Deleting orders...");
    await prisma.customer_order.deleteMany({});
    
    console.log("Deleting products...");
    await prisma.product.deleteMany({});
    
    console.log("Deleting users...");
    await prisma.user.deleteMany({});
    
    console.log("Deleting categories...");
    await prisma.category.deleteMany({});
    
    console.log("All data has been deleted successfully!");
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
}

deleteAllData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  