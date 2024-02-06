let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algorithm");
let speed = document.getElementById("speed"); //sleep to show steps in ms
let minRange = 1;
let maxRange = 10000;
let numOfBars = 0; // bars[slidervalue]  
let heightFactor = 10;
let speedFactor = 100;
let n=0;
let unsorted_array = new Array(numOfBars);
let upload = document.getElementById("upload");


var myarr;
let lowest=100000;
let highest=0;


function digits_count(n) {
  var count = 0;
  if (n >= 1) ++count;

  while (n / 10 >= 1) {
    n /= 10;
    ++count;
  }

  return count;
}



speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});  // 100 default value if fast seleceted it will be overwritten by 50

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  } 
  return array;
    
  }

  

// Document control
document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});// wait until contents are loaded from html


//////////////////////////////////////////////////////////////////////////////////////////////

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    //putting bar in container.
    bars_container.appendChild(bar);
  }
}
////////////////////////////////  FILING   /////////////////////////////////////////////////////////////
upload.addEventListener('change', ()=>{
  //initialize file reader
  let fr = new FileReader();
  
  fr.readAsText(upload.files[0]);
  
  fr.onload=function(){
    //outputbox.innerHTML = fr.result;
    myarr = fr.result.split(" ");
    console.log(myarr);
    for(let i=0;i<myarr.length;i++){
      console.log(myarr[i]);
      
      if (myarr[i] < lowest) {
        lowest=myarr[i];
      } else if(myarr[i]> highest){
        highest=myarr[i];
      }



// putting elements in unsorted
      unsorted_array.push(parseFloat(myarr[i]));
      n++;
      console.log('size of n:', n); 
      // bars_container.innerHTML += unsorted_array[i];
      // bars_container.innerHTML += ','; 
    }

    numOfBars=n;
    maxRange=n;
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
  };
  console.log("size of n:", n);
})

////////////////////////////////////////////////////////////////////////////////////////
randomize_array.addEventListener("click", function () {
  // unsorted_array = createRandomArray();
  let unsorted_array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    unsorted_array[i] = randomNum(minRange, maxRange);
  
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
}});
////////////////////////////////////////////////////////////////////////////////////////////////////
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

////////////////////////////////////////BUBBLE SORT/////////////////////////////////////////////////////
async function bblSort(arr){

  let tc=arr.length * arr.length;
  alert("Time Complexity: "+ tc + " Space Complexity o(1)");
  
  let bars = document.getElementsByClassName("bar");
  console.log(bars);
  for(var i = 0; i < arr.length; i++){
    console.log(i);
     for(var j = 0; j < ( arr.length - i -1 ); j++){
       console.log(j);
      // Checking if the item at present iteration
      // is greater than the next iteration
      if(arr[j] > arr[j+1]){
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "purple";
          }
        }
         
        // If the condition is true then swap them
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j+1] = temp;

        bars[j].style.height = arr[j] * heightFactor + "px";
        bars[j].style.backgroundColor = "green";
        //bars[j].innerText = array[j];
        bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "green";
        await sleep(speedFactor);
      }
    }
  }}






//"async" alows "await" keyword in function body that allows program to wait until promise is unwrapped
///////////////////////////////////////////////////INSERTION SORT//////////////////////////////////////////////////////


async function InSort (arr) {
  let bars = document.getElementsByClassName("bar");
  let tc=arr.length * arr.length;
  alert("Time Complexity: "+ tc + " Space Complexity o(1)");

  for (let i = 1; i < arr.length; i++) {
    // First, choose the element at index 1
    let current = arr[i];
    let j;

    // Loop from right to left, starting from i-1 to index 0
    for (j = i - 1; j >= 0 && arr[j] > current; j--) {
      // as long as arr[j] is bigger than current
      // move arr[j] to the right at arr[j + 1]
      arr[j + 1] = arr[j];
      bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "green";
      await sleep(speedFactor);
      for (let k = 0; k < bars.length; k++) {
        if (k != j + 1) {
          bars[k].style.backgroundColor = "purple";
        }
      }
    }
    // Place the current element at index 0
    // or next to the smaller element
    arr[j + 1] = current;
    bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
    bars[j + 1].style.backgroundColor = "green";
    //bars[j + 1].innerText = array[j + 1];
    await sleep(speedFactor);
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "purple";
  }
  console.log(arr);
  return arr;
}

/////////////////////////////////////////COUNT SORT///////////////////////////////////////////////////
async function CountSort(arr){
   highest = Math.max.apply(Math, arr);
   lowest = Math.min.apply(Math, arr);
  
  let bars = document.getElementsByClassName('bar');
  var range = highest - lowest + 1;
  var count = Array.from({length: range}, (_, i) => 0);
  var temp = Array.from({length: arr.length}, (_, i) => 0);
  
  let tc=range + arr.length;
  alert("Time Complexity: "+ tc + " Space Complexity o(" + tc + ")");
  let height = Array.from({length: arr.length}, (_, i) => 0);
  
  for (let i = 0; i < arr.length; i++) {
    bars[i].style.backgroundColor = "purple";
    await sleep(speedFactor);
    count[arr[i] - lowest]++;
    bars[i].style.backgroundColor = "blue";

  }
  
  
  for (let j = 1; j < count.length; j++) {
      count[j] += count[j - 1];
  }
  
  for (let x = arr.length - 1; x >= 0; x--) {
      temp[count[arr[x] - lowest] - 1] = arr[x];
      height[count[arr[x] - lowest] - 1] = bars[x].style.height;
      count[arr[x] - lowest]--;
  }
  
  for (let y = 0; y < arr.length; y++) {
      arr[y] = temp[y];
      bars[y].style.backgroundColor = "green";
      bars[y].style.height = arr[y] * heightFactor + "px";
      await sleep(speedFactor);
      
  }
  console.log(arr);

  }
///////////////////////////////////////RADIX SORT//////////////////////////////////////////////////////////////

// A function to do counting sort of arr[] according to
    // the digit represented by exp.


    
    async function counting(arr,n,exp)
    {
        let bars = document.getElementsByClassName("bar");
        let output = new Array(n);
        let height = new Array(n);
       
        let count = new Array(10);
        for( i=0;i<10;i++)
        {
            count[i]=0;
        }
    
        for ( let i = 0; i < n; i++)
        {
            bars[i].style.backgroundColor = "purple";
            await sleep(speedFactor);
            count[Math.floor(arr[i] / exp) % 10]++;
            bars[i].style.backgroundColor = "blue";
            bars[i].style.height = count[i] * heightFactor + "px";
        }
    
        for (let i = 1; i < 10; i++)
        {
            count[i] += count[i - 1];
            bars[i].style.height = count[i] * heightFactor + "px";
        }
    
        for (let i = n - 1; i >= 0; i--)
        {
            output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
            height[count[Math.floor(arr[i] / exp) % 10] - 1] = bars[i].style.height;
            count[Math.floor(arr[i] / exp) % 10]--;
        }
    
        for (let i = 0; i < n; i++)
        {
          arr[i] = output[i];
        }
        await sleep(speedFactor);
    }


    
    async function radixSort(arr)
    {
    
      let bars = document.getElementsByClassName("bar");
        let highest = Math.max.apply(Math, arr); // maximum function from MATH library
        for(let exp=1; Math.floor(highest/exp) > 0; exp*=10) // break number into  digits
        {
             await counting(arr,arr.length, exp);  //count sort on digits
            
        }
        for(let i=0;i<arr.length;i++){
            bars[i].style.backgroundColor = "green";
            bars[i].style.height = arr[i] * heightFactor + "px";
          }

//////////////////////////////////////////////////////////////////////////////////
let e=digits_count(arr[arr.length-1]);
let tc= e*(arr.length+10);
e=(arr.length+2)*e;
alert("Time Complexity:"+ tc+ " space complexity o(" +e+ ")");

////////////////////////////////////////////////////////////////////////////////


        console.log(arr);
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////










////////////////////////////////////////////QUICK SORT///////////////////////////////////////////////////////
async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].style.backgroundColor = "green";
  //bars[leftIndex].innerText = items[leftIndex];
  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].style.backgroundColor = "green";
  //bars[rightIndex].innerText = items[rightIndex];
  await sleep(speedFactor);
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "deeppink";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "blue";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "blue";
  }
  return items;
}

//////////////////////////////////////HEAP SORT////////////////////////////////////////////////////////////
//write heap sort function

async function HeapSort(array) {

  let tc = array.length * Math.log(array.length);
  alert("Time Complexity: "+tc+ " Space Complexity o(1)");

  let bars = document.getElementsByClassName("bar");
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
    await heapify(array, array.length, i);
  }
  for (let i = array.length - 1; i >= 0; i--) {
    await swap(array, 0, i, bars);
    await heapify(array, i, 0);
  }
  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "blue";
    await sleep(speedFactor);
  }

  return array;
}

async function heapify(array, n, i) {
  let bars = document.getElementsByClassName("bar");
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && array[left] > array[largest]) {
    largest = left;
  }
  if (right < n && array[right] > array[largest]) {
    largest = right;
  }
  if (largest != i) {
    await swap(array, i, largest, bars);
    await heapify(array, n, largest);
  }
}

async function swap(array, i, j, bars) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
  bars[i].style.height = array[i] * heightFactor + "px";
  bars[j].style.height = array[j] * heightFactor + "px";
  bars[i].style.backgroundColor = "deeppink";
  bars[j].style.backgroundColor = "deeppink";
  await sleep(speedFactor);

  for (let k = 0; k < bars.length; k++) {
    if (k != i && k != j) {
      bars[k].style.backgroundColor = "blue";
    }
  }
  return array;
}
//////////////////////////////////////////////MERGE SORT/////////////////////////////////////////////////////////
//write mergeSort function
async function mergeSort(arr) {
  let bars = document.getElementsByClassName("bar");
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  let actualHalf = await mergeSort(left);
  await mergeSort(right);

  let i = 0;
  let j = 0;
  let k = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
      
    } else {
      arr[k] = right[j];
      j++;
    }
    // right side
   

    //visualize it for right and left side
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "blue";
    if (k + arr.length < bars.length) {
      bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
      console.log(arr[k] * heightFactor);
      bars[k + arr.length].style.backgroundColor = "green";
    }
    await sleep(speedFactor);
   

    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "blue";
    await sleep(speedFactor);
    i++;
    k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.height = arr[k] * heightFactor + "px";
    bars[k].style.backgroundColor = "blue";
    await sleep(speedFactor);
    j++;
    k++;
  }

  for (let k = 0; k < bars.length; k++) {
    bars[k].style.backgroundColor = "blue";
  }

  return arr;
}

function mergeSortD(arr, start, end) {
  if (arr.length < 2) {
    return arr;
  }

  let middle = Math.floor((start + end) / 2);
  let left = arr.slice(start, middle);
  let right = arr.slice(middle, end);

  //mergeSort(left);
  mergeSort(right);
}

////////////////////////////////////7.4.5 FROM BOOK////////////////////////////////////////////////////

async function advquicksort(arr,low,high)
{
    while(low<high)
    {
        if(high-low+1 < parseInt(arr.length/2))
        {
            await advquickinsertion(arr,low,high); //SUB ARRAY INSERTION SORT
            break;
        }
        else
        {
            var pi = await advquickpartition(arr,low,high);  //PARTIONING
            if(pi-low < high-pi)
            {
                await advquicksort(arr,low,pi-1); //RECURSION
                low = pi+1;
            }
            else
            {
                await advquicksort(arr,pi+1,high); //RECURSION
                high = pi-1;
            }
        }
    }
}
async function advquickinsertion(arr,low,high)
{
    let bars = document.getElementsByClassName("bar");
    var val, j, height;
    if(low-1>=0)
        bars[low-1].style.backgroundColor = "purple";
    bars[low].style.backgroundColor = "green";
    for(var i=low+1;i<=high;i++)
    {
        height = bars[i].style.height;
        bars[i].style.backgroundColor = "darkgoldenrod";
        val = arr[i];
        j = i-1;

        await sleep(speedFactor);

        while(j>=low && arr[j]>val)
        {
            bars[j].style.backgroundColor = "darkgoldenrod";
            bars[j+1].style.height = bars[j].style.height;
            
            arr[j+1] = arr[j];
            j--;

            await sleep(speedFactor);

            for(var k=i;k>=low;k--)
                bars[k].style.backgroundColor = "green";
        }
        arr[j+1] = val;
        bars[j+1].style.height = height;
        
        await sleep(speedFactor);
        bars[i].style.backgroundColor = "green";
    }
    if(low-1>=0)
        bars[low-1].style.backgroundColor = "green";
}
async function advquickpartition(arr,low,high)
{
    let bars = document.getElementsByClassName("bar");
    var val, pivot = arr[high];
    bars[high].style.backgroundColor = "white";
    var i=low-1, height, label;

    for(j=low;j<=high-1;j++)
    {
        bars[j].style.backgroundColor = "deeppink";

        await sleep(speedFactor);

        if(arr[j]<pivot)
        {
            i++;

            height = bars[i].style.height;
            bars[i].style.height = bars[j].style.height;
            bars[j].style.height = height;

    
            val = arr[i];
            arr[i] = arr[j];
            arr[j] = val;

            bars[i].style.backgroundColor = "gray";
            if(i!=j)
                bars[j].style.backgroundColor = "blue";

            await sleep(speedFactor);
        }
        else
            bars[j].style.backgroundColor = "blue";
    }
    i++;

    val = arr[i];
    arr[i] = arr[high];
    arr[high] = val;

    height = bars[i].style.height;
    bars[i].style.height = bars[high].style.height;
    bars[high].style.height = height;
    bars[i].style.backgroundColor = "white";
    bars[high].style.backgroundColor = "blue";

    for(var k=0;k<=high;k++)
        bars[k].style.backgroundColor = "yellow";

    bars[i].style.backgroundColor = "white";
    
    await sleep(speedFactor);

    return i;
}

//////////////////////////////////////////8.2.4///////////////////////////////////////////////
async function invariant(arr){
  highest = Math.max.apply(Math, arr);
  lowest = Math.min.apply(Math, arr);
   
  

 
 let bars = document.getElementsByClassName('bar');
 var range = highest - lowest + 1;
 var count = Array.from({length: range}, (_, i) => 0);
 var temp = Array.from({length: arr.length}, (_, i) => 0);
 let tc=range + arr.length;
 alert("Time Complexity: "+ tc + " Space Complexity o(" + tc + ")");

 let ran=10; //range from 0 to 10
 
 let height = Array.from({length: arr.length}, (_, i) => 0);
 
 for (let i = 0; i < arr.length; i++) {
   bars[i].style.backgroundColor = "purple";
   await sleep(speedFactor);
   count[arr[i] - lowest]++;
   bars[i].style.backgroundColor = "blue";

 }
 
 
 for (let j = 1; j < count.length; j++) {
     count[j] += count[j - 1];
 }
 
 for (let x = arr.length - 1; x >= 0; x--) {
  if(x>ran){   
  temp[count[arr[x] - lowest] - 1] = arr[x];
     height[count[arr[x] - lowest] - 1] = bars[x].style.height;
     count[arr[x] - lowest]--;
 }}
 
 for (let y = 0; y < arr.length; y++) {
  if(y>ran){
     arr[y] = temp[y];
     bars[y].style.backgroundColor = "green";
     bars[y].style.height = arr[y] * heightFactor + "px";
     await sleep(speedFactor);
     
 }}
 console.log(arr);

 }




///////////////////////////////////////////////BUCKET SORT////////////////////////////////////////////////////////////////


async function bucketSort(arr,n)
{
  let highest = Math.max.apply(Math, unsorted_array);
  let lowest = Math.min.apply(Math, unsorted_array);
  let r = highest - lowest + 1;
  let tc=r+arr.length;
  alert("Time Complexity: "+tc+ " Space Complexity o("+ tc+")");  
  
  
  if (n <= 0)
            return;
   
        // 1) Create n empty buckets       
        let buckets = new Array(n);
   
        for (let i = 0; i < n; i++)
        {
            buckets[i] = [];
        }
   
        // 2) Put array elements in different buckets
        for (let i = 0; i < n; i++) {
            let idx = arr[i] * n;
            buckets[Math.floor(idx)].push(arr[i]);
        }
   
        // 3) Sort individual buckets
        for (let i = 0; i < n; i++) {
            buckets[i].sort(function(a,b){return a-b;});
        }

   
        // 4) Concatenate all buckets into arr[]
        let index = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                arr[index++] = buckets[i][j];
            }
        }
        for(var i = 0; i < arr.length; i++){
          console.log(i);
           for(var j = 0; j < ( arr.length - i -1 ); j++){
             console.log(j);
            // Checking if the item at present iteration
            // is greater than the next iteration
            if(arr[j] > arr[j+1]){
              for (let k = 0; k < bars.length; k++) {
                if (k !== j && k !== j + 1) {
                  bars[k].style.backgroundColor = "purple";
                }
              }
               
              // If the condition is true then swap them
              var temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j+1] = temp;
      
              bars[j].style.height = arr[j] * heightFactor + "px";
              bars[j].style.backgroundColor = "green";
              //bars[j].innerText = array[j];
              bars[j + 1].style.height = arr[j + 1] * heightFactor + "px";
              bars[j + 1].style.backgroundColor = "green";
              await sleep(speedFactor);
            }
          }
        }
        console.log(arr);
       

}



















//////////////////////////////DECISION Conditions///////////////////////////////////////
sort_btn.addEventListener("click", function () {
  //alert(number.value);
  console.log(numOfBars);
  if(algotouse=="bubble"){
  
    bblSort(unsorted_array);
    //alert("o(n^2)");
  } 
  else if(algotouse=="insertion"){
    InSort(unsorted_array);
  
  }
  else if(algotouse=="heap"){
    HeapSort(unsorted_array);
  
  }
  else if(algotouse=="merge"){
    let tc = unsorted_array.length * Math.log(unsorted_array.length);
    alert("Time Complexity: "+tc+ " Space Complexity o("+unsorted_array.length+")");
  

    mergeSort(unsorted_array);
  
  }
  else if(algotouse=="radix"){
    radixSort(unsorted_array);
  
  }
  else if(algotouse=="bucket"){
    bucketSort(unsorted_array,1);
  
  }
  else if(algotouse=="quick"){
    let tc= unsorted_array.length * Math.log(unsorted_array.length);
    alert("Time Complexity: "+ tc + "Space Complexity o("+ unsorted_array.length+")");
    quickSort(unsorted_array, 0, unsorted_array.length - 1);
  
  }
  else if(algotouse=="count"){
    CountSort(unsorted_array);
  }
  else if(algotouse=="adv"){
    let highest = Math.max.apply(Math, unsorted_array);
    let lowest = Math.min.apply(Math, unsorted_array);
    let r = highest - lowest + 1;
    let tc=unsorted_array.length * r + unsorted_array.length * Math.log(unsorted_array.length/r);
    alert("Time Complexity: "+tc+" Space Complexity: o("+tc+")");
    advquicksort(unsorted_array,0,unsorted_array.length-1);
  }

  else if(algotouse=="inv"){
    invariant(unsorted_array);
    //advquicksort(unsorted_array,0,unsorted_array.length-1);
  }
   else{
    InSort(unsorted_array);
  }
});

