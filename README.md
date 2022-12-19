# JavaScript Concepts

---

- [JavaScript Concepts](#javascript-concepts)
  - [Javascript Behind the Scenes](#javascript-behind-the-scenes)
    - [WHAT IS JAVASCRIPT?](#what-is-javascript)
    - [THE JAVASCRIPT ENGINE AND RUNTIME](#the-javascript-engine-and-runtime)
      - [THE JS Engine](#the-js-engine)
      - [CALL STACK](#call-stack)
      - [HEAP](#heap)
      - [COMPILATION VS. INTERPRETATION LANGUAGES](#compilation-vs-interpretation-languages)
        - [JIT IN JAVASCRIPT](#jit-in-javascript)
      - [WEB APIs](#web-apis)
      - [CALLBACK QUEUE](#callback-queue)
      - [EXECUTION CONTEXT](#execution-context)
      - [What is an execution context?](#what-is-an-execution-context)
    - [SCOPE AND SCOPE CHAIN](#scope-and-scope-chain)
      - [Scope Concepts](#scope-concepts)
      - [Global Scope](#global-scope)
      - [Function Scope](#function-scope)
      - [Block Scope (ES6)](#block-scope-es6)
      - [Scope Chain](#scope-chain)
      - [Scope chain vs. Call stack](#scope-chain-vs-call-stack)
      - [Summary](#summary)
    - [HOISTING IN JAVASCRIPT](#hoisting-in-javascript)
      - [Temporal Dead Zone, Let and Const](#temporal-dead-zone-let-and-const)
    - [THE `THIS` KEYWORD](#the-this-keyword)
      - [Method call](#method-call)
      - [Regular function call](#regular-function-call)
      - [Arrow function call](#arrow-function-call)
      - [Event listener](#event-listener)
    - [PRIMITIVES vs. OBJECTS (Primitive vs. Reference Types)](#primitives-vs-objects-primitive-vs-reference-types)
      - [Primitives Summary](#primitives-summary)
      - [Objects Summary](#objects-summary)
      - [Examples of Data Types](#examples-of-data-types)
  - [Data Structures, Modern Operators and Strings](#data-structures-modern-operators-and-strings)
    - [DESTRUCTURING ARRAYS](#destructuring-arrays)
      - [Skipping Elements](#skipping-elements)
      - [Switching Variables](#switching-variables)
      - [Returning Multiple Values](#returning-multiple-values)
      - [Nested Destructuring](#nested-destructuring)
      - [Default Values](#default-values)
    - [DESTRUCTURING OBJECTS](#destructuring-objects)
      - [Assigning New Variable Names](#assigning-new-variable-names)
      - [Assigning Default Values](#assigning-default-values)
      - [Mutating Variables](#mutating-variables)
      - [Object Nested Destructuring](#object-nested-destructuring)
      - [Object Destructuring in a Function](#object-destructuring-in-a-function)
      - [Object Method Destructuring](#object-method-destructuring)
    - [The Spread `...` Operator](#the-spread--operator)
      - [Spread Operator in a Function](#spread-operator-in-a-function)
      - [Spread Operator in Array Literals](#spread-operator-in-array-literals)
    - [Spread Operator in Object Literals](#spread-operator-in-object-literals)
      - [Copying Objects with the Spread Operator](#copying-objects-with-the-spread-operator)

---

## Javascript Behind the Scenes

### WHAT IS JAVASCRIPT?

**Short answer:** JavaScript is a high-level, object-oriented, multi-paradigm programming language.

**Long answer:** JavaScript is a high-level, prototype-based object-oriented, multi-paradigm, interpreted or just-in-time compiled, dynamic, single-threaded, garbage-collected programming language with first-class functions and a non-blocking event loop concurrency model.

Destructuring the long answer:

- **High-level:** JavaScript is a high-level programming language. This means that it is easy to read and write, and it is close to human languages. It is also easy to understand and learn. Low-level programming languages on the other end are closer to machine languages and are harder to read and write (the developer has to manage memory and other resources manually).
- **Garbage-collected:** JavaScript is a garbage-collected language. This means that the developer does not have to manage memory manually. The garbage collector takes care of that. The garbage collector is a program that runs in the background and frees up memory when it is not being used anymore.
- **Interpreted or just-in-time compiled:** JavaScript is an interpreted language. This means that the code is not compiled into machine code before it is executed. Instead, the code is compiled line by line while it is being executed. This is also called just-in-time compilation. The advantage of this is that the developer does not have to compile the code before it is executed. The disadvantage is that the code runs slower than compiled code. Visit [just-in-time compilation](#jit-in-javascript) for more info.
- **Multi-paradigm:** JavaScript supports multiple programming paradigms. This means that it supports different ways of programming. For example, it supports object-oriented programming, functional programming, and procedural programming.
  - Procedural programming is when the code is written as a sequence of steps.
  - Functional programming is when the code is written as a sequence of functions.
  - Object-oriented programming is when the code is written as a sequence of objects.
- **Prototype-based:** JavaScript is a prototype-based language. This means that objects in JavaScript are based on prototypes. A prototype is a blueprint for an object. It is used to create new objects. For example:

  | Array |
  | --- |
  | `Array.prototype.push` |
  | `Array.prototype.indexOf` |

  ```javascript
    const arr = [1, 2, 3];
    arr.push(4); // arr is now [1, 2, 3, 4]
    const hasZero = arr.indexOf(0) > -1; // hasZero is false
    ```

    How does this happen? The prototype is the Array prototype object, the array inherits methods from the prototype as it is built from the prototype itself. Take for example a car, it has a prototype, the prototype is the car itself, and the car inherits methods from the prototype as it is built from the prototype itself.

- **First-class functions:** JavaScript supports first-class functions. This means that functions in JavaScript are treated like any other variable. Functions can be passed as arguments to other functions, returned by other functions, and assigned to variables.
- **Dynamic**: JavaScript is a dynamic language. This means that the data types are not set when the code is written. Instead, the data types are set when the code is executed. This is also called type coercion. For example:

  ```javascript
    let x = 1;
    x = 'hello';
  ```

  In the example above, the variable `x` is set to the number `1`. Then, the variable is set to the string `'hello'`. This is possible because JavaScript is a dynamic language. The data type is set when the code is executed, not when it is written, some consider this a weakness of JavaScript, though there's **TypeScript** to help with that.

- **Single-threaded:** JavaScript is a single-threaded language. This means that only one command can be executed at a time. This is also called synchronous execution. For example:

  ```javascript
    console.log('Hello');
    console.log('World');
  ```

  In the example above, the code is executed line by line. The first line is executed, then the second line is executed. This is possible because JavaScript is a single-threaded language. The code is executed line by line, one command at a time.

- **Non-blocking event loop concurrency model:** JavaScript has a non-blocking event loop concurrency model. This means that the code is executed line by line, one command at a time. However, if a function takes a long time to execute, the code execution is not blocked. Instead, the code execution continues. When the function is done executing, the result is returned. This is also called asynchronous execution. For example:

  ```javascript
    console.log('Hello');
    setTimeout(() => {
      console.log('World');
    }, 1000);
  ```

  In the example above, the code is executed line by line, one command at a time. The first line is executed, then the second line is executed. However, the second line is not executed immediately. Instead, the second line is executed after 1 second. This is possible because JavaScript has a non-blocking event loop concurrency model. The code is executed line by line, one command at a time. However, if a function takes a long time to execute, the code execution is not blocked. Instead, the code execution continues. When the function is done executing, the result is returned.

---

### THE JAVASCRIPT ENGINE AND RUNTIME

#### THE JS Engine

A JavaScript engine is a program that executes JavaScript code. It translates the code written in a high-level language into machine code that can be run on a computer.

JavaScript engines are an important part of modern web browsers, as they allow web pages to execute JavaScript code. When you visit a website that uses JavaScript, your web browser downloads the JavaScript code and runs it on your computer using a JavaScript engine.

There are several JavaScript engines in use today, including the V8 engine developed by Google and used in the Chrome browser, and the Spider Monkey engine developed by Mozilla and used in the Firefox browser.

![Call Stack & Heap Description](https://i.imgur.com/EEb5hMN.png)

#### CALL STACK

LIFO (Last In First Out) data structure, where the last function that gets pushed into the stack is the first one to be popped out of the stack when the execution is finished.

It is as if you bought pizzas together with your friends, and you put them on a table to keep track of who bought which pizza. The last pizza you bought is the first one you eat, and the first pizza you bought is the last one you eat.

For example in the code above, the call stack will look like this:

```javascript
global execution context
x calls first()
first()
first() calls second()
second()
```

![Call stack](https://i.imgur.com/R51TLgU.png)

So the first function that gets popped out of the stack is second(), then first(), then x, and finally the global execution context.
What does this mean? It means that the execution of the code happens in the same order as the functions are called. (first `x`, then `first`, then `second`)
This is called synchronous execution, and it is the default behavior of javascript, it will do one thing at a time, in the order that it is written, and it will wait for the execution of the current function to finish before moving on to the next one (the functions which were called are put into the call stack, and when they are finished, they are popped out of the stack). The only exception to this are asynchronous functions, which will be explained later.

---

#### HEAP

In JavaScript, the heap is a region of memory that is used to store objects and data structures. It is separate from the call stack, which is used to store the current execution state of the program.

The heap is used to store objects that are created dynamically at runtime, such as objects that are created using the `new` operator or objects that are created using the literal syntax (e.g. `{}` or `[]`). The heap is also used to store data structures that are created using the `new` operator, such as arrays or maps.

The heap is managed by the JavaScript engine, and objects in the heap are subject to garbage collection when they are no longer being used. Garbage collection is the process by which the JavaScript engine identifies and removes objects from the heap that are no longer being used by the program. This helps to free up memory and improve the performance of the program.

The heap is an important aspect of the way JavaScript works, and is used by many other programming languages as well. It is separate from the stack, which is used to store the current execution state of the program and is managed by the JavaScript engine to ensure that objects and data structures are efficiently used and managed in memory.

#### COMPILATION VS. INTERPRETATION LANGUAGES

**Compilation:** Entire code is converted into machine code at once, and written to a binary file that can be executed by a computer.
![Compilation Process](https://i.imgur.com/k4tbNsN.png)

**Interpretation:** The interpreter runs through the source code and executes it line by line.
![Interpretation Process](https://i.imgur.com/n2iyTwm.png)

The compilation process is way faster than the interpretation one.

Javascript uses **JIT** (Just-in-time) compilation (mix between Compilation & Interpretation)
![Just in Time Process](https://i.imgur.com/FHhwpuc.png)

##### JIT IN JAVASCRIPT

![The processes behind JIT in Javascript](https://i.imgur.com/z7CTSTL.png)

The code first is parsed into AST (abstract syntax tree) - it splits up each line of code into pieces that are meaningful to the language - like const/function keywords, and saves all of those pieces into the tree in a structured way while checking for syntax errors at the same time.

Then comes compilation, which takes the generated AST and compiles it into machine code, then the machine code gets executed right away. It doesn't stop at that moment, javascript will execute a very unoptimized machine code at first, but during execution, the machine code is optimized and recompiled during the execution.

#### WEB APIs

In JavaScript, WEB APIs *(Application Programming Interfaces)* are a set of APIs that allow web pages to interact with the browser and the operating system. They provide a way for web pages to access and manipulate various features of the browser and the operating system, such as the **DOM** *(Document Object Model)*, the network, the filesystem, and more.

Here are some examples of WEB APIs:

- **DOM API:** The DOM API allows web pages to access and manipulate the structure of an HTML or XML document. It provides a way to create, delete, and modify elements, attributes, and text in a document.
- **Network API:** The network API provides a way for web pages to send and receive data over the network. It includes APIs for making HTTP requests, such as the fetch API and the XMLHttpRequest API.
- **File API:** The file API provides a way for web pages to access and manipulate the filesystem. It includes APIs for reading and writing files, such as the FileReader API and the FileWriter API.
- **Geolocation API:** The geolocation API provides a way for web pages to access the geographical location of the device. It includes APIs for getting the current location, tracking the location over time, and converting between geographical coordinates and addresses.

WEB APIs are an important part of the web platform, as they allow web pages to access and manipulate various features of the browser and the operating system. They are usually provided by the browser and are not a part of the core JavaScript language.

![Web APIs](https://i.imgur.com/ynjjDyC.png)

#### CALLBACK QUEUE

In JavaScript, the callback queue is a queue of functions that are waiting to be executed. These functions are called callbacks.

Callbacks are often used in JavaScript to perform certain tasks after an asynchronous operation has been completed. Asynchronous operations are operations that occur in the background and do not block the main execution thread.

Here is an example of using a callback to log a message after an asynchronous operation has been completed:
  
```javascript
function asyncOperation(callback) {
  setTimeout(() => {
    console.log("Async operation completed");
    callback();
  }, 1000);
}

asyncOperation(() => {
  console.log("Callback function called");
});
```

In this example, the `asyncOperation` function performs an asynchronous operation that takes 1 second to complete. After the operation has been completed, the `callback` function is called. The `callback` function logs a message to the console.

Callbacks are often used in conjunction with event loops. An event loop is a continuous loop that monitors the callback queue and executes the functions in the queue when they are ready to be executed.

![Callback Queue](https://i.imgur.com/FVJmbgD.png)

---

#### EXECUTION CONTEXT

#### What is an execution context?

In JavaScript, an execution context is an abstract concept that represents the environment in which the JavaScript code is executed. It determines the value of the `this` keyword and the variables that are accessible within a given piece of code.

There are two types of execution contexts: **global** and **local**.

A global execution context is created when the JavaScript interpreter starts executing your code. It applies to the entire script and is associated with the global object (`window` in the case of a web browser). Any variables or functions declared in the global context are attached to the global object and are therefore accessible from anywhere in the script.

A local execution context is created whenever a function is called. It is associated with the function and the arguments that are passed to the function. Any variables or functions declared within the function are only accessible within the function's execution context. When the function finishes executing, its local execution context is destroyed and the interpreter returns to the previous execution context.

The execution context also includes a reference to the outer environment, which is the context in which the current context was created. This allows nested functions to access variables and functions declared in their parent contexts.

**What's inside an execution context?**

- Variable environments:
  - `let`,
  - `const`,
  - `var` declarations,
  - `functions`,
  - `arguments` object (not in arrow functions)),
- The scope chain,
- `this` keyword (not in arrow functions)
  All of this is generated during the "creation phase", right before execution.

Arrow functions don't have the `arguments` object & `this` keyword, they can instead use them from their closest regular function parent.

```javascript
const name = 'ItsYeWolfie';

const first = () => {
  let a = 1;
  const b = second(7, 9);
  a = a + b;
  return a;
};

function second(x, y) {
  var c = 2;
  return c;
}

const x = first();
```

| Scope chain: [global] | Scope chain: [first, global] | Scope chain: [second, first, global] |
| --------------------- | ---------------------------- | ------------------------------------ |
| **name:** ItsYeWolfie     | **a:** 1                         | **c:** 2                                 |
| **first:** function       | **b:** unknown                   | **arguments:** {0: 7, 1: 9}              |
| **second:** function      |
| **x:** unknown            |

`arguments` are an array of all the arguments passed into the function. (not in arrow functions)

How will the engine keep track of the order of execution of functions? It will use the Call Stack, read [here](#call-stack) for more info.

---

### SCOPE AND SCOPE CHAIN

#### Scope Concepts

The scope is the visibility of variables. (where can we access a certain variable?) How our program's variables are organized and accessed. "Where can we access a certain variable?", "Where do we have access to a certain variable?" or "Where was a certain variable defined in the code?"

- **Lexical scope:** A function that is lexically within another function gets access to the scope of the outer function. (e.x: a function defined inside another function has access to the variables of the outer function)

- **Scope:** Space or environment in which a certain variable is declared, that determines its accessibility. (visibility).
  - There are three types of scope:
    - Global scope
    - Function scope
    - Block scope
- **Scope of a variable:** Region of your code where you have access to a certain variable.

#### Global Scope

```javascript
const name = 'ItsYeWolfie';
const job = 'Fellow';
const year = 2001;
```

- Global scope is the default scope in javascript.
- It is the outermost scope in javascript. (outside of any function or block)
- Variables defined in the global scope are accessible from anywhere in the code.

#### Function Scope

```javascript
function calcAge(birthYear) {
  const age = 2022 - birthYear;
  return age;
}

console.log(age); // ReferenceError: age is not defined
```

- Variables defined inside a function are not accessible from outside the function.
- Also called a local scope, because the variables are only accessible inside the function.

#### Block Scope (ES6)

```javascript
if (year >= 2001 && year <= 2021) {
  const century = true;
  var millenial = true;
}

console.log(century); // ReferenceError: century is not defined
console.log(millenial); // true
```

- Variables defined inside a block are not accessible from outside the block.
- However, variables defined with the `var` keyword are accessible from outside the block.
- Variables defined with the `let` and `const` keywords are not accessible from outside the block.
- Functions defined inside a block are not accessible from outside the block, (they are also block-scoped), at least in strict mode.

#### Scope Chain

```javascript
const name = 'ItsYeWolfie';

function first() {
  const age = 2022 - 2001;

  if (age >= 22) {
    const decade = true;
    var millenial = true;
  }

  function second() {
    const job = 'Fellow';
    console.log(
      `${name} is a ${age}-year old ${job}. Is he a millenial? ${millenial}`
      // ItsYeWolfie is a 21-year old Fellow. Is he a millenial? false
    );

    console.log(decade); // ReferenceError: decade is not defined
  }

  second();
}

first();
```

At first sight, the scopes might look like this:

| Global Scope      | first() Scope | second() Scope |
| ----------------- | ------------- | -------------- |
| name: ItsYeWolfie | age: 21       | job: Fellow    |

The secret is that every scope has access to the variables of all its parent scopes. This is called the scope chain. That means that the second() function has access to the variables of the first() function, and the first() function has access to the variables of the global scope. How does this work? The second `scope()` will look for the variable it needs in its scope, and if it doesn't find it there, it will look in the scope of its parent, and so on, until it finds the variable it needs, or it reaches the global scope, and if it doesn't find the variable there, it will throw a `ReferenceError`.

This is called the **variable lookup**, and it is how the javascript engine finds the value of a variable, this only works **upwards**, it will **never look downwards**, so the `second()` function will never have access to the variables of a `third()` function.

The `millennial` variable is accessible from the `second()` function, because it is defined by the `var` keyword (which is exempt from the block scope), and the `decade` variable is not accessible from the `second()` function, because it is defined by the `const` keyword (which is not exempt from the block scope) - **var** is function scoped, **let** and **const** are block scoped.

The final scope chain will look like this:

| Global Scope      | first() Scope     | if block Scope    | second() Scope    |
| ----------------- | ----------------- | ----------------- | ----------------- |
| name: ItsYeWolfie | age: 21           | age: 21           | age: 21           |
|                   | millenial: true   | millenial: true   | millenial: true   |
|                   | name: ItsYeWolfie | name: ItsYeWolfie | name: ItsYeWolfie |
|                   |                   |                   | job: Fellow       |

Due to lexical scope, the `if-else` cannot access the `job` variable, because it is defined in the `second()` function, which is not a parent of the `if-else` block, they are merely siblings.

#### Scope chain vs. Call stack

```javascript
const a = 'ItsYeWolfie';
first();

function first() {
  const b = 'Hello';
  second();

  function second() {
    const c = 'Hey!';
    third();
  }
}

function third() {
  const d = 'Hi';
  console.log(a + b + c + d);
  // ReferenceError
}
```

The call stack will look like this:

| Call stack |
| ---------- |
| third()    |
| second()   |
| first()    |
| global     |

| Global EC (Variable Environment - VE) | first() EC       | second() EC | third() EC |
| ------------------------------------- | ---------------- | ----------- | ---------- |
| a: ItsYeWolfie                        | b: Hello         | c: Hey!     | d: Hi      |
| first: function                       | second: function |             |            |
| third: function                       |                  |             |            |

Order of execution: global -> first -> second -> third (order in which the functions are called)

The scope chain will look like this:

| Global Scope     | first() Scope    | second() Scope   | third() Scope   |
| ---------------- | ---------------- | ---------------- | --------------- |
| a: ItsYeWolfie   | b: Hello         | c: Hey!          | d: Hi           |
| first: function  | second: function | b: Hello         | a: ItsYeWolfie  |
| second: function | a: ItsYeWolfie   | second: function | first: function |
|                  | first: function  | a: ItsYeWolfie   | third: function |
|                  | third: function  | first: function  |
|                  |                  | third: function  |

That shows that the code above will throw a `ReferenceError`, as `b` and `c` are not defined in the `third()` function, and the `third()` function is not a parent of the `first()` function, they are merely siblings.

#### Summary

- Scope determines the accessibility (visibility) of variables. It asks the question "Where can we access a certain variable?", "Where do variables live?".
- There are 3 types of scope: global scope, function scope and block scope.
- Variables defined in the global scope are accessible from anywhere in the code.
- Only `let` and `const` are block-scoped, and `var` is function-scoped.
- In JavaScript, we have lexical scope, which means that scope is defined by the placement of functions and blocks in the code, not by where the functions and blocks are called.
- Every scope always has access to the variables of its parent scope, but not the other way around.
- When a variable is not in the current scope, the scope chain is used to look for the variable in the parent scope, and so on, until the variable is found, or the global scope is reached, and if the variable is not found in the global scope, a `ReferenceError` is thrown.
- The scope chain is a one-way street, it goes from the current scope to the global scope, but not the other way around.
- The scope chain in a certain scope is equal to adding together all the variable environments of all the parent scopes.
- The scope chain has nothing to do with the order in which functions are called, it has to do with the order in which functions are written in the code.

Check [this](scoping.js) for practice.

---

### HOISTING IN JAVASCRIPT

**Hoisting** is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Inevitably, this means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.

**Before execution,** the code is scanned for variable declarations and for each variable, a new property is created in the Variable Environment Object. **After that, the code is scanned for function declarations, and for each function, a new property is created in the Variable Environment Object.**

|                                 | Hoisted? | Initial value               | Scope                  |
| ------------------------------- | -------- | --------------------------- | ---------------------- |
| function declaration            | Yes      | function                    | Block(Strict)/Function |
| var variable                    | Yes      | undefined                   | Function               |
| let and const variables         | No       | unitialized,TDZ             | Block                  |
| function expressions and arrows | No       | Depends if var or let/const | Block                  |

#### Temporal Dead Zone, Let and Const

```javascript
const myName = 'ItsYeWolfie';

if (myName === 'ItsYeWolfie') {
  console.log(`${myName} is a ${job}`); // ReferenceError: Cannot access 'job' before initialization
  const age = 2022 - 2001;
  console.log(age);
  const job = 'Fellow';
  console.log(x); // ReferenceError: x is not defined
}
```

The code above will throw a `ReferenceError` because the `job` variable is in the temporal dead zone, and the `x` variable is not defined.

- Because it is a safer way to declare variables because it prevents us from using variables before they are declared. It makes it easier to avoid and catch errors. Accessing a variable before it is declared is a common mistake, and it is a common source of bugs and should be avoided.
- Makes const variables more useful, because they are now immutable, and we can't accidentally change them.

**If hoisting brings a lot of problems, why is it still a thing?**

- *It is a feature of JavaScript, and it is not going to be removed.*
- Using functions before the actual declaration.
- var hoisting is just a side effect of how the JavaScript engine works, and it is not a good practice to use it.

Visit [this](hoisting.js) for practice and further reading & understanding.

---

### THE `THIS` KEYWORD

`this` keyword is a special variable that is created for every execution context (every function). It is not assigned a value until a function where it is defined is called. It takes the value of (points to) the "owner" of the function in which `this` keyword is used.

**`this` keyword is not static. It depends on how the function is called, and its value is only assigned when the function is called.**

If we set for example `x = 5`, and then we call `console.log(this.x)`, `this` keyword will point to the **global object**, which is the `window` object in the browser, and the `global` object in Node.js.

Let's analyze four different ways of calling a function, and see how `this` keyword behaves in each case.

#### Method call

```javascript
const myObj = {
  name: 'ItsYeWolfie',
  birthYear: 2001,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.birthYear);
  },
};

myObj.calcAge(); // this = myObj
```

In the code above, `this` keyword points to the object that is calling the method, in this case, the `myObj` object, and `this.birthYear` is equal to `myObj.birthYear`, which is `2001`.

#### Regular function call

```javascript
const myObj = {
  name: 'ItsYeWolfie',
  birthYear: 2001,
};

const calcAge = function () {
  console.log(this);
  console.log(2022 - this.birthYear);
};

calcAge(); // this = undefined
```

In the code above, `this` keyword is undefined, because the `calcAge()` function is a regular function call and not a method call. (This applies only for strict mode, in non-strict mode, `this` keyword will point to the global object, which is the `window` object in the browser, and the `global` object in Node.js.)

#### Arrow function call

```javascript
const myObj = {
  name: 'ItsYeWolfie',
  birthYear: 2001,
  calcAge: function () {
    console.log(this);
    console.log(2022 - this.birthYear);

    const isMillenial = () => {
      console.log(this);
      console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
    };

    isMillenial();
  },
};

myObj.calcAge(); // this = myObj
```

In the code above, `this` keyword points to the object that is calling the method, in this case, the `myObj` object, and `this.birthYear` is equal to `myObj.birthYear`, which is `2001`. Arrow functions do not get their own `this` keyword, they simply use `this` keyword of the function they are written in.

#### Event listener

```javascript
const myObj = {
  name: 'ItsYeWolfie',
  birthYear: 2001,
};

const calcAge = function () {
  console.log(this);
  console.log(2022 - this.birthYear);
};

document.querySelector('.btn').addEventListener('click', calcAge); // this = undefined
```

In the code above, `this` keyword is undefined, because the `calcAge()` function is a regular function call and not a method call. (The strict mode applies just the same, in non-strict mode, `this` keyword will point to the global object, which is the `window` object in the browser, and the `global` object in Node.js.)

There are other ways to fix this, but the most common ways are:

- Using the `new` keyword.
- Using the `call()` method.
- Using the `apply()` method.
- Using the `bind()` method.

They will be explained way down below.

See [this](this.js) for practice and further reading & understanding.

---

### PRIMITIVES vs. OBJECTS (Primitive vs. Reference Types)

In JavaScript, there are two types of data types: primitives and objects.

What are the primitive data types?

- Number
- String
- Boolean
- Undefined
- Null
- Symbol (ES2015)
- BigInt (ES2020)

What are the object data types?

- Object literals
- Arrays
- Functions
- Many more...

How do they differ? It's how they are stored in the computer's memory.

If we recall from the previous chapters, the computer's memory is divided into two parts: the stack and the heap. The call stack is where the function calls are stored, and the heap is where the objects are stored. On the other hand, the primitive data types are stored in the stack, which means the primitive types are stored in the execution context in which they are declared. Let's find out how they differ.

Primitive values example:

```javascript
let age = 21;
let oldAge = age;
age = 22;
console.log(age); // 22
console.log(oldAge); // 21
```

When we create a primitive value, it is stored in the stack, and the variable `age` points to that value. When we create another variable `oldAge` and assign it the value of `age`, the value of `age` is copied and stored in the stack, and the variable `oldAge` points to that value. When we change the value of `age`, the value of `oldAge` remains the same, because it is a copy of the value of `age`, and it is stored in the stack.

In technical details: Javascript will first create a so-called unique identifier with the variable name, then a piece of memory will be allocated with a certain address, for e.x `0x001`, and then the value will be stored in that memory address. The identifier points to that memory address, not the value itself. When we assign a variable to another variable, the value is copied, and the identifier points to the same memory address. It will look as if `oldAge` is a copy of `age`, but it is not. When we reassign the value of `age`, a new memory address will be allocated, and the identifier will point to that new memory address (`0x002`) - which will hold the value of 31. Now, with reference types, it is a bit different.

![Call Stack of age & oldAge](https://i.imgur.com/awy3ElR.png)

Reference values example:

```javascript
const me = {
  name: 'ItsYeWolfie',
  age: 21,
};

const friend = me;
friend.age = 27;
console.log('Friend:', friend); // Friend: { name: 'ItsYeWolfie', age: 27 }
console.log('Me:', me); // Me: { name: 'ItsYeWolfie', age: 27 }
```

When we create an object, it is stored in the heap, and the variable `me` points to that object. When we create another variable `friend` and assign it the value of `me`, the value of `me` is not copied, but the identifier points to the same memory address. When we change the value of `friend.age`, the value of `me.age` also changes, because they point to the same memory address.

In technical details: JavaScript will create a unique identifier with the variable name `me`, which will point to a memory address, for e.x `0x003`, and then the object's reference will be stored in that memory address. In other words, the piece of memory in the call stack has a refernece to the piece of memory in the heap, which holds the `me` object. Next, we create a new variable `friend`, which will point to the same memory address as `me`, which is `0x003`, with that, we have the understanding that the `friend` object is the same as the `me` object. When we change the value of `friend.age`, the value of `me.age` also changes, because we are changing the value of the object that is stored in the heap, we are not changing the value of the memory address's value in the stack.

How will this look in the whole picture?

Stack memory:
| Identifier | Memory Address | Value |
|------------|----------------|-------|
| age        | 0x001          | 21    |
| oldAge     | 0x002          | 21    |
| me         | 0x003          | D30F  |
| friend     | 0x003          | D30F  |

Heap memory:
| Memory Address | Value |
|----------------|-------|
| D30F           | { name: 'ItsYeWolfie', age: 21 } |

To summarize:

#### Primitives Summary

- Primitives are **immutable**.
- Primitives are **copied by their value** (they are saved into their place in memory, in the stack).
- Primitives are **passed by value**.

#### Objects Summary

- Objects are **mutable**.
- Objects are **copied by their reference** (they are saved into their place in memory, in the heap).
- Objects are **passed by reference**.

For further understanding, let's see some examples.

#### Examples of Data Types

```javascript
let lastName = 'Wolfie';
let oldLastName = lastName;
lastName = 'Wolf';
console.log(lastName, oldLastName); // Wolf Wolfie
```

In the code above, we can see that the `oldLastName` variable is a copy (a new variable) of the `lastName` variable, and when we change the `lastName` variable, the `oldLastName` variable is not affected.

```javascript
const jane = {
  firstName: 'Jane',
  lastName: 'Williams',
  age: 27,
};

const marriedJane = jane;

marriedJane.lastName = 'Davis';

console.log('Before marriage:', jane); // Before marriage: {firstName: "Jane", lastName: "Davis", age: 27}
console.log('After marriage:', marriedJane); // After marriage: {firstName: "Jane", lastName: "Davis", age: 27}
```

In the code above, we can see that the `marriedJane` object is a reference to the `jane` object, and when we change the `lastName` property of the `marriedJane` object, we are also changing the `lastName` property of the `jane` object.

In detail: It didn't create a new object in the heap, it just created a new variable that points to the same object in the stack that holds the reference to the object in the heap. In the stack, they both hold the same reference to the object in the heap. Whenever we change the object in the heap, both objects will be affected. This is the reason why we can't change the `marriedJane` object, which is declared as a `const`, and as we know, `const` variables can't be changed. However, what needs to be constant is the value in the stack, and in this case, it is the reference to the object in the heap, which we aren't changing, but the object in the heap itself. It doesn't have to do anything with the `const` keyword, it is just how objects work. What we can't do is assign a completely different object to the `marriedJane` variable, for example, if we do:

```javascript
marriedJane = {}; // Uncaught TypeError: Assignment to constant variable.
```

We are trying to assign a completely different object to the `marriedJane` variable, which is declared as a `const`, and as we know, `const` variables can't be changed.

What if we wanted to copy the object so that we could change one of them without changing the other one? We can do that by using the `Object.assign()` method.

```javascript
const jane = {
  firstName: 'Jane',
  lastName: 'Williams',
  age: 27,
};

const marriedJane = Object.assign({}, jane);

marriedJane.lastName = 'Davis';

console.log('Before marriage:', jane); // Before marriage: {firstName: "Jane", lastName: "Williams", age: 27}
console.log('After marriage:', marriedJane); // After marriage: {firstName: "Jane", lastName: "Davis", age: 27}
```

In the code above, we can see that the `marriedJane` object is a copy of the `jane` object, and when we change the `lastName` property of the `marriedJane` object, we are not changing the `lastName` property of the `jane` object.

In detail: It created a new object in the heap, and it created a new variable that points to the new object in the stack. In the stack, they both hold a different reference to the object in the heap. Whenever we change the object in the heap, only the object that we changed will be affected. However, there is still a problem, because using this technique of `Object.assign()` will only work for the first level of the object, if we have an object inside the object, then the inner object will still be the same, it will point to the same place in memory, it only creates a shallow copy, not a deep clone of the object.
To put it into an example:

```javascript
const jane = {
  firstName: 'Jane',
  lastName: 'Williams',
  age: 27,
  family: ['Bob', 'Emily', 'John'],
};

const marriedJane = Object.assign({}, jane);

marriedJane.lastName = 'Davis';
marriedJane.family.push('Mary');

console.log('Before marriage:', jane); // Before marriage: {firstName: "Jane", lastName: "Williams", age: 27, family: Array(4)}
console.log('After marriage:', marriedJane); // After marriage: {firstName: "Jane", lastName: "Davis", age: 27, family: Array(4)}
```

In the code above, we can see that the `marriedJane` object is a copy of the `jane` object, and when we change the `lastName` property of the `marriedJane` object, we are not changing the `lastName` property of the `jane` object. However, when we change the `family` property of the `marriedJane` object, we are also changing the `family` property of the `jane` object, which is a deeply nested object, the `Object.assign()` did not really behind the scenes copy to the new object. In essence, both the object's `family` property are pointing to the same place in memory, and when we change one of them, we are also changing the other one. A deep clone is what would be needed in this case, and there are many ways to do that, but the most common ways are:

- Using the `JSON.parse()` and `JSON.stringify()` methods.
- Using the `lodash` library.

They will be explained way down below.

---

## Data Structures, Modern Operators and Strings

### DESTRUCTURING ARRAYS

Destructuring Arrays is an ESX feature that is a way of unpacking values from an array or object into distinct variables. In other words, destructuring is a way of breaking a complex data structure into smaller parts (like a variable). It is a very useful feature, and it is used a lot in modern JavaScript. (Starting from ES6)

Let's see how destructuring was done before ES6:

```javascript
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c); // 2 3 4
```

In the code above, we can see that we are creating three variables, `a`, `b`, and `c`, and we are assigning them the values of the first, second, and third elements of the `arr` array, respectively. This is how we used to do it before ES6.

Now, let's see how we can do it via destructuring:

```javascript
const [a, b, c] = [2, 3, 4];
console.log(a, b, c); // 2 3 4
```

Now, we are creating three variables, `a`, `b`, and `c`, and we are assigning them the values of the first, second, and third elements of the array on the right, respectively. This is how we can do it via destructuring in ES6.
This is a very useful feature, it doesn't mutate the original array, and it is very easy to use.

#### Skipping Elements

You can skip elements while destructuring an array, by using the comma `,` operator. Let's see an example:

```javascript
const [a, , c] = [2, 3, 4];
console.log(a, c); // 2 4
```

In the code above, we can see that we are creating two variables, `a`, and `c`, and we are assigning them the values of the first, and third elements of the array on the right, respectively. We are skipping the second element of the array, which is the number `3` by using the comma `,` operator. This is how we can skip elements while destructuring an array.

Let's see a full example:

```javascript
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

const [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian
```

In the code above, we are destructuring the `restaurant.categories` array and we are creating two variables, `main`, and `secondary`, and we are assigning them the values of the first, and third elements of the array, respectively. We are skipping the second element of the array, which is the string `'Pizzeria'` by using the comma `,` operator. This is how we can skip elements while destructuring an array.

#### Switching Variables

Switching variables is the process of switching the values of two variables. For example, if we have two variables, `main` and `secondary`, and we want to switch their values, then we can do this the traditional way:

```javascript
let temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary); // Vegetarian Italian
```

Here, we are creating a temporary variable, `temp`, and we are assigning it the value of the `main` variable, then the `main` variable the value of the `secondary` variable, and then the `secondary` variable the value of the `temp` variable. This is how we used to switch variables before ES6.

However, in ES6, we can do this in a much easier way:

```javascript
let [main, , secondary] = restaurant.categories;
console.log(main, secondary); // Italian Vegetarian

[main, secondary] = [secondary, main];
console.log(main, secondary); // Vegetarian Italian
```

What we're doing here is that we are destructuring the `restaurant.categories` array and we are assigning the first element of the array to the `main` variable, and the second element to the `secondary` variable. Then, we are destructuring the `restaurant.categories` array again, but this time, we are assigning the second element of the array to the `main` variable, and the first element of the array to the `secondary` variable. This is how we can switch variables in ES6.

#### Returning Multiple Values

Returning multiple values is the process of returning multiple values from a function. If we take the previous example of the `order()` method, then we can see that it returns an array with two elements, the first element is the starter, and the second element is the main course. We can also return multiple values from a function using destructuring, for example:

```javascript
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse); // Garlic Bread Pizza
```

In the code above, we are destructuring the array returned from the `order()` method, and we are assigning the first element of the array to the `starter` variable, and the second element to the `mainCourse` variable. This is how we can return multiple values from a function using destructuring.

#### Nested Destructuring

Nested destructuring is the process of destructuring an array or an object which is inside another array or object. For example:

```javascript
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j); // 2 [5, 6]
```

In the code above, we are destructuring the `nested` array, and we are assigning the first element of the array to the `i` variable, and we are assigning the third element of the array to the `j` variable. The third element of the `nested` array is an array, and we can also destruct it, for example:

```javascript
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 5 6
```

Now, we are destructuring the `nested` array, and we are assigning the first element of the array to the `i` variable, and we are assigning the third element of the array to the `j` variable. The third element of the `nested` array is an array, and we are destructuring it, and we are assigning the first element of the array to the `j` variable, and we are assigning the second element of the array to the `k` variable. This is how we can do nested destructuring.

#### Default Values

Assigning default values during an object destructuring is the process of assigning a default value to a variable if the value of the variable is `undefined`. For example:

```javascript
const [p, q, r] = [8, 9];
console.log(p, q, r); // 8 9 undefined
```

In the code above, we are destructuring the array `[8, 9]`, and we are assigning the first element of the array to the `p` variable, the second element of the array to the `q` variable, and the third element of the array to the `r` variable. However, the third element of the array is `undefined`, and we can assign a default value to the `r` variable, for example:

```javascript
const [p, q, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1
```

Then, we destructure the array `[8, 9]`, and we are assigning the first element of the array to the `p` variable, the second element of the array to the `q` variable, and the third element of the array to the `r` variable. However, the third element of the array is `undefined`, and we are assigning the `r` variable the value of `1`, which is the default value. This is how we can assign a default value to a variable

---

### DESTRUCTURING OBJECTS

In JavaScript, object destructuring is a feature that allows you to extract properties from an object and bind them to variables. It is a concise way to access and work with object properties. Most rules apply to object destructuring as they do to array destructuring, of course, there are some differences and/or additions/exceptions.

Here is an example of object destructuring:

```javascript
const obj = {a: 1, b: 2, c: 3};
const {a, b, c} = obj;

console.log(a, b, c); // 1 2 3
```

We are creating an object, `obj`, and we are assigning it three properties, `a`, `b`, and `c`. Then, we destructure the `obj` object, and we are assigning the `a` property to the `a` variable, the `b` property to the `b` variable, and the `c` property to the `c` variable. This is how object destructuring is done.

Unlike in array destructuring, we don't have to destructure the object in the same order as the properties defined in the object. For example:

```javascript
const obj = {a: 1, b: 2, c: 3};
const {b, a, c} = obj;

console.log(a, b, c); // 1 2 3
```

#### Assigning New Variable Names

Assigning new variable names is the process of assigning a new name to a variable when destructuring an object. It is done by using the colon (`:`) operator. For example:

```javascript
const obj = {a: 1, b: 2, c: 3};
const {a: name1, b: name2, c: name3} = obj;

console.log(name1, name2, name3); // 1 2 3
```

In the code above, we are destructuring the `obj` object, and we are assigning the `a` property to the `name1` variable, the `b` property to the `name2` variable, and the `c` property to the `name3` variable. This is how we can assign new variable names when destructuring an object.

#### Assigning Default Values

Assigning default values is the process of assigning a default value to a variable if the value of the variable is `undefined`. For example:

```javascript
const obj = {a: 1, b: 2, c: 3};
const {a: name1, b: name2, c: name3, d: name4 = 4} = obj;

console.log(name1, name2, name3, name4); // 1 2 3 4
```

The `name4` variable is assigned the value of `4`, which is the default value because the `d` property is not defined in the `obj` object. If the property is defined in the object, then the default value will not be assigned to the variable. This is how we can assign default values to variables when destructuring an object.

#### Mutating Variables

Mutating variables is the process of changing the value of a variable. For example:

```javascript
let a = 111;
let b = 999;
const obj = {a: 23, b: 7, c: 14};

({a, b} = obj);

console.log(a, b); // 23 7
```

In the code above, we are creating two variables, `a` and `b`, and we are assigning them the values of `111` and `999`, respectively. Then, we are creating an object, `obj`, and we are assigning it three properties, `a`, `b`, and `c`. Then, we destructure the `obj` object, and we are assigning the `a` property to the `a` variable, and the `b` property to the `b` variable. This is how we can mutate variables when destructuring an object.

#### Object Nested Destructuring

Nested destructuring is the process of destructuring an object which is inside another object. For example:

```javascript
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4
  }
};

const {a, b, c: {d, e}} = obj;

console.log(a, b, d, e); // 1 2 3 4
```

In the code above, we are creating an object, `obj`, and we are assigning it three properties, `a`, `b`, and `c`. The `c` property is an object, and it has two properties, `d` and `e`. Then, we destructure the `obj` object, and we are assigning the `a` property to the `a` variable, the `b` property to the `b` variable, and the `c` property to the `c` variable. The `c` property is an object, and we are destructuring it, and we are assigning the `d` property to the `d` variable, and the `e` property to the `e` variable. This is called nested destructuring.

#### Object Destructuring in a Function

Destructuring an object in a function is the process of destructuring an object in a function. For example:

```javascript
const obj = {a: 1, b: 2, c: 3};

function destructuring({a, b, c}) {
  console.log(a, b, c);
}

destructuring(obj); // 1 2 3
```

In the code above, we are creating an object, `obj`, and we are assigning it three properties, `a`, `b`, and `c`. Then, we are creating a function, `destructuring`, and we are destructuring the `obj` object in the function. This is how we can destructure an object in a function.

#### Object Method Destructuring

Method destructuring is the process of destructuring an object which has a method. For example:

```javascript
const order: {
  price: 23,
  quantity: 2,
  total(price = this.price, quantity = this.quantity) {
    return price * quantity;
  }
};

const {total} = order;

console.log(total()); // 46

console.log(total(10, 5)); // 50
```

In the code above, we are creating an object, `order`, and we are assigning it three properties, `price`, `quantity`, and `total`. The `total` property is a method, and it has two parameters, `price` and `quantity`. Then, we destructure the `order` object, and we are assigning the `total` method to the `total` variable. This is how we can manipulate the `total` method by destructuring the `order` object. All other destructuring rules apply to the method destructuring as well, in this case, we can assign default values to the parameters of the `total` method.

**Note:** All of the rules can be combined.

See [this](./objects-destructuring.js) file for a full example.

---

### The Spread `...` Operator

The spread operator (also known as the "spread syntax") is a syntax introduced in ECMAScript 6 that allows an iterable (such as an array or string) to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

**Note:** The spread operator won't work in template literals.

Before the spread operator, we had to pass each element individually, for example:
  
```javascript
const arr = [1, 2, 3, 4, 5];
const badNewArr = [0, arr[0], arr[1], arr[2], arr[3], arr[4], 6];

console.log(badNewArr); // [0, 1, 2, 3, 4, 5, 6]
```

But, since the spread operator was introduced, we can pass the whole array, and the spread operator will expand the array, and it will pass each element individually, for example:

```javascript
const arr = [1, 2, 3, 4, 5];
const newArr = [0, ...arr, 6];

console.log(newArr); // [0, 1, 2, 3, 4, 5, 6]
```

In the code above, we are creating an array, `arr`, and we are assigning it five elements, `1`, `2`, `3`, `4`, and `5`. Then, we are creating a new array, `newArr`, and we are assigning it seven elements, `0`, `...arr`, and `6`. The `...arr` will expand the `arr` array, and it will pass each element individually.

The spread operator can be used in many places, such as the following:

#### Spread Operator in a Function

Using the spread operator in a function is the process of using the spread operator in a function. It will expend an iterable (such as an array or string) in places where zero or more arguments (for function calls) or elements (for array literals) are expected. For example:

```javascript
const arr = [1, 2, 3, 4, 5];

function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}

console.log(sum(...arr)); // 15
```

In the code above, we are creating an array, `arr`, and we are assigning it five elements, `1`, `2`, `3`, `4`, and `5`. Then, we are creating a function, `sum`, and we are passing the elements of the `arr` array as arguments to the function. This is how we can use the spread operator in a function. Traditionally, we would have to pass the arguments one by one to the function, i.e. `sum(arr[0], arr[1], arr[2], arr[3], arr[4])`.

#### Spread Operator in Array Literals

The spread operator can be used to expand an iterable (such as an array) into individual elements in an array literal. For example:
  
  ```javascript
const arr = [1, 2, 3, 4, 5];
const arr2 = [...arr, 6, 7, 8, 9, 10];

console.log(arr2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

### Spread Operator in Object Literals

The spread operator can be used to expand an iterable (such as an object) into individual elements in an object literal. For example:

```javascript
const obj = {a: 1, b: 2, c: 3};
const obj2 = {...obj, d: 4, e: 5, f: 6};

console.log(obj2); // {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6}
```

In the code above, we are creating an object, `obj`, and we are assigning it three properties, `a`, `b`, and `c`. Then, we are creating a new object, `obj2`, and we are assigning it six properties, `...obj`, `d`, `e`, and `f`. The `...obj` spread operator will expand the `obj` object, and it will pass each property individually.

Or, you can merge the two, for example:

```javascript
const a = { x: 1, y: 2 };
const b = { y: 3, z: 4 };
const c = { ...a, ...b };

console.log(c);  // { x: 1, y: 3, z: 4 }
```

In this example, the spread operator `...a` expands the properties of the `a` object into a new object literal, and the spread operator `...b` expands the properties of the `b` object into the same object literal. The resulting object `c` has the properties of both `a` and `b`, with the properties of `b` overwriting any properties with the same name in `a`. Without the spread operator, we would have to use the `Object.assign()` method to combine the two objects (e.g. `c = Object.assign({}, a, b)`).

#### Copying Objects with the Spread Operator

Remember how in previous chapters we were copying objects using the `Object.assign()` method? Well, now we can use the spread operator to copy objects. For example:

```javascript
const obj = {a: 1, b: 2, c: 3};
const obj2 = {...obj};

obj2.a = 4;

console.log(obj); // {a: 1, b: 2, c: 3}
console.log(obj2); // {a: 4, b: 2, c: 3}
```

That means that whenever we want to copy an object, we can use the spread operator instead of the `Object.assign()` method. The spread operator is much easier to use, and it is more readable while making sure not to mutate the original object.

For some practical examples of the spread operator, see [this](./spread-operator.js) file.
