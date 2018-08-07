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
        },
        getPromotion: async (root, { _id }, { currentUser, Promotion }) => {
            if (!currentUser) {
                return null;
            }
            console.log("got it");
            const promotion = await Promotion.findOne({ _id });
            return promotion;
        },
        getCourseTour: async (root, { _id }, { currentUser, CourseTour }) => {
            if (!currentUser) {
                return null;
            }
            console.log("got it");
            const courseTour = await CourseTour.findOne({ _id });
            return courseTour;
        },
        getCurrentUser: async (root, args, { currentUser, User }) => {
            if (!currentUser) {
                return null;
            }

            const user = await User.findOne({ email: currentUser.email })
                .populate({
                    path: 'roles',
                    model: 'Role'
                });

            return user;
        },
        getAllPromotions: async (root, args, { currentUser, Promotion }) => {
            if (!currentUser) {
                return null;
            }

            const allPromotions = await Promotion.find().sort({
                createdDate: 'desc'
            });
            return allPromotions;


        },
        getAllCourseTours: async (root, args, { currentUser, CourseTour }) => {
            if (!currentUser) {
                return null;
            }

            const allCourseTours = await CourseTour.find().sort({
                createdDate: 'desc'
            });
            return allCourseTours;


        }
    },
    Mutation: {
        addAbout: async (root, { name, about }, { currentUser, About }) => {
            if (!currentUser) {
                return null;
            }

            const checkabout = await About.findOne();
            if (checkabout) {
                const updatedAbout = await About.findByIdAndUpdate(checkabout._id, { name, about }, { new: true });
                return updatedAbout;
            }
            const newAbout = await new About({
                name,
                about
            }).save();

            console.log(newAbout);
            return newAbout;
        },
        addPromotion: async (root, { name, description, startDate, endDate }, { currentUser, Promotion }) => {
            if (!currentUser) {
                return null;
            }
            const newPromotion = await new Promotion({
                name,
                description,
                startDate,
                endDate
            }).save();

            return newPromotion;
        },
        addCourseTour: async (root, { name, description }, { currentUser, CourseTour }) => {
            if (!currentUser) {
                return null;
            }
            const newCourseTour = await new CourseTour({
                name,
                description
            }).save();

            return newCourseTour;
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

        },
        deletePromotion: async (root, { _id }, { currentUser, Promotion }) => {
            if (!currentUser) {
                return null;
            }
            const promotion = await Promotion.findOneAndRemove({ _id });
            return promotion;
        },
        deleteCourseTour: async (root, { _id }, { currentUser, CourseTour }) => {
            if (!currentUser) {
                return null;
            }
            const courseTour = await CourseTour.findOneAndRemove({ _id });
            return courseTour;
        },
    }
};