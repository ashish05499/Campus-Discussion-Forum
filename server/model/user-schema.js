import Mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const password = await bcrypt.hash(this.password, 12);
        const cpassword = await bcrypt.hash(this.cpassword, 12);
        this.password = password;
        this.cpassword = cpassword;
    }
    next();
})

UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, 'QWERTYUIOPASDFGHJKLZXCVBNMQWERTY');
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = Mongoose.model('user', UserSchema);

export default User;