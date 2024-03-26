let message = 'Hello!'; // variables. Note. old way is using var keyword
alert(message);
message = "world!";

const COLOR_RED = "#F00"; // constants
let color = COLOR_RED;

// Arithmetic
let x = 100 + 50;
console.log(x);

x = 0.2 + 0.1;
console.log(x)

x = "100";
let y = "10";
console.log(x/y);

// NaN - Not a number
// NaN is a Javascript reserved word indicating that a number is not a legal number
x = 100 / "Apple";
console.log(x);


/* 
    Practicing DOM manipulation 
*/
const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "Javascript DOM manipulation, new text-content";

const redText = document.createElement("p");
redText.textContent = "Hey I'm red!";
redText.style.color = "red";

const blueText = document.createElement("h3");
blueText.textContent = "I'm a blue h3!";
blueText.style.color = "blue";

// Nested div
const anotherDiv = document.createElement("div");
anotherDiv.style.backgroundColor = "pink"
anotherDiv.style.borderColor = "black";
const innerH = document.createElement("h1");
innerH.textContent = "I'm in a div";
const innerP = document.createElement("p");
innerP.textContent = "ME TOO!";
// Nested children
anotherDiv.appendChild(innerH);
anotherDiv.appendChild(innerP);

container.appendChild(content);
container.appendChild(redText);
container.appendChild(blueText);
container.appendChild(anotherDiv);

// 2. Event. Using onclick, you are restricted to only 1 though
const btn = document.querySelector('#btn');
btn.onclick = () => alert ("Hello world2");

// 3. Event. Using event listeners, you can add multiple of them
const btn2 = document.querySelector("#btn2");
btn2.addEventListener("click", () => {
  alert("Hello World3");
});
// Using method 3 approach by abstracting to a function
function printFunction() {
    console.log("Print event");
}
btn2.addEventListener("click", printFunction);
// Passing in function(e) which is callback function.
// e paramter contains object reference of the EVENT itself
// can be used to determine which button/key was pressed, or  reinfo about event's target - the DOM node clicked
// 
// Note. can't use arrow function to reference Event object. This is b/c arrow function can't reference `this`
// Arrow function changes the value of `this`
btn2.addEventListener("click", function (e) {
    console.log(e.target); // print DOM node, event's target that was clicked
    e.target.style.background = "blue"; // change background color after click
});

// Attaching listeners to list of nodes
const buttons = document.querySelectorAll("#nodes");
buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
        console.log(e.target);
        e.target.style.background = "orange";
    });
});


// Shopping list example to practice DOM manipulation
const myList = document.querySelector("#my-list");
const itemInput = document.querySelector("#item-input");
const addBtn = document.querySelector("#add-btn");
function createItem() {
    const currVal = itemInput.value;
    itemInput.value = '';
    
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const listBtn = document.createElement("button");
    listItem.appendChild(span);
    listItem.appendChild(listBtn);
    span.textContent = currVal;
    listBtn.textContent = 'Delete';
    myList.appendChild(listItem);

    // Add event handler to handle delete btn
    listBtn.addEventListener("click", () => {
        // Delete the list item
        myList.removeChild(listItem);
    });
    // Refocus on input field
    itemInput.focus();
};

addBtn.addEventListener("click", createItem);

// Page load events:

// When you open a page, the following events occur in sequence:
// DOMContentLoaded – the browser fully loaded HTML and completed building the DOM tree. However, it hasn’t loaded external resources like stylesheets and images. In this event, you can start selecting DOM nodes or initialize the interface.
// load – the browser fully loaded the HTML and also external resources like images and stylesheets.

// When you leave the page, the following events fire in sequence:
// beforeunload – fires before the page and resources are unloaded. You can use this event to show a confirmation dialog to confirm if you really want to leave the page. By doing this, you can prevent data loss in case you are filling out a form and accidentally click a link to navigate to another page.
// unload – fires when the page has completely unloaded. You can use this event to send the analytic data or to clean up resources.
// Note. should never use `unload` event cause not reliable on mobile and causes issue w/ bfcache. Use `pagehide` instead

document.addEventListener('DOMContentLoaded',() => {
    // handle DOMContentLoaded event
});

document.addEventListener('load',() => {
    // handle load event
});

document.addEventListener('beforeunload',() => {
    // handle beforeunload event
});

document.addEventListener('unload',() => {
    // handle unload event
});



/* 
    OBJECTS
*/

// Objects are used to store key, value collections of various data and entities

let a = new Object(); // object constructor
let b = {}; // object literal 
b = { // object, properties are key, value pairs
    name: "John",
    age: 30
};

console.log("Object values: ", b.name, b.age);

// Remove object property
delete b.age;

// Property value shorthand
function makeUser(name, age) {
    // return {
    //   name: name,
    //   age: age,
    //   // ...other properties
    // };
    return {
        name, // same as name: name
        age,  // same as age: age
        // ...
      };
  }
  
let user = makeUser("John", 30);
console.log(user.name); // John

// Property existence, "in" operator
console.log("age" in user);

// for..in loop
for (key in object) {
    // executes the body for each key in object's properties
}

// Objects as properties for objects
const person = {
    name: {
        first: "bob",
        last: "smith"
    },
    // ...
};
console.log(person.name.first);      // dot notation
console.log(person["name"]["first"]) // bracket notation

// Creating new members, assigning functions
person.farewell = function () {
    console.log("Bye!");
};
person.farewell();



/*
    this keyword
*/
const person2 = {
    name: "chris",
    introduceSelf() {
        console.log(`Hi! I'm ${this.name[0]}.`);
    }
}
// this keyword refers to current object the code is written inside.


/*
    Constructors
*/

// W/o constructor, this looks long
function createPerson(name) {
    const obj = {};
    obj.name = name;
    obj.introduceSelf = function () {
      console.log(`Hi! I'm ${this.name}.`);
    };
    return obj;
}
const john = createPerson("john");

// w/ constructor, always start with capital letter
function Person(name) {
    this.name = name;
    this.introduceSelf = function () {
        console.log("Hi! I'm ${this.name}");
    }
}
const frank = new Person("frank") // using new keyword to call Person() constructor



/*
    Intermediate array use
*/

// map
// Takes in callback function as argument
// automatically iterates the array and run the function
function addOne(num) {
    return num + 1;
}
const arr = [1, 2, 3, 4, 5];
arr.map(addOne); // Outputs: [2, 3, 4, 5, 6]

// filter
// similar to map, iterate thru array and applies callback function
// However, returns orig values of array only IF callback function returns true on that value
function isOdd(num) {
    return num % 2 !== 0;
}
arr.filter(isOdd);

// reduce 
// callback function takes 2 arguments instead of 1
// 1st arg: accumulator - current value of the result at that point
// 2nd arg: initalValue - can set an inital value
arr.reduce((total, currentItem) => total * currentItem, 1); // Outputs multiplicative summation


// Exercise: create a function that sums all evens which are multiplied by 3
function sumOfTripledEvens(array) {
    return array
      .filter((num) => num % 2 === 0)
      .map((num) => num * 3)
      .reduce((acc, curr) => acc + curr);
  }

/*  
    More map, filter, reduce practice
*/
// https://www.youtube.com/watch?v=HB1ZC7czKRs
// https://github.com/wesbos/JavaScript30/blob/master/04%20-%20Array%20Cardio%20Day%201/index-START.html

const inventors = [
    { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
    { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
    { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
    { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
    { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
    { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
    { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
    { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
    { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
    { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
    { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
  ];

  const people = [
    'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
    'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
    'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
    'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
    'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
  ];
  
  // Array.prototype.filter()
  // 1. Filter the list of inventors for those who were born in the 1500's
  const fifteen = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600))

  // Array.prototype.map()
  // 2. Give us an array of the inventors first and last names
  const fullNames = inventors.map(inventor => `${inventor.first} ${inventor.last}`)

  // Array.prototype.sort()
  // 3. Sort the inventors by birthdate, oldest to youngest
const ordered = inventors.sort((a,b) => a.year > b.year ? 1 : -1);

  // Array.prototype.reduce()
  // 4. How many years did all the inventors live all together?
const totalYears = inventors.reduce((total, inventor) => {
    return total + (inventor.passed - inventor.year);
}, 0);

  // 5. Sort the inventors by years lived
  const oldest = inventors.sort((a,b) => (a.passed-a.year) > (b.passed-b.year) ? -1 : 1);

  // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
  // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris


  // 7. sort Exercise
  // Sort the people alphabetically by last name
  const alpha = people.sort((lastOne, nextOne) => {
    const [aLast, aFirst] = lastOne.split(', ');
    const [bLast, bFirst] = nextOne.split(', ');
    return aLast > bLast ? 1 : -1;
  });

  // 8. Reduce Exercise
  // Sum up the instances of each of these
  const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];


/** some(), every(), find() methods */

  