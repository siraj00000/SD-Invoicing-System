import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ScreenHeader } from '../../Component/Header';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { color1, color2 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';

export default function Setting({ navigation, route }) {
    return (
        <View style={styles.section}>
             <ScreenHeader 
                Title={route.name} 
                icon={'settings'} 
                Iconbar={Ionicons} 
                size={40}
                navigation={navigation} 
                /> 
            <Text style={styles.text}>Settings</Text>
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
    text: {
        color: color2,
        fontSize: 24,
        fontFamily: Bold
    }
})