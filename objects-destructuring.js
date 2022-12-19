// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
};

// Destructuring objects
// In objects, the order does not matter, because we are not accessing the elements by their position.
const { name, openingHours, categories } = restaurant;

console.log(name, openingHours, categories); // Classico Italiano { thu: { open: 12, close: 22 }, fri: { open: 11, close: 23 }, sat: { open: 0, close: 24 } } [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ]

// We can also change the name of the variables
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;

console.log(restaurantName, hours, tags); // Classico Italiano { thu: { open: 12, close: 22 }, fri: { open: 11, close: 23 }, sat: { open: 0, close: 24 } } [ 'Italian', 'Pizzeria', 'Vegetarian', 'Organic' ]

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;

console.log(menu, starters); // [] [ 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad' ]

// Mutating variables
let a = 111;
let b = 999;

const obj = { a: 23, b: 7, c: 14 };

// We can mutate the variables a and b by using the same names as the properties of the object
({ a, b } = obj); // We need to wrap the expression in parentheses, because the curly braces are interpreted as the beginning of a block

console.log(a, b); // 23 7

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;

console.log(o, c); // 11 23

// Destructuring in methods
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// Order received! Garlic Bread and Risotto will be delivered to Via del Sole, 21 at 22:30

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// Order received! Bruschetta and Pizza will be delivered to Via del Sole, 21 at 20:00
