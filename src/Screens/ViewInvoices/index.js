import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList, Button } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { getAllInvoices, getAllProductDes, getAllSelectedProducts } from '../../SqliteDatabase/Invoices';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { Pressable } from 'react-native';
import { Bold, Semi_Bold } from '../../Themes/FontFamily';

export default function ViewInvoices({ navigation, route }) {
    const [invoices, setInvoices] = useState();
    const [getProduct, setGetProduct] = useState();
    const [description, setDescription] = useState();
    useEffect(() => {
        getInvoices()
    }, []);
    console.log(getProduct);
    const getInvoices = async () => {
        const invoices = await getAllInvoices();
        const get = await getAllSelectedProducts();
        const des = await getAllProductDes();
        setInvoices(invoices);
        setGetProduct(get);
        setDescription(des);
    }

    const invoiceList = (item) => {
        let { customerId } = item;
        const detailInvoice = () => {
            navigation.navigate('Invoice Detail', {
                customer: item,
                products: getProduct,
                description: description,
                id: customerId
            })
        }

        return (
            <View key={customerId} style={styles.invoiceCard}>
                <FontAwesome5 name='box-open' color={color2} size={50} />
                <View style={styles.listItem}>
                    <View>
                        <Text style={styles.invoiceListText}>{`${item.contact_person} (${item.contact_person_arabic})`}</Text>
                        <Text style={styles.invoiceListText}>{`${item.company_name} (${item.company_name_arabic})`}</Text>
                    </View>
                    <View style={styles.invoiceItem}>
                        <Pressable style={styles.detailBtn} onPress={detailInvoice}>
                            <Text style={styles.detailText}>Detail</Text>
                        </Pressable>
                    </View>
                </View>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 50
    },
    invoiceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    listItem: {
        width: '80%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    invoiceListText: {
        fontFamily: Bold,
        color: color2,
        fontSize: 12
    },
    invoiceItem: {
        borderWidth: 1,
        borderColor: color2,
        borderRadius: 10
    },
    detailBtn: {
        backgroundColor: color1,
        padding: 5,
        borderRadius: 10
    },
    detailText: {
        fontFamily: Semi_Bold,
        color: color2,
        fontSize: 15,
        textAlign: 'center'
    }
})

const sty = StyleSheet.create({
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
        marginVertical: 10,
        paddingHorizontal: 5
    },
    invoiceItem: {
        width: '20%',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 5,
        marginRight: 10,
        borderColor: color1,
        zIndex: 1
    },
    invoiceText: {
        width: '100%',
        color: color1,
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    },
    list: {
        width: '60%',
    },
    listItem: {
        margin: 5,
        alignItems: 'center',
    },
    invoiceListText: {
        color: color1,
        fontFamily: 'Montserrat-Bold',
    },
    detailBtn: {
        backgroundColor: color1,
        padding: 5,
        borderRadius: 10
    },
    detailText: {
        fontFamily: Semi_Bold,
        color: color2,
        fontSize: 12,
        textAlign: 'center'
    }
})