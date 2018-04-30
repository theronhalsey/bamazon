const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MySqueekWll2018!",
    database: "playlist_db",
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
            message: "Would you like to [SHOP], [RETURN] and item, or talk to [CUSTOMER SERVICE]?",
            choices: ["POST", "quantity"]
        })
        .then(function (answer) {
            if (answer.welcome.toUpperCase() === "SHOP") {
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
    console.log("Let's see what we have in stock...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var inventory = [];
                        for (var i = 0; i < results.length; i++) {
                            inventory.push(results[i].item_name);
                        }
                        return inventory;
                    },
                    message: "You could really use one of these in your life!"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many do you want?"
                }
            ])
            .then(function (answer) {
                let selection;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        selection = results[i];
                    }
                };

                if (selection.stock > parseInt(answer.quantity)) {
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
                            console.log("You ahve purchased " + answer.quantity + " of " + selection.name + "!");
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