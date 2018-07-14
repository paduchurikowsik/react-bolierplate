const jwt = require('jsonwebtoken');
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

        }
    }
};