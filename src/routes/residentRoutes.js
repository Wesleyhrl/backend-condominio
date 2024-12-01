const express = require('express');
const {
  getAllResidents,
  createResident,
  updateResident,
  deleteResident,
  getResidentById,
} = require('../controllers/residentController');
const authMiddleware = require('../middleware/authMiddleware'); // Importando o middleware de autenticação

const router = express.Router();

// Rota para pegar todos os residentes - autenticada
router.get('/', authMiddleware, getAllResidents);

// Rota para adicionar um novo residente - autenticada
router.post('/', authMiddleware, createResident);

// Rota para atualizar residente - autenticada
router.put('/:id', authMiddleware, updateResident);

// Rota para deletar residente - autenticada
router.delete('/:id', authMiddleware, deleteResident);

// Rota para buscar um residente por ID - autenticada
router.get('/:id', authMiddleware, getResidentById);

module.exports = router;