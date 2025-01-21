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

app.get("/", async (req,res) => {
    const response = await db.query("Select * from books");
    books = response.rows;
    res.render("index.ejs", {books: books});

})

app.post("/input", async (req,res) => {
    console.log(req.body); 
    let isbn = req.body.isbn;
    let title = req.body.title;
    let author = req.body.author;
    try {
        await db.query("INSERT INTO books (title, author, isbn) VALUES ($1, $2, $3)", [title, author, isbn]);
        res.redirect("/");
    } catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Internal Server Error');
    }
})

app.listen(port, () => {
    console.log(`App listening on Port ${port}`);
})