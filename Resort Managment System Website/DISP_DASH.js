const { createClient } = supabase;
export const _supabase = createClient(
"https://wfcatllafqlnnuuxrvvn.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmY2F0bGxhZnFsbm51dXhydnZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU4NjIyMzksImV4cCI6MTk4MTQzODIzOX0.RX9JCM1IJItrruGLAKGNPBaK3h2NyPlj-DAotVaIqvs",
);
const key=localStorage.key(0);  //gets token from local storage
if (key!=null){
window.onload = async function() {  //makes sure JS is loaded before DOM
  const token_details= JSON.parse(localStorage.getItem(key));  // now your token value makes sense, token is form user.auth which is further linked with your custom user table
  const user_details= token_details.user.email;  //user email from auth user table's token
  // const obj= await _supabase.from('id').select('Name').eq('email',user_details);  
  // query where id table and auth.user table is linked via EMAIL! for multiple selection use select('Name , email')
  // if(obj.error){
  //   console.log(error);
  // }
  // console.log(obj.data[0]);   //prints resultant data of query 
  // console.log(user_details);  //has email address of user
  // document.getElementById("l-name").innerHTML = obj.data;
var store;
var entity,entity_id;
var print_arr;
var selected,input_service;
var curr_bill;
var store_token;
var temp_alloc;
var wallet_temp;
var wallet_new;

  const fetchdata = async()=>{
  const { data, error } = await _supabase.from('customer').select('id,Name,bill,wallet').eq('email',user_details);  
  store = data[0].id;
  curr_bill=data[0].bill;
  wallet_temp=data[0].wallet;
  console.log(store);
  console.log(data[0].Name);
  document.getElementById("l-name").innerHTML = data[0].Name;
}

const print_empty = async()=>{
  const { data, error } = await _supabase.from(entity).select(entity_id).eq('Cust_id',0);  
  console.table(data);
  document.getElementById(print_arr).innerHTML = JSON.stringify(data);
  call_input();  
}

const check_availabilty = async()=>{
  const { data, error } = await _supabase
  .from(entity)
  .select('Cust_id')
  .eq(entity_id,selected);
  if(error){
    console.log(error);
  }  
  else if (data[0].Cust_id!=0){
    alert(entity_id+" "+selected+" already booked!");
  }
  else{
    upd_table();
  }
}

const insert_services = async()=>{
  const { data, error } = await _supabase
  .from('service')
  .insert([
    { token : store_token },
  ]); 
  if (error){
    alert("Not Inserted, Please Make Sure Token Isn't Already Registered");
    console.log(error);
  }
  else {
    upd_bill();
  }
}

function call_input() {
  let text;
  selected = prompt("Please enter selected "+entity+" ID:");
  if (selected == null || selected == "") {
    text = "User cancelled the prompt.";
  } else {
    check_availabilty();
  }
}

const upd_bill = async()=>{
  curr_bill=curr_bill+1000;
  console.log(curr_bill);
  const { data, error } = await _supabase
  .from('customer')
  .update({ bill: curr_bill})
  .eq('id', store);
  alert("Bill Updated!");
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/dashboard.html";
    console.log(error);
  }
}

const upd_table = async()=>{
  const { data, error } = await _supabase
  .from(entity)
  .update({ "Cust_id": store})
  .eq(entity_id, temp_alloc);
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/dashboard.html";
    console.log(error);
  } else {
    alert("Booked! "+temp_alloc+" is your "+entity+" id");
    temp_alloc=0;
    upd_bill();
  }
}

const upd_table_fetch = async()=>{
  const { data, error } = await _supabase
  .from(entity)
  .select(entity_id)
  .eq("Cust_id", 0)
  .limit(1);
  if (error) {
    console.log(error);
    alert(error);
  } else {
    if (entity=="car"){
      if(data[0]==null){
        alert("Sorry, all cars are booked at the moment.");
      }else{
      temp_alloc=data[0].car_id;}
    }
    else if (entity=="game"){
      if(data[0]==null){
        alert("Sorry, all games are booked at the moment.");
      }else{
      temp_alloc=data[0].game_id;}
    } 
    else if (entity=="gym"){
      if(data[0]==null){
        alert("Sorry, all gyms are booked at the moment.");
      }else{
      temp_alloc=data[0].gym_id;}
    }   
    else if (entity=="massage"){
      if(data[0]==null){
        alert("Sorry, all massages are booked at the moment.");
      }else{
      temp_alloc=data[0].massage_id;}
    }
    else if (entity=="pool"){
      if(data[0]==null){
        alert("Sorry, all pools are booked at the moment.");
      }else{
      temp_alloc=data[0].pool_id;}
    } 
    else if (entity=="room"){
      if(data[0]==null){
        alert("Sorry, all rooms are booked at the moment.");
      }else{
      temp_alloc=data[0].room_id;}
    }   
    else if (entity=="spa"){
      if(data[0]==null){
        alert("Sorry, all spas are booked at the moment.");
      }else{
      temp_alloc=data[0].spa_id;}
    }
    upd_table();
  }
}

const upd_bill_null = async()=>{
  const { data, error } = await _supabase
  .from('customer')
  .update({ 'bill': 0})
  .eq('id', store);
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/dashboard.html";
    console.log(error);
  } else {
    alert("Bill Paid Successfully!");
    curr_bill=0;
    wallet_new=0;
    wallet_temp=0;
  }
}

const upd_wallet_remain = async()=>{
  const { data, error } = await _supabase
  .from('customer')
  .update({ 'wallet': wallet_new})
  .eq('id', store);
  if (error) {
    alert("Insufficient Funds In The Wallet");
    window.location.href = "/dashboard.html";
    console.log(error);
  } else {
    upd_bill_null();
  }
}

const upd_table_complain = async()=>{
  const { data, error } = await _supabase
  .from('customer')
  .update({ 'complaint': submited_comp.value})
  .eq('id', store);
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/dashboard.html";
    console.log(error);
  } else {
    upd_table_complain_satus();
  }
}

const upd_table_complain_satus = async()=>{
  const { data, error } = await _supabase
  .from('customer')
  .update({ 'complaint_status': 0})
  .eq('id', store);
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/dashboard.html";
    console.log(error);
  } else {
    alert("Complain Registered");
  }
}

const element1 = document.getElementById("YES1");
element1.addEventListener('click',() => { 
  entity="room";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint1";  
  // print_empty();
  upd_table_fetch();
});

const element2 = document.getElementById("YES2");
element2.addEventListener('click',() => { 
  entity="spa";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint2";  
  // print_empty();
  upd_table_fetch();
});

const element3 = document.getElementById("YES3");
element3.addEventListener('click',() => { 
  entity="car";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint3";  
  // print_empty();
  upd_table_fetch();
});

const element4 = document.getElementById("YES4");
element4.addEventListener('click',() => { 
  entity="gym";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint4";  
  // print_empty();
  upd_table_fetch();
});

const element5 = document.getElementById("YES5");
element5.addEventListener('click',() => { 
  entity="pool";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint5";  
  // print_empty();
  upd_table_fetch();
});

const element6 = document.getElementById("YES6");
element6.addEventListener('click',() => { 
  entity="massage";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint6";  
  // print_empty();
  upd_table_fetch();
});

const element7 = document.getElementById("YES7");
element7.addEventListener('click',() => { 
  entity="game";
  entity_id=entity.concat("_id"); 
  print_arr="arrPrint7";  
  // print_empty();
  upd_table_fetch();
});

const element8 = document.getElementById("YES8");
element8.addEventListener('click',() => { 
  document.getElementById("Print_service_room").innerHTML = "R : Request Room Service";
  document.getElementById("Print_service_laundry").innerHTML = "L : Request Laundry Serivce";
  document.getElementById("Print_service_tour").innerHTML = "T : Request Tour Service";
  input_service=prompt("Enter The Requested Service Code:");
  if(input_service=="R" || input_service=="L" || input_service=="T"){
  store_token=input_service.concat("_"+store);
  alert("Registered, your service token is "+store_token);
  }
  else if (input_service == null || input_service == "") {
    console.log("user cancelled the input");
  }
  else if(input_service!="R" || input_service!="L" || input_service!="T"){
    alert("Invalid Input");
  }
  insert_services();
});

const submited_comp = document.getElementById("comp");
const element9 = document.getElementById("submit_comp");
element9.addEventListener('click',() => { 
  upd_table_complain();
});

const pay_bill = document.getElementById("pay_btn");
pay_bill.addEventListener('click',() => { 
  wallet_new=wallet_temp-curr_bill;
  upd_wallet_remain();
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

fetchdata();
}}