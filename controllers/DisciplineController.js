const Discipline = require('../models/Discipline');

module.exports = class DisciplineController {
    
    static async createDiscipline(req, res) {
        const { nome, descricao, cargaHoraria, professor_id } = req.body;

        if (!nome || !descricao || !cargaHoraria || !professor_id) {
            res.status(422).json({ message: "Todos os campos são obrigatórios!" });
            return;
        }

        const disciplineData = {
            nome,
            descricao,
            cargaHoraria,
            professor_id
        };

        try {
            await Discipline.createDiscipline(disciplineData);
            res.status(201).json({ message: "Disciplina criada com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao criar a disciplina!", err });
        }
        return;
    }

    static async getAllDisciplines(req, res) {
        try {
            const disciplines = await Discipline.getAllDisciplines();
            res.status(200).json({ message: "Disciplinas: ", disciplines });
        } catch (err) {
            res.status(500).json({ message: "Erro ao listar disciplinas!" });
        }
    }

    static async getOneDiscipline(req, res) {
        const id = req.params.id;
        try {
            const discipline = await Discipline.getDisciplineById(id);
            res.status(200).json({ message: `Disciplina sob ID ${id}`, discipline });
        } catch (err) {
            res.status(500).json({ message: "Erro ao pegar a disciplina!" });
        }
    }

    static async updateDiscipline(req, res) {
        const id = req.params.id;
        const { nome, descricao, cargaHoraria, professor_id } = req.body;

        if (!nome || !descricao || !cargaHoraria || !professor_id) {
            res.status(422).json({ message: "Todos os campos são obrigatórios!" });
            return;
        }

        const updateDiscipline = {
            nome,
            descricao,
            cargaHoraria,
            professor_id
        };

        try {
            await Discipline.updateDisciplineById(id, updateDiscipline);
            res.status(200).json({ message: "Disciplina atualizada!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao atualizar a disciplina!" });
        }

        return;
    }

    static async deleteDiscipline(req, res) {
        const id = req.params.id;
        try {
            await Discipline.deleteDisciplineById(id);
            res.status(200).json({ message: "Disciplina deletada" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao deletar disciplina" });
        }
    }
};
