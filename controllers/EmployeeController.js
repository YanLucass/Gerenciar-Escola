const Employee = require('../models/Employee');

module.exports = class EmployeeController {

    static async addEmployee(req, res) {
        const { nome, idade, cpf, cargo, departamento } = req.body;

        try {
            if (!nome || !idade || !cpf || !cargo || !departamento) {
                return res.status(422).json({ message: "Todos os campos são obrigatórios: nome, idade, cpf, cargo e departamento." });
            }
            const employeeData = {
                nome,
                idade,
                cpf,
                cargo,
                departamento
            };

            const createdEmployee = await Employee.createEmployee(employeeData);
            res.status(201).json({ message: "Funcionário adicionado com sucesso!", createdEmployee });
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar funcionário", error });
        }
    }


    static async getAllEmployees(req, res) {
        try {
            const employees = await Employee.getAllEmployees();
            res.status(200).json({ message: "Todos os funcionários:", employees });
        } catch (error) {
            res.status(500).json({ message: "Erro ao obter funcionários", error });
        }
    }

    static async findEmployeeByCpf(req, res) {
        const cpf = req.params.cpf;

        try {
            const employee = await Employee.getEmployeeByCpf(cpf);
            if (!employee) {
                res.status(404).json({ message: "Funcionário não encontrado" });
                return;
            }
            res.status(200).json({ message: "Funcionário encontrado", employee });
        } catch (error) {
            res.status(500).json({ message: "Erro ao obter funcionário", error });
        }
    }

    static async updateEmployeeByCpf(req, res) {
        const cpf = req.params.cpf;
        const { nome, idade, cargo, departamento } = req.body;

        if (!nome || !idade || !cargo || !departamento) {
            res.status(422).json({ message: "Nome, idade, cargo e departamento são obrigatórios!" });
            return;
        }

        const updateData = {
            nome,
            idade,
            cargo,
            departamento
        }
        try {
            const updatedEmployee = await Employee.updateEmployeeByCpf(cpf, updateData);
            res.status(200).json({ message: "Funcionário atualizado com sucesso", updatedEmployee });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar funcionário", error });
        }
    }

    static async deleteEmployeeByCpf(req, res) {
        const cpf = req.params.cpf;
        try {
            await Employee.deleteEmployeeByCpf(cpf);
            res.status(200).json({ message: "Funcionário deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar funcionário", error });
        }
    }
};
