window.onload=function(){
    console.log("Onload function");
    updateList();
}
const arr=[];
// arr[0]={
//     id:11,
//     name:"Bibhuti",
//     profession:"Engg",
//     age:23
// }
// arr[1]={
//     id:12,
//     name:"Chandan",
//     profession:"Chef",
//     age:25
// }

let empId=1;

function addEmployee(event){

    const nameInput=document.getElementById('name');
    const professionInput=document.getElementById('profession');
    const ageInput=document.getElementById('age');

    const name=nameInput.value.trim();
    const profession=professionInput.value.trim();
    const age=ageInput.value.trim();

    console.log(name,profession,age);

    if(name ==='' || profession === '' || age === ''){
        //error
        displayMessage('Error:Please Make sure All the fields are filled before adding in an employee !','red');
        return;
    }
    //create employee object
    const employee={
        id: empId,
        name,
        profession,
        age: parseInt(age)
    }
    //adding employee to array
    arr.push(employee);
    empId++;

    //update in employee list
    updateList();

    //reset the value
    nameInput.value='';
    professionInput.value='';
    ageInput.value='';

    //success massage
    displayMessage('Sucess: Employee Added!','green')    
       
}

const empList=document.getElementById('list');

function updateList(){
    console.log("inside updateList function");
    empList.innerHTML='';
    const element=document.getElementById('empty');
    if(arr.length===0){
        element.innerHTML='You have 0 Employees.';
        element.style.color='rgb(80,80,80)';
        return;
    }
    element.innerHTML='';
    for(const employee of arr){
        const item=document.createElement('li');
        item.innerHTML = `
        <span>${employee.id}. &nbsp</span>
        <span> Name: ${employee.name}</span>
        <span>Profession: ${employee.profession}</span>
        <span>Age: ${employee.age}</span>
        <button class="delete-button" data-id="${employee.id}">Delete User</button>
        `;
        item.classList.add('item-border');


        const dltBtn=item.querySelector('.delete-button');
        dltBtn.addEventListener('click',()=>{
            deleteEmployee(employee.id);
        })

        empList.appendChild(item);
    }
}

function deleteEmployee(id){
    const index = arr.findIndex(employee => employee.id === id);
    if (index !== -1) {
        arr.splice(index, 1);
        updateList();
        displayMessage('Employee deleted successfully.', 'green');
    }
}

function displayMessage(msg, clr){
    const element=document.getElementById('msg');
    element.innerHTML=msg;
    element.style.color=clr;
    // document.body.appendChild(element);
    setTimeout(() => {
        element.innerHTML='';
    }, 2000);

}
// displayMessage("Sucess","green");

const submitButton=document.getElementById('submit');
submitButton.addEventListener('click',addEmployee);