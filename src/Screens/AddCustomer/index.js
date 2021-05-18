import React, { useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, TextInput, StatusBar, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { AddCustomer } from '../../SqliteDatabase/Customer';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';

export default function Addcustomer({ navigation, route }) {
    // const [contactPerson, setContactPerson] = useState('');
    // const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [telephoneNumber, setTelephoneNumber] = useState('');
    const [VATNumber, setVATNumber] = useState('');
    const [CRNumber, setCRNumber] = useState('');

    const { contactPerson, contactPersonArbic, companyName, companyNameArabic  } = route.params
    const addCustomer = () => {        
        AddCustomer(contactPerson, contactPersonArbic, companyName, companyNameArabic, email, address, telephoneNumber, VATNumber, CRNumber, navigation)
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
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Email' value={email}
                        style={STYLE.TextInput} onChangeText={setEmail} />
                    <FontAwesome name='envelope' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Address' value={address}
                        style={STYLE.TextInput} onChangeText={setAddress} />
                    <Entypo name='address' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='Telephone number' value={telephoneNumber}
                        style={STYLE.TextInput} onChangeText={setTelephoneNumber} />
                    <FontAwesome5 name='phone-alt' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='VAT number' value={VATNumber}
                        style={STYLE.TextInput} onChangeText={setVATNumber} />
                    <MaterialCommunityIcons name='finance' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput keyboardType='number-pad' selectionColor={color2} placeholderTextColor={color2} placeholder='CR number' value={CRNumber}
                        style={STYLE.TextInput} onChangeText={setCRNumber} />
                    <FontAwesome5 name='credit-card' style={STYLE.icon} color={color2} size={40} />
                </View>
                <View style={STYLE.footer}>
                    <TouchableOpacity style={STYLE.btn} onPress={addCustomer} >
                        <Text style={STYLE.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 50 }}></View>
            </ScrollView>
        </View>
    )
}
