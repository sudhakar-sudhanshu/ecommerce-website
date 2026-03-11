// src/utils/auth.js

// Save tokens
export const saveTokens = (tokens) => {
  localStorage.setItem("access", tokens.access);
  localStorage.setItem("refresh", tokens.refresh);
};

// Clear tokens (logout)
export const clearTokens = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

// Get access token
export const getAccessToken = () => {
  return localStorage.getItem("access");
};

// Authenticated fetch
export const authFetch = (url, options = {}) => {
  const token = getAccessToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
};
