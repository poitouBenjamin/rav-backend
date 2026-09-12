import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `🚀 Serveur démarré sur http://localhost:${process.env.PORT || 3000}`,
  );
});
