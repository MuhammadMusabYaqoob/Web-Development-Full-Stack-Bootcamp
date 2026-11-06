// Problem 2: Contains Duplicate
// Description: Return true if any value appears at least twice in the array, and false if every element is distinct.


// Input: nums = [1, 2, 3, 1]
// Output: true






const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter numbers separated by commas: ", (input) => {
    let nums = input.split(",").map(Number);
    let duplicates = 0
    for(let i=0;i<nums.length;i++){
        for(let j=i+1;j<nums.length;j++){
            if(nums[i]===nums[j]){
                duplicates++
                console.log(`Duplicate ${duplicates} found`)
                console.log(`Indices: ${i} and ${j}`);
                console.log(`values are ${nums[i]} and ${nums[j]}`);
                console.log("============================================")
                break
            }
            
        }
        
    }
    if(duplicates === 0){
        console.log("No duplicates found")
    }
    rl.close();
})