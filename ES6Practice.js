console.log("Hello ES6");

// Let Keyword
var x = 10;

if (x > 5) {
  // var x = 5;             // output = 5
  let x = 5; // output = 10
  console.log("inside function: " + x);
}
console.log("outside function: " + x);

/*

- let variables is only visible inside the func.
- var variables is visible to the whole func.

*/

var items = [0, 1, 2, 3];

for (var i = 0; i < items.length; i++) {
  console.log(items[i]);
}

console.log(i);
/* 
output = 4, because x is incrementing each time around in the for loop
and the final result is I. when it gets until here it will return 4
*/

for (let l = 0; l < items.length; l++) {
  console.log(items[l]);
}

// Default Parameters

function logNinja(name = "Ryu", belt = "Red", age = 25) {
  console.log(
    "My name is " +
      name +
      " and my belt colour is " +
      belt +
      " and my age is " +
      age
  );
}

logNinja("Takeshi", "gold", 40);

// The spread operator

var meats = ["ham", "salami", "bacon"];
console.log(meats);
console.log(...meats);

var num1 = [1, 2, 3];
//var num2 = [4, 5, 6];               //output:Array(3) [4, 5, 6]
//var num2 = [num1, 4, 5, 6];         //output: Array(4) [Array(3), 4, 5, 6]
var num2 = [...num1, 4, 5, 6];

console.log(num2);

var nums = [3, 5, 7];

function addNums(a, b, c) {
  console.log(a + b + c);
}

//addNums(nums);            //output: 3,5,7undefinedundefined
addNums(...nums);

// Template Strings

var fruits = "banana";
console.log(`yo, ${fruits}`);

function logNinjaa(name, age) {
  // console.log("my name is " + name + " and my age is " + age);
  console.log(`my name is ${name} and my age is ${10 + 9}`);
}

logNinjaa("Takeshi", 20);

// New String Methods

var fruit = "banana ";
console.log(fruit.repeat(5));
console.log(fruit.startsWith("ba"));
console.log(fruit.startsWith("ns"));
console.log(fruit.endsWith("na "));
console.log(fruit.endsWith("ban", fruit.length - 4));
console.log(fruit.includes("na"));
console.log(fruit.includes("naaa"));

if (fruit.startsWith("banana")) {
  var newFruit = "Papaya";
}
console.log(`you say ${fruit}, I say ${newFruit}`);

// object literal enhancement

var phone = "iPhone";
var model = "X";

var smartphone = {
  phone,
  model,
  /*
  message: function(x) {
    console.log("i love iPhone " + x);
  }
  */

  //ES6 way:
  message(x) {
    console.log(`i love iPhone ${x}`);
  }
};

console.log(smartphone.message(8));

// Arrow functions

/*  normal function:

var ninjaGreetings = function() {
  console.log("hiiiiya");
};

*/

var ninjaGreetings = name => console.log(`${name} says hiiiiya`);

ninjaGreetings("Ranma");

var ninja = {
  name: "Ryu",
  chop(x) {
    //var _this = this;
    setInterval(() => {
      if (x > 0) {
        console.log(this.name + " chopped the enemy");
        x--;
      }
    }, 1000);
  }
};

ninja.chop(3);

function myFunc() {
  this.myVar = 0;
  var that = this;
  // setTimeout(function() {
  //   that.myVar++;
  //   console.log(that.myVar);    //output: 1
  //   console.log(this.myVar);    //output: undefined
  // }, 0);
  setTimeout(() => {
    this.myVar++;
    console.log(this.myVar);
  }, 0);
}

myFunc();

// Sets

var names = new Set();

names
  .add("McDonald")
  .add("Suki-ya")
  .add("PizzaHut")
  .add("Suki-ya");
names.delete("Suki-ya");
//names.clear();          // delete all elements in names

console.log(names.size);
// output: 3, because it has 3 different elements in the sets

console.log(names.has("PizzaHut"));
console.log(names.has("Suki-ya"));
// to check whether the specific elements exist or not

console.log(names);

var food = ["burger", "fries", "pizza", "burger", "fries", "cakes"];

var moreFoods = new Set(food);
console.log(moreFoods);

food = [...moreFoods];
console.log(food);

// Generators

// next() func is like a play button
// yield keyword is like a pause button
function* dogs() {
  var x = yield "Boxer";
  var y = yield "Beagle";
  var z = yield "Husky";
  return x + y + z;
}

var moreDogs = dogs();
console.log(moreDogs.next());
console.log(moreDogs.next(10));
console.log(moreDogs.next(20));
console.log(moreDogs.next(30));

// Constants
const pi = 3.142;

function calcArea(r) {
  //pi = 10;          //will caught error
  const pi = 10; //this will work
  console.log("The area is: " + pi * r * r);
}

calcArea(5);
