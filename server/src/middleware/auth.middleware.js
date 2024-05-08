import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
  try {
     const token = req.header?.("Authorization")?.replace("Bearer ", "");
      console.log("Token", token);
    if (!token) {
        return res.status(403).json({ status: 403, message: "Token not found", data: {} });
      }
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
          return res.status(403).json({status: 403, message: "Invalid token", data: {} });
        }
        req.user = user;
        next();
      });

  } catch (error) {
    console.log("Error in verifyJWT", error);
  }
}