import { NextResponse } from "next/server";
import prisma from "@/utils/db";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import slugify from "slugify";

// For fetching all products
export const GET = async () => {
  try {
    const products = await prisma.product.findMany();
    console.log('prods', products);
    return NextResponse.json(products);
  } catch (err) {
    console.log('error', err);
    return new NextResponse("Failed to fetch products", { status: 500 });
  }
};

// For creating a new product
export const POST = async (request) => {
  try {
    // Parse the form data from the request
    const formData = await request.formData();
    
    // Extract data from the form
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const manufacturer = formData.get("manufacturer");
    const inStock = formData.get("inStock");
    const rating = formData.get("rating");
    const categoryId = formData.get("categoryId");
    const mainImageFile = formData.get("mainImage");
    
    // Validate required fields
    if (!title || !description || !price || !manufacturer || !categoryId || !mainImageFile) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Generate a slug from the title
    const slug = slugify(title, { lower: true, strict: true }) + "-" + uuidv4().substring(0, 8);
    
    // Handle main image upload
    const mainImageBytes = await mainImageFile.arrayBuffer();
    const mainImageBuffer = Buffer.from(mainImageBytes);
    
    // Generate unique filename
    const mainImageExt = mainImageFile.name.split('.').pop();
    const mainImageFilename = `product-${slug}-main.${mainImageExt}`;
    
    // Set path for saving image
    const publicDir = join(process.cwd(), 'public');
    const uploadDir = join(publicDir, 'uploads', 'products');
    
    // Save the main image
    await writeFile(
      join(uploadDir, mainImageFilename),
      mainImageBuffer
    );
    
    // Handle additional images if present
    const additionalImages = formData.getAll("additionalImages");
    const additionalImagePaths = [];
    
    if (additionalImages.length > 0) {
      for (let i = 0; i < additionalImages.length; i++) {
        const file = additionalImages[i];
        const fileBytes = await file.arrayBuffer();
        const fileBuffer = Buffer.from(fileBytes);
        
        const fileExt = file.name.split('.').pop();
        const filename = `product-${slug}-${i + 1}.${fileExt}`;
        
        // Save additional image
        await writeFile(
          join(uploadDir, filename),
          fileBuffer
        );
        
        additionalImagePaths.push(`/uploads/products/${filename}`);
      }
    }
    
    // Create the product in the database
    const product = await prisma.product.create({
      data: {
        id: uuidv4(),
        slug,
        title,
        description,
        price: parseInt(price, 10),
        manufacturer,
        inStock: parseInt(inStock, 10),
        rating: parseInt(rating, 10),
        mainImage: `/uploads/products/${mainImageFilename}`,
        categoryId
      }
    });
    
    // If we had additional images, we would save them to a related table here
    // This depends on how your schema handles additional images
    
    return NextResponse.json(
      { 
        message: "Product created successfully", 
        product 
      }, 
      { status: 201 }
    );
    
  } catch (err) {
    console.error("Error creating product:", err);
    return NextResponse.json(
      { message: `Failed to create product: ${err.message}` },
      { status: 500 }
    );
  }
};