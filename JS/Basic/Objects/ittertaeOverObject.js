var students={
    "name": "shubham",
    rollNo:135,
    marks:91,
    "fatherName":"AshokKumar",
};

for (var prop in students){
    // using [] instide of . beaucse property is changing continiuosly like string , integer

    console.log(prop, students[prop]);
}