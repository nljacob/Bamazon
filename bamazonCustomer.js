var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
});

function start() {
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) throw error;
        console.table(res);


        inquirer.prompt([{
            name: "id",
            type: "input",
            message: "What item would you like to purchase? Please enter the ID number.",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }, {
            name: "units",
            type: "input",
            message: "How many would you like to buy?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;

            }

        }]).then(function (answer) {

            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.id))
                    stock(parseInt(answer.id), parseInt(answer.units));
            }
        });
    });
}

function stock(itemID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemID
    }, function (error, res) {
        if (error) throw error;

        else if (units >= res[0].stock_quantity) {
            console.log("Sorry! Insufficient quantity!");
            start();
        }
        else
            updateQuantity(itemID, units);
    });
}

function cost(itemID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemID
    }, function (error, res) {
        if (error) throw error;

        var totalCost = res[0].price * units;
        console.log("\nYour total is $" + totalCost);

        restart();
    });
}

function updateQuantity(itemID, units) {
    connection.query("SELECT * FROM products WHERE ?", {
        item_id: itemID
    }, function (error, res) {
        if (error) throw error;

        var newQuantity = res[0].stock_quantity - units;

        if (newQuantity < 0)
            newQuantity = 0;

        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
        }, {
            item_id: itemID
        }], function (error, res) { });

        cost(itemID, units);
    });
}

function restart() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to purchase another item?",
        name: "confirm",
        default: true
    }]).then(function (answer) {
        if (answer.confirm)
            start();
        else {
            console.log("\nThank you for shopping on Bamazon!");
            connection.end();
        }
    });
}

start();