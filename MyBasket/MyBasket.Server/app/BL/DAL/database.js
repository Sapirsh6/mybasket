﻿var http = require('http');
var express = require('express');
var mongodb = require('../../../node_modules/mongodb');
var ObjectID = mongodb.ObjectID;
var mongoClient = mongodb.MongoClient;
var bodyParser = require('body-parser');
var consts = null;

var collections = ['users', 'categories'];

// log on to db
exports.setupDB = function (dbUrl, con, p_db, callback) {
    consts = con;

    mongoClient.connect(dbUrl, function (err, client) {
        if (err) {
            console.log("Could not  connect to DB");
            return;
        }

        var database = client.db('test');
        console.log('Connect to db');

        for (col = 0; col < collections.length; col++) {
            database[collections[col]] = database.collection(collections[col]);
        }
        
        db = database;
        p_db = database;

        callback(p_db);
    })
}

exports.getUsers = function (callback) {
    db.users.find({}).toArray(callback);
}

exports.login = function (email, password, callback) {
    db.users.find({ "email": email, "password": password }).toArray(callback);
}

exports.register = function (data, callback) {
    db.users.insert(data, callback);
}

exports.getCategories = function(callback) {
    db.categories.find({}).toArray(callback);
}