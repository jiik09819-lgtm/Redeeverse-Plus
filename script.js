const OWNER_CODE = "369369";
let editIndex = null;
let taps = 0;

// Triple tap
document.body.addEventListener("click",()=>{
  taps++;
  setTimeout(()=>taps=0,600);
  if(taps===3){
    document.getElementById("ownerPanel").classList.remove("hidden");
    taps=0;
  }
});

function closeOwner(){
  document.getElementById("ownerPanel").classList.add("hidden");
}

// Data
const defaultCodes=[
  {code:"WELCOMEFC25",reward:"Gold Pack",date:"10 Jan 2026",status:"Active"}
];

if(!localStorage.getItem("codes")){
  localStorage.setItem("codes",JSON.stringify(defaultCodes));
}

function getCodes(){
  return JSON.parse(localStorage.getItem("codes"));
}
function setCodes(c){
  localStorage.setItem("codes",JSON.stringify(c));
  render();
  adminList();
}

// Render public
function render(){
  const box=document.getElementById("codes");
  box.innerHTML="";
  getCodes().forEach(c=>{
    box.innerHTML+=`
      <div class="code">
        <b>${c.code}</b><br>
        ${c.reward}<br>
        ${c.date}<br>
        <span class="${c.status==="Active"?"active":"expired"}">${c.status}</span>
      </div>`;
  });
}
render();

// Owner unlock
function unlockOwner(){
  if(ownerCode.value===OWNER_CODE){
    lockBox.classList.add("hidden");
    adminBox.classList.remove("hidden");
    adminList();
  }else alert("Wrong Code");
}

// Save / Edit
function saveCode(){
  const codes=getCodes();
  const data={
    code:cCode.value,
    reward:cReward.value,
    date:cDate.value,
    status:cStatus.value
  };
  if(editIndex!==null){
    codes[editIndex]=data;
    editIndex=null;
  }else{
    codes.push(data);
  }
  setCodes(codes);
  cCode.value=cReward.value=cDate.value="";
}

// Admin list
function adminList(){
  const list=document.getElementById("adminList");
  list.innerHTML="";
  getCodes().forEach((c,i)=>{
    list.innerHTML+=`
      <div class="admin-item">
        <b>${c.code}</b> (${c.status})<br>
        <button onclick="editCode(${i})">Edit</button>
        <button onclick="toggle(${i})">Active/Expired</button>
        <button onclick="del(${i})">Delete</button>
      </div>`;
  });
}

function editCode(i){
  const c=getCodes()[i];
  cCode.value=c.code;
  cReward.value=c.reward;
  cDate.value=c.date;
  cStatus.value=c.status;
  editIndex=i;
}
function toggle(i){
  const c=getCodes();
  c[i].status=c[i].status==="Active"?"Expired":"Active";
  setCodes(c);
}
function del(i){
  const c=getCodes();
  c.splice(i,1);
  setCodes(c);
}