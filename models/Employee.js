const db = require('../db/db');

class Employee {
  constructor(nome, idade, cpf, cargo, departamento) {
    this.nome = nome;
    this.idade = idade;
    this.cpf = cpf;
    this.cargo = cargo;
    this.departamento = departamento;
  }

  static async getAllEmployees() { //MÉTODO VOLTADO PARA LISTAR TODOS FUNCIONÁRIOS
    return db.many('SELECT * FROM funcionarios');
  }

  static async createEmployee(employeeData) { //MÉTODO VOLTADO PARA CRIAR UM FUNCIONÁRIO
    const { nome, idade, cpf, cargo, departamento } = employeeData;

    try {
        await db.none('INSERT INTO funcionarios (nome, idade, cpf, cargo, departamento) VALUES ($1, $2, $3, $4, $5)', [nome, idade, cpf, cargo, departamento]);
        return { nome, idade, cpf, cargo, departamento };
    } catch (error) {
        throw error; 
    }
  }

  static async getEmployeeByCpf(cpf) { //MÉTODO VOLTADO PARA PEGAR UM FUNCIONÁRIO
    return db.one('SELECT * FROM funcionarios WHERE cpf = $1', cpf);
  }

  static async updateEmployeeByCpf(cpf, updateEmployeeData) { //MÉTODO VOLTADO PARA ATUALIZAR UM FUNCIONÁRIO
    const { nome, idade, cargo, departamento } = updateEmployeeData;
    return db.one('UPDATE funcionarios SET nome = $1, idade = $2, cargo = $3, departamento = $4 WHERE cpf = $5 RETURNING *', [nome, idade, cargo, departamento, cpf]);
  }

  static async deleteEmployeeByCpf(cpf) { //MÉTODO VOLTADO PARA DELETAR UM FUNCIONÁRIO
    return db.none('DELETE FROM funcionarios WHERE cpf = $1', cpf);
  }
}

module.exports = Employee;
