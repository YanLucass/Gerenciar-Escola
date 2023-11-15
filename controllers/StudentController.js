//import models
const Student = require('../models/Student');

module.exports = class StudentController {
    
    static async createStudent(req, res) {

        const { nome, matricula, telefone, curso, professor_id, responsavel_id} = req.body;

        if(!nome) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        if(!matricula) {
            res.status(422).json({message: "A matricula é obrigatória"});
            return;
        }

        if(!telefone) {
            res.status(422).json({message: "O telefone é obrigatório!"});
            return;
        }

        if(!curso) {
            res.status(422).json({message: "O telefone é obrigatório!"});
            return;
        }


        if(!responsavel_id) {
            res.status(422).json({message: "O responsável é obrigatório!"});
            return;
        }

        const studentData = {
            nome,
            matricula,
            telefone,
            curso,
            professor_id,

        }

        console.log(studentData);
       
       try {
         await Student.createStudent(studentData);
         res.status(201).json({message: "Estudante criado com sucesso!"});

       } catch (err) {
            res.status(500).json({message: "Erro ao criar o estudante!", err});
       }
       return;
    }

    //get all students
    static async getAllStudents(req, res) {
        try {
            const students = await Student.getAllStudents();
            res.status(200).json({message: "Estudantes: ", students});
        } catch(err) {
            res.status(500).json({message: "Erro ao listar estudantes!"});
        }
    }

    //get with id
    static async getOneStudent(req, res) {
        const id = req.params.id;
        try {
            const student = await Student.getStudentById(id);
            res.status(200).json({message: `Estudante sob id ${id}`, student});
        } catch(err) {
            res.status(500).json({message: "Erro ao pegar o estudante!"});
        }
    }

    //update with id

    static async updateStudent(req, res) {
        const id = req.params.id;
        const { nome, matricula, telefone, curso } = req.body;

        if(!nome) {
            res.status(422).json({message: "O nome é obrigatório!"});
            return;
        }

        if(!matricula) {
            res.status(422).json({message: "A matricula é obrigatória"});
            return;
        }

        if(!telefone) {
            res.status(422).json({message: "O telefone é obrigatório!"});
            return;
        }

        if(!curso) {
            res.status(422).json({message: "O telefone é obrigatório!"});
            return;
        }

        const updateStudent = {
            nome,
            matricula,
            telefone,
            curso
        }

        try {
            await Student.updateStudentById(id, updateStudent);
            res.status(200).json({message: "Estudante atualizado!"});
        } catch(err) {
            res.status(500).json({message: "Erro ao criar o estudante!"});
        }

        return;
    }

    //delete with id
    static async deleteStudent(req, res) {
        const id = req.params.id;
        try {
            await Student.deleteStudentById(id);
            res.status(200).json({message: "Estudante deletado"});
        } catch(err) {
            res.status(500).json({message: "Erro ao deletar estudante"});
        }
    }


}