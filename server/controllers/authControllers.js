const User = require('../models/User');

const authController = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        email, password,
    });
    if (user == null) 
        res.status(202).send({
            body: {isFounded: false},
        })
    else 
        res.status(201).send({
            body: {
                isFounded: true,
                userId: user.userId,
                email, 
                password,
                dashboards: user.dashboards
            }
        })
}

const registerController = async (req, res) => {
    const {email, password, confirmPassword, name, surname} = req.body;
    const alreadyRegisteredUser = await User.findOne({email, password});
    const userWithEqualEmail = await User.findOne({email});
    const count = await User.count();
    if (alreadyRegisteredUser) {
        res.status(202).send({
            body: {
                operation: 'register',
                isSuccess: false,
                description: 'User with this data was already registered',
            }
        })       
    } else if (userWithEqualEmail) {
        res.status(202).send({
            body: {
                operation: 'register',
                isSuccess: false,
                description: 'This email was already used',
            }
        })      
    } else if (password !== confirmPassword) {
        res.status(202).send({
            body: {
                operation: 'register',
                isSuccess: false,
                description: 'Passwords aren\'t equal',
            }
        }) 
    } else if (name === "") {
        res.status(202).send({
            body: {
                operation: 'register',
                isSuccess: false,
                description: '\'Name\' field is empty',
            }
        }) 
    } else if (surname === "") {
        res.status(202).send({
            body: {
                operation: 'register',
                isSuccess: false,
                description: '\'Surname\' field is empty',
            }
        }) 
    } else {
        const newUser = new User({
            email, password, dashboards: [
                {title: 'Your dashboard', lists: []}
            ], name, surname, 
            userId: count, 
        });
        newUser.save();
        res.status(201).send({
            body: {
                operation: 'register',
                isSuccess: true,
                userData: req.body,
                userId: count,
            }
        })
    }
}

module.exports = {
    authController,
    registerController,
}