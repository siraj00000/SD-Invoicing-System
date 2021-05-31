import React, { useState } from 'react'
import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { STYLE } from '../../Utils/Stylesheet/Style';
import { ScreenHeader } from '../../Component/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color1, color2, color3 } from '../../Themes/Color';
import { AddCurrency } from '../../SqliteDatabase/DefaultData';

export default function Currency({ navigation, route }) {
    const [currencyName, setCurrencyName] = useState('');
    const [currencySymbol, setCurrencySymbol] = useState('');
    const addCurrencyToDb = () => {
        AddCurrency(currencyName, currencySymbol);
    }
    return (
        <View style={STYLE.section}>
            <StatusBar size='auto' />
            <ScreenHeader
                Title={route.name}
                icon={'currency-usd-circle-outline'}
                Iconbar={MaterialCommunityIcons}
                size={30}
                navigation={navigation}
            />
            <ScrollView style={STYLE.body}>
                <View style={STYLE.makeCenter}>
                    <View style={STYLE.cr_product}>
                        <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='Currency Name'
                            style={STYLE.TextInput} value={currencyName} onChangeText={setCurrencyName} />
                    </View>
                    <View style={STYLE.cr_product}>
                        <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='Currency Sign'
                            style={STYLE.TextInput} value={currencySymbol} onChangeText={setCurrencySymbol} />
                    </View>
                    <View styles={STYLE.cr_product}>
                        <Text style={{marginTop: 5}}></Text>
                        <TouchableOpacity style={STYLE.btn} onPress={addCurrencyToDb} >
                            <Text style={STYLE.btnTxt}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
