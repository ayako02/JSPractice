// Hello, world!
console.log("hello");
console.log("testing repo");

// Variables and Types
let person = "Nick";
person = "John";
console.log(person);

var num = 33;
console.log("number: " + num);

var str = "Hello World";
console.log("string: " + str);

var boolean = true;
console.log("boolean: " + boolean);

var newVar;
console.log(newVar);

var emptyVar = null;
console.log(emptyVar);

// Arrays
var arrayList = ["fruits", "beverages", "hotpot"];
console.log("array list: " + arrayList);

var thesameArray = new Array(1, 2, 3);
console.log("the same array: " + thesameArray);

console.log(arrayList[1]);
console.log(arrayList["0"]);

var myArray = [];
myArray[3] = "hello";
console.log(myArray);

var newArrayList = ["Understanding array ", 12, true];
console.log(newArrayList[0] + newArrayList[1] + newArrayList[2]);

// Manipulating Arrays
// push & pop
var myStack = [];
myStack.push(1);
myStack.push(2);
myStack.push(9);
console.log("My stack: " + myStack);
console.log(myStack.pop());
console.log("my new stack: " + myStack);

// shift & unshift
var myQueue = [];
myQueue.push(78);
myQueue.push(2);
myQueue.push(3);
console.log("My queue: " + myQueue);
console.log(myQueue.shift());
console.log(myQueue.shift());
console.log(myQueue.shift());
console.log("My new queue: " + myQueue);

var a = [1, 2, 3, 4];
console.log("a: " + a);
a.unshift(100);
console.log("new a: " + a);

//splicing
var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log("arr: " + arr);

var splice = arr.splice(3, 5);
console.log("splice number: " + splice);
console.log("arr after splicing: " + arr);

var exeArray = [1, 2, 3, 4];
console.log("exercise array: " + exeArray);

exeArray.push(42);
console.log("after pushing a number: " + exeArray);

exeArray.shift();
console.log("after shifting a number: " + exeArray);

// Operators
console.log("The number of pets is : " + 8);
console.log(3 / 5);
console.log(5 % 3);

var n = 10;
console.log("n1: " + (n = n / 5));
console.log("n2: " + (n /= 5));

console.log("n3: " + (n = n + 5));
console.log("n4: " + (n += 5));
console.log((n += 5));
console.log((n = n + 5));
console.log("n5: " + (n %= 5));

var firstName = "John";
var lastName = "Smith";
var myNum = 21;

var fullName = firstName + " " + lastName;
var age = myNum * 2;

console.log("His name is " + fullName);
console.log("His age is " + age);

// Conditions

//var confirm = true;
var confirm = false;
if (confirm == true) {
  console.log("Hello");
} else {
  console.log("Goodbye");
}

var foo = 1;
var bar = 2;
var moo = 3;

if (foo < bar && moo > bar) {
  console.log("foos is smaller than bar AND moo is larger than bar.");
}

if (foo < bar || moo > bar) {
  console.log("foo is smaller than bar OR moo is larger than bar.");
}

var notTrue = false;
if (!notTrue) {
  console.log("1. not not true is true!");
} else {
  console.log("2. not not true is false");
}
// condition: notTrue = true & if(notTrue), output: no.1
// condition: notTrue = true & if(!notTrue), output: no.2
// condition: notTrue = false & if(notTrue), output: no.2
// condition: notTrue = false & if(!notTrue), output: no.1

//switch statement

var rank = "Captain";
switch (rank) {
  case "Private":
  case "Sergeant":
    console.log("You are not authorized.");
    break;
  case "Commander":
    console.log("Hello Commander! what can i do for you today?");
    break;
  case "Captain":
    console.log("Hello Captain! I will do anything you wish.");
    break;
  default:
    console.log("I don't know what your rank is.");
    break;
}

function checkNum(num) {
  if (num === 42) {
    console.log("correct");
  } else {
    console.log("incorrect");
  }
}

checkNum(11);
checkNum(42);
checkNum(55);

// Loops
var i;
for (i = 0; i < 3; i += 1) {
  console.log(i);
}

var arr1 = ["A", "B", "C"];
for (var i = 0; i < arr1.length; i++) {
  console.log("The member of arr1 in index " + i + " is " + arr1[i]);
}

var i = 10;
while (i > 0) {
  console.log(i + "bottles of beer on the wall");
  i -= 1;
}

// while (true) {
//   console.log(i + "bottles of beer on the wall");
//   i -= 1;
//   if (i == 0) {
//     break;
//   }
// }

for (var i = 0; i < 10; i++) {
  //check that the number is even
  if (i % 2 == 0) {
    continue;
  }
  //if we got here, then i is odd.
  console.log(i + " is an odd number.");
}

var fruits = ["banana", "mango", "apple", 88];
for (var i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

//Objects
var emptyObj = {};
var personObj = {
  firstName: "John",
  lastName: "Smith"
};
personObj.age = 23;
personObj.hobby = "Ice Skating";
personObj["salary"] = 18000;

for (var member in personObj) {
  if (personObj.hasOwnProperty(member)) {
    console.log(
      "the member " + member + " of personObject is " + personObj[member]
    );
  }
}

var newPerson = {
  firstName: "Hakuna ",
  lastName: " Matata",
  age: 19,
  employed: true
};

console.log("Name: " + newPerson.firstName + newPerson.lastName);
console.log("Age: " + newPerson.age);
console.log("Employed status: " + newPerson.employed);

// Functions

function greet(name) {
  return "Hello " + name + "!";
}
console.log(greet("Hakuna"));

var greet = function(name) {
  return "Hello " + name + "!";
};
console.log(greet("Matata"));

function multiply(num) {
  return num * 5;
}
console.log(multiply(10));
console.log(multiply(2));
console.log(multiply(8));

// Callback Function

var callback = function() {
  console.log("Done!");
};
setTimeout(callback, 1000);

setTimeout(function() {
  console.log("Done!");
}, 1000);

function userCallBack(callback) {
  newCallback("yeah!");
  newCallback(2);
  newCallback(3);
}

function newCallback(sentence) {
  console.log(sentence);
}

userCallBack(newCallback);

// Object Oriented JS

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;

  this.fullName = function() {
    return this.firstName + " " + this.lastName;
  };
}

var myPerson = new Person("John", "Smith");
console.log(myPerson.fullName());

var myPet = {
  name: "Hero",
  breed: "Boxer",

  dog: function() {
    return this.name + " the " + this.breed;
  }
};
console.log(myPet.dog());

function People(name, age) {
  this.name = name;
  this.age = age;

  this.describe = function() {
    return this.name + ", " + this.age + " years old";
  };
}

var mikasa = new People("Mikasa", 18);
var eren = new People("Eren", 18);
console.log(mikasa.describe());
console.log(eren.describe());
