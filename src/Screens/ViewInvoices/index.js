import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList, Button } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { getAllInvoices, getAllSelectedProducts } from '../../SqliteDatabase/Invoices';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';

export default function ViewInvoices({ navigation, route }) {
    const [invoices, setInvoices] = useState();
    const [getProduct, setGetProduct] = useState();
    useEffect(() => {
        getInvoices()
    }, []);
    const getInvoices = async () => {
        const invoices = await getAllInvoices()
        const get = await getAllSelectedProducts()
        setInvoices(invoices);
        setGetProduct(get);
    }

    const invoiceList = (item) => {
        let { customerId } = item;
        return (
            <View key={customerId} style={styles.invoiceCard}>
                <View style={styles.invoiceItem}>
                    <Ionicons name='people-sharp' color={color1} size={25} />
                    <Text style={styles.invoiceText}>{item.invoice_customer_name}</Text>
                </View>
                <FlatList
                    horizontal
                    data={getProduct}
                    style={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const check = Boolean(customerId == item.customer_id)
                        return (
                            <View key={item.customerId} >
                                {check &&
                                    <View style={styles.listItem}>
                                        <FontAwesome5 name='box-open' color={color2} size={30} />
                                        <Text style={styles.invoiceListText}>{item.selected_products}</Text>
                                    </View>
                                }
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View style={STYLE.section}>
            <StatusBar size='auto' />
            <ScreenHeader 
                Title={route.name} 
                icon={'file-document'} 
                Iconbar={MaterialCommunityIcons} 
                size={40}
                navigation={navigation} 
                />           
            <View>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={invoices}
                    style={styles.customerCard}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => invoiceList(item)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    customerCard: {
        flex: 1,
        paddingVertical: 20,
    },
    invoiceCard: {
        width: '100%',
        height: 80,        
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color2,
        borderWidth: 2,
        borderBottomRightRadius: 50,
        borderColor: color2,
    },
    invoiceItem: {
        width: '25%',       
        alignItems: 'flex-end',
        padding: 10,
        marginVertical: 5,
        marginRight: 10,
        borderRightWidth: 2,
        borderColor: color1,
        zIndex: 1
    },
    invoiceText: {
        // marginLeft: 5,
        color: color1,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'right'
    },
    list: {
        width: '60%',
    },
    listItem: {
        margin: 5,
    },
    invoiceListText: {
        color: color2,
        fontFamily: 'Montserrat-Bold',

    }
})