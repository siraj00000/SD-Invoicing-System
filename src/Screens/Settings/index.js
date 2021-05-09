import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenHeader } from '../../Component/Header';
import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { color1, color2 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { AddDefaultData } from '../../SqliteDatabase/DefaultData';

export default function Setting({ navigation, route }) {
    const [currencyName, setCurrencyName] = useState('');
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [symbolLocation, setSymbolLocation] = useState('');
    const [vatName, setvatName] = useState('');
    const [vatPer, setVatPer] = useState('');
    const [dropdown, setdropdown] = useState(false);

    const setDefaultData = () => {
        AddDefaultData(currencyName, currencySymbol, symbolLocation, vatName, vatPer)
    }

    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={route.name}
                icon={'settings'}
                Iconbar={Ionicons}
                size={40}
                navigation={navigation}
            />
            <ScrollView style={STYLE.body}>
                <View style={styles.dataCont}>
                    <View style={STYLE.cr_product}>
                        <TextInput placeholder='Currency Name' selectionColor={color2} placeholderTextColor={color2}
                            value={currencyName} onChangeText={setCurrencyName} style={STYLE.TextInput} />
                    </View>
                    <View style={STYLE.cr_product}>
                        <TextInput placeholder='Currency Symbol' selectionColor={color2} placeholderTextColor={color2}
                            value={currencySymbol} onChangeText={setCurrencySymbol} style={STYLE.TextInput} />
                    </View>
                    <View style={STYLE.cr_product}>
                        <TextInput placeholder='Symbol Location' selectionColor={color2} placeholderTextColor={color2}
                            value={symbolLocation} onChangeText={setSymbolLocation} style={STYLE.TextInput} />
                    </View>
                    <View style={STYLE.cr_product}>
                        <TouchableOpacity activeOpacity={.9} style={STYLE.TextInput} onPress={() => setdropdown(!dropdown)}>
                            <Text style={styles.text}>VAT</Text>
                        </TouchableOpacity>
                    </View>
                    {dropdown && <View style={styles.vatList}>
                        <View style={STYLE.cr_product}>
                            <TextInput placeholder='VAT Name' selectionColor={color2} placeholderTextColor={color2}
                                value={vatName} onChangeText={setvatName} style={STYLE.TextInput} />
                        </View>
                        <View style={STYLE.cr_product}>
                            <TextInput placeholder='VAT Percentage' selectionColor={color2} placeholderTextColor={color2}
                                value={vatPer} onChangeText={setVatPer} style={STYLE.TextInput} />
                        </View>
                    </View>}
                    <View style={STYLE.cr_product}>
                        <TouchableOpacity style={STYLE.btn} onPress={setDefaultData} >
                            <Text style={STYLE.btnTxt}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        color: color2,
        fontFamily: Bold
    },
    dataCont: {
        // height: '100%',
        width: '100%',
        paddingBottom: 50
    }
})