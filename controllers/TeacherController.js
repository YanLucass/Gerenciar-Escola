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


    //update teacher
    static async updateTeacher(req, res) {
        const id = req.params.id;
        const { nome, materia, email } = req.body;

        if(!nome) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        if(!materia) {
            res.status(422).json({message: "A materia é obrigatória"});
            return;
        }

        if(!email) {
            res.status(422).json({message: "O email é obrigatório!"});
            return;
        }
        
        const updateData = {
            nome,
            materia,
            email
        }

        try {
            const updateTeacher = await Teacher.updateProfessorById(id, updateData);
            console.log(updateTeacher);
            res.status(200).json({message: "Professor atualizado com sucesso", updateTeacher});
        } catch (error) {
            res.status(500).json({message: "Erro ao atualizar o professor"});
        }
    }

    static async deleteATeacher(req, res) {
        const id = req.params.id;
        try {
            await Teacher.deleteProfessorById(id);
            res.status(200).json({message: "Professor deletado com sucesso"});
        } catch (error) {
            res.status(500).json({message: "Erro ao deletar o professor"});
            
        }
    }


   
}