import React, { useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';
import { ScreenHeader } from '../../Component/Header';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { STYLE } from '../../Utils/Stylesheet/Style'
import { color1, color2 } from '../../Themes/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Bold } from '../../Themes/FontFamily';

// check ? false : !check
export default function TAX({ navigation, route }) {
    const [checked, setChecked] = useState(false);
    const [dropdown, setdropdown] = useState(false);
    const [taxName, setTaxName] = useState();
    const [taxType, setTaxType] = useState('');
    const [ratio, setRatio] = useState('');

    const addTax = () => {

    }
    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={route.name}
                icon={'finance'}
                Iconbar={MaterialCommunityIcons}
                size={40}
                navigation={navigation}
            />
            <View style={STYLE.body}>
                <View>
                    <View style={STYLE.cr_product}>
                        <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Tax Name'
                            style={STYLE.TextInput} value={taxName} onChangeText={setTaxName} />
                        <MaterialIcons name='drive-file-rename-outline' style={STYLE.icon} color={color2} size={40} />
                    </View>
                    <TouchableOpacity activeOpacity={0.9} style={STYLE.cr_product} onPress={() => setdropdown(!dropdown)} >
                        <Text style={STYLE.TextInput}>{taxType || 'Tax Type'}</Text>
                        <FontAwesome name='balance-scale' style={STYLE.icon} color={color2} size={40} />
                    </TouchableOpacity>
                    {dropdown &&
                        <View style={STYLE}>
                            <View style={styles.checkbox}>
                                <Checkbox
                                    status={taxType === 'Amount' ? 'checked' : 'unchecked'}
                                    color="#fff"
                                    uncheckedColor='#fff'
                                    onPress={() => {
                                        setChecked(!checked);
                                        setTaxType('Amount');
                                    }}
                                />
                                <Text style={styles.type}>Amount</Text>
                            </View>
                            <View style={styles.checkbox}>
                                <Checkbox
                                    status={taxType === 'Percent' ? 'checked' : 'unchecked'}
                                    color="#fff"
                                    uncheckedColor='#fff'
                                    onPress={() => {
                                        setChecked(!checked);
                                        setTaxType('Percent');
                                    }}
                                />
                                <Text style={styles.type}>Percentage</Text>
                            </View>
                        </View>}
                    <View style={STYLE.cr_product}>
                        <TextInput selectionColor={color2} placeholderTextColor={color2} placeholder='Ratio'
                            style={STYLE.TextInput} value={ratio} onChangeText={setRatio} />
                        <MaterialIcons name='aspect-ratio' style={STYLE.icon} color={color2} size={40} />
                    </View>
                    <View style={STYLE.cr_product}>
                        <TouchableOpacity style={STYLE.btn} onPress={addTax} >
                            <Text style={STYLE.btnTxt}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    type: {
        color: color2,
        fontFamily: Bold
    }
})