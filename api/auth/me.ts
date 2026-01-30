import type { VercelRequest, VercelResponse } from "@vercel/node";
import jwt from "jsonwebtoken";
import { connectDB, User } from "../_db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "UNAUTHORIZED" });
    }

    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    await connectDB();

    const user = await User.findById(payload.id).select("email");
    if (!user) {
      return res.status(401).json({ error: "USER_NOT_FOUND" });
    }

    return res.status(200).json({
      user: { email: user.email },
    });
  } catch (err) {
    console.error("ME ERROR:", err);
    return res.status(401).json({ error: "INVALID_TOKEN" });
  }
}
