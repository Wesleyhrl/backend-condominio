const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Verificar se o email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já cadastrado." });
    }

    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Admin cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cadastrar admin.", error });
  }
};

exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Senha inválida." });
      }
  
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );
      
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Erro no login.", error });
    }
  };
