import User from '../model/user-schema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const Register = async (request, response) => {

    const username = request.body.username[0];
    const email = request.body.email[0];
    const password = request.body.password[0];
    const cpassword = request.body.cpassword[0];

    if (!username || !email || !password || !cpassword) {
        response.status(422).json('fields are empty')
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            response.status(422).json('user already exist');
        } else {
            const user = await new User({ username, email, password, cpassword });
            user.save();
            response.status(201).json('user registered successfully');
        }
    } catch (error) {
        response.status(500).json(error);
    }
}


export const Login = async (request, response) => {

    const email = request.body.email[0];
    const password = request.body.password[0];

    if (!email || !password) {
        response.status(422).json('fields are empty')
    }

    try {

        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const userPassword = userLogin.password;
            const isMatch = await bcrypt.compare(password, userPassword);
            if (isMatch) {
                const token = await userLogin.generateAuthToken();
                const { _id, username, email } = userLogin;
                response.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: false
                }).status(200).json({ user: { _id, username, email } });
            }
            else {
                response.status(422).json('Invalid Credentials');
            }
        }
        else {
            response.status(422).json('Invalid Credentials');
        }
    }
    catch (error) {
        response.status(500).json(error);
    }

}


export const Logout = (request, response) => {
    response.clearCookie('jwtoken').status(200).json('User Logout');
}