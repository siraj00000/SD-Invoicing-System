import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'tableSd.db' });


// This function will create currency table in database
export const createTableForCurrency = () => {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Currency'",
            [],
            (tx, res) => {
                console.log('currency', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS Currency', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS Currency(Currency_id INTEGER PRIMARY KEY AUTOINCREMENT, currency_name VARCHAR(20), currency_symbol VARCHAR(20))',
                        []
                    );
                }
            }
        );
    });
}

// This function will add currency to database
export const AddCurrency = (currencyName, currencySymbol) => {
    if (!currencyName) {
        alert('Please fill currency name');
        return;
    }
    if (!currencySymbol) {
        alert('Give currency sign');
        return;
    }

    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO Currency(currency_name, currency_symbol) VALUES (?,?)',
            [currencyName, currencySymbol],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Settings updated',
                        [
                            {
                                text: 'Ok',
                            },
                        ],
                        { cancelable: false }
                    );
                } else alert('Registration Failed');
            }
        );
    });
};

// This function will create tax table in database

export const createTableForTax = () => {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='Tax'",
            [],
            (tx, res) => {
                console.log('Tax', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS Tax', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS Tax(Tax_id INTEGER PRIMARY KEY AUTOINCREMENT, tax_name VARCHAR(20), tax_type VARCHAR(20), ratio INT(20))',
                        []
                    );
                }
            }
        );
    });
}



// This funtion will insert tax information in database
export const addTaxInfo = (taxName, taxType, ratio) => {
    if (!taxName) {
        Alert.alert('fill tax name field');
    }
    if (!taxType) {
        Alert.alert('select tax type');
    }
    if (!ratio) {
        Alert.alert('fill ratio field');
    }
    
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO Tax(tax_name, tax_type, ratio) VALUES (?,?,?)',
            [taxName, taxType, ratio],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'TAX info updated',
                        [
                            {
                                text: 'Ok',
                            },
                        ],
                        { cancelable: false }
                    );
                } else alert('Registration Failed');
            }
        );
    });
}