const API_URL = "http://127.0.0.1:8000";


// ==========================================
// Register User
// ==========================================

export const registerUser = async ({
  full_name,
  username,
  email,
  password,
}) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/register`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          full_name,
          username,
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Registration failed"
      );
    }

    storeAuthData(data);

    return data;

  } catch (error) {

    console.error(
      "❌ Registration Error:",
      error
    );

    throw error;
  }
};


// ==========================================
// Login User
// ==========================================

export const loginUser = async ({
  email,
  password,
}) => {
  try {
    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.detail || "Login failed"
      );
    }

    storeAuthData(data);

    return data;

  } catch (error) {

    console.error(
      "❌ Login Error:",
      error
    );

    throw error;
  }
};


// ==========================================
// Store Authentication Data
// ==========================================

const storeAuthData = (data) => {

  if (!data?.access_token) {
    throw new Error(
      "Access token was not returned by server"
    );
  }

  if (!data?.user) {
    throw new Error(
      "User data was not returned by server"
    );
  }


  // ==========================================
  // Clear Previous Authentication Data
  // ==========================================

  localStorage.removeItem(
    "access_token"
  );

  localStorage.removeItem(
    "user_id"
  );

  localStorage.removeItem(
    "username"
  );

  localStorage.removeItem(
    "user"
  );


  // ==========================================
  // Store New Authentication Data
  // ==========================================

  localStorage.setItem(
    "access_token",
    data.access_token
  );

  localStorage.setItem(
    "user_id",
    data.user.id
  );

  localStorage.setItem(
    "username",
    data.user.username
  );

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

};


// ==========================================
// Get Access Token
// ==========================================

export const getAccessToken = () => {

  return localStorage.getItem(
    "access_token"
  );
};


// ==========================================
// Get Current User
// ==========================================

export const getStoredUser = () => {

  const user =
    localStorage.getItem("user");

  if (!user) {
    return null;
  }

  try {

    return JSON.parse(user);

  } catch (error) {

    console.error(
      "❌ Failed to parse stored user:",
      error
    );

    return null;
  }
};


// ==========================================
// Logout
// ==========================================

export const logoutUser = () => {

  localStorage.removeItem(
    "access_token"
  );

  localStorage.removeItem(
    "user_id"
  );

  localStorage.removeItem(
    "username"
  );

  localStorage.removeItem(
    "user"
  );

};


// ==========================================
// Check Authentication
// ==========================================

export const isAuthenticated = () => {

  return Boolean(
    localStorage.getItem(
      "access_token"
    )
  );
};