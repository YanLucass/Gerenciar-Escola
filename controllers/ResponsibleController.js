const Responsible = require('../models/Responsible');

module.exports = class ResponsibleController {
    
    static async createResponsible(req, res) {
        const { nome, cpf, telefone} = req.body;

        if (!nome) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }

        const responsibleData = {
            nome,
            cpf,
            telefone,
            nome_filho
        };

        try {
            await Responsible.createResponsible(responsibleData);
            res.status(201).json({ message: "Responsável criado com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao criar o responsável!", err });
        }
    }

    static async getAllResponsibles(req, res) {
        try {
            const responsibles = await Responsible.getAllResponsibles();
            res.status(200).json({ message: "Responsáveis: ", responsibles });
        } catch (err) {
            res.status(500).json({ message: "Erro ao listar responsáveis!" });
        }
    }

    static async getOneResponsible(req, res) {
        const cpf = req.params.cpf;
        try {
            const responsible = await Responsible.getResponsibleByCpf(cpf);
            res.status(200).json({ message: `Responsável com CPF ${cpf}`, responsible });
        } catch (err) {
            res.status(500).json({ message: "Erro ao pegar o responsável!" });
        }
    }

    static async updateResponsible(req, res) {
        const cpf = req.params.cpf;
        const { nome, telefone, nome_filho } = req.body;

        if (!nome) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }

        const updateResponsible = {
            nome,
            telefone,
            nome_filho
        };

        try {
            await Responsible.updateResponsibleByCpf(cpf, updateResponsible);
            res.status(200).json({ message: "Responsável atualizado!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao atualizar o responsável!" });
        }
    }

    static async deleteResponsible(req, res) {
        const cpf = req.params.cpf;
        try {
            await Responsible.deleteResponsibleByCpf(cpf);
            res.status(200).json({ message: "Responsável deletado" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao deletar responsável" });
        }
    }
};
