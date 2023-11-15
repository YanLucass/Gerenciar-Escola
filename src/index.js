const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pgp = require('pg-promise')();

//import routes
const studentsRoutes = require('../routes/studentsRoutes');
const teachersRoutes = require('../routes/teachersRoutes');
const employeeRoutes = require('../routes/employeeRoutes');


app.use(express.json());

//define routes
app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/employee', employeeRoutes);

app.listen(port, () => {
    console.log('Servidor rodando');
});
