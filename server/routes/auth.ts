import { Router } from "express";
import bcrypt = require("bcryptjs");
import jwt = require("jsonwebtoken");
import User from "../models/User";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: "EMAIL_EXISTS" });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, passwordHash });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
  res.json({ token, user: { id: user._id, email } });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
  res.json({ token, user: { id: user._id, email } });
});

router.get("/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).end();

  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const user = await User.findById(payload.id).select("email");
    res.json({ user });
  } catch {
    res.status(401).end();
  }
});

export default router;
