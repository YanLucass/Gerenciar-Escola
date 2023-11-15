const db = require('../db/db');

class Responsible {
  constructor(id, nome, cpf, telefone, nome_filho) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
    this.telefone = telefone;
    this.nome_filho = nome_filho;
  }

  static async getAllResponsibles() {
    return db.many('SELECT * FROM responsibles');
  }

  static async createResponsible(responsibleData) {
    const { nome, cpf, telefone, nome_filho } = responsibleData;

    try {
      await db.none('INSERT INTO responsibles (nome, cpf, telefone, nome_filho) VALUES ($1, $2, $3, $4)', [nome, cpf, telefone, nome_filho]);
      return { nome, cpf, telefone, nome_filho };
    } catch (error) {
      throw error;
    }
  }

  static async getResponsibleByCpf(cpf) {
    return db.one('SELECT * FROM responsibles WHERE cpf = $1', cpf);
  }

  static async updateResponsibleByCpf(cpf, updateResponsibleData) {
    const { nome, telefone, nome_filho } = updateResponsibleData;
    return db.one('UPDATE responsibles SET nome = $1, telefone = $2, nome_filho = $3 WHERE cpf = $4 RETURNING *', [nome, telefone, nome_filho, cpf]);
  }

  static async deleteResponsibleByCpf(cpf) {
    return db.none('DELETE FROM responsibles WHERE cpf = $1', cpf);
  }
}

module.exports = Responsible;
