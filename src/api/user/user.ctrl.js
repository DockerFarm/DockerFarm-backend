import db from 'db';
import config from 'config';
import jwt from 'jsonwebtoken';

const User = db.sequelize.models.User;

const ctrl = {};

ctrl.signup = async ({ body }, res) => {

    try {
        const user = await User.create({ email: body.email, password: body.password });

        if (user) {
            res.status(200).send({ message : 'success' });
        } else { 
            res.status(500).send({ message : 'something wrong!'});
        }
    } catch ( error ) {
        res.status(500).send({ error } );
    } 

};

ctrl.signin = async ({ body }, res) => {
    let email, password;

    if ( body.email && body.password ) {
        email = body.email;
        password = body.password;
    } 

    try {
        const findUser = await User.findOne({ where : { email }});
        if ( !findUser ) { 
            res.status(401).send({ message : 'no search user found'});
        } else {
            if ( findUser.verify(password) ) { 
                let payload = { email : findUser.email };
                let token = jwt.sign(payload, config.passport.jwt.secret, { expiresIn: '1d' } );

                res.status(200).send({ message : 'success', token : "JWT " + token });


            } else {
                res.status(401).send({ message : 'password did not match '});
            }
        }
    } catch ( error ) {
        res.status(500).send({ error });
    }


};


ctrl.me = ({ body, user }, res ) => {
    res.status(200).send({ user });
};

export default ctrl;