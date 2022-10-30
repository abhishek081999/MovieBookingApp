const dbConfig=require("../config/db.config")

const mongoose=require("mongoose");

const Movie=require("./movie.model")(mongoose)
const Artist=require("./artist.model")(mongoose)
const Genre=require("./genre.model")(mongoose)
const User=require("./user.model")(mongoose)

const db={};
db.url=dbConfig.url;
db.mongoose=mongoose;
db.Movie=Movie;
db.Artist=Artist;
db.Genre=Genre;
db.User=User;

module.exports=db;


