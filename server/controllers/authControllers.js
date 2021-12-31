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
    
}

module.exports = {
    authController,
    registerController,
}