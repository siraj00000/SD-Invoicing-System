import React, { useEffect, useRef, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ViewShot from "react-native-view-shot";
import { ScreenHeader } from '../../Component/Header'
import { color1, color2, color3, color4 } from '../../Themes/Color';
import { Bold, Italic, Semi_Bold } from '../../Themes/FontFamily';
import { STYLE } from '../../Utils/Stylesheet/Style'
import { ScrollView, Button, Text, View, StyleSheet, Share, Pressable } from 'react-native';
import { parse } from '@babel/core';


export default function Invoicedetail({ navigation, route }) {
    const { customer, products, description, id } = route.params
    const [totalQuantity, setTotalQuantity] = useState([]);
    const [totalWeight, setTotalWeight] = useState([]);
    const [totalPrice, setTotalPrice] = useState([]);
    const [weight, setWeight] = useState([]);
    const [price, setPrice] = useState([]);
    const viewShotRef = useRef()
    useEffect(() => {
        let tq = [...totalQuantity];
        let tw = [...totalWeight];
        let tp = [...totalPrice];
        let w = [...weight];
        let p = [...price];

        for (var key in products) {
            if (products[key].productId == id) {
                p.push(products[key].unit_price);
                w.push(products[key].product_weight);
                tq.push(products[key].quantity);
                tw.push(products[key].product_total_weight);
                tp.push(products[key].unit_total_price);
                setPrice(p);
                setWeight(w);
                setTotalQuantity(tq);
                setTotalWeight(tw);
                setTotalPrice(tp);
            }
        }
    }, []);
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
                        <Text style={styles.heading}>Bill to: </Text>
                        <View style={styles.customer}>
                            <View style={styles.customerInfoContEng}>
                                <Text style={styles.cusHeading}>Name: </Text>
                                <Text style={styles.cusText}>{customerName}</Text>
                            </View>
                            <View style={styles.customerInfoContEng}>
                                <Text style={styles.cusHeading}>Company: </Text>
                                <Text style={styles.cusText}>{company_name}</Text>
                            </View>
                            <View style={styles.customerInfoContEng}>
                                <Text style={styles.cusHeading}>Tele: </Text>
                                <Text style={styles.cusText}>{telephone_number}</Text>
                            </View>
                            <View style={styles.customerInfoContEng}>
                                <Text style={styles.cusHeading}>VAT: </Text>
                                <Text style={styles.cusText}>{VAT}</Text>
                            </View>
                            <View style={styles.customerInfoContEng}>
                                <Text style={styles.cusHeading}>CR: </Text>
                                <Text style={styles.cusText}>{CR}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.customerDetailArabic}>
                        <Text style={[styles.heading, { width: '100%' }]}>
                            مشروع قانون ل:</Text>
                        <View style={styles.customer}>
                            <View style={styles.customerInfoContArabic}>
                                <Text style={styles.cusHeading}>اسم: </Text>
                                <Text style={styles.cusText}>{customerNameArabic}</Text>
                            </View>
                            <View style={styles.customerInfoContArabic}>
                                <Text style={styles.cusHeading}>شركة: </Text>
                                <Text style={styles.cusText}>{companyNameArabic}</Text>
                            </View>
                            <View style={styles.customerInfoContArabic}>
                                <Text style={styles.cusHeading}>رقم الهاتف: </Text>
                                <Text style={styles.cusText}>{telephone_number}</Text>
                            </View>
                            <View style={styles.customerInfoContArabic}>
                                <Text style={styles.cusHeading}>ظريبه الشراء: </Text>
                                <Text style={styles.cusText}>{VAT}</Text>
                            </View>
                            <View style={styles.customerInfoContArabic}>
                                <Text style={styles.cusHeading}>رقم كر: </Text>
                                <Text style={styles.cusText}>{CR}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const Product = () => {
        const W = parseFloat( weight.reduce((a, b) => a + b, 0)).toFixed(1)
        const P = parseFloat(price.reduce((a, b) => a + b, 0)).toFixed(1)
        const totalQuan = parseFloat(totalQuantity.reduce((a, b) => a + b, 0)).toFixed(1)
        const totalW = parseFloat(totalWeight.reduce((a, b) => a + b, 0)).toFixed(1)
        const totalP = parseFloat(totalPrice.reduce((a, b) => a + b, 0)).toFixed(1)
        return (
            <React.Fragment>
                <Text style={[styles.heading, { marginTop: 10 }]}>Products: </Text>
                <View style={styles.productContainer}>
                    <View style={[styles.productTable, { borderBottomWidth: 2, borderColor: color4 }]}>
                        <Text style={styles.productItemName}>Name</Text>
                        <Text style={styles.productItemName}>W</Text>
                        <Text style={styles.productItemName}>P</Text>
                        <Text style={styles.productItemName}>Q</Text>
                        <Text style={styles.productItemName}>T W</Text>
                        <Text style={styles.productItemName}>T P</Text>
                    </View>
                    <React.Fragment>
                        {products.map(item => {
                            const { product_id, productId, product_name, product_weight, product_total_weight, quantity, unit_price, unit_total_price } = item;
                            const check = productId == id;
                            return (
                                <View style={styles.productTable} key={product_id}>
                                    { check &&
                                        <React.Fragment>
                                            <Text style={styles.productItemName}>{product_name}</Text>
                                            <Text style={styles.productItemName}>{product_weight}</Text>
                                            <Text style={styles.productItemName}>{unit_price}</Text>
                                            <Text style={styles.productItemName}>{quantity}</Text>
                                            <Text style={styles.productItemName}>{product_total_weight}</Text>
                                            <Text style={styles.productItemName}>{unit_total_price}</Text>
                                        </React.Fragment>
                                    }
                                </View>
                            )
                        })}
                    </React.Fragment>
                    <View style={[styles.productTable, styles.total]}>
                        <Text style={styles.productItemName}>  </Text>
                        <Text style={styles.productItemName}>{W}</Text>
                        <Text style={styles.productItemName}>{P}</Text>
                        <Text style={styles.productItemName}>{totalQuan}</Text>
                        <Text style={styles.productItemName}>{totalW}</Text>
                        <Text style={styles.productItemName}>{totalP}</Text>
                    </View>
                </View>
            </React.Fragment>
        )
    }
    const Description = () => {
        return (
            <View style={styles.description}>
                {description.map(item => {
                    const { description_eng, description_arabic, desId } = item;
                    const check = desId == id;
                    return (
                        <View style={styles.description} key={desId}>
                            {check &&
                                <React.Fragment>
                                    <View style={styles.description}>
                                        <Text style={styles.heading}>Description:</Text>
                                        <Text style={styles.desText}>{description_eng}</Text>
                                    </View>
                                    <View style={styles.description}>
                                        <Text style={styles.heading}>وصف:</Text>
                                        <Text style={styles.desText}>{description_arabic}</Text>
                                    </View>
                                </React.Fragment>
                            }
                        </View>
                    )
                })}
            </View>
        )
    }
    const ViewScreenShot = async () => {
        const imageUri = await viewShotRef.current.capture();
        console.log(imageUri);
        Share.share({
            message:
                'React Native | A framework for building native apps using React',
            title: 'Image',
            uri: imageUri,
        })
    }
    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={'VAT Invoice'}
                icon={'file-document'}
                Iconbar={MaterialCommunityIcons}
                size={40}
                navigation={navigation}
            />
            <ScrollView style={[STYLE.body, { paddingBottom: 30 }]}>
                <Pressable style={styles.print}
                    onPress={ViewScreenShot}>
                    <Text style={styles.printBtnText}>Print</Text>
                </Pressable>
                <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}
                    style={styles.invoice}>
                    <View style={styles.invoiceHeading}>
                        <Text style={styles.invoiceHeadingText} >VAT Invoice</Text>
                        <Text style={styles.invoiceHeadingText}>فاتورة ضريبة </Text>
                    </View>
                    <Customer />
                    <Product />
                    <Description />
                </ViewShot>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    invoice: {
        backgroundColor: color2,
        borderColor: color2,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 50,
        marginBottom: 100,
        paddingHorizontal: 15,
    },
    invoiceHeading: {
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    invoiceHeadingText: {
        fontFamily: Bold,
        color: color4
    },
    detailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    customerInfoContEng: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    customerInfoContArabic: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    customerDetailEng: {
        width: '50%',
        flexWrap: 'wrap',
        borderColor: color2
    },
    customerDetailArabic: {
        width: '50%',
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
        color: color4,
        fontSize: 10
    },
    cusHeading: {
        fontFamily: Semi_Bold,
        color: color4,
        fontSize: 13
    },
    cusText: {
        fontFamily: Italic,
        color: color3,
        fontSize: 13
    },
    productContainer: {
        marginVertical: 10,
        backgroundColor: color2,
        borderColor: color4,
        borderWidth: 3,
        marginVertical: 15,
        borderRadius: 10,
    },
    productTable: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    productItemName: {
        flex: 1,
        color: color3,
        textAlign: 'center',
        fontFamily: Semi_Bold,
        paddingVertical: 5,
        fontSize: 10
    },
    total: {
        width: '100%',
        borderTopWidth: 2,
        borderTopColor: color4
    },
    heading: {
        fontFamily: Bold,
        color: color4
    },
    desText: {
        fontFamily: Italic,
        color: color3,
        fontSize: 13
    },
    print: {
        position: 'absolute',
        bottom: 30,
        right: 10,
        padding: 10,
        borderRadius: 100,
        backgroundColor: color3
    },
    printBtnText: {
        fontFamily: Bold,
        color: color4,
        fontSize: 20
    }

})
