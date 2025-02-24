const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;  
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido ou expirado." });
  }
};

module.exports = { authenticateJWT };
