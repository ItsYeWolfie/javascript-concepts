function calcAge(birthYear) {
	const age = 2022 - birthYear;
	// console.log(name); // ESLint will throw an error here, but it will still work

	function printAge() {
		const output = `${name}, you are ${age}, born in ${birthYear}`;
		console.log(output); // ItsYeWolfie, you are 27, born in 1995

		if (birthYear >= 1981 && birthYear <= 1996) {
			// If you remove name below, the name will be ItsYeWolfie, because it is in the global scope
			const name = 'Shapiro';

			// Reassigning outer scope's variable
			output = 'New output';
			var millenial = true;
			const str = `Oh, and you're a millenial, ${name}`;
			console.log(str); // Oh, and you're a millenial, Shapiro

			function add(a, b) {
				return a + b;
			}

			// const output = 'New output'; // TypeError: Assignment to constant variable.
		}

		// console.log(str); // ReferenceError: str is not defined
		console.log(millenial); // true (var is function scoped, not block scoped)
		// console.log(add(2, 3)); // 5 (function is function scoped, not block scoped, this works because strict mode is not enabled)
		console.log(output); // It wouldn't be 'New output' if const output was defined in the if block. It would be 'ItsYeWolfie, you are 27, born in 1995'
	}
	printAge();

	return age;
}

const name = 'ItsYeWolfie';

calcAge(1995);

// console.log(age); // ReferenceError: age is not defined
// printAge(); // ReferenceError: printAge is not defined
// console.log(millenial); // ReferenceError: millenial is not defined
