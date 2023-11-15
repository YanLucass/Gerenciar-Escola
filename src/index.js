const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const pgp = require('pg-promise')();

//import routes
const studentsRoutes = require('../routes/studentsRoutes');
const teachersRoutes = require('../routes/teachersRoutes');
const employeeRoutes = require('../routes/employeeRoutes');
const taskRoutes = require('../routes/taskRoutes');
const disciplineRoutes = require('../routes/disciplineRoutes');
const directorRoutes = require('../routes/directorRoutes');
const schoolRoutes = require('../routes/schoolRoutes');
const responsibleRoutes = require('../routes/responsibleRoutes')

app.use(express.json());

//define routes
app.use('/students', studentsRoutes);
app.use('/teachers', teachersRoutes);
app.use('/employee', employeeRoutes);
app.use('/task', taskRoutes);
app.use('/discipline', disciplineRoutes);
app.use('/director', directorRoutes);
app.use('/school', schoolRoutes);
app.use('/respon', responsibleRoutes);

app.get('/', (req, res) => {
    res.redirect('/students/allStudent');
});
app.listen(port, () => {
    console.log('Servidor rodando');
});
