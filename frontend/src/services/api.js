import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const analyzeResume = (resumeText) => {
  return API.post("/resume/analyze", { resumeText });
};
