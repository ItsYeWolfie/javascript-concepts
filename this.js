console.log(this); // Window {window: Window, self: Window, document: document, name: "", location: Location, …}

const calcAge = function (birthYear) {
  console.log(2022 - birthYear); // 21
  console.log(this); // undefined (strict mode)
};

calcAge(2001);

const calcAgeArrow = (birthYear) => {
  console.log(2022 - birthYear); // 21
  console.log(this); // Window {window: Window, self: Window, document: document, name: "", location: Location, …}
};

calcAgeArrow(2001);

// Regular functions get their own this keyword, arrow functions do not get their own this keyword, they use the this keyword of their parent scope, which is the window object in this case.

const itsYeWolfie = {
  fullName: 'ItsYeWolfie',
  birthYear: 2001,
  calcAge() {
    console.log(this); // {birthYear: 2001, calcAge: ƒ}
    console.log(2022 - this.birthYear); // 21

    // Solution 1 - self or that
    const self = this;

    const isMillenial = function () {
      console.log(self); // {birthYear: 2001, calcAge: ƒ}
      // console.log(this); // undefined (strict mode)
      console.log(self.birthYear >= 1981 && self.birthYear <= 1996); // false
      // console.log(this.birthYear >= 1981 && this.birthYear <= 1996); // undefined (strict mode), false (non-strict mode)
    };

    // Solution 2 - arrow function (does not get its own this keyword, it uses the this keyword of its parent scope)
    const isMillenialArrow = () => {
      console.log(this); // {birthYear: 2001, calcAge: ƒ}
      console.log(this.birthYear >= 1981 && this.birthYear <= 1996); // false
    };

    isMillenial(); // undefined (strict mode), false (non-strict mode)
    isMillenialArrow(); // false
  },

  greet: () => console.log(`Hey ${this.fullName}`), // Hey undefined
};

itsYeWolfie.calcAge(); // 21

const jane = {
  birthYear: 2017,
};

jane.calcAge = itsYeWolfie.calcAge;

// jane.calcAge(); // 5

const f = itsYeWolfie.calcAge;

f(); // undefined (strict mode)

itsYeWolfie.greet(); // Hey undefined

// The greet method is an arrow function, so it uses the this keyword of its parent scope, which is the window object, and the window object does not have a fullName property, so it returns undefined.
// Objects don't create a new scope as you might think, so the this keyword of the greet method refers to the global scope, which is the window object.
console.log(this.fullName); // undefined, because the window object does not have a fullName property.

// eslint-disable-next-line
var fullName = 'Matilda Jones';

console.log(this.fullName); // Matilda Jones, because the window object has a fullName property. var keyword creates a property on the window object.

// Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments); // [Arguments] {0: 2, 1: 5, 2: 8, 3: 12}
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 8, 12);

// eslint-disable-next-line
var addArrow = (a, b) => {
  console.log(arguments); // Uncaught ReferenceError: arguments is not defined
  return a + b;
};

addArrow(2, 5, 8); // Uncaught ReferenceError: arguments is not defined

// Arguments keyword is not available in arrow functions, because arrow functions do not get their own this keyword, they use the this keyword of their parent scope, which is the window object in this case, and the window object does not have an arguments property.
