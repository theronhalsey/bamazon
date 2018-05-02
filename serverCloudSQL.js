const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const inquirer = require("inquirer");

const config =
    {
        userName: 'theron',
        password: 'MySqueekWll2018!',
        server: 'theron-test-db.database.windows.net',
        options:
            {
                database: 'testDB'
                , encrypt: true
            }
    }

const connection = new Connection(config);

connection.on('connect', function (err) {
    if (err) {
        console.log(err)
    }
    else {
        welcome()
    }
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
    request = new Request("SELECT * FROM inventory", function (err, rowCount, rows) {
        if (err) throw err;
        console.log(rowCount)
        console.log(rows)
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    message: "You could really use one of these in your life!\n",
                    choices: function () {
                        let inventory = [];
                        for (var i = 0; i < rows.length; i++) {
                            inventory.push(rows[i].item_name);
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
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].item_name === answer.choice) {
                        selection = rows[i];
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
}


const inStock = function () {
    request = new Request("SELECT * FROM inventory", function (err, rowCount, rows) {

        console.log(rowCount + ' row(s) returned');
        process.exit();
    });
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
        });
    });
    connection.execSql(request);
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