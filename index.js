import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    password: "123",
    database: "books",
    port: 5432
})

db.connect();

let books = [];

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.render("index.ejs", {});

})

app.post("/input", (req,res) => {
    console.log(req.body); 
    let isbn = req.body.isbn;
    let tilte = req.body.title;
    let author = req.body.author;
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
})