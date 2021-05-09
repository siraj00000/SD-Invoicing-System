import { Alert } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SDINVOICINGSYSTEM.db' });

export const createTableForDefaultData = () => {
    db.transaction(function (txn) {
        txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='DefaultData'",
            [],
            function (tx, res) {
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                    txn.executeSql('DROP TABLE IF EXISTS DefaultData', []);
                    txn.executeSql(
                        'CREATE TABLE IF NOT EXISTS DefaultData(DefaultData_id INTEGER PRIMARY KEY AUTOINCREMENT, currency_name VARCHAR(20), currency_symbol VARCHAR(20), symbol_location VARCHAR(20), VAT_name INT(15), VAT_percentage INT(10))',
                        []
                    );
                }
            }
        );
    });
}

export const AddDefaultData = (currencyName, currencySymbol, symbolLocation, VATName, VATPercentage) => {
    console.log('Customer name', currencyName, currencySymbol, symbolLocation, VATName, VATPercentage);
    if (!currencyName) {
        alert('Please fill currency name');
        return;
    }
    if (!currencySymbol) {
        alert('Give currency symbol');
        return;
    }
    if (!symbolLocation) {
        alert('Give symbol location');
        return;
    }
    if (!VATName) {
        alert('Give VAT name');
        return;
    }
    if (!VATPercentage) {
        alert('Give VAT percentage');
        return;
    }
    db.transaction(function (tx) {
        tx.executeSql(
            'INSERT INTO DefaultData(currency_name, currency_symbol, symbol_location, VAT_name, VAT_percentage) VALUES (?,?,?,?,?)',
            [currencyName, currencySymbol, symbolLocation, VATName, VATPercentage],
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
