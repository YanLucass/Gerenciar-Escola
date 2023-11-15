const db = require('../db/db');

class Task {
  constructor(id, titulo, descricao, done) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.done = done;
  }

  static async getAllTasks() {
    return db.many('SELECT * FROM tasks');
  }

  static async createTask(taskData) {
    const { titulo, descricao, done } = taskData;

    try {
      const data = await db.one('INSERT INTO tasks (titulo, descricao, done) VALUES ($1, $2, $3) RETURNING *', [titulo, descricao, done]);
      return new Task(data.id, data.titulo, data.descricao, data.done);
    } catch (error) {
      throw error;
    }
  }

  static async getTaskById(id) {
    return db.one('SELECT * FROM tasks WHERE id = $1', id)
      .then(data => new Task(data.id, data.titulo, data.descricao, data.done));
  }

  static async updateTaskById(id, updateTaskData) {
    const { titulo, descricao, done } = updateTaskData;
    return db.one('UPDATE tasks SET titulo = $1, descricao = $2, done = $3 WHERE id = $4 RETURNING *', [titulo, descricao, done, id])
      .then(data => new Task(data.id, data.titulo, data.descricao, data.done));
  }

  static async deleteTaskById(id) {
    return db.none('DELETE FROM tasks WHERE id = $1', id);
  }
}

module.exports = Task;
