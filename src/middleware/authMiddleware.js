const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  
  if (!token) {
    return res.status(401).json({ message: "Acesso não autorizado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    
    // Verifica se o usuário tem o papel de admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Acesso restrito a administradores." });
    }
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

module.exports = authMiddleware;
