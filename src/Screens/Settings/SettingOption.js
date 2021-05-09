import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DeshboardHeader } from '../../Component/Header'
import { Pages } from '../../Component/Pages'
import { STYLE } from '../../Utils/Stylesheet/Style'

export default function Settingoption({ navigation }) {

    return (
        <View style={STYLE.section}>
            <DeshboardHeader icon={'settings'} Title={'Setting'} />
            <ScrollView style={STYLE.body} >                
                <View style={styles.settingOption}>
                        <Pages
                            routeName={'Currency'}
                            Title={'Currency'}
                            Iconbar={MaterialCommunityIcons}
                            icon={'currency-usd-circle-outline'}
                            size={40}
                            nav={navigation}
                        />
                        <Pages
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