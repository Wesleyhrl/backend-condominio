const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Cadastro de Admin (sem autenticação)
router.post('/register', registerAdmin);

// Login de Admin (sem autenticação)
router.post('/login', loginAdmin);

// Rota protegida (exemplo)
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: "Acesso autorizado." });
});

module.exports = router;
