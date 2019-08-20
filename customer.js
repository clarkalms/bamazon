let mysql = require("mysql");
let inquirer = require("inquirer");


let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
});

function start() {
    inquirer
        .prompt({
            name: "purchasing",
            type: "list",
            message: "Would you like to see what items we have for sale?",
            choices: ["YES", "NO"]
        })
        .then(function (response) {
            if (response.purchasing === "YES") {
                displayItems();
            }
            else if (response.purchasing === "NO") {
                console.log("Thank you. Come again.")
                connection.end();
            }
        });
}

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        secondPrompts();
    });
}

function secondPrompts() {
    inquirer
        .prompt([
            {
                name: "id_of_product",
                type: "input",
                message: "What item would you like to purchase? (Please select by ID)",
            },
            {
                name: "item_Quantity",
                type: "input",
                message: "How many would you like to purchase?",
            },

        ]).then(function (response) {
            let itemID = response.id_of_product;
            let itemQuantity = response.item_Quantity;
            purchasedItem(itemID, itemQuantity);
        });
}

function purchasedItem(ID, amount) {
    connection.query('Select * FROM products WHERE id = ' + ID, function (err, res) {
        if (err) {
            console.log(err)
        }
        if (amount <= res[0].stock_quantity) {
            var totalCost = res[0].price * amount;

            console.log(`Your total of ${amount}: ${res[0].product_name} = $${totalCost}. Thank you for your purchase.`);
            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amount + " WHERE id = " + ID);
            
        }else{

            console.log(`Insufficient quantity! We currently have: ${res[0].stock_quantity} in stock of: ${ID}: '${res[0].product_name}.' Please adjust quantity to complete your order.`);
            
        }
        displayItems();
    });           
        
}


start();