const db = require('../db/db'); 

class Discipline {
  constructor(id, nome, descricao, cargaHoraria, professor_id) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
    this.cargaHoraria = cargaHoraria;
    this.professor_id = professor_id;
  }

  static async createDiscipline(disciplineData) {
      const { nome, descricao, cargaHoraria, professor_id } = disciplineData;
      try {
        await db.none('INSERT INTO disciplinas (nome, descricao, cargaHoraria, professor_id VALUES ($1, $2, $3, $4)',
        [nome, descricao, cargaHoraria, professor_id]);
        return { nome, descricao, cargaHoraria, professor_id}
      } catch (err) {
        throw err;
      }
  }
}
module.exports = Discipline;