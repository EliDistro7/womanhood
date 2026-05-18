const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// Demo Categories
const demoCategories = [
  {
    id: "7a241318-624f-48f7-9921-1818f6c20d85",
    name: "business-fundamentals",
  },
  {
    id: "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb",
    name: "entrepreneurship",
  },
  {
    id: "782e7829-806b-489f-8c3a-2689548d7153",
    name: "marketing",
  },
  {
    id: "a6896b67-197c-4b2a-b5e2-93954474d8b4",
    name: "financial-literacy",
  },
  {
    id: "4c2cc9ec-7504-4b7c-8ecd-2379a854a423",
    name: "digital-skills",
  },
  {
    id: "8d2a091c-4b90-4d60-b191-114b895f3e54",
    name: "leadership",
  },
  {
    id: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b",
    name: "women-in-business",
  },
  {
    id: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24",
    name: "youth-entrepreneurship",
  },
  {
    id: "d30b85e2-e544-4f48-8434-33fe0b591579",
    name: "business-planning",
  },
  {
    id: "6c3b8591-b01e-4842-bce1-2f5585bf3a28",
    name: "sales-techniques",
  },
  {
    id: "659a91b9-3ff6-47d5-9830-5e7ac905b961",
    name: "e-commerce",
  },
  {
    id: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e",
    name: "personal-branding",
  },
  {
    id: "da6413b4-22fd-4fbb-9741-d77580dfdcd5",
    name: "social-entrepreneurship"
  },
  {
    id: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2",
    name: "project-management"
  },
  {
    id: "fs6412b4-22fd-4fbb-9741-d77512dfdfa3",
    name: "communication-skills"
  }
];

// Demo Products (Courses)
const demoProducts = [
  {
    id: "1",
    title: "Business Startup Essentials",
    price: 99,
    rating: 5,
    description: "Comprehensive guide to starting your own business from scratch with practical steps and templates.",
    mainImage: "learner-3.jpg",
    slug: "business-startup-essentials",
    manufacturer: "Success Academy",
    categoryId: "313eee86-bc11-4dc1-8cb0-6b2c2a2a1ccb", // Entrepreneurship
    inStock: 1,
  },
  {
    id: "2",
    title: "Digital Marketing for Beginners",
    price: 79,
    rating: 4,
    description: "Learn the fundamentals of digital marketing including social media, SEO, and content creation.",
    mainImage: "digital-marketing.webp",
    slug: "digital-marketing-beginners",
    manufacturer: "Marketing Mastery",
    categoryId: "782e7829-806b-489f-8c3a-2689548d7153", // Marketing
    inStock: 1,
  },
  {
    id: "3",
    title: "Financial Literacy for Entrepreneurs",
    price: 89,
    rating: 5,
    description: "Master the basics of business finance, budgeting, and investment for sustainable growth.",
    mainImage: "financial-literacy.webp",
    slug: "financial-literacy-entrepreneurs",
    manufacturer: "Finance First",
    categoryId: "a6896b67-197c-4b2a-b5e2-93954474d8b4", // Financial Literacy
    inStock: 1,
  },
  {
    id: "4",
    title: "Women in Leadership",
    price: 119,
    rating: 5,
    description: "Empowering course designed specifically for women to develop strong leadership skills in business.",
    mainImage: "women-leadership.webp",
    slug: "women-in-leadership",
    manufacturer: "EmpowerHer",
    categoryId: "1cb9439a-ea47-4a33-913b-e9bf935bcc0b", // Women in Business
    inStock: 1,
  },
  {
    id: "5",
    title: "E-commerce Website Development",
    price: 149,
    rating: 4,
    description: "Step-by-step guide to building your own online store with no coding experience required.",
    mainImage: "ecommerce-dev.webp",
    slug: "ecommerce-website-development",
    manufacturer: "Digital Solutions",
    categoryId: "659a91b9-3ff6-47d5-9830-5e7ac905b961", // E-commerce
    inStock: 1,
  },
  {
    id: "6",
    title: "Personal Branding Masterclass",
    price: 69,
    rating: 4,
    description: "Create a compelling personal brand to stand out in your industry and attract clients.",
    mainImage: "personal-branding.webp",
    slug: "personal-branding-masterclass",
    manufacturer: "Brand Builder",
    categoryId: "3117a1b0-6369-491e-8b8b-9fdd5ad9912e", // Personal Branding
    inStock: 1,
  },
  {
    id: "7",
    title: "Youth Entrepreneurship Bootcamp",
    price: 59,
    rating: 5,
    description: "Specially designed program for young entrepreneurs aged 16-25 to kickstart their business journey.",
    mainImage: "youth-bootcamp.webp",
    slug: "youth-entrepreneurship-bootcamp",
    manufacturer: "NextGen Business",
    categoryId: "ada699e5-e764-4da0-8d3e-18a8c8c5ed24", // Youth Entrepreneurship
    inStock: 1,
  },
  {
    id: "8",
    title: "Business Plan Development",
    price: 129,
    rating: 4,
    description: "Learn to create comprehensive business plans that attract investors and guide your business growth.",
    mainImage: "business-plan.webp",
    slug: "business-plan-development",
    manufacturer: "Strategic Planning Inc",
    categoryId: "d30b85e2-e544-4f48-8434-33fe0b591579", // Business Planning
    inStock: 1,
  },
  {
    id: "9",
    title: "Sales Techniques for Small Businesses",
    price: 89,
    rating: 5,
    description: "Practical sales strategies and closing techniques tailored for small business owners.",
    mainImage: "sales-techniques.jpg",
    slug: "sales-techniques-small-businesses",
    manufacturer: "Sales Success",
    categoryId: "6c3b8591-b01e-4842-bce1-2f5585bf3a28", // Sales Techniques
    inStock: 1,
  },
  {
    id: "10",
    title: "Social Media Marketing Strategy",
    price: 99,
    rating: 5,
    description: "Comprehensive guide to developing effective social media strategies for business growth.",
    mainImage: "social-media.jpg",
    slug: "social-media-marketing-strategy",
    manufacturer: "Digital Marketing Pros",
    categoryId: "782e7829-806b-489f-8c3a-2689548d7153", // Marketing
    inStock: 1,
  },
  {
    id: "11",
    title: "Business Communication Skills",
    price: 69,
    rating: 5,
    description: "Master effective communication in business settings including presentations, emails, and negotiations.",
    mainImage: "business-communication.jpg",
    slug: "business-communication-skills",
    manufacturer: "Communication Excellence",
    categoryId: "fs6412b4-22fd-4fbb-9741-d77512dfdfa3", // Communication Skills
    inStock: 1,
  },
  {
    id: "12",
    title: "Project Management Fundamentals",
    price: 109,
    rating: 4,
    description: "Learn essential project management methodologies to deliver successful business projects on time and within budget.",
    mainImage: "project-management.webp",
    slug: "project-management-fundamentals",
    manufacturer: "PM Excellence",
    categoryId: "ss6412b4-22fd-4fbb-9741-d77580dfdcd2", // Project Management
    inStock: 1,
  }
];

// Demo Users
const demoUsers = [
  {
    id: "user-1",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: "user-2",
    email: "student@example.com",
    password: bcrypt.hashSync("student123", 10),
    role: "user",
  },
  {
    id: "user-3",
    email: "entrepreneur@example.com",
    password: bcrypt.hashSync("entrepreneur123", 10),
    role: "user",
  }
];

// Demo Images
const demoImages = [
  {
    imageID: "img-1",
    productID: "1",
    image: "business-startup-detail-1.webp"
  },
  {
    imageID: "img-2",
    productID: "1",
    image: "business-startup-detail-2.webp"
  },
  {
    imageID: "img-3",
    productID: "4",
    image: "women-leadership-detail-1.webp"
  }
];

// Demo Orders
const demoOrders = [
  {
    id: "order-1",
    name: "Sarah",
    lastname: "Johnson",
    phone: "+255712345678",
    email: "sarah@example.com",
    company: "Sarah's Fashion",
    adress: "123 Upanga Street",
    apartment: "Apt 4B",
    postalCode: "12345",
    city: "Dar es Salaam",
    country: "Tanzania",
    status: "delivered",
    total: 168,
    orderNotice: "Please send course access details via WhatsApp"
  },
  {
    id: "order-2",
    name: "Daniel",
    lastname: "Mkapa",
    phone: "+255723456789",
    email: "daniel@example.com",
    company: "",
    adress: "456 Msasani Road",
    apartment: "",
    postalCode: "54321",
    city: "Arusha",
    country: "Tanzania",
    status: "processing",
    total: 277,
    orderNotice: null
  }
];

// Demo Order Products
const demoOrderProducts = [
  {
    id: "op-1",
    customerOrderId: "order-1",
    productId: "1",
    quantity: 1
  },
  {
    id: "op-2",
    customerOrderId: "order-1",
    productId: "6",
    quantity: 1
  },
  {
    id: "op-3",
    customerOrderId: "order-2",
    productId: "4",
    quantity: 1
  },
  {
    id: "op-4",
    customerOrderId: "order-2",
    productId: "9",
    quantity: 2
  }
];

// Demo Notifications
const demoNotifications = [
  {
    id: "notif-1",
    userId: "user-2",
    text: "Your course access has been activated! Check your email for login details.",
    type: "info",
    read: false
  },
  {
    id: "notif-2",
    userId: "user-3",
    text: "New entrepreneurship courses are available! Check them out with 15% early bird discount.",
    type: "promo",
    read: true
  },
  {
    id: "notif-3",
    userId: "user-1",
    text: "New course purchase needs your approval",
    type: "alert",
    read: false
  }
];

// Demo Wishlist Items
const demoWishlistItems = [
  {
    id: "wish-1",
    productId: "4",
    userId: "user-2"
  },
  {
    id: "wish-2",
    productId: "7",
    userId: "user-2"
  },
  {
    id: "wish-3",
    productId: "10",
    userId: "user-3"
  }
];

async function insertDemoData() {
  try {
    // Categories
    for (const category of demoCategories) {
      await prisma.category.upsert({
        where: { id: category.id },
        update: {},
        create: category,
      });
    }
    console.log("Demo categories inserted successfully!");
    
    // Products
    for (const product of demoProducts) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: product,
      });
    }
    console.log("Demo products inserted successfully!");
    
    // Users
    for (const user of demoUsers) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    }
    console.log("Demo users inserted successfully!");
    
    // Images
    for (const image of demoImages) {
      await prisma.image.upsert({
        where: { imageID: image.imageID },
        update: {},
        create: image,
      });
    }
    console.log("Demo images inserted successfully!");
    
    // Orders
    for (const order of demoOrders) {
      await prisma.customer_order.upsert({
        where: { id: order.id },
        update: {},
        create: order,
      });
    }
    console.log("Demo orders inserted successfully!");
    
    // Order Products
    for (const orderProduct of demoOrderProducts) {
      await prisma.customer_order_product.upsert({
        where: { id: orderProduct.id },
        update: {},
        create: orderProduct,
      });
    }
    console.log("Demo order products inserted successfully!");
    
    // Notifications
    for (const notification of demoNotifications) {
      await prisma.notification.upsert({
        where: { id: notification.id },
        update: {},
        create: notification,
      });
    }
    console.log("Demo notifications inserted successfully!");
    
    // Wishlist Items
    for (const wishlistItem of demoWishlistItems) {
      await prisma.wishlist.upsert({
        where: { id: wishlistItem.id },
        update: {},
        create: wishlistItem,
      });
    }
    console.log("Demo wishlist items inserted successfully!");
    
    console.log("All demo data inserted successfully!");
  } catch (error) {
    console.error("Error inserting demo data:", error);
    throw error;
  }
}

insertDemoData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });