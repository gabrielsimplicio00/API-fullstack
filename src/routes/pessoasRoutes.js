const express = require('express')
const PessoasController = require('../controllers/PessoasController.js')

const router = express.Router()


router.get('/', PessoasController.exibeFormulario)
      .get('/pessoas', PessoasController.exibePessoas)
      .post('/pessoas/exibe', PessoasController.exibeUmaPessoa)
      .post('/pessoas', PessoasController.criaPessoa)
      .post('/pessoas/atualiza', PessoasController.atualizaPessoaPagina)
      .post('/pessoas/atualiza/sucesso', PessoasController.atualizaPessoa)
      .post('/pessoas/deleta', PessoasController.deletaPessoaPagina)
      .post('/pessoas/deleta/sucesso', PessoasController.deletaPessoa)

module.exports = router