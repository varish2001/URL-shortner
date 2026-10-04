import express from "express";
import { fileURLToPath } from "node:url";
import urlRoutes from "../routes/url.routes.js";
import urlModel from "../models/url.model.js";

const app = express();

app.use(express.json());
app.use(express.static(fileURLToPath(new URL("../../public", import.meta.url))));
app.use("/api/url", urlRoutes);

app.get("/:code", async (req, res) => {
  const { code } = req.params;

  const url = await urlModel.findOne({ shortCode: code });

  if (!url) {
    return res.status(404).json({ error: "URL not found" });
  }

  await urlModel.findOneAndUpdate(
    { shortCode: code },
    { $inc: { clicks: 1 } }
  );

  res.redirect(302, url.originalUrl);
});

export default app;