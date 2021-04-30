


exports.getUserId = (req) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded.id;
  
    }
    return false
  
    
  };
  