const express = require(`express`);
const cors = require(`cors`);
const bodyparser = require('body-parser');  
const authRouter = require(`./src/routes/auth-router`);
const booksRouter = require(`./src/routes/book-router`);

const app = new express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(`/api/auth`, authRouter);
app.use(`/api/books`, booksRouter);



const PORT = process.env.PORT || 4444;
app.listen(PORT, ()=> {
  console.log(`Hi, I'm listening at ${PORT}`);
});
app.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /`);
});