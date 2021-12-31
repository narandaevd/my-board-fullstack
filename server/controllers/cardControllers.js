const User = require('../models/User');

const pushCardController = async (req, res) => {
    let {
        userId, 
        dashboardId,
        listId,
        cardId, 
    } = req.params;
    const user = await User.findOne({userId: Number(userId)});
    const data = req.body;
    if (data === null || data === undefined) {
        res.status(400).send({
            body: {
                operation: 'add-card',
                isSuccess: false,
                description: 'card is null or undefined'
            }
        })
    } else {
        user.dashboards[Number(dashboardId)].lists[Number(listId)].cards.push(data);
        await user.save();
        res.status(201).send({
            body: {
                operation: 'add-card',
                isSuccess: true,
                card: data
            }
        })
    }
}

const deleteCardController = async (req, res) => {
    let {
        userId, 
        dashboardId,
        listId,
        cardId, 
    } = req.params;
    const user = await User.findOne({userId});
    if (user.dashboards[Number(dashboardId)].lists[Number(listId)].cards[Number(cardId)] === undefined) {
        res.status(400).send({
            body: {
                operation: "delete-card",
                isSuccess: false,
                description: 'card is ont exists'
            }
        })    
    } else {
        const removingCard = user.dashboards[Number(dashboardId)].lists[Number(listId)].cards.splice(Number(cardId), 1);
        await user.save();
        res.status(201).send({
            body: {
                operation: "delete-card",
                isSuccess: true,
                card: removingCard
            }
        })
    }
}

module.exports = {
    pushCardController,
    deleteCardController,
}