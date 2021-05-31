import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, TextInput, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native';
import { color4, color1, color3 } from '../../Themes/Color';
import { AddProduct } from '../../SqliteDatabase/Product';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';

export default function Addproduct({ navigation, route }) {
    const [productName, setProductName] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCost, setProductCost] = useState('');
    const [quantity, setQuantity] = useState('');

    const addProduct = () => {
        AddProduct(productName, productWeight, productPrice, productCost, quantity, navigation);
    }

    return (
        <View style={STYLE.section}>
            <StatusBar size='auto' />
            <ScreenHeader navigation={navigation} icon={'box-open'} Iconbar={FontAwesome5} size={30} Title={route.name} />
            <ScrollView style={STYLE.body}>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='Product name' value={productName}
                        style={STYLE.TextInput} onChangeText={setProductName} />
                    <FontAwesome5 name='box-open' style={STYLE.icon} color={color3} size={30} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color3} placeholderTextColor={color3} placeholder='Weight (kg)' value={productWeight}
                        style={STYLE.TextInput} onChangeText={setProductWeight} />
                    <MaterialCommunityIcons name='weight-kilogram' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color3} placeholderTextColor={color3} placeholder='quantity' value={quantity}
                        style={STYLE.TextInput} onChangeText={setQuantity} />
                    <FontAwesome5 name='boxes' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color3} placeholderTextColor={color3} placeholder='Unit price ($)' value={productPrice}
                        style={STYLE.TextInput} onChangeText={setProductPrice} />
                    <Entypo name='price-tag' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color3} placeholderTextColor={color3} placeholder='Unit cost ($)' value={productCost}
                        style={STYLE.TextInput} onChangeText={setProductCost} />
                    <FontAwesome5 name='dollar-sign' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.footer}>
                    <TouchableOpacity style={STYLE.btn} onPress={addProduct} >
                        <Text style={STYLE.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom: 50}}></View>
            </ScrollView>
        </View>
    )
}

