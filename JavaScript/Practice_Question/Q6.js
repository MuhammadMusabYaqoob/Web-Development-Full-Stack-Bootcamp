// Problem 6: 
// let arr = [99,-9,5,6,4,2,"string",null,NaN,undefined,false]
// Use:
// array.reduce method to get sum of any array
// array.map (conver falsy to truthy)
// array.filter (even numbers)


function fun(arr){
    let numbers = []
    let others = []

    if(arr.length === 0){
        return -1
    }
    else{
        for(let i = 0; i < arr.length; i++){
            if(typeof arr[i] === "number" && !isNaN(arr[i])){
                numbers.push(arr[i])
            }else{
                others.push(arr[i])
            }
        }
        console.log(`Numbers are: `, numbers)
        console.log(`Other Values are: ` , others)


        // even numbers from numbers
        let even_numbers = numbers.filter((even) => {
            return even % 2 === 0
        })
        console.log(`Even Numbers are: `, even_numbers)


        // sum 
        let sum = numbers.reduce((acc, present) => {
            return acc + present
        })
        console.log(`Sum of Numbers is:`, sum)

        // converting values to truty
        let truthy_values = others.map((value) => {
            if(value){
                return true
            }else{
                return !value
            }
            // return value ? true : value)
        })
        console.log(`Turthy Values are: `, truthy_values)
    }
}


let arr = [99,-9,5,6,4,2,"string",null,NaN,undefined,false]
fun(arr)