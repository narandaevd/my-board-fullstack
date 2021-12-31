const User = require("./../models/User");

async function pushDashboardController(req, res) {
    const {userId, dashboardId} = req.params;
    const data = req.body;
    const user = await User.findOne({userId: Number(userId)});
    user.dashboards.push(data);
    user.save();
    res.status(201).send({
        operation: 'push-dashboard',
        isSuccess: true,
        dashboard: data,
    })
}

async function deleteDashboardController(req, res) {
    const {userId, dashboardId} = req.params;
    const user = await User.findOne({userId: Number(userId)});
    const removingDashboard = user.dashboards.splice(Number(dashboardId), 1);
    user.save();
    res.status(201).send({
        operation: 'delete-dashboard',
        isSuccess: true,
        dashboard: removingDashboard,
    })
}

module.exports = {
    pushDashboardController,
    deleteDashboardController,
}