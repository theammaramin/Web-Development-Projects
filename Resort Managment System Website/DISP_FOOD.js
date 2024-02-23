const { createClient } = supabase;
export const _supabase = createClient(
"https://wfcatllafqlnnuuxrvvn.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY2F0bGxhZnFsbm51dXhydnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU4NjIyMzksImV4cCI6MTk4MTQzODIzOX0.RX9JCM1IJItrruGLAKGNPBaK3h2NyPlj-DAotVaIqvs",
);
const key=localStorage.key(0); 
if (key!=null){
window.onload = async function() {  
  const token_details= JSON.parse(localStorage.getItem(key)); 
  const user_details= token_details.user.email;  
  var input_dish;
  var input_qty, temp_qty, new_qty;
  
  const disp_stock = async()=>{
    const { data, error } = await _supabase.from("food_stock").select("item_name,Qty");  
    console.table(data);
    document.getElementById("disp_milk").innerHTML = data[0].Qty; 
    document.getElementById("disp_eggs").innerHTML = data[1].Qty; 
    document.getElementById("disp_meat").innerHTML = data[2].Qty; 
    document.getElementById("disp_chicken").innerHTML =data[3].Qty; 
    document.getElementById("disp_ice_cream").innerHTML = data[4].Qty;
    document.getElementById("disp_tomatoe").innerHTML = data[5].Qty;
    document.getElementById("disp_onion").innerHTML = data[6].Qty;
    document.getElementById("disp_cheese").innerHTML =data[7].Qty;
    if (error) {
        alert("Unable to fetch, try again");
        console.log(error);
    }
  }

  const upd_food_stock = async()=>{
    const { data, error } = await _supabase
    .from("food_stock")
    .update({ "Qty": new_qty})
    .eq('item_name', input_dish);
    if (error) {
      alert("Not Updated, Try Again...");
      window.location.href = "/chef.html";
      console.log(error);
    } else {
        alert("Stock Updated!");
    }
  }

  const fetch_dish_qty = async()=>{
    const { data, error } = await _supabase
    .from("food_stock")
    .select("Qty")
    .eq("item_name",input_dish);  
    temp_qty=data[0].Qty;
    new_qty=temp_qty-input_qty;
    if (error) {
        alert("Unable to fetch, try again");
        console.log(error);
    } else {
        upd_food_stock();
    }
  }


  function input_dish_qty() {
    let text;
    input_dish = prompt("Please enter a valid dish:");
    if (input_dish == null || input_dish == "") {
      text = "User cancelled the prompt.";
    } 
    input_qty = prompt("Please enter a valid Qty required:");
    if (input_qty == null || input_qty == "") {
      text = "User cancelled the prompt.";
    }
    if (input_qty != null && input_dish !=null){
        fetch_dish_qty();
    } 
  }

const order_inventory = document.getElementById("order");
order_inventory.addEventListener('click',() => {    
  input_dish_qty();
});

const logout = document.getElementById("logout_btn");
logout.addEventListener("click", async (e) => {
  e.preventDefault();
  const { error } = await _supabase.auth.signOut();
  if (error) {
    alert(error);
    console.log(error);
  } 
  else {
    window.location.href = "/login.html";
  }
});

  disp_stock();
}}