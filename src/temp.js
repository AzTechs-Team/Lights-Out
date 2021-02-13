const setUserInfo = require('../DB/setUserInfo');
const { v4: uuidv4 } = require('uuid');

console.log(uuidv4())
const info = {
    id: uuidv4(),
    name: 'shreya',
    age: 20,
    preferences: 'male',
    agerange: 5,
    bio: 'some dumb stuff written in bio',
    relationship: 1,
    song: 0,
    pizza: 1,
    superhero: 0,
    food: 1,
    language: 1,
    philosophy: 1,
    software: 1
};
setUserInfo(info);