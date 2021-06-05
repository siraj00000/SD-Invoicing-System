import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeshboardHeader } from '../../Component/Header'
import { Options } from '../../Component/Options';
import { Pages } from '../../Component/Pages'
import { createTableForCurrency, createTableForTax } from '../../SqliteDatabase/DefaultData';
import { STYLE } from '../../Utils/Stylesheet/Style'

export default function Settingoption({ navigation }) {
    useEffect(() => {
        createTableForCurrency();
        createTableForTax();
    }, []);

    return (
        <View style={STYLE.section}>
            <DeshboardHeader 
                icon={'settings'} 
                Title={'Setting'} 
                navigation={navigation}
            />
            <ScrollView style={STYLE.body} >
                <View style={styles.settingOption}>
                    <Options
                        routeName={'Currency'}
                        Title={'Currency'}
                        Iconbar={MaterialCommunityIcons}
                        icon={'currency-usd-circle-outline'}
                        size={40}
                        nav={navigation}
                    />
                    <Options
                        routeName={'TAX'}
                        Title={'TAX'}
                        Iconbar={MaterialCommunityIcons}
                        icon={'finance'}
                        size={40}
                        nav={navigation}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    settingOption: {
        width: '100%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        paddingVertical: 50
    }
})