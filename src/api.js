const API_URL = "https://127.0.0.1:8585";

// const refreshAccessToken = async () => {
//   try {
//     const storedRefreshToken = localStorage.getItem("refreshToken");
//     const response = await fetch(`${API_URL}/refresh`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ refreshToken: storedRefreshToken }),
//     });

//     if (!response.ok) throw new Error("Failed to refresh token");
//     const data = await response.json();
//     setAccessToken(data.accessToken);
//   } catch (error) {
//     console.error("Token refresh failed:", error);
//     handleLogout(); // در صورت شکست در Refresh، کاربر را لاگ‌اوت کنید
//   }
// };

export const loginToServer = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      console.error("Login failed:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Login successful, received token:", data);
    return data; // فرض می‌کنیم سرور یک توکن JWT بازمی‌گرداند
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

export const fetchBooksFromServer = async (accessToken, title, description) => {
  try {
    const response = await fetch(`${API_URL}/getall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // ارسال توکن
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    console.log("Books fetched infetchBooksFromServer :", data.success);
    return data.success; // فرض بر این است که لیست کتاب‌ها در `success` بازگردانده می‌شود
  } catch (error) {
    console.error("Error in fetchBooksFrom   Server:", error);
    throw error;
  }
};

export const addBookToServer = async (title, description, accessToken) => {
  console.log("Adding to...");
  try {
    const response = await fetch(`${API_URL}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // ارسال توکن
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      console.error("Failed to add book:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Book added successfully:", data.success);
    return data.success; // فقط شیء کتاب برگردانده شود  } catch (error) {
  } catch (error) {
    console.error("Error in addBookToServer:", error);
    throw error;
  }
};

// addBook: ارسال درخواست POST برای افزودن کتاب جدید.//-
// Function to add a new book//+
export const deleteBookFromServer = async (id, accessToken) => {
  try {
    const response = await fetch(`${API_URL}/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`, // ارسال توکن
      },
    });
    if (!response.ok) {
      console.error("Failed to delete book:", response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Book deleted successfully");
  } catch (error) {
    console.error("Error in deleteBookFromServer:", error);
    throw error;
  }
};

// deleteBook: ارسال درخواست DELETE برای حذف یک کتاب خاص.//-
// Function to delete a book//+
