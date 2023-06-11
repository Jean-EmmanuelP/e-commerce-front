import { NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/app/lib/mongoose";
import { Order } from "@/app/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];

    req.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });

    req.on('error', reject);
  });
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
    return;
  }

  // Connect to MongoDB
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    const body = await buffer(req);

    event = stripe.webhooks.constructEvent(
      body.toString(),
      sig,
      WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Webhook invalid!", error);
    return res.status(400).send(`Webhook Error: ${(error as Error).message}`);
  }

  console.log("✅ Success:", event.id);

  // Cast event data to Stripe object
  if (event.type === "checkout.session.completed") {
    const paymentIntent = event.data.object;
    const paid = paymentIntent.payment_status === 'paid'
    const OrderId = paymentIntent.metadata.orderId
    console.log(`🆔 OrderId: `, OrderId);
    console.log(`💰 PaymentIntent status: ${paymentIntent.status}`);
    console.log(`💵 PaymentIntent ID: ${paymentIntent.id}`);
    if (OrderId && paid) {
      await Order.findByIdAndUpdate(OrderId, {
        paid: true,
      })
    }
  } else {
    console.log(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  // res.json({ received: true });
  res.status(200).send('ok');
}

export const config = {
  api: {
    bodyParser: false,
  },
};
