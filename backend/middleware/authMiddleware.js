export const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next(); // user is logged in
  }
  return res.status(401).json({ error: "Unauthorized. Please login first." });
};