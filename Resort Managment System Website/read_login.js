const { createClient } = supabase;

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-my-custom-header": "my-app-name" },
  },
};
// export allows k ap dsre files mai yeh createclient krskty ho!
export const _supabase = createClient(
  "https://wfcatllafqlnnuuxrvvn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY2F0bGxhZnFsbm51dXhydnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU4NjIyMzksImV4cCI6MTk4MTQzODIzOX0.RX9JCM1IJItrruGLAKGNPBaK3h2NyPlj-DAotVaIqvs",
  options
);

const loginForm = document.getElementById("loginform");
console.log(loginForm);
const loginEmail = document.getElementById("email");
const loginPassword = document.getElementById("password");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data, error } = await _supabase.auth.signInWithPassword({
    email: loginEmail.value,
    password: loginPassword.value,
  });
  if (error) {
    alert(error);
    console.log(error);
  } 
  else if ((loginEmail.value).substring(0, 4)=="chef") {
    window.location.href = "/chef.html";
  }
  else if ((loginEmail.value).slice(-8)=="@HTS.com") {
    window.location.href = "/manager.html";
  }
  else {
    window.location.href = "/dashboard.html";
  }
});

// login sign up k bd kuch time k lie local storage key bnegi jo k auth or further redirection k lie use hgi
console.log(localStorage.getItem("sb-phcqlqeulzgsscopezkr-auth-token"));