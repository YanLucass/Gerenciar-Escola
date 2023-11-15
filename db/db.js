const pgp = require('pg-promise')();
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;
const db = pgp(connectionString);

const createSchoolTables = `

    CREATE TABLE IF NOT EXISTS professores (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        materia VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS students (
        id SERIAL,
        nome VARCHAR(50) NOT NULL,
        matricula int PRIMARY KEY NOT NULL,
        telefone VARCHAR(20) NOT NULL,
        curso VARCHAR(50) NOT NULL,
        professor_id INT REFERENCES professores(id)
    );

    CREATE TABLE IF NOT EXISTS funcionarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        idade INTEGER NOT NULL,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        cargo VARCHAR(40),
        departamento VARCHAR(40)
    );

    CREATE TABLE IF NOT EXISTS disciplinas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(50) NOT NULL,
        carga_horaria INTEGER NOT NULL,
        sala_aula VARCHAR(50),
        professor_id INT REFERENCES professores(id)
    );

 
`;


db.none(createSchoolTables)
    .then(() => {
        console.log('Tabelas criadas com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao criar tabelas:', err);
    });


module.exports = db;