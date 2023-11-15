const Task = require('../models/Task');

module.exports = class TaskController {
    
    static async createTask(req, res) {
        const { titulo, descricao, done } = req.body;

        if (!titulo) {
            res.status(422).json({ message: "O título é obrigatório!" });
            return;
        }

        const taskData = {
            titulo,
            descricao,
            done
        };

        try {
            await Task.createTask(taskData);
            res.status(201).json({ message: "Tarefa criada com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao criar a tarefa!", err });
        }
        return;
    }

    static async getAllTasks(req, res) {
        try {
            const tasks = await Task.getAllTasks();
            res.status(200).json({ message: "Tarefas: ", tasks });
        } catch (err) {
            res.status(500).json({ message: "Erro ao listar tarefas!" });
        }
    }

    static async getOneTask(req, res) {
        const id = req.params.id;
        try {
            const task = await Task.getTaskById(id);
            res.status(200).json({ message: `Tarefa sob ID ${id}`, task });
        } catch (err) {
            res.status(500).json({ message: "Erro ao pegar a tarefa!" });
        }
    }

    static async updateTask(req, res) {
        const id = req.params.id;
        const { titulo, descricao, done } = req.body;

        if (!titulo) {
            res.status(422).json({ message: "O título é obrigatório!" });
            return;
        }

        const updateTask = {
            titulo,
            descricao,
            done
        };

        try {
            await Task.updateTaskById(id, updateTask);
            res.status(200).json({ message: "Tarefa atualizada!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao atualizar a tarefa!" });
        }

        return;
    }

    static async deleteTask(req, res) {
        const id = req.params.id;
        try {
            await Task.deleteTaskById(id);
            res.status(200).json({ message: "Tarefa deletada" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao deletar tarefa" });
        }
    }
};
