import React, { useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TextInput, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { AddCustomer } from '../../SqliteDatabase/Customer';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';

export default function Addcustomer({ navigation, route }) {
    const [customerName, setCustomerName] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [customerPhoneNo, setCustomerPhoneNo] = useState('');

    const addCustomer = ()=> {
        AddCustomer(customerName, shopName, shopAddress, customerPhoneNo, navigation)
    }

    return (
        <View style={STYLE.section}>
            <StatusBar size='auto' />
            <ScreenHeader 
                Title={route.name} 
                icon={'people-sharp'} 
                Iconbar={Ionicons} 
                size={40}
                navigation={navigation} 
                />           
            <ScrollView style={STYLE.body}>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Customer name' value={customerName}
                        style={STYLE.TextInput} onChangeText={setCustomerName} />
                    <Ionicons name='person' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Shop name' value={shopName}
                        style={STYLE.TextInput} onChangeText={setShopName} />
                    <Entypo name='shop' style={STYLE.icon} color={color2} size={40} />

                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Shop address' value={shopAddress}
                        style={STYLE.TextInput} onChangeText={setShopAddress} />
                    <Entypo name='address' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='Phone number' value={customerPhoneNo}
                        style={STYLE.TextInput} onChangeText={setCustomerPhoneNo} />
                    <FontAwesome5 name='phone-alt' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.footer}>
                    <TouchableOpacity style={STYLE.btn} onPress={addCustomer} >
                        <Text style={STYLE.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
