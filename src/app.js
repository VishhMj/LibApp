const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT;
const Book = require('./models/book');
const Magazine = require('./models/magazine')
const { processCSV, generateCSV } = require('./utils/utils')

var app = express()
var jsonParser = bodyParser.json()

var booksArray = [];
var magazinesArray = [];

app.get('/all', async (req, res) => {
    try {
    const books = await processCSV('./resource/books.csv');
    const magazines = await processCSV('./resource/magazines.csv');
    const all = books.concat(magazines);
    res.send(all.sort(function(a,b){ 
        var x = a.title < b.title? -1:1; 
        return x; 
    }));
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/books', async (req, res) => {
    try {
        const books = await processCSV('./resource/books.csv');
        res.send(books);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post('/books', jsonParser, async (req, res) => {
    const data = req.body;
    if (!(data.title || data.isbn || data.authors || data.description)) {
        res.status(400).send('Few of the required parameters are missing!');
    }
    const book = new Book(data.title, data.isbn, data.authors, data.description);
    booksArray.push(book);

    try {
        res.send(book);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/export-books', async (req, res) => {
    try {
        await generateCSV(booksArray, 'user-books');
        res.sendFile( __dirname + '/output/user-books.csv');
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

app.get('/magazines', async (req, res) => {
    try {
        const magazines = await processCSV('./resource/magazines.csv');
        res.send(magazines);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.post('/magazines', jsonParser, async (req, res) => {
    const data = req.body;
    if (!(data.title || data.isbn || data.authors || data.publieshedAt)) {
        res.status(400).send('Few of the required parameters are missing!');
    }
    const magazine = new Magazine(data.title, data.isbn, data.authors, data.publieshedAt);
    magazinesArray.push(magazine);

    try {
        res.send(magazine);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
})

app.get('/export-magazines', async (req, res) => {
    try {
        await generateCSV(magazinesArray, 'user-magazines');
        res.sendFile( __dirname + '/output/user-magazines.csv');
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/authors', async (req, res) => {
    try {
        const authors = await processCSV('./resource/authors.csv');
        res.send(authors);
    } catch (e) {
        res.status(400).send(e);
    }
})

app.get('/search', async (req, res) => {
    try {
        const books = await processCSV('./resource/books.csv');
        const magazines = await processCSV('./resource/magazines.csv');
        var data = [];
        if (req.query.isbn) {
            for (var i = 0; i < books.length; i++) {
                if (books[i].isbn == req.query.isbn) {
                    data.push(books[i]);
                }
            }
            console.log("Data : " + data);
            for (var j = 0; j < magazines.length; j++) {
                if (magazines[j].isbn == req.query.isbn) {
                    data.push(magazines[j]);
                }
            }
        }
        if (req.query.authors) {
            for (var i = 0; i < books.length; i++) {
                if (books[i].authors == req.query.authors) {
                    data.push(books[i]);
                }
            }
            for (var j = 0; j < magazines.length; j++) {
                if (magazines[j].authors == req.query.authors) {
                    data.push(magazines[j]);
                }
            }
        }
        if (data) {
            return res.send(data.sort(function (a, b) {
                var x = a.title < b.title? -1:1; 
                return x;
            }));
        }
        return res.send()
    } catch (e) {
        res.status(400).send(e);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port : ${port}!`);
})