const db = require('../db/db');

class Teacher {
    constructor(id, nome, materia, email) {
        this.id = id;
        this.nome = nome;
        this.materia = materia;
        this.email = email;
    }

    // Obter todos os professores
    static async getAllProfessors() {
        return db.many('SELECT * FROM professores');
    }

    // Criar um novo professor
    static async createTeacher(professorData) {
        return db.none(
            'INSERT INTO professores (nome, materia, email) VALUES ($1, $2, $3)',
            [professorData.nome, professorData.materia, professorData.email]
        );
    }

    // Obter professor por ID
    static async getProfessorById(id) {
        return db.oneOrNone('SELECT * FROM professores WHERE id = $1', id);
    }

    // Atualizar professor por ID
    static async updateProfessorById(id, updateProfessorData) {
        return db.none(
            'UPDATE professores SET nome = $1, materia = $2, email = $3 WHERE id = $4',
            [updateProfessorData.nome, updateProfessorData.materia, updateProfessorData.email, id]
        );
    }

    // Deletar professor por ID
    static async deleteProfessorById(id) {
        return db.none('DELETE FROM professores WHERE id = $1', id);
    }
}

module.exports = Teacher;
