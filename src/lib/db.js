const { Sequelize } = require("sequelize");

/*
* To Test Locally:
* Create .env.local file
* add the line: NODE1="mysql://root:1234@localhost:8888/central_node"
* Change the URL appropriately
*/
const centralNode = new Sequelize(process.env.NODE1);

export default centralNode;
