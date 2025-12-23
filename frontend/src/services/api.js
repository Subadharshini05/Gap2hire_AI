import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const analyzeResume = (text) =>
  API.post("/api/analyze", { text });
