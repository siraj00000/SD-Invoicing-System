import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { color1, color2, color3, color4 } from "../../Themes/Color";
import { Bold } from "../../Themes/FontFamily";

export const STYLE = StyleSheet.create({
    section: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        resizeMode: 'cover',
        backgroundColor: color2
    },
    body: {
        paddingVertical: 0,
    },    
    cr_product: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        paddingRight: 10,
    },
    TextInput: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 100,
        borderColor: color4,
        color: color3,
        fontFamily: Bold,
    },
    text: {
        color: color4,
        fontFamily: Bold,
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
    },
    btn: {
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: Dimensions.get('window').width * .78,
        height: 50,
        backgroundColor: color3,
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 100,
        borderColor: color3,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnTxt: {
        color: color4,
        fontSize: 20,
        fontFamily: Bold,
        textTransform: 'uppercase',
    },
    icon: {
        marginLeft: 15,
        width: Dimensions.get('window').width * .2,
    },
    makeCenter: {
        marginVertical: '20%'
    }
})