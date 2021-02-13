const { v4: uuidv4 } = require('uuid');

let profile = {
    id: uuidv4(),
    name: '',
    age: 0,
    preferences: '',
    agerange: 0,
    bio: '',
    relationship: 0,
    song: 0,
    pizza: 0,
    superhero: 0,
    food: 0,
    language: 0,
    philosophy: 0,
    software: 0
}

module.exports = profile;