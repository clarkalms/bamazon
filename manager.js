let mysql = require("mysql");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function start() {
    inquirer
        .prompt({
            name: "choices",
            type: "list",
            message: "Please choose an option below?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        })
        .then(function (answer) {
            if (answer.choices === "View Products for Sale") {
                displayItemsForSale();
            }
            else if (answer.choices === "View Low Inventory") {
                lowInventory();
            }
            else if (answer.choices === "Add to Inventory") {
                addInventory();
            }
            else if (answer.choices === "Add New Product") {
                addNewProduct();
            }
            else if (answer.choices === "EXIT") {
                connection.end();
            }
        });
}

function displayItemsForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity<=10", function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });

}

function addInventory() {
    inquirer
        .prompt([
            {
                name: "id_of_product",
                type: "input",
                message: "What is the ID of the product you would like to add inventory to?",
            },
            {
                name: "item_Quantity",
                type: "input",
                message: "How many units of this product would you like to add?",
            },

        ]).then(function (answer) {
            let itemID = answer.id_of_product;
            let itemQuantity = answer.item_Quantity;
            updateItem(itemID, itemQuantity);
        });

}

function updateItem(ID, amount) {
    connection.query('Select * FROM products WHERE id = ' + ID, function (err, res) {
        if (err) {
            console.log(err)
        }

        if (amount > 0) {
            connection.query("UPDATE products SET stock_quantity = stock_quantity + " + amount + " WHERE id = " + ID);
        }
        displayItemsForSale();
    });
}

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "addName",
                type: "input",
                message: "Please input the name of the product you would like to add.",
            },
            {
                name: "department",
                type: "input",
                message: "Which department does this product belong in?",
            },
            {
                name: "unitPrice",
                type: "input",
                message: "What is the price per unit of the product?",
            },
            {
                name: "addQuantity",
                type: "input",
                message: "How many would you like to add to the your stock?",
            }

        ]).then(function (answer) {
            let name = answer.addName;
            let department = answer.department;
            let price = answer.unitPrice;
            let quantity = answer.addQuantity;
            addedItem(name, department, price, quantity);
        });
}


function addedItem(name, department, price, quantity) {
    connection.query('INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES("'  + name + '","' + department + '",' + price + ',' + quantity + ')');
    displayItemsForSale();

};


start();