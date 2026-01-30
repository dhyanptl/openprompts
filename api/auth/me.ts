import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt = require("jsonwebtoken");
import { connectDB, User } from "../_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();

  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    await connectDB();
    const user = await User.findById(payload.id).select("email");

    res.json({ user });
  } catch {
    res.status(401).end();
  }
}
