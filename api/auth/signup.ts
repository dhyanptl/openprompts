import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import { connectDB, User } from "../_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "EMAIL_EXISTS" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

  res.json({ token, user: { email } });
}
