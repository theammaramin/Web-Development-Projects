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

const form = document.getElementById("signupform");
const email_1 = document.getElementById("l-email");
const password = document.getElementById("l-password");
const id_1 = document.getElementById("l-id");
const name_1 = document.getElementById("l-name");


form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data, error } = await _supabase.auth.signUp({
    email: email_1.value,
    password: password.value,
  });
  if (error) {
    alert(error);
    console.log(error);
  } else {
    givedata();
  }
});

const givedata = async()=>{
  const { data, error } = await _supabase
  .from('customer')
  .insert([
    { id: id_1.value, Name: name_1.value, email: email_1.value },
  ]);
  if (error) {
    alert("Constraint Violation Detected, Record Not Created!");
    window.location.href = "/signup.html";
    console.log(error);
  } else {
    window.location.href = "/login.html";
  }
}

// login sign up k bd kuch time k lie local storage key bnegi jo k auth or further redirection k lie use hgi
console.log(localStorage.getItem("sb-phcqlqeulzgsscopezkr-auth-token"));