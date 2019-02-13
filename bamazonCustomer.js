var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  //host
  host: "localhost",
  // Your port (if not 3306)
  port: 3306,
  //username
  user: "root",
  // Your password
  password: "pjt686",
  //database name
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query(`SELECT item_id, product_name, department_name, price, stock_quantity
                    FROM products`, function(err, res) {
    if (err) throw err;
    var ids = [];
    for(var i = 0; i<res.length; i++){
      var obj = res[i];
      ids.push(obj.item_id.toString());
      console.log(`| ${pad(obj.item_id, 3, true)} | ${pad(obj.product_name, 25)} | ${pad(obj.department_name, 15)} | $${pad(obj.price, 10, true)} | ${pad(obj.stock_quantity, 4, true)} |`)
    }
    customerOrder(ids, "Continue");
  });
}

function customerOrder(ids, status){
  if(status !== "Exit"){
    inquirer
      .prompt([{
        type: "list",
        name: "productId",
        message: "Id of product...",
        choices: ids
      },{
        type: "input",
        name: "unitAmnt",
        message: "Number of units to purchase..."
      }])
      .then(function(user) {

        connection.query(`SELECT item_id, stock_quantity, price
                          FROM products
                          WHERE item_id = ${user.productId} 
                          AND stock_quantity <= ${user.unitAmnt}`, (function(amnt){
            return function(err, res) {
              if (err) throw err;
              if(res.length > 0){
                var remainingAmnt = res[0].stock_quantity - amnt;
                console.log("Total cost of purchase: $"+amnt*res[0].price);
                connection.query(`UPDATE products
                                  SET stock_quantity = ${remainingAmnt}
                                  WHERE item_id = ${res.item_id};`, function(err, res) {
                  if (err) throw err;

                });
              }else{
                console.log("Insufficient quantity!");
              }
              inquirer
                .prompt([{
                  type: "list",
                  name: "status",
                  message: "For more purchases select Continue, or Exit to exit...",
                  choices: ["Continue", "Exit"]
                }])
                .then(function(user) {
                  status = user.status;
                  if(status === "Exit"){
                    connection.end();
                  }
                  customerOrder(ids, status);
                });
            };
        })(user.unitAmnt));
      });
  }
}

function pad(str, totalSpace, numeric){
  str = str.toString();
  totalSpace -= str.length;
  var spaces = "";
  for(var i = 0; i<totalSpace; i++){
    spaces += " ";
  }
  if(numeric){
    return spaces + str;
  }
  return str + spaces;
}
