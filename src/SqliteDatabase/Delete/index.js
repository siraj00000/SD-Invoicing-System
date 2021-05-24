import { openDatabase } from 'react-native-sqlite-storage';
import Status from '../../Utils/alert';
var db = openDatabase({ name: 'tableSd.db' });

const deleteCustomerFromInvoice = (customerId) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM  sdInvoiceTable where customerId=?',
            [customerId],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        // 'Invoice deleted successfully',
                        { cancelable: false }
                    );
                } else {
                    Alert.alert('Please insert a valid customer');
                }
            }
        );
    });
};
const deleteSelectedProductFromInvoice = (customerId) => {
    db.transaction((tx) => {
        tx.executeSql(
            'DELETE FROM  productTable where customer_id=?',
            [customerId],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    Alert.alert(
                        'Success',
                        'Invoice deleted successfully',
                        { cancelable: false }
                    );
                } else {
                    Alert.alert('Please insert a valid customer');
                }
            }
        );
    });
};

export const deleteInvoice = (customerId) => {
    deleteCustomerFromInvoice(customerId);
    deleteSelectedProductFromInvoice(customerId);
}