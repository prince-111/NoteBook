var jwt = require('jsonwebtoken'); // Imported JWT
const JWT_SECRET = 'princeisagoodb$oy';

// Fetch User function with req, res and next parameters
const fetchuser =(req,res,next)=>{

    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token'); // Get the token from the header
    
    if(!token){ // if token is not persent show the error
        res.status(401).send({error:"Please authentication using a valid token"})
    }

    try{
      const data = jwt.verify(token, JWT_SECRET); // Verifying the token and the JWT secret.
      req.user = data.user;
      next(); // if verified, then execute the next function. 
    }

    catch(error){
        res.status(401).send({error:"Please authentication using a valid token"})
    }
    
}

module.exports = fetchuser;


/**  
  Q1. Why is middleware needed ?
       ---> Middleware is required for helping developers in building applications more effectively and efficiently.
       ---> The middleware will act as a connection between data, applications, and the users. 
       ---> Middleware can be used to add logging and authentication functionality.
       ---> MIddleware working bitween HTTP Request and HTTP Response.

   Q. What is a JWT(JSON web token) token used for?
       ---> JWT, or JSON Web Token, is an open standard used to share information between two parties securely 
       — a client and a server. In most cases, it's an encoded JSON containing a set of claims and a signature.
 */