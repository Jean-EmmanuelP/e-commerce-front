import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  await mongooseConnect();
  const allProducts = await Product.find({}, null, { sort: { _id: -1 }});
  res.status(200).json({ allProducts });
};
