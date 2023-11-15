const db = require('../db/db');

class Discipline {
  constructor(nome, descricao, cargaHoraria, professor_id) {
    this.nome = nome;
    this.descricao = descricao;
    this.cargaHoraria = cargaHoraria;
    this.professor_id = professor_id;
  }

  static async getAllDisciplines() {
    return db.many('SELECT * FROM disciplinas');
  }

  static async createDiscipline(disciplineData) {
    const { nome, descricao, cargaHoraria, professor_id } = disciplineData;

    try {
      await db.none('INSERT INTO disciplinas (nome, descricao, cargaHoraria, professor_id) VALUES ($1, $2, $3, $4)', [nome, descricao, cargaHoraria, professor_id]);
      return { nome, descricao, cargaHoraria, professor_id };
    } catch (error) {
      throw error;
    }
  }

  static async getDisciplineById(id) {
    return db.one('SELECT * FROM disciplinas WHERE id = $1', id);
  }

  static async updateDisciplineById(id, updateDisciplineData) {
    const { nome, descricao, cargaHoraria, professor_id } = updateDisciplineData;
    return db.one('UPDATE disciplinas SET nome = $1, descricao = $2, cargaHoraria = $3, professor_id = $4 WHERE id = $5 RETURNING *', [nome, descricao, cargaHoraria, professor_id, id]);
  }

  static async deleteDisciplineById(id) {
    return db.none('DELETE FROM disciplinas WHERE id = $1', id);
  }
}

module.exports = Discipline;
