import React, { useEffect } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, StatusBar, ScrollView, } from 'react-native';
import { createTableForProduct } from '../../SqliteDatabase/Product';
import { createTableForCustomer } from '../../SqliteDatabase/Customer';
import { DeshboardHeader } from '../../Component/Header';
import { Pages } from '../../Component/Pages';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { color2 } from '../../Themes/Color';

export default function Deshboard({ navigation }) {
    useEffect(() => {
        createTableForProduct();
        createTableForCustomer();
    }, []);
    return (
        <View style={[STYLE.section, {backgroundColor: color2}]}>
            <StatusBar size='auto' />
            <DeshboardHeader
                icon={'home'}
                Title={'home'}
                navigation={navigation}
            />
            <ScrollView
                style={STYLE.body}>
                <View style={styles.deshboard}>
                    <Pages />
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    deshboard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 20,
        borderWidth: 0
    }
})