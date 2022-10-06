var jwt = require('jsonwebtoken');    //import jsonwebtoken



const JWT_SECRET = 'Harryisagoodb$ou';        // my secret sign
const fetchuser = (req, res, next) => {
    // Get the user from JWT token and id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token(token not received)" })
    }
    try {


        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token(token recived)" })
    }
}





module.exports = fetchuser;
