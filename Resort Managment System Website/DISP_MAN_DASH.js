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
  var entity,customer_id;
  var item_name_input,new_stock;
  var input_emp;
  var emp_id,emp_fname,emp_email,emp_role,emp_sal;
  var emp_col,emp_new;
  var status;
  var curr_wall,new_wallet,Amount;


function entity_custid() {
  let text;
  entity = prompt("Please enter a valid relation/entity:");
  if (entity == null || entity == "") {
    text = "User cancelled the prompt.";
  } 
  customer_id = prompt("Please enter a valid Customer ID:");
  if (customer_id == null || customer_id == "") {
    text = "User cancelled the prompt.";
  } 
}

const disp_stock = async()=>{
  const { data, error } = await _supabase.from("food_stock").select("item_name,Qty");  
  console.table(data);
  document.getElementById("disp_milk").innerHTML = "Item name is "+data[0].item_name+" and its Qty: "+data[0].Qty; if (data[0].Qty<30) {document.getElementById("disp_milk").innerHTML = "Item name is "+data[0].item_name+" and its Qty: "+data[0].Qty+" (Restock Recommended)";}
  document.getElementById("disp_eggs").innerHTML = "Item name is "+data[1].item_name+" and its Qty: "+data[1].Qty; if (data[1].Qty<30) {document.getElementById("disp_eggs").innerHTML = "Item name is "+data[1].item_name+" and its Qty: "+data[1].Qty+" (Restock Recommended)";}
  document.getElementById("disp_meat").innerHTML = "Item name is "+data[2].item_name+" and its Qty: "+data[2].Qty; if (data[2].Qty<30) {document.getElementById("disp_meat").innerHTML = "Item name is "+data[2].item_name+" and its Qty: "+data[2].Qty+" (Restock Recommended)";}
  document.getElementById("disp_chicken").innerHTML = "Item name is "+data[3].item_name+" and its Qty: "+data[3].Qty; if (data[3].Qty<30) {document.getElementById("disp_chicken").innerHTML = "Item name is "+data[3].item_name+" and its Qty: "+data[3].Qty+" (Restock Recommended)";}
  document.getElementById("disp_ice_cream").innerHTML = "Item name is "+data[4].item_name+" and its Qty: "+data[4].Qty; if (data[4].Qty<30) {document.getElementById("disp_ice_cream").innerHTML = "Item name is "+data[4].item_name+" and its Qty: "+data[4].Qty+" (Restock Recommended)";}
  document.getElementById("disp_tomatoe").innerHTML = "Item name is "+data[5].item_name+" and its Qty: "+data[5].Qty; if (data[5].Qty<30) {document.getElementById("disp_tomatoe").innerHTML = "Item name is "+data[5].item_name+" and its Qty: "+data[5].Qty+" (Restock Recommended)";}
  document.getElementById("disp_onion").innerHTML = "Item name is "+data[6].item_name+" and its Qty: "+data[6].Qty; if (data[6].Qty<30) {document.getElementById("disp_onion").innerHTML = "Item name is "+data[6].item_name+" and its Qty: "+data[6].Qty+" (Restock Recommended)";}
  document.getElementById("disp_cheese").innerHTML = "Item name is "+data[7].item_name+" and its Qty: "+data[7].Qty; if (data[7].Qty<30) {document.getElementById("disp_cheese").innerHTML = "Item name is "+data[7].item_name+" and its Qty: "+data[7].Qty+" (Restock Recommended)";}
  if (error) {
      alert("Unable to fetch, try again");
      console.log(error);
  }
}

const disp_comp = async()=>{
  const { data, error } = await _supabase.from('customer').select('id,complaint').neq('complaint', 0);
  document.getElementById("disp_complaints").innerHTML = JSON.stringify(data);
}

const upd_complaint = async()=>{
  customer_id=prompt("Enter Customer ID:");
  status=prompt("Enter Current Status Of The Complaint:");
  const { data, error } = await _supabase
  .from('customer')
  .update({ 'complaint_status': status})
  .eq('id', customer_id);
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/manager.html";
    console.log(error);
  } else {
      alert("Status Updated!");
  }
}

const upd_stock = async()=>{
  const { data, error } = await _supabase
  .from("food_stock")
  .update({ "Qty": new_stock})
  .eq('item_name', item_name_input);
  if (error) {
    alert("Not Updated, Try Again...");
    window.location.href = "/manager.html";
    console.log(error);
  } else {
      alert("Stock Updated!");
  }
}

const del_acc = async()=>{
  let cust_id=prompt("Enter Customer ID:");
  const { data, error } = await _supabase
  .from('customer')
  .delete()
  .eq('id', cust_id);
  if (error) {
    alert("Please Clear All Customer's Appointments First");
    window.location.href = "/manager.html";
    console.log(error);
  } else {
    alert("Account Deleted");
    window.location.href = "/manager.html";
  }
}

const delete_appointments = async()=>{
    entity_custid();
    const { data, error } = await _supabase
    .from(entity)
    .update({ Cust_id: 0})
    .eq('Cust_id', customer_id);
    if (error) {
      alert("Not Deleted, Try Again...");
      window.location.href = "/manager.html";
      console.log(error);
    } else {
        alert("Appointment Deleted!");
    }
  }

  const insert_emp = async()=>{
    emp_id=prompt("Enter ID:");
    emp_fname=prompt("Enter First Name:");
    emp_email=prompt("Enter email:");
    emp_role=prompt("Enter role of employee:");
    emp_sal=prompt("Enter salary of the employee:");
    const { data, error } = await _supabase
    .from('employee')
    .insert([
      {'id' : emp_id,
      'first_name' : emp_fname,
      'email' : emp_email,
      'role' : emp_role,
      'salary' : emp_sal,
      },
    ]);
    if (error) {
      alert("Not Inserted, Try Again...");
      console.log(error);
    } else {
        alert("Data Inserted!");
    }
  }

  const update_emp = async()=>{
    emp_id=prompt("Enter ID of the Employee:");
    emp_col=prompt("Enter attribute that needs to be updated:");
    emp_new=prompt("Enter new value:");

    if(emp_col=="salary"){
    const { data, error } = await _supabase
    .from('employee')
    .update({ salary: emp_new})
    .eq('id', emp_id);
    if (error) {
      alert("Not Updated, Try Again...");
      console.log(error);
    } else {
        alert("Employee Database Updated!");
    }
  }

  if(emp_col=="first_name"){
    const { data, error } = await _supabase
    .from('employee')
    .update({ first_name: emp_new})
    .eq('id', emp_id);
    if (error) {
      alert("Not Updated, Try Again...");
      console.log(error);
    } else {
        alert("Employee Database Updated!");
    }
  }

  if(emp_col=="email"){
    const { data, error } = await _supabase
    .from('employee')
    .update({ email: emp_new})
    .eq('id', emp_id);
    if (error) {
      alert("Not Updated, Try Again...");
      console.log(error);
    } else {
        alert("Employee Database Updated!");
    }
  }

  if(emp_col=="role"){
    const { data, error } = await _supabase
    .from('employee')
    .update({ role: emp_new})
    .eq('id', emp_id);
    if (error) {
      alert("Not Updated, Try Again...");
      console.log(error);
    } else {
        alert("Employee Database Updated!");
    }
  }
  }

  const delete_emp = async()=>{
    emp_id=prompt("Enter ID:");
    const { data, error } = await _supabase
    .from('employee')
    .delete()
    .eq('id',emp_id);
    if (error) {
      alert("Not Deleted, Try Again...");
      console.log(error);
    } else {
        alert("Data Deleted!");
    }
  }

const element_appoint = document.getElementById("delete_appointments");
element_appoint.addEventListener('click',() => {    
  delete_appointments();
});

const element_stock = document.getElementById("check_stock");
element_stock.addEventListener('click',() => {    
  disp_stock();
});

const element_updstock = document.getElementById("upd_stock");
element_updstock.addEventListener('click',() => {    
  let text;
  item_name_input = prompt("Please enter a item name:");
  if (item_name_input == null || item_name_input == "") {
    text = "User cancelled the prompt.";
  } 
  new_stock = prompt("Please enter updated stock:");
  if (new_stock == null || new_stock == "") {
    text = "User cancelled the prompt.";
  } 
  upd_stock();
});

const element_man_emp = document.getElementById("man_emp");
element_man_emp.addEventListener('click',() => {    
  document.getElementById("ins_emp").innerHTML = "1: Insert Employee";
  document.getElementById("upd_emp").innerHTML = "2: Update Employee";
  document.getElementById("del_emp").innerHTML = "3: Delete Employee";
  input_emp=prompt("Enter Selected Code:");
  if(input_emp==1){
    insert_emp();
  }
  if(input_emp==2){
    update_emp();
  }
  if(input_emp==3){
    delete_emp();
  }
  if(input_emp==null||input_emp==''){
    console.log("User cancelled the input prompt");
  }
});

const upd_cus_wallet = async()=>{
  console.log(curr_wall);
  const { data, error } = await _supabase
  .from('customer')
  .update({ 'wallet': new_wallet})
  .eq('id', customer_id);
  if (error) {
    alert("Not Updated, Try Again...");
    // window.location.href = "/manager.html";
    console.log(error);
  } else {
      alert("Wallet Updated!");
      customer_id=0;
  }
}

const fetch_wallet = async()=>{
  customer_id=prompt("Enter Customer ID:");
  const { data, error } = await _supabase.from('customer').select('wallet').eq('id', customer_id);
  curr_wall=data[0].wallet;
  input_emp=prompt("Enter Selected Code:");
  Amount=prompt("Enter Amount:");
  if(input_emp==1){
    new_wallet=parseInt(curr_wall)+parseInt(Amount);
  }
  if(input_emp==2){
    new_wallet=parseInt(curr_wall)-parseInt(Amount);
  }
  if(input_emp==null||input_emp==''){
    console.log("User cancelled the input prompt");
  }
  upd_cus_wallet();
}

const element_upd_wallet = document.getElementById("cus_wallet_btn");
element_upd_wallet.addEventListener('click',() => {    
  document.getElementById("add_wallet").innerHTML = "1: Add To Customer Wallet";
  document.getElementById("sub_wallet").innerHTML = "2: Subtract From Customer Wallet";
  fetch_wallet();
});

const element_read = document.getElementById("read_comp");
element_read.addEventListener('click',() => {    
  disp_comp();
});

const element_updcomp = document.getElementById("upd_comp");
element_updcomp.addEventListener('click',() => {    
  upd_complaint();
});

const element_del = document.getElementById("del_acc");
element_del.addEventListener('click',() => {    
  del_acc();
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

}}