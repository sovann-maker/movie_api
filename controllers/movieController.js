'use strict';

const firebase = require('../db');
const Movie = require('../models/movie');
const firestore = firebase.firestore();


const addMovie = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('movies').doc(data.mid).set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllmovies = async (req, res, next) => {
    try {
        const movies = await firestore.collection('movies');
        const data = await movies.get();
        const moviesArray = [];
        if(data.empty) {
            res.status(404).send('No movie record found');
        }else {
            data.forEach(doc => {
                const movie = new Movie(
                    doc.data().mid,
                    doc.data().mname,
                    doc.data().mrating,
                    doc.data().mindustry,
                    doc.data().mdate,
                );
                moviesArray.push(movie);
            });
            res.send(moviesArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getMovie = async (req, res, next) => {
    try {
        const id = req.params.id;
        const movie = await firestore.collection('movies').doc(id);
        const data = await movie.get();
        if(!data.exists) {
            res.status(404).send('movie with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateMovie = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const movie =  await firestore.collection('movies').doc(id);
        await movie.update(data);
        res.send('movie record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMovie = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('movies').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addMovie,
    getAllmovies,
    getMovie,
    updateMovie,
    deleteMovie
}