var students={
    "name": "shubham",
    rollNo:135,
    marks:91,
    "fatherName":"AshokKumar",
    // nested within the students
    address:{
        city:"Hathras",
        pincode:204101,
    }
};
console.log(students.address["pincode"]);