const User = require('../models/User');

const deleteListController = async (req, res) => {
    let {
        userId, 
        dashboardId,
        listId
    } = req.params;
    const user = await User.findOne({userId: Number(userId)});
    if (user.dashboards[Number(dashboardId)].lists[Number(listId)] !== undefined) {
        const removingList = user.dashboards[Number(dashboardId)].lists.splice(Number(listId), 1);
        await user.save();
        res.status(201).send({
            body: {
                operation: 'delete-list',
                isSuccess: true,
                list: removingList
            }
        })
    } else {
        res.status(400).send({
            body: {
                operation: 'delete-list',
                isSuccess: false,
                description: `list with id: ${listId} not exists`
            }
        })
    }
}

const pushListController = async (req, res) => {
    let {
        userId, 
        dashboardId,
        listId
    } = req.params;
    const user = await User.findOne({userId: Number(userId)});
    const data = req.body;
    if (data === null || data === undefined) {
        res.status(400).send({
            body: {
                operation: 'push-list',
                isSuccess: false,
                description: 'data is null or undefined'
            }
        })    
    } else {
        user.dashboards[Number(dashboardId)].lists.push(data);
        await user.save();
        res.status(201).send({
            body: {
                operation: 'push-list',
                isSuccess: true,
                list: data
            }
        })
    }
}

module.exports = {
    deleteListController, 
    pushListController,
}