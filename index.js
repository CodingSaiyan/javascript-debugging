const _ = require('lodash')
const movies = require('./movies.json')
//Functional programming overview 

//Functional programming 
// Functional programming (often abbreviated FP) is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects. Functional programming is declarative rather than imperative, and application state flows through pure functions.
//Great article on functional programming https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0
//Great article on imperative vs declarative programming
// https://tylermcginnis.com/imperative-vs-declarative-programming/


//Shared state and how it relates to Redux 
// With shared state, the order in which function calls are made
// changes the result of the function calls.
const x = {
    val: 2
  };
  
  const x1 = () => x.val += 1;
  
  const x2 = () => x.val *= 2;
  
  x1();
  x2();
  
//   console.log(x.val); // 6
  
  // This example is exactly equivalent to the above, except...
  const y = {
    val: 2
  };
  
  const y1 = () => y.val += 1;
  
  const y2 = () => y.val *= 2;
  
  // ...the order of the function calls is reversed...
  y2();
  y1();
  
  // ... which changes the resulting value:
//   console.log(y.val); // 5

  //Avoiding shared state example - Redux approach 
  const a = {
    val: 2
  };
  
  const a1 = a => Object.assign({}, a, { val: a.val + 1});
  
  const a2 = a => Object.assign({}, a, { val: a.val * 2});
  
  //This is called function composition. One function will evaluate and return a value, which will be passed to the next function
  console.log(a1(a2(a)).val); // 5
//   console.log(a)
  
  
  const b = {
    val: 2
  };
  
  // Since there are no dependencies on outside variables,
  // we don't need different functions to operate on different
  // variables.
  
  // this space intentionally left blank
  
  
  // Because the functions don't mutate, you can call these
  // functions as many times as you want, in any order, 
  // without changing the result of other function calls.
  a2(b);
  a1(b);
  
  console.log(); // 5

  //Imperative vs declarative - allows us to utilize functions to abstract logic away

  //you go to red lobster and want to get a table 
//   An imperative approach (HOW): I see that table located under the Gone Fishin’ sign is empty. My husband and I are going to walk over there and sit down.

// A declarative approach (WHAT): Table for two, please.

//Problem to solve 
//Write a function called double which takes in an array of numbers and returns a new array after doubling every item in that array. double([1,2,3]) -> [2,4,6]

//Imperative approach 
function double (arr) {
    let results = []
    for (let i = 0; i < arr.length; i++){
      results.push(arr[i] * 2)
    }
    return results
}

//Declarative approach 
function double2 (arr) {
    //We get the same result, but we utilize a higher order function to do so
    // A higher-order function is a function that can take another function as an argument, or that returns a function as a result.
    return arr.map((item) => item * 2)
}

//Callbacks and Methods Reviews 

//Callbacks 
function add10(num) {
    return num + 10;
}

function minus10(num) {
    return num - 10;
}

function doMath(num, cb) {
    // console.log('Cb is a function', cb)
    //cb(num) will evaluate before return, so add10 will run all the way through before the cb returns
    //The value of cb is not determined until we invoke this function
    return cb(num)
}

// console.log(doMath(10, add10))
// console.log(doMath(10, minus10))

//.map 
let numbers = [0, 10, 20, 30, 40, 50]

//Two different ways to do callbacks 

//1. Passing a named function
let mapped = numbers.map(add10)

//2. Passing an in line anonymous function 
let mapped2 = numbers.map( num => num + 10)
// console.log(mapped)
// console.log(mapped2)

//Filter 
let names = ['John', 'James', 'Rachel', 'Michone', 'Rick', 'Taylor']

let filtered = names.filter( name => {
    //This function is getting called once for every name in the names array. It is passed the name in the array. All the function cares about is returning a true or false value based on whether the name is John or Rachel
    return name == 'John' || name == 'Rachel'
})

// console.log(filtered)

//Chained functions 
let myNums = [1, 2, 3, 4, 5]
//Since the return value of map is another array, it will map all the way through the original array and return an array which we can invoke filter on
let greaterThan5 = myNums.map(num => num * 2).filter(num => num > 5)
// console.log(greaterThan5)

//*** Lodash ***/
let newMovies = _.map(movies, movie => {
    let {title, year} = movie;
    return {
        title, year
    }
})
// console.log(newMovies[0])

let myObj = {
    test: 'Hello',
    goodbye: 'world'
}

function pushKeys(key, value) {
    return key
}  


let keys = _.map(myObj, pushKeys)
// console.log(keys)

// _.forEach(movies, movie => console.log(movie.title))

//This is a good place to do the debugger for the first time
//Set result.title = [] instead of result.titles
let reduced = _.reduce(movies, (result, movie) => {
    // debugger;
    result.titles ? result.titles.push(movie.title) : result.title = []
    return result;
}, {})
// console.log(reduced)


//Bring in more lodash functions
//Returns first item where provided expression evaluates to true
let found = _.find(movies, movie => movie.title === 'Psycho')
// console.log(found)

let nums1 = [1, 2, 3, 4, 5, 6, 7]
let nums2 = [1, 5, 6, 7, 7, 7, 7]

//union provides a union of the two arrays returning unique values
let union = _.union(nums1, nums2)
// console.log(union)

//provides unique array with only values found in both arrays
let unique = _.uniq(nums2)
// console.log(unique)

let grouped = _.groupBy(movies, 'imdbRating')
// for(let key in grouped) {
//     console.log(key)
// }

//Callstack and step into function 
function one() {
    return 1;
}

function two(cb) {
    return 2 + cb()
}

function three(cb1, cb2) {
    return 3 + cb1(cb2)
}

function four(cb1, cb2, cb3) {
    // debugger;
    return 4 + cb1(cb2, cb3)
}

// console.log(four(three, two, one))

//Move into using chrome dev tools using joes auto