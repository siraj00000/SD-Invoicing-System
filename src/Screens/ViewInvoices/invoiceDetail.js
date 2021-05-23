import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenHeader } from '../../Component/Header'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color1, color2 } from '../../Themes/Color';
import { Bold, Semi_Bold } from '../../Themes/FontFamily';
import { STYLE } from '../../Utils/Stylesheet/Style'
import { ScrollView, Dimensions, FlatList, Text, View, StyleSheet } from 'react-native';

export default function Invoicedetail({ navigation, route }) {
    const [weight, setWeight] = useState([]);
    const { customer, products, description, id } = route.params
    console.log(description);

    const {
        contact_person: customerName,
        contact_person_arabic: customerNameArabic,
        company_name,
        company_name_arabic: companyNameArabic,
        email,
        address,
        telephone_number,
        VAT_number: VAT,
        CR_number: CR
    } = customer;

    const Customer = () => {
        return (
            <View>
                <View style={styles.detailContainer}>
                    <View style={styles.customerDetailEng}>
                        <Text style={styles.customerInfoText}>Bill to</Text>
                        <View style={styles.customer}>
                            <Text style={styles.customerInfoText}>Name: {customerName}</Text>
                            <Text style={styles.customerInfoText}>Company: {company_name}</Text>
                            <Text style={styles.customerInfoText}>Tele: {telephone_number}</Text>
                            <Text style={styles.customerInfoText}>VAT: {VAT}</Text>
                            <Text style={styles.customerInfoText}>CR: {CR}</Text>
                        </View>
                    </View>
                    <View style={styles.customerDetailArabic}>
                        <Text style={[styles.customerInfoText, { width: '100%' }]}>
                            مشروع قانون ل</Text>
                        <View style={styles.customer}>
                            <Text style={styles.customerInfoText}>اسم: {customerNameArabic}</Text>
                            <Text style={styles.customerInfoText}>شركة: {companyNameArabic}</Text>
                            <Text style={styles.customerInfoText}>رقم الهاتف: {telephone_number}</Text>
                            <Text style={styles.customerInfoText}>ظريبه الشراء: {VAT}</Text>
                            <Text style={styles.customerInfoText}>رقم كر: {CR}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const Product = () => {
        return (
            <View style={styles.productContainer}>
                <View style={styles.productTable}>
                    <Text style={styles.productItemName}>Name</Text>
                    <Text style={styles.productItemName}>W</Text>
                    <Text style={styles.productItemName}>P</Text>
                    <Text style={styles.productItemName}>Q</Text>
                    <Text style={styles.productItemName}>T W</Text>
                    <Text style={styles.productItemName}>T P</Text>
                </View>
                <FlatList
                    data={products}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                        const { productId, product_name, product_weight, product_total_weight, quantity, unit_price, unit_total_price } = item;
                        const check = productId == id;
                        let arr = [...weight];
                        for(var key in item){
                            if(item[key] == id){
                                // arr.push(product_weight)
                                // setWeight(arr);
                                console.log(item[key]);
                            }
                        }
                        // console.log(weight);
                        return (
                            <React.Fragment>
                                { check &&
                                    <React.Fragment>
                                        <View style={styles.productTable}>
                                            <Text style={styles.productItemName}>{product_name}</Text>
                                            <Text style={styles.productItemName}>{product_weight}</Text>
                                            <Text style={styles.productItemName}>{unit_price}</Text>
                                            <Text style={styles.productItemName}>{quantity}</Text>
                                            <Text style={styles.productItemName}>{product_total_weight}</Text>
                                            <Text style={styles.productItemName}>{unit_total_price}</Text>
                                        </View>
                                        <View style={styles.productTable}></View>
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )
                    }
                    }
                />
            </View>
        )
    }
    const Description = () => {
        return (
            <FlatList
                data={description}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const { description_eng, description_arabic, desId } = item;
                    const check = desId == id;
                    return (
                        <View style={styles.description}>
                            {check &&
                                <>
                                    <Text style={STYLE.text}>{description_eng}</Text>
                                    <Text style={STYLE.text}>{description_arabic}</Text>
                                </>
                            }
                        </View>

                    )
                }}
            />
        )
    }
    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={route.name}
                icon={'file-document'}
                Iconbar={MaterialCommunityIcons}
                size={40}
                navigation={navigation}
            />
            <View style={[STYLE.body, { borderWidth: 0, borderColor: color2 }]}>
                <Customer />
                <Product />
                <Description />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    detailContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color2,
        borderColor: color2,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
    },
    customerDetailEng: {
        width: Dimensions.get('window').width * .5,
        paddingLeft: 5,
        // flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: color2
    },
    customerDetailArabic: {
        width: Dimensions.get('window').width * .5,
        paddingRight: 25,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: color2
    },
    customer: {
        marginTop: 10
    },
    customerInfoText: {
        fontFamily: Semi_Bold,
        color: color1,
        fontSize: 15
    },
    productContainer: {
        marginVertical: 10,
        backgroundColor: color2,
        borderColor: color2,
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderRadius: 10,
    },
    productTable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1
    },
    productItemName: {
        flex: 1,
        color: color1,
        textAlign: 'center',
        fontFamily: Semi_Bold,
        paddingVertical: 5,
    },
    products: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: color2,
        padding: 20,
    },
    productItem: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    item: {
        flex: 1,
        alignItems: 'center',
    },
    quantity: {
        textAlign: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        color: color2,
        backgroundColor: color1,
        paddingHorizontal: 2,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: color2,
    },
    description: {
        paddingHorizontal: 10
    }

})

// const invoiceProduct = (item, index) => {
//     const check = item.productId === id;
//     return (
//         <View style={styles}>
//             {check &&
//                 <View>
//                     <Text style={STYLE.text}>{item.product_name}</Text>
//                 </View>
//             }
//         </View>
//     )
// }

// <Text style={STYLE.text} >{customer.contact_person}</Text>
// <FlatList
//     data={products}
//     keyExtractor={(item, index) => index.toString()}
//     renderItem={({ item, index }) => invoiceProduct(item, index)}
// />
// <FlatList
//     data={description}
//     keyExtractor={(item, index) => index.toString()}
//     renderItem={({ item }) => {
//         const check = item.desId == id;
//         console.log('des>', id, check ? item : '');
//         return (
//             <View>
//                 {check &&
//                     <View>
//                         <Text style={STYLE.text}>{item.description_eng}</Text>
//                         <Text style={STYLE.text}>{item.description_arabic}</Text>
//                     </View>
//                 }
//             </View>
//         )
//     }}
// />