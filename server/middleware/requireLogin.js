import jwt from 'jsonwebtoken';
import User from '../model/user-schema.js'


export const requireLogin = async (request, response, next) => {

    try {

        const token = request.cookies.jwtoken;

        const verifyToken = jwt.verify(token, 'QWERTYUIOPASDFGHJKLZXCVBNMQWERTY');

        const user = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!user) { throw new Error('User not found') }

        request.token = token;
        request.user = user;

        next();
    } catch (error) {
        response.status(401).send('Not Authorized')
    }

}