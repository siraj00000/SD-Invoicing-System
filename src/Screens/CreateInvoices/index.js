import React, { useEffect, useState } from 'react'
import { getAllCustomers } from '../../SqliteDatabase/Customer'
import { getAllProducts } from '../../SqliteDatabase/Product'
import { productFactTable, getLastRowId, createFactTableForProduct, createTableForInvoices, AddInvoiceToSqlite, customerIdForCheck } from '../../SqliteDatabase/Invoices'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, Text, TouchableOpacity, FlatList, SectionList, ScrollView, Alert } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';
import { ScreenHeader } from '../../Component/Header';



export default function CreateInvoices({ navigation, route }) {
    const [customers, setCustomers] = useState();
    const [products, setProducts] = useState();
    const [custumerDropdown, setCustomerDropdown] = useState(false);
    const [productDropdown, setProductDropdown] = useState(false);
    const [addCustomer, setAddCustomer] = useState('');
    const [selectedCustomerId, setSelectedCustomerId] = useState();
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isNotExist, setIsNotExist] = useState('no');

    useEffect(() => {
        getAllCustomer();
        getAllProduct();
        createTableForInvoices();
        createFactTableForProduct();
    }, []);

    const getAllCustomer = async () => {
        const customer = await getAllCustomers();
        setCustomers(customer);
    }

    const getAllProduct = async () => {
        const product = await getAllProducts();
        setProducts(product);
    }

    const newCustomer = async (id) => {
        const rId = await getLastRowId();
        AddInvoiceToSqlite(addCustomer, id);
        for (var i = 0; i <= selectedProducts.length - 1; i++) {
            productFactTable(selectedProducts[i], rId[0], id, navigation);
        }
    }

    const val = (id1, id2) => { return id1 == id2 }
    const checkExistsCustumerId = async (id, rId) => {
        const checkCustomerId = await customerIdForCheck();
        if (checkCustomerId.length) {
            const check = checkCustomerId.some((i) => val(i.customerId, id))
            if (check) {
                for (var i = 0; i <= selectedProducts.length - 1; i++) {
                    productFactTable(selectedProducts[i], rId[0], id, navigation);
                    setIsNotExist('yes')
                }
            } else if (!check) {
                newCustomer(id)
            }
        } else if (!checkCustomerId.lenght) {
            AddInvoiceToSqlite(addCustomer, id);
            for (var i = 0; i <= selectedProducts.length - 1; i++) {
                productFactTable(selectedProducts[i], 1, id, navigation);
            }
        }
    }

    const addInvoice = async () => {
        const rId = await getLastRowId();
        checkExistsCustumerId(selectedCustomerId, rId)
        if (isNotExist == false) {
            console.log('running....');
            // newCustomer(rId, selectedCustomerId)
        }
    }

    const customerList = (item) => {
        return (
            <View
                key={item.customer_id}
                style={styles.customerContainer}>
                <Ionicons name='person' size={20} color={color2} />
                <Text style={styles.customerName} onPress={() => {
                    setAddCustomer(item.customer_name);
                    setSelectedCustomerId(item.customer_id);
                    setCustomerDropdown(false);
                }}>
                    {item.customer_name}
                </Text>
            </View>
        );
    };
    const productList = (item) => {
        const product = [...selectedProducts]
        return (
            <View
                key={item.product_id}
                style={styles.customerContainer}>
                {!products && <Text style={styles.customerName}>NO Product</Text>}
                <FontAwesome5 name='box-open' size={20} color={color2} />
                <Text style={styles.customerName} onPress={() => {
                    product.push(item.product_name);
                    setSelectedProducts(product);
                    setProductDropdown(false);
                }}>
                    {item.product_name}
                </Text>
            </View>
        );
    };


    const selected = (item, index) => {
        const Delete = () => {
            const delteSelectedProduct = [...selectedProducts]
            delteSelectedProduct.splice(index, 1);
            setSelectedProducts(delteSelectedProduct);
        }
        return (
            <View style={styles.cr_product}>
                <View style={styles.TextInput}>
                    <Text style={styles.text}>{item}</Text>
                    <FontAwesome name='cut' size={20} color={color2}
                        style={styles.icon} onPress={Delete} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.section}>
            <StatusBar size='auto' />
            <ScreenHeader
                Title={route.name}
                icon={'file-document-edit'}
                Iconbar={MaterialCommunityIcons}
                size={40}
                navigation={navigation}
            />
            <View style={styles.body}>
                <TouchableOpacity activeOpacity={1} style={styles.cr_product} onPress={() => {
                    setCustomerDropdown(!custumerDropdown); setProductDropdown(false)
                }}>
                    <Text style={styles.TextInput}>{addCustomer || 'Add Customer'}</Text>
                    {custumerDropdown ?
                        <MaterialCommunityIcons name='chevron-up' style={styles.icon} color={color2} size={60} />
                        :
                        <MaterialCommunityIcons name='chevron-down' style={styles.icon} color={color2} size={60} />
                    }
                </TouchableOpacity>
                {custumerDropdown && customers && <FlatList
                    style={styles.customerList}
                    data={customers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => customerList(item)}
                />}
                <TouchableOpacity activeOpacity={1} style={styles.cr_product} onPress={() => {
                    setProductDropdown(!productDropdown); setCustomerDropdown(false)
                }}>
                    <Text style={styles.TextInput}>Add Product</Text>
                    {productDropdown ?
                        <MaterialCommunityIcons name='chevron-up' style={styles.icon} color={color2} size={60} />
                        :
                        <MaterialCommunityIcons name='chevron-down' style={styles.icon} color={color2} size={60} />
                    }
                </TouchableOpacity>
                {productDropdown && products && <FlatList
                    style={styles.customerList}
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => productList(item)}
                />}
                {selectedProducts.length !== 0 && !productDropdown && <FlatList
                    style={{ maxHeight: 200 }}
                    data={selectedProducts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }, index) => selected(item, index)}
                />}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btn} onPress={addInvoice} >
                        <Text style={styles.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    section: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'cover',
        backgroundColor: color1
    },  
    body: {
        flex: 1,
        paddingTop: 20,
    },
    cr_product: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        paddingRight: 10,
    },
    icon: {
        width: '20%',
        textAlign: 'center',
    },
    TextInput: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderColor: color2,
        color: color2,
        fontFamily: Bold,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: color2,
        fontFamily: Bold,
    },
    customerList: {
        width: '75%',
        maxHeight: 200,
        borderWidth: 1,
        backgroundColor: color1,
        borderColor: color1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    customerContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: color1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    customerName: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        color: color2,
        padding: 15,
    },
    footer: {
        // flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        // height: 100,
        marginVertical: 20,
        paddingVertical: 10
    },
    btn: {
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: Dimensions.get('window').width * .78,
        height: 50,
        backgroundColor: color2,
        borderWidth: 1,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderColor: color2,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnTxt: {
        color: color1,
        fontSize: 20,
        fontFamily: Bold,
        textTransform: 'uppercase',
    },

})