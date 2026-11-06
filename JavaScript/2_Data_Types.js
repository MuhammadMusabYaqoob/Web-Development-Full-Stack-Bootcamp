"use strict"; // treat all JS code as newer version


// number => 2 to power 53
// bigint
// string => ""
// boolean => true/false
// null => standalone value
// undefined => 
// symbol => unique


// object

console.log(typeof undefined); // undefined
console.log(typeof null); // object




// ===============================
// PRIMITIVE DATA TYPES (7)
// ===============================

// 1. STRING
let name = "Musab";
console.log(name);          // Musab
console.log(typeof name);   // string


// 2. NUMBER
let age = 22;
let price = 99.99;

console.log(age);           // 22
console.log(typeof age);    // number


// 3. BOOLEAN
let isStudent = true;

console.log(isStudent);         // true
console.log(typeof isStudent);  // boolean


// 4. UNDEFINED
let city;

console.log(city);          // undefined
console.log(typeof city);   // undefined


// 5. NULL
let user = null;

console.log(user);          // null
console.log(typeof user);   // object (JavaScript bug)


// 6. SYMBOL
let id = Symbol("id");

console.log(id);            // Symbol(id)
console.log(typeof id);     // symbol


// 7. BIGINT
let bigNumber = 123456789123456789123456789n;

console.log(bigNumber);
console.log(typeof bigNumber); // bigint



// ===============================
// NON-PRIMITIVE (REFERENCE TYPES)
// ===============================

// 8. OBJECT
let person = {
    name: "Musab",
    age: 22
};

console.log(person);
console.log(typeof person); // object



// 9. ARRAY
let fruits = ["Apple", "Mango", "Banana"];

console.log(fruits);
console.log(typeof fruits);     // object
console.log(Array.isArray(fruits)); // true



// 10. FUNCTION
function greet() {
    console.log("Hello Musab");
}

greet();

console.log(typeof greet); // function