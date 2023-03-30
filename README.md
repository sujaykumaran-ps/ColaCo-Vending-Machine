# ColaCo Vending Machine

## Background 
You’ve been contracted by ColaCo to build a virtual vending machine for their new line of virtual sodas.  
Virtual sodas, for “reasons”, are hard to create so currently there are limited quantities and varieties available.  
At the time of launch, there will be 4 different varieties of virtual soda that your machine needs to vend, but the engineering team is working hard to launch additional flavors later this year. Each soda has a unique cost and available quantity.  
ColaCo’s sales team has tentatively set these prices but might need to adjust them based on how well the product sells.  Marketing has also requested the ability to change the prices during set promotional windows.

## Current Virtual Soda lineup

**Product Name:** Fizz<br/>
**Description:** An effervescent fruity experience with hints of grape and coriander.<br/>
**Cost:** 1 dollar US<br/>
**Maximum Quantity available to vend:** 100

**Product Name:** Pop<br/>
**Description:** An explosion of flavor that will knock your socks off!<br/>
**Cost:*** 1 dollar US<br/>
**Maximum Quantity available to Vend:** 100

**Product Name:** Cola<br/>
**Description:** A basic no nonsense cola that is the perfect pick me up for any occasion.<br/>
**Cost:** 1 dollar US<br/>
**Maximum Quantity available to vend:** 200

**Product Name:** Mega Pop<br/>
**Description:** Not for the faint of heart.  So flavorful and so invigorating, it should probably be illegal.<br/>
**Cost:** 1 dollar US<br/>
**Maximum Quantity available to vend:** 50

## Analysis and Solution

1. Started with Setting up the backend server using Node.js and a web framework like Express.js. Defined API routes for handling inventory updates, restocking, and pricing changes. Also, created API routes to check Admin Login info for Restocking.
2. Chose a MongoDB database to store the virtual soda inventory and Admin Access Code information. 
3. Developed the frontend using React. Tried to create a user interface that looks and feels like a traditional vending machine.
4. Defined state variables in the frontend to keep track of the current inventory, pricing information, the amount of money inserted by the user and the login information for restocking.
5. Created a form in the frontend to allow the user to select a virtual soda and insert money.
6. Defined a function to handle the form submission that sends a request to the backend API to generate the JSON soda file based on the user's selection and deduct the cost from the user's inserted money, while updating the Soda's current quantity.
7. Updated the frontend state variables to reflect the new inventory and the remaining balance of the user's inserted money.
8. Created an admin interface in the frontend that allows the user to check the status of the vending machine and restock the inventory. This page can only be reached by entering the correct Access Code. Only the admins have access to this page.
9.  Defined a function to handle the admin form submission that sends a request to the backend API to restock the inventory.
10. Implemented a feature to update the pricing information in the database based on promotional windows.
11. Tested the application thoroughly to ensure it meets the requirements and functions as expected.

## Instructions to run the Project:

### Installation and Setting up MongoDB schemas

1. Install required tools such as Node, brew, MongoDB Compass, Postman in your local system.
2. Install the mongodb by using the command 'brew install mongodb-community@6.0'. 
3. Run the 'brew services start mongodb-community@6.0' command to start the MongoDB server.
4. Hit 'mongosh' command to find the connection string to use in the MongoDB Compass client app.

### Git Cloning and running the application

1. Clone the repository to local by using the Command 'git clone https://github.com/sujaykumaran-ps/ColaCo-Vending-Machine.git'.
2. Import the 'ColaCo-Vending-Machine' Project Folder in VS Code.
3. Open the Terminal. cd into the 'server' folder. Install the Dependencies using 'npm install' and run the 'node server.js' command from 'server' directory to start the back-end in 'http://localhost:3001'.
4. Open the Terminal. cd into the 'webapp' folder. Install the Dependencies using 'npm install' and run the 'npm start' command from 'webapp' directory to start the React frond-end app in 'http://localhost:3000'.

### Load Data into DB

To load soda details into the Database, Open Postman App and create a POST request to 'http://localhost:3001/sodas' API, using the below request body JSONs

#### FIZZ

{
    "_id": "1",
    "name": "Fizz",
    "description": "An effervescent fruity experience with hints of grape and coriander",
    "cost": 1,
    "maxQuantity": 100,
    "currQuantity": 100
}

#### POP

{
    "_id": 2,
    "name": "Pop",
    "description": "An explosion of flavor that will knock your socks off!",
    "cost": 1,
    "maxQuantity": 100,
    "currQuantity": 100
}

#### COLA

{
    "_id": 3,
    "name": "Cola",
    "description": "A basic no nonsense cola that is the perfect pick me up for any occasion.",
    "cost": 1,
    "maxQuantity": 200,
    "currQuantity": 200
}

#### MEGAPOP

{
    "_id": 4,
    "name": "Mega Pop",
    "description": "Not for the faint of heart. So flavorful and so invigorating, it should probably be illegal.",
    "cost": 1,
    "maxQuantity": 50,
    "currQuantity": 50
}
