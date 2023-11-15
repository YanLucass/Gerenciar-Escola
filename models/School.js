const db = require('../db/db');

class Escola {
  constructor(nome, endereco, telefone, cnpj) {
    this.nome = nome;
    this.endereco = endereco;
    this.telefone = telefone;
    this.cnpj = cnpj;
  }

  static async getAllEscolas() {
    return db.many('SELECT * FROM escolas');
  }

  static async createEscola(escolaData) {
    const { nome, endereco, telefone, cnpj } = escolaData;

    try {
      await db.none('INSERT INTO escolas (nome, endereco, telefone, cnpj) VALUES ($1, $2, $3, $4)', [nome, endereco, telefone, cnpj]);
      return { nome, endereco, telefone, cnpj };
    } catch (error) {
      throw error;
    }
  }

  static async getEscolaByCnpj(cnpj) {
    return db.one('SELECT * FROM escolas WHERE cnpj = $1', cnpj);
  }

  static async updateEscolaByCnpj(cnpj, updateEscolaData) {
    const { nome, endereco, telefone } = updateEscolaData;
    return db.one('UPDATE escolas SET nome = $1, endereco = $2, telefone = $3 WHERE cnpj = $4 RETURNING *', [nome, endereco, telefone, cnpj]);
  }

  static async deleteEscolaByCnpj(cnpj) {
    return db.none('DELETE FROM escolas WHERE cnpj = $1', cnpj);
  }
}

module.exports = Escola;
