const Movie = require('../models/ModelMovies');

//Get All
const getAllMovies = async (filters) => {
    try {
        return await Movie.find(filters);
    } catch (err) {
        throw new Error(err.message)
    }
}

// GET - Get By Id
const getMovieById = async (id) => {
    try {
        return await Movie.findById({ _id: id });
    } catch (err) {
        throw new Error(err.message)
    }
};

// POST - Create in DB
const addMovie = async (obj) => {
    try {
        const mov = new Movie(obj);
        const savedMovie = await mov.save();
        const newMovieId = savedMovie._id;
        return newMovieId;
    } catch (err) {
        throw new Error(err.message)
    }
};

// PUT - Update
const updateMovie = async (id, obj) => {
    try {
        await Movie.findByIdAndUpdate(id, obj);
        return 'Movie Updated!';
    } catch (err) {
        throw new Error(err.message)
    }
};

// DELETE - Delete
const deleteMovie = async (id) => {
    try {
        await Movie.findByIdAndDelete(id);
        return 'Movie Deleted!';
    } catch (err) {
        throw new Error(err.message)
    }
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, }