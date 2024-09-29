let nam=document.getElementById('name'),
    fatherName=document.getElementById('fatherName'),
    motherName=document.getElementById('motherName'),
    className =document.getElementById('className'),
    roll=document.getElementById('roll'); 
    dateOfBirth=document.getElementById('dateOfBirth'),
    address=document.getElementById('address'),
    phoneNo=document.getElementById('phoneNo'),
    allData=document.getElementById('allData'),
    imgInput=document.getElementById('imgInput'),
    defaultImage=document.querySelector('.img');


let  getData= localStorage.getItem('dataList') ? JSON.parse(localStorage.getItem('dataList')) : [];

let isEdit=false, editId;

function reset(){
    formData.reset();
    defaultImage.src="./image/Profile Icon.webp";
}

imgInput.onchange = function(){
    if(imgInput.files[0].size < 1000000){  // 1MB = 1000000
    var fileReader = new FileReader();
        fileReader.onload = function(e){
        imgUrl = e.target.result;
        console.log(imgUrl)
        defaultImage.src = imgUrl;
        console.log(defaultImage)
    }

    fileReader.readAsDataURL(imgInput.files[0])
}
else{
    alert("This file is too large!")
}
}

function showData(){
  
    allData.innerHTML="";
   
    getData.forEach((element,index) => {
       
        let createElement=`
        <tr >
                            <td>${index+1}</td>
                            <td> <img  src=${element.studentPhoto} alt=" " width="50" height="50"  style="background-size: cover;" ></td>
                            <td>${element.studentName}</td>
                            <td> ${element.studentFatherName}</td>
                            <td>${element.studentMotherName}</td>
                            <td>${element.studentClassName}</td>
                            <td>${element.studentRoll}</td>
                            <td>${element.studentDateOfBirth}</td>
                            <td>${element.studentAddress}</td>
                            <td>${element.studentPhoneNo}</td>
                            <td>
                              <button class="btn btn-success " data-bs-toggle="modal"   data-bs-target="#viewData"   onclick="viewData(${index},'${element.studentName}','${element.studentFatherName}','${element.studentMotherName}','${element.studentClassName}','${element.studentRoll}','${element.studentDateOfBirth}','${element.studentAddress}','${element.studentPhoneNo}','${element.studentPhoto}')"><i class="bi bi-eye tooltiptext "></i></button>
                              <button class="btn btn-primary "  data-bs-toggle="modal"  data-bs-target="#inputForm" onclick="editData(${index},'${element.studentName}','${element.studentFatherName}','${element.studentMotherName}','${element.studentClassName}','${element.studentRoll}','${element.studentDateOfBirth}','${element.studentAddress}','${element.studentPhoneNo}','${element.studentPhoto}')"><i class="bi bi-pencil-square "></i></button>
                              <button class="btn btn-danger" onclick="deleteData(${index})"><i class="bi bi-trash"></i></button>
                            </td>
                            </tr>
        
        `

        allData.innerHTML+=createElement;
       
       
        
    });
}
showData();

formData.addEventListener('submit',function(e){

    const data={
        studentName: nam.value,
        studentFatherName: fatherName.value,
        studentMotherName: motherName.value,
        studentClassName: className.value,
        studentRoll: roll.value,
        studentDateOfBirth: dateOfBirth.value,
        studentAddress: address.value,
        studentPhoneNo: phoneNo.value,
        studentPhoto: defaultImage.src==undefined? "./image/Profile Icon.webp" : defaultImage.src


    }
    

    if(!isEdit){
        getData.push(data);
    }
    else{
        isEdit=false;
        getData[editId]=data;
    }
    localStorage.setItem('dataList',JSON.stringify(getData));
    
    showData();
    formData.reset();
    defaultImage.src="./image/Profile Icon.webp" ;
    alert('Successful!');
})



function viewData(index,Name,FatherName,MotherName,ClassName,Roll,DateOfBirth,Address,PhoneNo,Photo){
     
    document.getElementById('viewImage').src=Photo;
    document.getElementById('viewName').innerText=Name;
    document.getElementById('viewFname').innerText=FatherName;
    console.log(document.getElementById('viewFname').innerText=FatherName)
    document.getElementById('viewMname').innerText=MotherName;
    document.getElementById('viewClass').innerText=ClassName;
    document.getElementById('viewRoll').innerText=Roll;
    document.getElementById('viewDate').innerText=DateOfBirth;
    document.getElementById('viewAddress').innerText=Address;
    document.getElementById('viewPno').innerText=PhoneNo;


}
function editData(index,Name,FatherName,MotherName,ClassName,Roll,DateOfBirth,Address,PhoneNo,Photo){
    
    isEdit=true;
    editId=index;

    console.log('studentName');
    nam.value=Name;
    console.log(Name);
    fatherName.value=FatherName;
    motherName.value=MotherName;
    className.value=ClassName;
    roll.value=Roll;
    dateOfBirth.value=DateOfBirth;
    address.value=Address;
    phoneNo.value=PhoneNo;
    defaultImage.src=Photo;

    




}


function deleteData(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index,1);
        localStorage.setItem('dataList',JSON.stringify(getData));
        showData();

    }
    else{
        alert('Error! Unable to delete the data');
    }
}



