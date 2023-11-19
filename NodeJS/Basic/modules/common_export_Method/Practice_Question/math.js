// math.js - a CommonJS module for performing calculations on a set of numbers

export function sum (nums) {
    return nums.reduce((total, num) => total + num, 0);
}

export function mean (nums) {
    const sumResult =  sum(nums);
    return sumResult / nums.length;
}
