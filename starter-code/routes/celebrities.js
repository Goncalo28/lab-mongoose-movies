const express = require('express');
const Celebrity = require('../models/Celebrity');
const router  = express.Router();

//getting celebs
router.get('/celebrities', async (req, res) => {
    try {
        const celebritiesFromDB = await Celebrity.find();
        res.render('celebrities/index', {celebrities: celebritiesFromDB});
    } catch (error) {
        console.log(error);
    }
});

router.get('/celebrities/new', async (req, res) => {
    try {
        res.render('celebrities/new');
    } catch (error) {
        console.log(error);
    }
})

router.post('/celebrities/new', async (req, res) => {
    try {
      let { name, occupation, catchPhrase } = req.body;
      await Celebrity.create({ name, occupation, catchPhrase });
      res.redirect('/celebrities');
    } catch (error) {
      res.render('celebrities/new');
    } 
});


router.get('/celebrities/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const celebritiesDetails = await Celebrity.findById(id);
        res.render('celebrities/show', {celebrity: celebritiesDetails});
    } catch (error) {
        console.log(error)
    }
})

router.get('/celebrities/:id/edit', async (req, res, next) => {
    try {
        let id = req.params.id;
        const celebrityToEdit = await Celebrity.findById(id);
        res.render('celebrities/edit', { celebrity: celebrityToEdit })
    } catch (error) {
        next();
    }
})

router.post('/celebrities/:id/edit', async (req, res, next) =>{
    try {
        let id = req.params.id;
        let { name, occupation, catchPhrase } = req.body;
        await Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase });
        res.redirect('/celebrities')
    } catch (error) {
        next();
    }
})

router.post('/celebrities/:id/delete', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Celebrity.findByIdAndDelete(id);
        res.redirect('/celebrities');
    } catch (error) {
        next();
    }
})

module.exports = router;