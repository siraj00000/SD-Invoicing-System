import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { AddCustomer } from '../../SqliteDatabase/Customer';
import { Bold } from '../../Themes/FontFamily';
import { ScreenHeader } from '../../Component/Header';

export default function Addcustomer({ navigation, route }) {
    const [customerName, setCustomerName] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [customerPhoneNo, setCustomerPhoneNo] = useState('');


    const addCustomer = ()=> {
        AddCustomer(customerName, shopName, shopAddress, customerPhoneNo, navigation)
    }

    return (
        <View style={styles.section}>
            <StatusBar size='auto' />
            <ScreenHeader 
                Title={route.name} 
                icon={'people-sharp'} 
                Iconbar={Ionicons} 
                size={40}
                navigation={navigation} 
                />           
            <ScrollView style={styles.body}>
                <View style={styles.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Customer name' value={customerName}
                        style={styles.TextInput} onChangeText={setCustomerName} />
                    <Ionicons name='person' style={styles.icon} color={color2} size={40} />
                </View>
                <View style={styles.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Shop name' value={shopName}
                        style={styles.TextInput} onChangeText={setShopName} />
                    <Entypo name='shop' style={styles.icon} color={color2} size={40} />

                </View>
                <View style={styles.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Shop address' value={shopAddress}
                        style={styles.TextInput} onChangeText={setShopAddress} />
                    <Entypo name='address' style={styles.icon} color={color2} size={40} />
                </View>
                <View style={styles.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='Phone number' value={customerPhoneNo}
                        style={styles.TextInput} onChangeText={setCustomerPhoneNo} />
                    <FontAwesome5 name='phone-alt' style={styles.icon} color={color2} size={40} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btn} onPress={addCustomer} >
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
        fontFamily: Bold,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
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
    icon: {
        marginLeft: 15,
        width: Dimensions.get('window').width * .2,
    }
})