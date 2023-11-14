const dotenv = require('dotenv');
dotenv.config();
const db = require('../db/db');

class Student {
    constructor(id, nome, matricula, telefone, curso, professor_id) {
        this.id = id;
        this.nome = nome;
        this.matricula = matricula;
        this.telefone = telefone;
        this.curso = curso;
        this.professor_id = professor_id;
    }

    //get all students
    static async getAllStudents() {
        return db.many('SELECT * FROM students');
    }
    
    //create student
    static async createStudent(studentData) {
        return db.none(
            'INSERT INTO students (nome, matricula, telefone, curso, professor_id) VALUES ($1, $2, $3, $4, $5)',
            [studentData.nome, studentData.matricula, studentData.telefone, studentData.curso, studentData.professor_id]
        );
    }

    //get student by id
    static async getStudentById(id) {
        return db.oneOrNone('SELECT * FROM students WHERE id = $1', id);
    }

    static async updateStudentById(id, updateStudentData) {
        return db.none(
            'UPDATE students SET nome = $1, matricula = $2, telefone = $3, curso = $4 WHERE id = $5',
            [updateStudentData.nome, updateStudentData.matricula, updateStudentData.telefone, updateStudentData.curso, id]
        );
    }
    //delete by id
    static async deleteStudentById(id) {
        return db.none('DELETE FROM students WHERE id = $1', id);
    }
}


module.exports = Student