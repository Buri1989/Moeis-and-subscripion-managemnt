const Movie = require('../models/ModelMovies');

//Get All
const getAllMovies = async (filters) => {
    return Movie.find(filters);
}

// GET - Get By Id
const getMovieById = async (id) => {
    return Movie.findById({ _id: id });
};


// POST - Create in DB
const addMovie = async (obj) => {
    const mov = new Movie(obj);
    const savedMovie = await mov.save();
    const newMovieId = savedMovie._id;
    return newMovieId;
};

// PUT - Update
const updateMovie = async (id, obj) => {
    await Movie.findByIdAndUpdate(id, obj);
    return 'Movie Updated!';
};

// DELETE - Delete
const deleteMovie = async (id) => {
    await Movie.findByIdAndDelete(id);
    return 'Movie Deleted!';
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie, }