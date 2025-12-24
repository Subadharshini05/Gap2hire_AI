import express from "express";
import cors from "cors";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

// ✅ MUST
app.use(cors());
app.use(express.json());

// ✅ Route mount (IMPORTANT)
app.use("/api/resume", resumeRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Gap2Hire backend running");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
