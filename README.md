# market-db
---
 Flat file market database solution for electron and other Nodejs apps.

**market-db** is an npm library that let you simplify database creation and operation on a json file, for storing market data.

The db is market-data aware. So, you'll be able to store stock, options and quotation data using the api provided by the library.

The json file is saved on the application folder. The user also has the option to save the database table anywhere they chose.

The table format contained in the `table_name.json` should be in the form of
```
{
  "table_name": [
    {
      "field1": "Value of field 1",
      "field2": "Value of field 2",
      ...
    }
  ]
}
```

**Important:** The script that uses this library should be run with electron command first in order to create the directory on the user data folder (when not using a custom directory for the database). The name that will be used for the app directory will be what was indicated in the `package.json` as <em>name</em>. If this is not set, the <em>name</em> property will be used.

### **Installation**
The preferred way of installation is to install it locally on the application.
```javascript
npm install market-db --save
```

### **Init Database**
Creates multiple tables `[table-name].js` inside the application `userData` folder.

In Windows, the application folder should be in `C:\Users\[username]\AppData\Roaming\[application name]`

```javascript

const db = require('market-db');
const { app, BrowserWindow } = require("electron");

db.initDB('customers')
    .then((result) => {
        // result handler here
    })
    .catch((error)=> {
        // error handler here
    });

/*
	Output:
    	Success: true
        Message: Success!

	Result file (customers.json):
    {
    	"symbols": [
            {
                "symbol": "TSLA",
                "name": "TSLA Inc."
            }
        ]
    }
*/
```
### TBD: To be updated

For contributions, please see the `CONTRIBUTE.md` file. Thank you.
