import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { color1, color2 } from '../../Themes/Color'
import { Bold } from '../../Themes/FontFamily'

export const Pages = ({nav, Title, Iconbar,routeName, icon, size}) => {
    return (
        <TouchableOpacity 
            activeOpacity={.9} 
            style={styles.cr_product} 
            onPress={() => nav.navigate(routeName)} >
            <Text style={styles.deshText}>{Title}</Text>
            <Iconbar name={icon} style={styles.icon} color={color1} size={size} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cr_product: {
        alignItems: 'center',
        flexDirection: 'column-reverse',
        width: '45%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: color2,
        paddingVertical: 30,
        paddingHorizontal: 10,
        margin: 8,
        backgroundColor: color2,
    },
    deshText: {
        color: color1,
        fontFamily: Bold,
        marginTop: 5,
        textTransform: 'capitalize'
    }
})