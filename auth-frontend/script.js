const API = "http://localhost:5000/api/auth";

// Register
async function register() {
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.msg || "Registered Successfully!");

  if (res.ok) location.href = "index.html";
}

// Login
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    location.href = "dashboard.html";
  } else {
    alert(data.msg || "Login Failed");
  }
}

// Get Users (Protected)
async function getUsers() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first!");
    location.href = "index.html";
    return;
  }

  try {
    const res = await fetch(`${API}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    const users = await res.json();
    const list = document.getElementById("userList");
    list.innerHTML = "";

    users.forEach(u => {
      list.innerHTML += `<li>${u.username} - ${u.email}</li>`;
    });
  } catch (err) {
    alert(err.message);
  }
}

// Logout
function logout() {
  localStorage.removeItem("token");
  location.href = "index.html";
}
