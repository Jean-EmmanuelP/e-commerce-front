import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body; // Change this line to get the id from the body

  console.log(`Received id: ${id}`); // Log the received id

  await mongooseConnect();
  const product = await Product.findById(id);

  // Check if a product was found
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json({ product });
};
