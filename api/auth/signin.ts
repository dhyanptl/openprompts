import type { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import { connectDB, User } from "../_db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end();

  await connectDB();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

  res.json({ token, user: { email } });
}
