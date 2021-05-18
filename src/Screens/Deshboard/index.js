import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, StatusBar, ScrollView, } from 'react-native';
import { createTableForProduct } from '../../SqliteDatabase/Product';
import { createTableForCustomer } from '../../SqliteDatabase/Customer';
import { DeshboardHeader } from '../../Component/Header';
import { Pages } from '../../Component/Pages';
import { STYLE } from '../../Utils/Stylesheet/Style';

export default function Deshboard({ navigation }) {
    useEffect(() => {
        createTableForProduct();
        createTableForCustomer();
    }, []);
    return (
        <View style={STYLE.section}>
            <StatusBar size='auto' />
            <DeshboardHeader icon={'settings'} Title={'Deshboard'} />
            <ScrollView
                style={STYLE.body}>
                <View style={styles.deshboard}>
                    <Pages
                        routeName={'Add Product'}
                        Title={'Add products'}
                        Iconbar={FontAwesome5}
                        icon={'box-open'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages
                        routeName={'Customer name'}
                        Title={'Add customers'}
                        Iconbar={Ionicons}
                        icon={'people-sharp'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages
                        routeName={'View Products'}
                        Title={'View products'}
                        Iconbar={MaterialIcons}
                        icon={'view-in-ar'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages
                        routeName={'View Customers'}
                        Title={'View customers'}
                        Iconbar={MaterialIcons}
                        icon={'remove-red-eye'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages
                        routeName={'Create Invoices'}
                        Title={'Create invoices'}
                        Iconbar={MaterialCommunityIcons}
                        icon={'file-document-edit'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages
                        routeName={'View Invoices'}
                        Title={'View invoice'}
                        Iconbar={MaterialCommunityIcons}
                        icon={'file-document'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages
                        routeName={'Setting Option'}
                        Title={'Setting'}
                        Iconbar={Ionicons}
                        icon={'settings'}
                        size={40}
                        nav={navigation}
                    />
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    deshboard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 50
    }
})