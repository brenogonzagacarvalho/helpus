const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authConfig.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).send({ error: 'Nenhum Token enviado' });
    
        // Formato dos tokens com hash incia com Berer + varios numero aleatorios autogerados. 
        //EX: Bearer hashashashahshshashhsh
    const parts = authHeader.split(' ');
    
    if(!parts.length === 2 )
        return res.status(401).send({ error: 'Token errado' });

    //desestruturação do authHeader. Em SHEME que é o Bearer do token e em TOKEN o proprio token.
    const [scheme, token ] = parts;

    //IF com REGEX "/" incio da expressao |"^" incio da string que ele precisa percorrer | "Bearer" é a string da busca | $" fim da string de busca | "i.test" case senscitive
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado' });
  
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
        return res.status(401).send({error: 'Token invalido'});

        req.userId = decoded;
        return next();
    });

    
};