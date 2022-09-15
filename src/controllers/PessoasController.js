const Pessoas = require('../models/pessoasSchema.js')
const path = require('path')
const bodyParser = require('body-parser')

class PessoaController {

    static exibeFormulario(req, res) {
        try {
            return res.sendFile('index.html', {root: path.join(__dirname, '../public/html')})
        } catch (error) {
            res.render('erro', {
                erro: error.message
            })
        }
    }

    static async exibePessoas(req, res) {
        try {
            const pessoas = await Pessoas.find({})
            return res.render('listaPessoas', {
                pessoasList: pessoas
            }) 
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async criaPessoa(req, res) {
        try {
            await Pessoas.create({
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                idade: req.body.idade,
                email: req.body.email,
                profissao: req.body.profissao
            }) 
            return res.redirect('/')
            
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async exibeUmaPessoa(req, res){
        try {
            const { idPessoa } = req.body
            const pessoa = await Pessoas.findById(idPessoa)
            return res.render('listaUmaPessoa', {
                umaPessoa: pessoa
            })
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async atualizaPessoaPagina(req, res) {
        try {
            const { idPessoa } = req.body
            const pessoa = await Pessoas.findById(idPessoa)
            return res.render('atualizaPessoaPagina', {
                pessoa: pessoa
            })
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async atualizaPessoa(req, res) {
        try {
            const id = req.body.id
            const dados = {
                id: id,
                nome: req.body.nome,
                sobrenome: req.body.sobrenome,
                idade: req.body.idade,
                email: req.body.email,
                profissao: req.body.profissao
            }
            await Pessoas.findByIdAndUpdate(id, dados)
            const atualizado = await Pessoas.findById(id)  
            res.render('atualizaPessoa', {
                pessoaAtt: atualizado
            })
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async deletaPessoaPagina(req, res){
        try {
            const { idPessoa } = req.body
            return res.render('deletaPessoa', {
                pessoaId: idPessoa
            })
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async deletaPessoa(req, res){
        try {
            const id = req.body.id
            await Pessoas.findByIdAndDelete(id.trim(), {$exists: true})
            return res.redirect('/pessoas')
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }
}

module.exports = PessoaController