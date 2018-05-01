const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySqueekWll2018!",
    database: "bamazon_db",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId)
    welcome();
});

const welcome = function () {
    inquirer
        .prompt({
            name: "welcome",
            type: "rawlist",
            message: "Would you like to see current [INVENTORY], [SHOP], [RETURN] and item, or talk to [CUSTOMER SERVICE]?",
            choices: ["INVENTORY", "SHOP", "RETURN", "CUSTOMER SERVICE"]
        })
        .then(function (answer) {
            if (answer.welcome.toUpperCase() === "INVENTORY") {
                inStock();
            } else if (answer.welcome.toUpperCase() === "SHOP") {
                shop();
            } else if (answer.welcome.toUpperCase() === "RETURN") {
                returnItem();
            } else if (answer.welcome.toUpperCase() === "CUSTOMER SERVICE") {
                customerService();
            } else {
                tryAgain();
            }
        });
};

const shop = function () {
    console.log("Let's start shopping!\n");
    connection.query("SELECT * FROM inventory", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "You could really use one of these in your life!\n",
                    choices: function () {
                        let inventory = [];
                        for (var i = 0; i < res.length; i++) {
                            inventory.push(res[i].item_name);
                        }
                        return inventory;
                    },

                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many do you want?"
                }
            ])
            .then(function (answer) {
                let selection;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_name === answer.choice) {
                        selection = res[i];
                    }
                };

                if (selection.stock >= parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE inventory SET ? WHERE ?",
                        [
                            {
                                stock: (selection.stock - answer.quantity)
                            },
                            {
                                id: selection.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("You have purchased " + answer.quantity + " of " + selection.item_name + "!");
                            welcome();
                        }
                    );
                }
                else {
                    console.log("Sorry. We don't currently have enough of that in stock to fill that request.");
                    welcome();
                }
            });
    });
};

const inStock = function () {
    console.log("Let's see what we have in stock...\n");
    connection.query("SELECT * FROM inventory", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_name + ": " + res[i].stock + "\n")
        }
        welcome();
    });
    
};

const returnItem = function () {
    console.log("Sorry! Every purchase is a life-long commitment!")
    welcome();
};

const customerService = function () {
    console.log("DESTROY ALL HUMANS!!!")
    welcome();
};

const tryAgain = function () {
    console.log("Sorry, I didn't get that. Why don't you try again...")
    welcome();
};