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
            const { id } = req.params
            const pessoa = await Pessoas.findById(id)
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
            const { id } = req.params
            const pessoa = await Pessoas.findById(id)
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
            const pessoaAtt = await Pessoas.findByIdAndUpdate(id, dados)
            //NÃO ESTÁ MOSTRANDO OS DADOS ATUALIZADOS
            res.render('atualizaPessoa', {
                pessoaAtt: pessoaAtt
            })
        } catch (error) {
            return res.render('erro', {
                erro: error.message
            })
        }
    }

    static async deletaPessoaPagina(req, res){
        try {
            const { id } = req.params
            return res.render('deletaPessoa', {
                pessoaId: id
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