const mongoose = require('mongoose'); 
const {Schema, model} = mongoose;

const CardSchema = new Schema({
    header: String,
    content: String,
    assignee: String,
})

const ListSchema = new Schema({
    name: String,
    cards: [CardSchema]
})

const DashboardSchema = new Schema({
    title: String,
    dashboardId: Number,
    lists: [ListSchema]
})

const UserSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    userId: Number,
    dashboards: [DashboardSchema]
}, {collection: 'users'})

module.exports = model('User', UserSchema);