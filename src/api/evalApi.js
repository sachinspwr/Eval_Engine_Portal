import axios from "axios";
import { session } from "../hooks/useAuth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8085";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from sessionStorage on every request
apiClient.interceptors.request.use((config) => {
  const token = session.getToken();
  if (token) {
    config.headers["X-Access-Token"] = token;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error.response?.status === 403) {
      // Token invalid — clear session so next load triggers re-auth
      session.clearAll();
      throw new Error("Session expired. Please login again.");
    }
    throw error;
  }
);

export const registerUser = async (name, email) => {
  const response = await apiClient.post("/auth/register", { name, email });
  return {
    ...response.data.data,
    statusCode: response.data.statusCode,
    success: response.data.success,
    message: response.data.message,
  };
};

export const getClientByEmail = async (email) => {
  const response = await apiClient.get(
    `/auth/client?email=${encodeURIComponent(email)}`
  );
  return {
    ...response.data.data,
    statusCode: response.data.statusCode,
    success: response.data.success,
    message: response.data.message,
  };
};

export const getUserProfile = async () => {
  const email = session.getEmail();
  if (email) return getClientByEmail(email);
  throw new Error("No session found");
};

export const evaluateQuestion = async (questionData) => {
  const response = await apiClient.post("/api/eval/question", questionData);
  return response.data.data || response.data;
};

export const evaluateText = async (textData) => {
  const response = await apiClient.post("/api/eval/text", textData);
  return response.data.data || response.data;
};

export const evaluateTest = async (testData) => {
  const response = await apiClient.post("/api/eval/test", testData);
  return response.data.data || response.data;
};

export default apiClient;
