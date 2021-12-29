// import models
const User = require('../models/User');

const {Router} = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const parser = bodyParser.urlencoded({extended: false});
const api = Router();

api.get('/user/:id/data', async (req, res) => {
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
})

api.post('/user/:userId/dashboards/:dashboardId/lists/:listId/cards/:cardId', parser, async (req, res) => {
    console.log(req.params)
    let {
        userId, 
        dashboardId,
        listId,
        cardId, 
    } = req.params;
    const {header, content, assignee} = req.body;
    const user = await User.findOne({userId});
    user.dashboards[dashboardId].lists[listId].cards.push({
        header, content, assignee
    });
    user.save();
})

api.post('/register', parser, (req, res) => {
    // res.redirect('/');
})

api.post('/auth', parser, async (req, res) => {
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
})

module.exports = api;