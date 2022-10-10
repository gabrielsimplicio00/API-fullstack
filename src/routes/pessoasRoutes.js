const express = require('express')
const PessoasController = require('../controllers/PessoasController.js')

const router = express.Router()

router.route('/').get(PessoasController.exibeFormulario)
router.route('/pessoas').get(PessoasController.exibePessoas)
router.route('/pessoas/exibe').post(PessoasController.handleExibeUmaPessoa)
router.route('/pessoas/:id').get(PessoasController.exibeUmaPessoa)
router.route('/pessoas').post(PessoasController.criaPessoa)
router.route('/pessoas/atualiza').post(PessoasController.handleAtualizaPessoaPagina)
router.route('/pessoas/:id/atualiza').get(PessoasController.atualizaPessoaPagina)
router.route('/pessoas/atualiza/sucesso').post(PessoasController.atualizaPessoa)
router.route('/pessoas/deleta').post(PessoasController.handleDeletaPessoaPagina)
router.route('/pessoas/:id/deleta').get(PessoasController.deletaPessoaPagina)
router.route('/pessoas/deleta/sucesso').post(PessoasController.deletaPessoa)

module.exports = router