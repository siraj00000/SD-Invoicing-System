import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { color2, color1 } from '../../Themes/Color';
import { AddProduct } from '../../SqliteDatabase/Product';
import { Bold } from '../../Themes/FontFamily';
import { ScreenHeader } from '../../Component/Header';


export default function Addproduct({ navigation, route }) {
    const [productName, setProductName] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCost, setProductCost] = useState('');

    const addProduct = () => {
        AddProduct(productName, productWeight, productPrice, productCost, navigation);
    }

    return (
        <View style={styles.section}>
            <StatusBar size='auto' />
            <ScreenHeader navigation={navigation} icon={'box-open'} Iconbar={FontAwesome5} size={30} Title={route.name} />
            <ScrollView style={styles.body}>
                <View style={styles.cr_product}>
                    <TextInput selectionColor={color1} placeholderTextColor={color2} placeholder='Product name' value={productName}
                        style={styles.TextInput} onChangeText={setProductName} />
                    <FontAwesome5 name='box-open' style={styles.icon} color={color2} size={30} />
                </View>
                <View style={styles.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='Weight (kg)' value={productWeight}
                        style={styles.TextInput} onChangeText={setProductWeight} />
                    <MaterialCommunityIcons name='weight-kilogram' style={styles.icon} color={color2} size={40} />

                </View>
                <View style={styles.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='Unit price ($)' value={productPrice}
                        style={styles.TextInput} onChangeText={setProductPrice} />
                    <Entypo name='price-tag' style={styles.icon} color={color2} size={40} />
                </View>
                <View style={styles.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='Unit cost ($)' value={productCost}
                        style={styles.TextInput} onChangeText={setProductCost} />
                    <FontAwesome5 name='dollar-sign' style={styles.icon} color={color2} size={40} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btn} onPress={addProduct} >
                        <Text style={styles.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
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
        paddingVertical: 20,
    },
    cr_product: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        paddingRight: 10,
    },
    icon: {
        width: '20%',
        textAlign: 'center',
    },
    TextInput: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 100,
        borderColor: color2,
        color: color2,
        backgroundColor: color1,
        fontFamily: Bold,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
    },
    btn: {
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: Dimensions.get('window').width * .78,
        height: 50,
        backgroundColor: color2,
        borderWidth: 1,
        borderTopRightRadius: 10,
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
    icon: {
        marginLeft: 15,
        width: Dimensions.get('window').width * .2,
    }
})