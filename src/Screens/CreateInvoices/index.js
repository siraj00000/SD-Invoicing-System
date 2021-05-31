import React, { useEffect, useState } from 'react'
import { getAllCustomers } from '../../SqliteDatabase/Customer/index'
import { getAllProducts } from '../../SqliteDatabase/Product'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
    StyleSheet,
    View,
    Alert,
    Text,
    TouchableOpacity,
    FlatList,
    Pressable
} from 'react-native'
import { color2, color3, color4 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';
import ItemChanges from '../../Utils/modal';
import { Button } from 'react-native';
import Status from '../../Utils/alert';

export default function AddInvoices({ navigation, route }) {
    const [customer, setCustomer] = useState('');
    const [products, setProducts] = useState('');
    const [customerDropdown, setcustomerDropdown] = useState(false);
    const [productDropdown, setProductDropdown] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [customerInfo, setCustomerInfo] = useState([]);
    const [itemList, setItemList] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalIndex, setModalIndex] = useState('');
    
    useEffect(() => {
        getAllCustomerAndProductsFromDb();
    }, []);
    const getAllCustomerAndProductsFromDb = async () => {
        const customers = await getAllCustomers();
        const products = await getAllProducts();
        setCustomer(customers);
        setProducts(products);
    }
    const customerList = (item) => {
        const customerInfoList = [];
        return (
            <Pressable style={styles.customerContainer} onPress={() => {
                customerInfoList.push({
                    contactPerson: item.contact_person,
                    contactPersonArabic: item.contact_person_arabic,
                    companyName: item.company_name,
                    companyNameArabic: item.company_name_arabic,
                    email: item.email,
                    address: item.address,
                    tele: item.telephone_number,
                    VAT: item.VAT_number,
                    CR: item.CR_number,
                    id: item.customer_id
                })
                setCustomerInfo(customerInfoList);
                setCustomerName(`${item.contact_person} (${item.contact_person_arabic})`);
            }}
            >
                <Ionicons name='person' size={20} color={color3} />
                <Text style={styles.customerName}>
                    {item.contact_person} ({item.contact_person_arabic})
                </Text>
            </Pressable>
        )
    }
    const productList = (item, index) => {
        const product = [...selectedProducts];
        return (
            <View style={styles.customerContainer}>
                <FontAwesome5 name='box-open' size={20} color={color3} />
                <Pressable style={styles.customerName} onPress={() => {
                    product.push({
                        id: item.product_id,
                        name: item.product_name,
                        quantity: item.quantity,
                        price: item.unit_price,
                        priceOld: item.unit_price,
                        weight: item.product_weight,
                        weightOld: item.product_weight,
                        totalWeight: item.product * item.quantity,
                        totalPrice: item.unit_price * item.quantity,
                        productIndex: index,
                    });
                    setSelectedProducts(product);
                    setProductDropdown(false);
                }}>
                    <Text style={styles.text}>
                        {item.product_name}
                    </Text>
                    <Text style={styles.text}>
                        {`$ ${item.unit_price}  ${item.product_weight}kg`}
                    </Text>
                </Pressable>
            </View>
        )
    }
    const selected = (item, index) => {
        const Delete = () => {
            const delteSelectedProduct = [...selectedProducts]
            delteSelectedProduct.splice(index, 1);
            setSelectedProducts(delteSelectedProduct);
        }
        const onModalClose = (val) => {
            setOpenModal(val);
        }
        const addChangesValue = (item) => {
            const deleteAndPutNewOne = [...selectedProducts];
            deleteAndPutNewOne.splice(index, -1);
            deleteAndPutNewOne[index] = item;
            setSelectedProducts(deleteAndPutNewOne);
        };
        return (
            <View style={styles.list}>
                <Pressable style={styles.selectedProducts}
                    onPress={() => {
                        setItemList(!itemList);
                        setIndexNumber(item.id);
                    }}
                >
                    <FontAwesome5
                        name='dot-circle'
                        size={20}
                        color={color3}
                    />
                    <View style={styles.listItem}>
                        <Text style={[STYLE.text, { color: color3 }]}>{item.name}</Text>
                        <Text style={[STYLE.text, { color: color3 }]}>${item.price}</Text>
                    </View>
                </Pressable>
                <Pressable style={styles.button}>
                    <Pressable style={styles.btn}>
                        <MaterialCommunityIcons name='delete-forever' size={20} color={color3} onPress={Delete} />
                    </Pressable>
                    <Pressable style={styles.btn} onPress={() => { setOpenModal(true); setModalIndex(index) }}>
                        <Text style={[STYLE.text, { color: color3 }]}>Detail</Text>
                    </Pressable>
                </Pressable>
                {
                    openModal && index == modalIndex &&
                    <ItemChanges
                        open={openModal}
                        onModalClose={onModalClose}
                        item={selectedProducts[index]}
                        addChangesValue={addChangesValue}
                    />
                }
            </View>
        )
    }
    const next = async () => {
        if (customerInfo.length && selectedProducts.length) {
            navigation.navigate('Add Invoices', {
                customer: customerInfo,
                products: selectedProducts
            })
        } else {
            Alert.alert('Make sure all fields are filled');
        }
    }
    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={route.name}
                icon={'file-document-edit'}
                Iconbar={MaterialCommunityIcons}
                size={40}
                navigation={navigation}
            />
            <View style={STYLE.body}>
                <Pressable
                    onPress={() => {
                        setcustomerDropdown(!customerDropdown);
                        setProductDropdown(false)
                    }}
                    style={STYLE.cr_product}
                >
                    <View style={STYLE.TextInput} activeOpacity={0.9} >
                        <Text style={[STYLE.text, { color: color3 }]}>{customerName || 'Customer name'}</Text>
                    </View>
                    <Ionicons name='options-outline' style={STYLE.icon} color={color3} size={40} />
                </Pressable>
                {customerDropdown && customer && <FlatList
                    data={customer}
                    style={styles.customerList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => customerList(item)}
                />}
                <Pressable
                    onPress={() => {
                        setProductDropdown(!productDropdown);
                        setcustomerDropdown(false);
                    }}
                    style={STYLE.cr_product}
                >
                    <View style={STYLE.TextInput} activeOpacity={0.9}>
                        <Text style={[STYLE.text, { color: color3 }]}>{'Products name'}</Text>
                    </View>
                    <Ionicons name='options-outline' style={STYLE.icon} color={color3} size={40} />
                </Pressable>
                {productDropdown && products && <FlatList
                    data={products}
                    style={styles.customerList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => productList(item, index)}
                />}
                {selectedProducts.length !== 0 && !productDropdown && <FlatList
                    style={{ maxHeight: 200 }}
                    data={selectedProducts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => selected(item, index)}
                />}
                <View style={STYLE.cr_product}>
                    <TouchableOpacity style={STYLE.btn} onPress={next} >
                        <Text style={STYLE.btnTxt}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    customerList: {
        width: '75%',
        maxHeight: 200,
        borderWidth: 1,
        backgroundColor: color2,
        borderColor: color2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    customerContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: color2,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    customerName: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        color: color4,
        padding: 15,
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedProducts: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '60%'
    },
    listItem: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: color2,
        marginLeft: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: color4
    },
    button: {
        width: '40%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: color2,
        padding: 5,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: color4
    },
    text: {
        marginHorizontal: 5,
        color: color4,
        fontFamily: Bold
    },
    itemChanges: {
        paddingHorizontal: '10%',
    },
    increDecre: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})