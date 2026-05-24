var currentUser = null;

// =========================
// 🔐 LOGIN
// =========================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    document.getElementById("errorMsg").innerText = error.message;
  } else {
    window.location.href = "app.html";
  }
}

// =========================
// 📝 SIGNUP
// =========================
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    document.getElementById("errorMsg").innerText = error.message;
  } else {
    document.getElementById("errorMsg").style.color = "#22c55e";
    document.getElementById("errorMsg").innerText =
      "Account created! Redirecting to login...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  }
}

// =========================
// 🔁 FORGOT PASSWORD
// =========================
async function forgotPassword() {
  const email = document.getElementById("email").value;
  const msg = document.getElementById("errorMsg");

  if (!email) {
    msg.style.color = "#f87171";
    msg.innerText = "Please enter your email first.";
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  console.log("Password reset result:", error ? error : "success");

  if (error) {
    msg.style.color = "#f87171";
    msg.innerText = error.message;
  } else {
    msg.style.color = "#22c55e";
    msg.innerText = "Recovery email sent! Check your inbox.";
  }
}

// =========================
// 🚪 LOGOUT
// =========================
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

// =========================
// 🔒 REQUIRE AUTH
// =========================
async function requireAuth() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    window.location.href = "login.html";
    return;
  }

  currentUser = data.session.user;
}
