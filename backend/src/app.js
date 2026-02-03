import cors from "cors";
import express from "express";
import aiRoutes from "./routes/aiRoutes.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Test route to verify server is working
app.get("/test", (req, res) => {
  res.send("TEST OK");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/attempts", attemptRoutes);

export default app;
