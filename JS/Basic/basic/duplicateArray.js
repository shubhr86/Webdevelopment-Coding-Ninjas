function duplicate(arr){
    const duplicateArr=[];
    for (const element of arr){
        duplicateArr.push(element);
        duplicateArr.push(element);
        
    }
    return duplicateArr;
}
console.log(duplicate([1, 2])); // Output: [1, 2, 1, 2]
console.log(duplicate([3, 4, 5])); // Output: [3, 4, 5, 3, 4, 5]
