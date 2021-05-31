import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { color1, color2, color3, color4 } from '../../Themes/Color'
import { Bold } from '../../Themes/FontFamily'

export const Options = ({ nav, Title, Iconbar, routeName, icon, size }) => {
    return (
        <Pressable 
            style={styles.cr_product} 
            onPress={() => nav.navigate(routeName)}
            >
            <Text style={styles.deshText}>{Title}</Text>
            <Iconbar name={icon} style={styles.icon} color={color3} size={size} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    cr_product: {
        alignItems: 'center',
        flexDirection: 'column-reverse',
        width: '45%',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: color4,
        paddingVertical: 30,
        paddingHorizontal: 10,
        margin: 8,
        backgroundColor: color2,
    },
    deshText: {
        color: color4,
        fontFamily: Bold,
        marginTop: 5,
        textTransform: 'capitalize'
    }
})