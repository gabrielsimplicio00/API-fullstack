const Pessoas = require('../models/pessoasSchema.js')
const path = require('path')
const bodyParser = require('body-parser')

class PessoaController {

    static exibeFormulario(req, res) {
        return res.sendFile('index.html', {root: path.join(__dirname, '../public/html')})
        // return res.status(200).send({mensagem: 'Welcome to the API'})
    }

    static async exibePessoas(req, res) {
        const pessoas = await Pessoas.find({})
        res.render('listaPessoas', {
            pessoasList: pessoas
        })
        // return res.status(200).send(pessoas)
    }

    static async criaPessoa(req, res) {
        const novaPessoa = await Pessoas.create({
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            idade: req.body.idade,
            email: req.body.email,
            profissao: req.body.profissao
        }) 
        // await Pessoas.create(req.body)
        return res.redirect('/')
    }

    static async exibeUmaPessoa(req, res){
        const { id } = req.params
        const pessoa = await Pessoas.findById(id)
        return res.render('listaUmaPessoa', {
            umaPessoa: pessoa
        })
    }

    static async atualizaPessoaPagina(req, res) {
        const { id } = req.params
        const pessoa = await Pessoas.findById(id)
        res.render('atualizaPessoaPagina', {
            pessoa: pessoa
        })
    }

    static async atualizaPessoa(req, res) {
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
    }

    static async deletaPessoaPagina(req, res){
        const { id } = req.params
        res.render('deletaPessoa', {
            pessoaId: id
        })
    }

    static async deletaPessoa(req, res){
        const id = req.body.id
        await Pessoas.findByIdAndDelete(id.trim(), {$exists: true})
        return res.redirect('/pessoas')
        // return res.status(200).send({message: "Usuário deletado com sucesso"})
    }
}

module.exports = PessoaController