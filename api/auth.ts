import type { VercelRequest, VercelResponse } from "@vercel/node";
import mongoose from "mongoose";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");

// --- Mongo connection (cached) ---
const MONGO_URL = process.env.MONGO_URL as string;

if (!MONGO_URL) throw new Error("Missing MONGO_URL");

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// --- User model ---
const UserSchema =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({
      email: { type: String, unique: true },
      passwordHash: String,
      createdAt: { type: Date, default: Date.now },
    })
  );

// --- Handler ---
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  await connectDB();

  if (req.method === "POST" && req.url?.endsWith("/signup")) {
    const { email, password } = req.body;

    const exists = await UserSchema.findOne({ email });
    if (exists) return res.status(400).json({ error: "EMAIL_EXISTS" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await UserSchema.create({ email, passwordHash });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return res.json({ token, user: { email } });
  }

  if (req.method === "POST" && req.url?.endsWith("/signin")) {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return res.json({ token, user: { email } });
  }

  if (req.method === "GET" && req.url?.endsWith("/me")) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).end();

    try {
      const token = auth.split(" ")[1];
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      const user = await UserSchema.findById(payload.id).select("email");
      return res.json({ user });
    } catch {
      return res.status(401).end();
    }
  }

  res.status(404).end();
}
