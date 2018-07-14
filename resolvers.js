const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { fullname, email } = user;
    return jwt.sign({ fullname, email }, secret, { expiresIn });
}

exports.resolvers = {
    Query: {
        getAbout: async (root, args, { About }) => {
            const oneAbout = await About.findOne();
            return oneAbout;
        }
    },
    Mutation: {
        addAbout: async (root, { name, about }, { About }) => {
            const newAbout = await new About({
                name,
                about
            }).save();

            return newAbout;
        },
        signupUser: async (root, { fullname, email, password }, { User }) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('User already exists');
            }
            const newUser = await new User({
                fullname,
                email,
                password
            }).save();

            return { token: createToken(newUser, process.env.SECRET, "1hr") };

        },
        signinUser: async (root, { email, password }, { User }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('User doesnot exists');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invaild Password');
            }

            return { token: createToken(user, process.env.SECRET, "1hr") };

        }
    }
};