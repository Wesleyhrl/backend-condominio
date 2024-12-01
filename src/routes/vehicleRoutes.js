const express = require('express');
const {
    getAllVehicles,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    getVehiclesByResident,
} = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware'); // Importando o middleware de autenticação

const router = express.Router();

// Rota para pegar todos os veículos - autenticada
router.get('/', authMiddleware, getAllVehicles);

// Rota para adicionar um novo veículo - autenticada
router.post('/', authMiddleware, createVehicle);

// Rota para atualizar veículo - autenticada
router.put('/:id', authMiddleware, updateVehicle);

// Rota para deletar veículo - autenticada
router.delete('/:id', authMiddleware, deleteVehicle);
// Rota para buscar veículos por residente  - autenticada
router.get('/resident/:residentId', authMiddleware, getVehiclesByResident); 

module.exports = router;
