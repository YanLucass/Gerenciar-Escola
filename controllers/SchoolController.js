const Escola = require('../models/School');

module.exports = class EscolaController {

    static async addEscola(req, res) {
        const { nome, endereco, telefone, cnpj } = req.body;

        try {
            if (!nome || !endereco || !telefone || !cnpj) {
                return res.status(422).json({ message: "Todos os campos são obrigatórios: nome, endereco, telefone, e cnpj." });
            }
            const escolaData = {
                nome,
                endereco,
                telefone,
                cnpj
            };

            const createdEscola = await Escola.createEscola(escolaData);
            res.status(201).json({ message: "Escola adicionada com sucesso!", createdEscola });
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar escola", error });
        }
    }


    static async getAllEscolas(req, res) {
        try {
            const escolas = await Escola.getAllEscolas();
            res.status(200).json({ message: "Todas as escolas:", escolas });
        } catch (error) {
            res.status(500).json({ message: "Erro ao obter escolas", error });
        }
    }

    static async findEscolaByCnpj(req, res) {
        const cnpj = req.params.cnpj;

        try {
            const escola = await Escola.getEscolaByCnpj(cnpj);
            if (!escola) {
                res.status(404).json({ message: "Escola não encontrada" });
                return;
            }
            res.status(200).json({ message: "Escola encontrada", escola });
        } catch (error) {
            res.status(500).json({ message: "Erro ao obter escola", error });
        }
    }

    static async updateEscolaByCnpj(req, res) {
        const cnpj = req.params.cnpj;
        const { nome, endereco, telefone } = req.body;

        if (!nome || !endereco || !telefone) {
            res.status(422).json({ message: "Nome, endereco, e telefone são obrigatórios!" });
            return;
        }

        const updateData = {
            nome,
            endereco,
            telefone
        }
        try {
            const updatedEscola = await Escola.updateEscolaByCnpj(cnpj, updateData);
            res.status(200).json({ message: "Escola atualizada com sucesso", updatedEscola });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar escola", error });
        }
    }

    static async deleteEscolaByCnpj(req, res) {
        const cnpj = req.params.cnpj;
        try {
            await Escola.deleteEscolaByCnpj(cnpj);
            res.status(200).json({ message: "Escola deletada com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar escola", error });
        }
    }
};
