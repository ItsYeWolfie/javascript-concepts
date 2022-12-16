# JAVASCRIPT CONCEPTS

- [JAVASCRIPT CONCEPTS](#javascript-concepts)
  - [THE JAVASCRIPT ENGINE AND RUNTIME](#the-javascript-engine-and-runtime)
    - [JS Engine](#js-engine)
    - [CALL STACK](#call-stack)
    - [HEAP](#heap)
    - [COMPILATION VS. INTERPRETATION](#compilation-vs-interpretation)
    - [How does JIT work in Javascript?](#how-does-jit-work-in-javascript)
      - [JAVASCRIPT Runtime](#javascript-runtime)
        - [WEB APIs](#web-apis)
        - [Callback Queue](#callback-queue)
  - [EXECUTION CONTEXT AND THE CALL STACK](#execution-context-and-the-call-stack)
    - [What is an execution context?](#what-is-an-execution-context)
    - [What's inside an execution context?](#whats-inside-an-execution-context)
    - [Call stack](#call-stack-1)
  - [SCOPE AND SCOPE CHAIN](#scope-and-scope-chain)
    - [Scope Concepts](#scope-concepts)
    - [Global Scope](#global-scope)
    - [Function Scope](#function-scope)
    - [Block Scope (ES6)](#block-scope-es6)
    - [Scope Chain](#scope-chain)
    - [Scope chain vs. Call stack](#scope-chain-vs-call-stack)
    - [Summary](#summary)
  - [Hoisting in JavaScript](#hoisting-in-javascript)

## THE JAVASCRIPT ENGINE AND RUNTIME

### JS Engine

Program that executes JAVASCRIPT code.

### CALL STACK

Where our code is actually executed using execution context. See [execution context](#execution-context-and-the-call-stack) for more info.

### HEAP

Unstructred memory pool which stores all the objects that our application needs.

### COMPILATION VS. INTERPRETATION

**Compilation:** Entire code is converted into machine code at once, and written to a binary file that can be executed by a computer.

Source Code - (Compilation)> Portable file (machine code) - (Execution) > Program running

**Interpretation:** Interpreter runs through the source code and executes it line by line.

Source Code -(Execution line by line, code still needs to be converted to machine code)> Program running

Compilation is way faster than interpretation.

Javascript uses JIT(Just-in-time) compilation (mix b/w Compilation & Interpretation)
Source Code -(Compilation, not a portable file)> Machine code -(Execution)> Program running

### How does JIT work in Javascript?

The code first is parsed into AST (abstract syntax tree) - it splits up each line of code into pieces that are meaningful to the language - like const/function keywords, and saves all of those pieces into the tree in a structured way, while checking for syntax errors at the same time.

Then comes compilation, it takes the generated AST and compiles it into machine code, then the machine code gets executed right away. It doesn't stop at that moment, javascript will execute a very unoptimized machine code at first, but during execution, the machine code is optimized and recompiled during the execution.

#### JAVASCRIPT Runtime

##### WEB APIs

- DOM,
- Timers,
- Fetch API, ...

What are they? They are not part of the JS language, they are part of the browser, and they are not part of the JS engine. (Functionalities provided to the engine, accessible on the window object. (e.x: window.setTimeout))

##### Callback Queue

Callback functions, for e.x when an event is called (e.x an onClick), the callback function is put into the callback queue. Then, when the stack is empty, the callback function is passed to the stack so that it can be executed. And this happens due to event loop, it takes callback functions from the callback queue and puts them into the call stack so they can be executed.

## EXECUTION CONTEXT AND THE CALL STACK

### What is an execution context?

After compilation, a so-called global execution context is created for the top level code (code that is not inside any function), after that is finished, the execution of top-level code inside global EC happens, and only then the execution of functions happens while waiting for callbacks. (e.x: click event callback)

Exactly one global execution context (EC) happens, that is for top-level code. But, an execution context is created per each function. (for each function call, a new execution context is created)

### What's inside an execution context?

- Variable environment:
  - let,
  - const,
  - var declarations,
  - functions,
  - arguments object (not in arrow functions)),
- The scope chain,
- The this keyword (not in arrow functions)
  All of this is genereated during "creation phase", right before execution.

Arrow functions don't have the arguments object & this keyword, they can instead use them from their closest regular function parent.

````javascript
const name = 'ItsYeWolfie';

const first = () => {
  let a = 1;
  const b = second(7,9);
  a = a + b;
  return a;
};

function second(x, y) {
  var c = 2;
  return c;
};

const x = first();```
````

| Scope chain: [global] |
| --------------------- |
| name: ItsYeWolfie     |
| first: function       |
| second: function      |
| x: unknown            |

| Scope chain: [first, global] |
| ---------------------------- |
| a: 1                         |
| b: unknown                   |

| Scope chain: [second, first, global] |
| ------------------------------------ |
| c: 2                                 |
| arguments: {0: 7, 1: 9}              |

Arguments are an array of all the arguments passed into the function. (not in arrow functions)

How will the engine keep track of the order of execution of functions? It will use a data structure called the call stack.

### Call stack

LIFO (Last In First Out) data structure, where the last function that gets pushed into the stack is the first one to be popped out of the stack when the execution is finished.

It is as if you bought pizzas together with your friends, and you put them on a table in order to keep track of who bought which pizza. The last pizza you bought is the first one you eat, and the first pizza you bought is the last one you eat.

For example in the code above, the call stack will look like this:

```javascript
global execution context
x calls first()
first()
first() calls second()
second()
```

So the first function that gets popped out of the stack is second(), then first(), then x, and finally the global execution context.
What does this mean? It means that the execution of the code happens in the same order as the functions are called. (first `x`, then `first`, then `second`)
This is called synchronous execution, and it is the default behavior of javascript, it will do one thing at a time, in the order that it is written, and it will wait for the execution of the current function to finish before moving on to the next one.

```javascript
const name = 'ItsYeWolfie';

const first = () => {
  const greet = 'Hi';
  second();
  const bye = 'Bye';
};

function second() {
  const message = 'Hey!';
  third();
}

function third() {
  const hi = 'Hello!';
}

first();
```

| Call stack |
| ---------- |
| third()    |
| second()   |
| first()    |
| global     |

## SCOPE AND SCOPE CHAIN

### Scope Concepts

Scope is the visibility of variables. (where can we access a certain variable?) How our program's variables are organized and accessed. "Where can we access a certain variable?", "Where do we have access to a certain variable?" or "Where was a certain variable defined in the code?"

- **Lexical scope:** A function that is lexically within another function gets access to the scope of the outer function. (e.x: a function defined inside another function has access to the variables of the outer function)

- **Scope:** Space or environment in which a certain variable is declared, that determines its accessibility. (visibility).
  - There are three types of scope:
    - Global scope
    - Function scope
    - Block scope
- **Scope of a variable:** Region of your code where you have access to a certain variable.

### Global Scope

```javascript
const name = 'ItsYeWolfie';
const job = 'Fellow';
const year = 2001;
```

- Global scope is the default scope in javascript.
- It is the outermost scope in javascript. (outside of any function or block)
- Variables defined in the global scope are accessible from anywhere in the code.

### Function Scope

```javascript
function calcAge(birthYear) {
  const age = 2022 - birthYear;
  return age;
}

console.log(age); // ReferenceError: age is not defined
```

- Variables defined inside a function are not accessible from outside the function.
- Also called local scope, because the variables are only accessible inside the function.

### Block Scope (ES6)

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

### Scope Chain

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

The secret is that every scope has access to the variables of all its parent scopes. This is called the scope chain. That means that the second() function has access to the variables of the first() function, and the first() function has access to the variables of the global scope. How does this work? The second `scope()` will look for the variable it needs in its own scope, and if it doesn't find it there, it will look in the scope of its parent, and so on, until it finds the variable it needs, or it reaches the global scope, and if it doesn't find the variable there, it will throw a `ReferenceError`.

This is called the **variable lookup**, and it is how the javascript engine finds the value of a variable, this only works **upwards**, it will **_never look downwards_**, so the `second()` function will never have access to the variables of a `third()` function.

The `millenial` variable is accessible from the `second()` function, because it is defined by the `var` keyword (which is exempt from the block scope), and the `decade` variable is not accessible from the `second()` function, because it is defined by the `const` keyword (which is not exempt from the block scope) - **var** is function scoped, **let** and **const** are block scoped.

The final scope chain will look like this:

| Global Scope      | first() Scope     | if block Scope    | second() Scope    |
| ----------------- | ----------------- | ----------------- | ----------------- |
| name: ItsYeWolfie | age: 21           | age: 21           | age: 21           |
|                   | millenial: true   | millenial: true   | millenial: true   |
|                   | name: ItsYeWolfie | name: ItsYeWolfie | name: ItsYeWolfie |
|                   |                   |                   | job: Fellow       |

Due to lexical scope, the `if else` cannot access the `job` variable, because it is defined in the `second()` function, which is not a parent of the `if else` block, they are merely siblings.

### Scope chain vs. Call stack

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

### Summary

- Scope determines the accessibility (visibility) of variables. It asks the question "where can we access a certain variable?", "where do variables live?".
- There are 3 types of scope: global scope, function scope and block scope.
- Variables defined in the global scope are accessible from anywhere in the code.
- Only `let` and `const` are block-scoped, `var` is function-scoped.
- In JavaScript, we have lexical scope, which means that scope is defined by the placement of functions and blocks in the code, not by where the functions and blocks are called.
- Every scope always has access to the variables of its parent scope, but not the other way around.
- When a variable is not in the current scope, the scope chain is used to look for the variable in the parent scope, and so on, until the variable is found, or the global scope is reached, and if the variable is not found in the global scope, a `ReferenceError` is thrown.
- The scope chain is a one-way street, it goes from the current scope to the global scope, but not the other way around.
- The scope chain in a certain scope is equal to adding together all the variable environments of all the parent scopes.
- The scope chain has nothing to do with the order in which functions are called, it has to do with the order in which functions are written in the code.

Check [this](scoping.js) for practice.

## Hoisting in JavaScript

**Hoisting** is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. Inevitably, this means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local.

**Before execution,** code is scanned for variable declarations and for each variable, a new property is created in the Variable Environment Object. **After that, the code is scanned for function declarations, and for each function, a new property is created in the Variable Environment Object.**

|                                 | Hoisted? | Initial value               | Scope                  |
| ------------------------------- | -------- | --------------------------- | ---------------------- |
| function declaration            | Yes      | function                    | Block(Strict)/Function |
| var variable                    | Yes      | undefined                   | Function               |
| let and const variables         | No       | unitialized,TDZ             | Block                  |
| function expressions and arrows | No       | Depends if var or let/const | Block                  |

<!--
### Temporal Dead Zone, Let and Const

```javascript
const myName = 'ItsYeWolfie';

if (myName === 'ItsYeWolfie') {
  console.log(`${myName} is a ${job}`);
  const age = 2022 - 2001;
  console.log(age);
  const job = 'Fellow';
  console.log(x);
}
``` -->
