exports.isAdmin = (req, res, next) => {
  console.log(req.user);  
  console.log(req.user.role);  
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

exports.isEmployee = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied. Employee only." });
  }
  next();
};
