const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/authConfig.json')
const User = require('../models/User');
const router = express.Router();

function generateToken(params = {}) {
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async(req, res) => {
    const { email } = req.body;

   try {
       if(await User.findOne({ email }))
            return res.status(400).send({error: 'usuario com email ja existente'})
        
       const user = await User.create(req.body);
       user.password = undefined;
        
        return res.send({ 
            user,
            token : generateToken ({id: user.id }),
        });
    }catch (err) {
        return res.status(400).send({error: 'Campus invalidos!'})
    }

});

router.post('/authenticate', async(req, res) => {
    const { email, password } = req.body;
    
    
    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ error: 'usuario nao encontrado' });

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'senha errada' })

    user.password = undefined;

    const token = jwt.sign({ id: user.id}, authConfig.secret,{
        expiresIn: 86400,
    } );

    res.send({user, token : generateToken ({id: user.id })
    });
});

router.post('/forgot_password', async(req, res) => {
    const { email } = req.body;
      
    try {
        const user = await User.findOne({email})
      
        if(!user)
            return res.status(400).send({ error: 'usuario nao encontrado' });
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);
        
        await User.findByIdAndUpdate(user.id,{
            '$set':{
                passwordResetToken: token,
                passwordResetExpiress: now,
            }
        });
        res.send({token,now});        
    }catch(err){
        res.status(400).send({error: "Erro ao recuperar a senha, tente novamente"})
    }
});
router.post('/reset_password', async(req, res) => {
    const { email, token, password } = req.body;
    
    try {
        const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires');

        if(!user)
        return res.status(400).send({ error: 'usuario nao encontrado' });

        if(token!== user.passwordResetToken)
            return res.status(400).send({error: 'token invalido para recuperação'})
        
        const now = new Date();
        
        if(now > user.passwordResetExpiress)
            return res.status(400).send({error: 'token expirado, solicite outro novamente'})
    
        user.password = password;
        await user.save();
        res.send('senha alterada com sucesso!');

    }catch(err){
        res.status(400).send({error: "Erro ao recuperar a senha, tente novamente"})
    }

});
module.exports = app => app.use('/auth', router);