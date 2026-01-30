import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;
if (!MONGO_URL) throw new Error("Missing MONGO_URL");

let cached = (global as any).mongoose;
if (!cached) cached = (global as any).mongoose = { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export const User =
  mongoose.models.User ||
  mongoose.model(
    "User",
    new mongoose.Schema({
      email: { type: String, unique: true },
      passwordHash: String,
      createdAt: { type: Date, default: Date.now },
    })
  );
