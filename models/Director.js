const db = require('../db/db');

class Director {
  constructor(nome, idade, cep, cpf, salario) {
    this.nome = nome;
    this.idade = idade;
    this.cep = cep;
    this.cpf = cpf;
    this.salario = salario;
  }

  static async getAllDirectors() {
    return db.many('SELECT * FROM diretores');
  }

  static async createDirector(directorData) {
    const { nome, idade, cep, cpf, salario } = directorData;

    try {
      await db.none('INSERT INTO diretores (nome, idade, cep, cpf, salario) VALUES ($1, $2, $3, $4, $5)', [nome, idade, cep, cpf, salario]);
      return { nome, idade, cep, cpf, salario };
    } catch (error) {
      throw error;
    }
  }

  static async getDirectorByCpf(cpf) {
    return db.one('SELECT * FROM diretores WHERE cpf = $1', cpf);
  }

  static async updateDirectorByCpf(cpf, updateDirectorData) {
    const { nome, idade, cep, salario } = updateDirectorData;
    return db.one('UPDATE diretores SET nome = $1, idade = $2, cep = $3, salario = $4 WHERE cpf = $5 RETURNING *', [nome, idade, cep, salario, cpf]);
  }

  static async deleteDirectorByCpf(cpf) {
    return db.none('DELETE FROM diretores WHERE cpf = $1', cpf);
  }
}

module.exports = Director;
