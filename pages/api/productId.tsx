import { NextApiRequest, NextApiResponse } from 'next';
import { mongooseConnect } from "@/app/lib/mongoose";
import { Product } from "@/app/models/Product";

export default async (_req: NextApiRequest, res: NextApiResponse) => {
    const featuredProductId = '6470a8ae826c6cefe01a18b5'
    await mongooseConnect();
    const product = await Product.findById(featuredProductId)
    res.status(200).json({ product })
}
