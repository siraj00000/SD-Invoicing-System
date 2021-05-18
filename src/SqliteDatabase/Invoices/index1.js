import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SDINVOICINGSYSTEM.db' });

// This Funtion will create table for Invoice
export const createTableForInvoices = () => {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='sdInvoiceTable'",
            [],
            function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS sdInvoiceTable', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS sdInvoiceTable(invoice_Id INTEGER PRIMARY KEY AUTOINCREMENT, invoice_customer_name VARCHAR(20), customerId INT(10))',
                        []
                    );
                }
            }
        );
    });
}

// This function will Insert Invoices
export const AddInvoiceToSqlite = (customerName, customer_id) => {
    console.log('Customer name', customerName);
    if (!customerName) {
        alert('Please fill customer name');
        return;
    }
    if (!customer_id) {
        alert('Customer not Found');
        return;
    }
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO sdInvoiceTable(invoice_customer_name, customerId) VALUES (?,?)',
            [customerName, customer_id],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        { cancelable: false }
                    );
                } else alert('Registration Failed');
            }
        );
    });
};

// This Funtion will create Fact table for selected products
export const createFactTableForProduct = () => {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='productTable'",
            [],
            function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS productTable', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS productTable(product_id INTEGER PRIMARY KEY AUTOINCREMENT, selected_products VARCHAR(20), invoice_id INT(20), customer_id INT(10))',
                        []
                    );
                }
            }
        );
    });
}

// Function for Insertion of products
// It will Insert selected product in table
export const productFactTable = (selected_products, lastInvoiceId, customerId, navigation) => {
    const obj = {
        selected_products, lastInvoiceId, customerId
    }
    for (var key in obj) {
        if (obj[key] === '') {
            Alert.alert(`${key} field is empty`);
            return false;
        }
    }
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO productTable(selected_products, invoice_id, customer_id) VALUES (?,?,?)',
            [selected_products, lastInvoiceId, customerId],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Invoice has been added',
                        [
                            {
                                text: 'Ok',
                                onPress: () => navigation.navigate('Deshboard'),
                            },
                        ],
                        { cancelable: false }
                    );
                } else alert('Failed!');
            }
        );
    });
};

// This funtion will fatch all the data that
// pl contains
export const getLastRowId = () => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT last_insert_rowid() FROM sdInvoiceTable',
                [],
                (tx, results) => {
                    var obj = {};
                    for (let i = 0; i < results.rows.length; ++i)
                        obj = Object.values(results.rows.item(i))
                    resolve(obj)
                }
            );
        });
    })
}

export const getAllInvoices = () => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM sdInvoiceTable ',
                // 'SELECT * FROM sdInvoiceTable INNER JOIN productTable ON sdInvoiceTable.invoice_Id = productTable.invoice_id  ',
                [],
                (tx, results) => {
                    // console.log('results>>', results);
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    resolve(temp)
                }
            );
        });
    })
}

export const getAllSelectedProducts = (id) => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM productTable`,
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    resolve(temp)
                }
            );
        });
    })
}


export const customerIdForCheck = () => {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT customerId FROM sdInvoiceTable ',
                // 'SELECT * FROM sdInvoiceTable INNER JOIN productTable ON sdInvoiceTable.invoice_Id = productTable.invoice_id  ',
                [],
                (tx, results) => {
                    // console.log('results>>', results);
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                        temp.push(results.rows.item(i));
                    resolve(temp)
                }
            );
        });
    })
}