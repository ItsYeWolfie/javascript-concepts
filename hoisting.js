console.log(me);
console.log(job); // ReferenceError: Cannot access 'job' before initialization
console.log(year); // ReferenceError: Cannot access 'year' before initialization
// The job and year variables are not hoisted because they are const/let(s), they are still in the temporal dead zone

const me = 'ItsYeWolfie';
const job = 'Fellow';
const year = 2001;

// Functions
console.log(addDecl(2, 3)); // 5
console.log(addExpr(2, 3)); // ReferenceError: Cannot access 'addExpr' before initialization
console.log(addArrow(2, 3)); // ReferenceError: Cannot access 'addArrow' before initialization

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

// Both the addExpr and addArrow functions are not hoisted because they are const/let(s), they are still in the temporal dead zone, if you switch them to var, they will be hoisted, but they will be undefined (not a function)

// Example
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// Even though the numProducts variable is declared after the if statement, it is still hoisted to the top of the scope, so the if statement will not throw an error, it will be false, and the deleteShoppingCart function will be called, which will be definitely problematic if you have a lot of products in your shopping cart.

// eslint-disable-next-line
var x = 1;
// eslint-disable-next-line
let y = 2;
const z = 3;

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false

// Variables declared with var are attached to the window object, variables declared with let and const are not
