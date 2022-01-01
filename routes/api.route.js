const {resolve} = require('path')

const {Router} = require('express');
const bodyParser = require('body-parser');

const {deleteListController, pushListController} = require(resolve(__dirname, '../', 'controllers', 'listControllers'))
const {deleteCardController, pushCardController} = require(resolve(__dirname, '../', 'controllers', 'cardControllers'))
const {authController, registerController} = require(resolve(__dirname, '../', 'controllers', 'authControllers'));
const {getUserDataController} = require(resolve(__dirname, '../', 'controllers', 'userControllers'))
const {deleteDashboardController, pushDashboardController} = require(resolve(__dirname, '../', 'controllers', 'dashboardControllers'))

const parser = bodyParser.urlencoded({extended: false});
const api = Router();

api.get('/user/:id/data', getUserDataController);
api.post('/user/:userId/dashboards/:dashboardId/add', parser, pushDashboardController);
api.post('/user/:userId/dashboards/:dashboardId/delete', parser, deleteDashboardController);
api.post('/user/:userId/dashboards/:dashboardId/lists/:listId/delete', parser, deleteListController);
api.post('/user/:userId/dashboards/:dashboardId/lists/:listId/add', parser, pushListController);
api.post('/user/:userId/dashboards/:dashboardId/lists/:listId/cards/:cardId/add', parser, pushCardController);
api.post('/user/:userId/dashboards/:dashboardId/lists/:listId/cards/:cardId/delete', parser, deleteCardController);
api.post('/register', parser, registerController);
api.post('/auth', parser, authController);

module.exports = api;