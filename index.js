const express = require('express');
const http = require('http');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize("todo", "admin", "1111", {
    dialect: "postgres",
    host: "localhost"
  });
const ToDo = sequelize.define("todo", {
  title: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);
  next();
});


//app.all('/test', (req, res) => {
//  res.status(200).json({ message: 'OK'});
//})

app.get('/get', (req,res) => {
    res.status(200).json({message: 'GET'});
})

app.post('/post', (req,res) => {
    res.status(200).json({message: 'POST'});
})

app.put('/put', (req,res) => {
    res.status(200).json({message: 'PUT'});
})

app.patch('/patch', (req,res) => {
    res.status(200).json({message: 'PATCH'});
})

app.delete('/delete', (req,res) => {
    res.status(200).json({message: 'DELETE'});
})

app.post('/sum', (req,res) => {
  let result = req.body.a + req.body.b;
  res.status(200).json({message: 'SUM IS ' + result});  
})

app.post('/reverseCase', (req,res) => {
    let cur = req.body.str;
    let resString = "";
    for(let i = 0; i< cur.length; i++){
        let element = cur.charAt(i);
        if (element.toLowerCase() == element){
            element = element.toUpperCase();
        } else {
            element = element.toLowerCase();
        }
        resString = resString.concat(element);
    }
    res.status(200).json({message: 'REVERSE CASE IS ' + resString});
})

app.post('/reverseArray', (req,res) => {
    let curArr = req.body.arr;
    curArr = curArr.reverse();
    res.status(200).json({message: 'REVERSE ARRAY IS ' + curArr.toLocaleString()});
})

app.post('/db', (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let todo = ToDo.build({
    title: title,
    description: description
  });
  todo.save();
  res.status(200).json({message: "Task created", title: title, description: description})
  })

http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
})