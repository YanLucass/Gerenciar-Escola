const Director = require('../models/Director');

module.exports = class DirectorController {
    
    static async createDirector(req, res) {
        const { nome, idade, cep, cpf, salario } = req.body;

        if (!nome) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }

        const directorData = {
            nome,
            idade,
            cep,
            cpf,
            salario
        };

        try {
            await Director.createDirector(directorData);
            res.status(201).json({ message: "Diretor criado com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao criar o diretor!", err });
        }
        return;
    }

    static async getAllDirectors(req, res) {
        try {
            const directors = await Director.getAllDirectors();
            res.status(200).json({ message: "Diretores: ", directors });
        } catch (err) {
            res.status(500).json({ message: "Erro ao listar diretores!" });
        }
    }

    static async getOneDirector(req, res) {
        const cpf = req.params.cpf;
        try {
            const director = await Director.getDirectorByCpf(cpf);
            res.status(200).json({ message: `Diretor com CPF ${cpf}`, director });
        } catch (err) {
            res.status(500).json({ message: "Erro ao pegar o diretor!" });
        }
    }

    static async updateDirector(req, res) {
        const cpf = req.params.cpf;
        const { nome, idade, cep, salario } = req.body;

        if (!nome) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return;
        }

        const updateDirector = {
            nome,
            idade,
            cep,
            salario
        };

        try {
            await Director.updateDirectorByCpf(cpf, updateDirector);
            res.status(200).json({ message: "Diretor atualizado!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao atualizar o diretor!" });
        }

        return;
    }

    static async deleteDirector(req, res) {
        const cpf = req.params.cpf;
        try {
            await Director.deleteDirectorByCpf(cpf);
            res.status(200).json({ message: "Diretor deletado" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao deletar diretor" });
        }
    }
};
