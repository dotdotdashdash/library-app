const express = require(`express`);
const cors = require(`cors`);
const path = require('path');
const bodyparser = require('body-parser');  
const authRouter = require(`./src/routes/auth-router`);
const booksRouter = require(`./src/routes/book-router`);

const app = new express();
const PORT = process.env.PORT || 4444;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('./dist/library-app-frontend'));

app.use(`/api/auth`, authRouter);
app.use(`/api/books`, booksRouter);

// Server

app.get('/*', (req, res)=> {   //For hosting
  res.sendFile(path.join(__dirname + './dist/library-app-frontend/index.html'));
});

app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});
