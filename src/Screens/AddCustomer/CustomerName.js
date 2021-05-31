import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { ScreenHeader } from '../../Component/Header';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color2, color3 } from '../../Themes/Color';


export default function Customername({ navigation, route }) {
    const [contactPerson, setContactPerson] = useState('');
    const [contactPersonArbic, setContactPersonArabic] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyNameArabic, setCompanyNameArabic] = useState('');
    const addCustomerName = () => {
        if (!contactPerson) return Alert.alert('Empty field Contact Person');
        if (!companyName) return Alert.alert('Empty field Company name');
        if (!contactPersonArbic) return Alert.alert('Empty field Arabic Contact Person');
        if (!companyNameArabic) return Alert.alert('Empty field Arabic Contact Person');
        navigation.navigate('Add Customer', {
            contactPerson: contactPerson,
            companyName: companyName,
            contactPersonArbic: contactPersonArbic,
            companyNameArabic: companyNameArabic
        })
    }
    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={route.name}
                icon={'people-sharp'}
                Iconbar={Ionicons}
                size={40}
                navigation={navigation}
            />
            <ScrollView style={STYLE.body}>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='Contact person' value={contactPerson}
                        style={STYLE.TextInput} onChangeText={setContactPerson} />
                    <Ionicons name='person' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='Company name' value={companyName}
                        style={STYLE.TextInput} onChangeText={setCompanyName} />
                    <Entypo name='shop' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='اسم' value={contactPersonArbic}
                        style={STYLE.TextInput} onChangeText={setContactPersonArabic} />
                    <Ionicons name='person' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='اسم الشركة' value={companyNameArabic}
                        style={STYLE.TextInput} onChangeText={setCompanyNameArabic} />
                    <Entypo name='shop' style={STYLE.icon} color={color3} size={40} />
                </View>
                <View style={STYLE.cr_product}>
                    <TouchableOpacity style={STYLE.btn} onPress={addCustomerName} >
                        <Text style={STYLE.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}
