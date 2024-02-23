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
  var customer_id;
  var selected;
  var curr_bill;
  var entity,entity_id;
  var print_arr;
  var input_service_del;
  var curr_wallet;
  
const fetch_bill = async()=>{
    const { data, error } = await _supabase.from('customer').select('id,Name,bill,wallet').eq('email',user_details);  
    customer_id = data[0].id;
    curr_bill=data[0].bill;
    curr_wallet=data[0].wallet;
    document.getElementById("BILL").innerHTML = data[0].bill;
    document.getElementById("WALLET").innerHTML = data[0].wallet;
    fetch_empty_rooms();
    fetch_empty_spas();
    fetch_empty_cars();
    fetch_empty_gyms();
    fetch_empty_pools();
    fetch_empty_massages();
    fetch_empty_games();
    fetch_empty_services_R();
    fetch_empty_services_L();
    fetch_empty_services_T();
    fetch_complaint_status();
}

const fetch_complaint_status = async()=>{
  const { data, error } = await _supabase.from('customer').select('complaint_status').eq('id',customer_id); 
  console.log(data[0].complaint_status);
  if (data[0].complaint_status!=0){
  document.getElementById("status").innerHTML = data[0].complaint_status;
}
  else if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
  else {
    document.getElementById("status").innerHTML = "No Feedback";
  }
}
  
const fetch_empty_rooms = async()=>{
    const { data, error } = await _supabase.from("room").select("room_id").eq('Cust_id', customer_id);  
    console.table(data);
    document.getElementById("Rooms").innerHTML = JSON.stringify(data);
    if (error) {
        alert("Unable to fetch, Try Again");
        console.log(error);
    }
}

const fetch_empty_spas = async()=>{
  const { data, error } = await _supabase.from("spa").select("spa_id").eq('Cust_id', customer_id);  
  console.table(data);
  document.getElementById("Spas").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_cars = async()=>{
  const { data, error } = await _supabase.from("car").select("car_id").eq('Cust_id', customer_id);  
  console.table(data);
  document.getElementById("Cars").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_gyms = async()=>{
  const { data, error } = await _supabase.from("gym").select("gym_id").eq('Cust_id', customer_id);  
  console.table(data);
  document.getElementById("Gyms").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_pools = async()=>{
  const { data, error } = await _supabase.from("pool").select("pool_id").eq('Cust_id', customer_id);  
  console.table(data);
  document.getElementById("Pools").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_massages = async()=>{
  const { data, error } = await _supabase.from("massage").select("massage_id").eq('Cust_id', customer_id);  
  console.table(data);
  document.getElementById("Massages").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_games = async()=>{
  const { data, error } = await _supabase.from("game").select("game_id").eq('Cust_id', customer_id);  
  console.table(data);
  document.getElementById("Games").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_services_R = async()=>{
  const { data, error } = await _supabase.from("service").select("token").eq('token', "R_"+customer_id);  
  document.getElementById("Services_R").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_services_L = async()=>{
  const { data, error } = await _supabase.from("service").select("token").eq('token', "L_"+customer_id);  
  document.getElementById("Services_L").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const fetch_empty_services_T = async()=>{
  const { data, error } = await _supabase.from("service").select("token").eq('token', "T_"+customer_id);  
  document.getElementById("Services_T").innerHTML = JSON.stringify(data);
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
}

const check_cust_id = async()=>{
  entity_id=entity.concat("_id"); 
  const { data, error } = await _supabase
  .from(entity)
  .select("Cust_id")
  .eq(entity_id, selected);  
  if (error) {
      alert("Unable to fetch, Try Again");
      console.log(error);
  }
  else if(data[0].Cust_id!=customer_id){
    alert("ID mismatach!");
  }
  else{
    delete_data();
  }
}

function call_input() {
  let text;
  selected = prompt("Please enter selected " + entity + " ID:");
  if (selected == null || selected == "") {
    text = "User cancelled the prompt.";
  } else {
    check_cust_id();
  }
}

const delete_services = async()=>{
  const { data, error } = await _supabase
  .from("service")
  .delete()
  .eq("token", input_service_del.concat("_"+customer_id)); 
  if (error) {
      alert("Invalid Input");
  } else {
      upd_bill_deduct();
  }
}

const delete_data = async()=>{
    const { data, error } = await _supabase
    .from(entity)
    .update({ Cust_id: 0})
    .eq(entity.concat("_id"), selected); 
    if (error) {
        alert("Unable to delete, Try Again");
        console.log(error);
    } else {
        upd_bill_deduct();
    }
}

const upd_bill_deduct = async()=>{
    curr_bill=curr_bill-500;
    const { data, error } = await _supabase
    .from('customer')
    .update({ bill: curr_bill})
    .eq('id', customer_id);
    alert("Bill Updated!");
    if (error) {
      alert("Not Updated, Try Again...");
      window.location.href = "/curr_status.html";
      console.log(error);
    }
  }

const element_delroom = document.getElementById("delete_room");
element_delroom.addEventListener('click',() => { 
  entity="room";  
  call_input();
});

const element_delspa = document.getElementById("delete_spa");
element_delspa.addEventListener('click',() => {    
  entity="spa";  
  call_input();
});

const element_delcar = document.getElementById("delete_car");
element_delcar.addEventListener('click',() => {    
  entity="car";  
  call_input();
});

const element_delgym = document.getElementById("delete_gym");
element_delgym.addEventListener('click',() => {    
  entity="gym";  
  call_input();
});

const element_delpool = document.getElementById("delete_pool");
element_delpool.addEventListener('click',() => {    
  entity="pool";  
  call_input();
});

const element_delmassage = document.getElementById("delete_massage");
element_delmassage.addEventListener('click',() => {    
  entity="massage";  
  call_input();
});

const element_delgame = document.getElementById("delete_game");
element_delgame.addEventListener('click',() => {    
  entity="game";  
  call_input();
});

const element_delservice = document.getElementById("delete_service");
element_delservice.addEventListener('click',() => {   
  input_service_del=prompt("Enter Code Of Serivce:"); 
  delete_services();
});

fetch_bill();
}}