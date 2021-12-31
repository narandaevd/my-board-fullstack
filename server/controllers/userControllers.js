const User = require('../models/User');

const getUserDataController = async (req, res) => {
    const userId = Number(req.params.id);
    const userData = await User.findOne({userId});
    if (userData === null)
        res.send({body: {isFounded: false}});
    else
        res.send({
            body: {
                isFounded: true,
                ...JSON.parse(JSON.stringify(userData))
            },
        });
}

module.exports = {
    getUserDataController,
}