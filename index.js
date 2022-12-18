const express = require('express');
const PORT = 7000;
const app = express();
const database = require('./config/mongoose');

app.use(express.urlencoded());

app.use('/', require('./routes/index'));


app.listen(PORT, (error) => {
    if(error) {
        console.log("Error while running the Server");
    }
    console.log("Server is up and running on port: 7000");
})