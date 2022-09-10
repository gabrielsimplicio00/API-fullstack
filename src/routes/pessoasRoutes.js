const express = require('express')
const PessoasController = require('../controllers/PessoasController.js')

const router = express.Router()


router.get('/', PessoasController.exibeFormulario)
      .get('/pessoas', PessoasController.exibePessoas)
      .get('/pessoas/:id', PessoasController.exibeUmaPessoa)
      .post('/pessoas', PessoasController.criaPessoa)
      .get('/pessoas/:id/atualiza', PessoasController.atualizaPessoaPagina)
      .post('/pessoas/atualiza', PessoasController.atualizaPessoa)
      .get('/pessoas/:id/deleta', PessoasController.deletaPessoaPagina)
      .post('/pessoas/deleta', PessoasController.deletaPessoa)

module.exports = router