# mysql
Amazon simulation. It will take in orders and deplete the product number on a database
User will see a inventory list of all the products with the product id, name, department cost and amount in stock which will be queried from the backend using mysql module.
Inquirer.js will prompt the user for the id of the product and amount to purchase.
After the user enters this information the backend will be queried as to if there are enough of the item in enventory to fullfill the order. 
If there are enough items the price will be queried and the total price calculated and display, otherwise "Insufficient quantity!" will be displayed. 
Following either result iquirer will then prompt the user whether they wish to continue or exit. If they select 'continue' the process will repeat but otherwise the program will exit.
