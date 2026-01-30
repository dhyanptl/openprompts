import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL!;
const JWT_SECRET = process.env.JWT_SECRET!;

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

const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({
      email: { type: String, unique: true },
      passwordHash: String,
      createdAt: { type: Date, default: Date.now },
    })
  );

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "GET") return res.status(405).end();

    const auth = req.headers.authorization;
    if (!auth) return res.status(401).end();

    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as any;

    await connectDB();
    const user = await User.findById(payload.id).select("email");

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).end();
  }
}
