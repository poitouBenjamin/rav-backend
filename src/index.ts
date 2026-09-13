import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

app.use(express.json({ limit: "100kb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  limit: 100, // 100 requests
  legacyHeaders: false,
});
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `🚀 Serveur démarré sur http://localhost:${process.env.PORT || 3000}`,
  );
});
