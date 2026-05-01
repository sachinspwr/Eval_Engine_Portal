// import axios from "axios";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8085";

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add token to requests if available
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers["X-Access-Token"] = token;
//   }
//   return config;
// });

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 429) {
//       throw new Error("Rate limit exceeded. Please try again later.");
//     }
//     if (error.response?.status === 403) {
//       throw new Error("Invalid or expired token.");
//     }
//     throw error;
//   },
// );

// export const registerUser = async (name, email) => {
//   const response = await apiClient.post("/auth/register", { name, email });
//   return response.data;
// };

// export const getUserProfile = async () => {
//   const response = await apiClient.get("/auth/profile");
//   return response.data;
// };

// export const evaluateQuestion = async (questionData) => {
//   const response = await apiClient.post("/api/eval/question", questionData);
//   return response.data;
// };

// export const evaluateText = async (textData) => {
//   const response = await apiClient.post("/api/eval/text", textData);
//   return response.data;
// };

// export const evaluateTest = async (testData) => {
//   const response = await apiClient.post("/api/eval/test", testData);
//   return response.data;
// };

// export default apiClient;

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8085";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers["X-Access-Token"] = token;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    if (error.response?.status === 403) {
      throw new Error("Invalid or expired token.");
    }
    throw error;
  },
);

// Auth endpoints
export const registerUser = async (name, email) => {
  const response = await apiClient.post("/auth/register", { name, email });
  return {
    ...response.data.data,
    statusCode: response.data.statusCode,
    success: response.data.success,
    message: response.data.message,
  };
};

// Get client/profile by email
export const getClientByEmail = async (email) => {
  const response = await apiClient.get(
    `/auth/client?email=${encodeURIComponent(email)}`,
  );
  return {
    ...response.data.data,
    statusCode: response.data.statusCode,
    success: response.data.success,
    message: response.data.message,
  };
};

// Get profile using stored token
export const getUserProfile = async () => {
  const email = localStorage.getItem("userEmail");
  if (email) {
    return getClientByEmail(email);
  }
  throw new Error("No email found");
};

// Evaluation endpoints
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
