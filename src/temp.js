const setUserInfo = require('../DB/setUserInfo');
const { v4: uuidv4 } = require('uuid');
var async = require("async");
const getMatches = require('../DB/getMatches');

// const info = {
    // id: '8a04d629-617b-4798-9223-a34e6fc5ad58',
//     age: 20,
//     preferences: 'female',
//     agerange: 2,
//     bio: 'some intro stuff',
//     relationship: 'one night stand',
//     song: 'death metal',
//     pizza: 'no',
//     superhero: 'ironman',
//     food: 'yes',
//     language: 'java',
//     philosophy: 'explode',
//     software: 'apple',
//     gender: 'male'
// }

// console.log(getMatches(info));
//const arr = fun();
// async function callAsync() {
//     var x = await getMatches(info);
//     console.log(x);
// }
// callAsync()
// callAsync();
// getMatches(info).then((data)=>console.log(data))
// somefunc()
// getMatches(info).then((data)=>console.log(data))

// console.log(uuidv4())
const info = {
    id: uuidv4(),
    name: 'john doe',
    age: 25,
    preferences: 'male',
    agerange: 2,
    bio: 'some intro stuff',
    relationship: "one night stand",
    song: "romantic",
    pizza: "yes",
    superhero: "captain america",
    food: "no",
    language: "java",
    philosophy: "explode",
    software: "apple",
    gender: "female",
    userdiscordid: 637564801832452097
};
setUserInfo(info);