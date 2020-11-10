const express = require('express');
const Celebrity = require('../models/Celebrity');
const router  = express.Router();
const Movie = require('../models/Movie');

router.get('/movies', async (req, res) => {
    try {
        const moviesFromDB = await Movie.find().populate('celebrity')
        res.render('movies/index', {movies: moviesFromDB});
    } catch (error) {
        console.log(error);
    }
});

router.get('/movies/new', async (req, res) => {
    try {
        const celebrities = await Celebrity.find()
        res.render('movies/new', {celebrities: celebrities});
    } catch (error) {
        console.log(error);
    }
})

router.post('/movies/new', async (req, res) => {
    try {
      let { title, genre, plot, celebrity } = req.body;
      await Movie.create({ title, genre, plot, celebrity });
      res.redirect('/movies');
    } catch (error) {
      res.render('movies/new');
    } 
});

router.get('/movies/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const moviesDetails = await Movie.findById(id).populate('celebrity')
        res.render('movies/show', {movie: moviesDetails});
    } catch (error) {
        console.log(error)
    }
})

router.get('/movies/:id/edit', async (req, res, next) => {
    try {
        let id = req.params.id;
        const movieToEdit = await Movie.findById(id).populate('celebrity')
        const celebrities = await Celebrity.find()
        res.render('movies/edit', { movie: movieToEdit, celebrities: celebrities })
    } catch (error) {
        next();
    }
})

router.post('/movies/:id/edit', async (req, res, next) =>{
    try {
        let id = req.params.id;
        let { title, genre, plot, celebrity } = req.body;
        await Movie.findByIdAndUpdate(id, { title, genre, plot, celebrity });
        res.redirect('/movies')
    } catch (error) {
        next();
    }
})

router.post('/movies/:id/delete', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Movie.findByIdAndDelete(id);
        res.redirect('/movies');
    } catch (error) {
        next();
    }
})
module.exports = router;