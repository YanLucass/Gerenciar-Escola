const Teacher = require('../models/Teacher');


module.exports = class ProfessorController {

    static async createTeacher(req, res) {
        const { nome, materia, email } = req.body;

        if (!nome || !materia || !email) {
            res.status(422).json({ message: "Todos os campos são obrigatórios: nome, matéria e e-mail." });
            return;
        }

        const teacherData = {
            nome,
            materia,
            email
        };

        try {
            await Teacher.createTeacher(teacherData);
            res.status(201).json({ message: "Professor criado com sucesso!" });
        } catch (err) {
            res.status(500).json({ message: "Erro ao criar o professor!", err });
        }
    }


    static async getAllTeachers(req, res) {
        try {
            const teachers = await Teacher.getAllProfessors();
            res.status(200).json({message: "Todos professores:", teachers});
        } catch(err) {
            res.status(500).json({ message: "Erro ao pegar professores", err });
        }
    }

    static async findTeacherById(req, res) {
        const id = req.params.id;
    
        try {
            const teacher = await Teacher.getProfessorById(id);
            if(!teacher) {
                res.status(404).json({message: "Professor não encontrado"});
                return;
            }
            res.status(200).json({message: "Professor encontrado", teacher});
        } catch(err) {
            res.status(500).json({ message: "Erro ao pegar professor", err });
        }
    }




   
}