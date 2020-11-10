const mongoose = require('mongoose'); 
const Celebrity = require('../models/Celebrity.js');
const Movie = require('../models/Movie.js')

mongoose.connect(`mongodb://localhost/starter-code`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// const celebrites = [
//     {
//         name: 'Matthew Mcconaughey ',
//         occupation: 'Actor',
//         catchPhrase: 'Alright, alright, alright'
//     },
//     {
//         name: 'Elon Musk',
//         occupation: 'CEO/Owner of Tesla, Space X and others',
//         catchPhrase: 'We\'ll land in mars soon'
//     },
//     {
//         name: 'Jeff Besos',
//         occupation: 'CEO/Owner of Amazon, blue origin and others',
//         catchPhrase: 'All about the client'
//     }
// ]

// Celebrity.create(celebrites)
//     .then(celebritesFromDB => {
//     console.log(`Created ${celebritesFromDB.length} celebrites`);
//     // Once created, close the DB connection
//     mongoose.connection.close();
//   })
//   .catch(err => console.log(`An error occurred while creating celebrites from the DB: ${err}`));


const movies = [
    {
        title: 'movie 1', 
        genre: 'action',
        plot: 'twist'
    },
    {
        title: 'movie 2', 
        genre: 'drama',
        plot: 'no idea'
    },
    {
        title: 'movie 3', 
        genre: 'romance',
        plot: 'happy couple'
    }
]

Movie.create(movies)
    .then(moviesFromDB => {
    console.log(`Created ${moviesFromDB.length} movies`);
    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch(err => console.log(`An error occurred while creating movies from the DB: ${err}`));