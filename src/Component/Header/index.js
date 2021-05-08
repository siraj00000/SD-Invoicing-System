import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { color1, color2 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';

export const DeshboardHeader = ({ icon, Title }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <MaterialCommunityIcons name='menu' color={color1} size={40} />
            </View>
            <View style={styles.logo}>
                <Ionicons name={icon} color={color1} size={30} />
                <Text style={styles.title}>{Title}</Text>
            </View>
        </View>
    )
}

export const ScreenHeader = ({ navigation, icon, Iconbar, Title, size }) => {
    return (
        <View style={stylePages.headerContainer}>
            <View style={stylePages.header}>
                <MaterialCommunityIcons
                    name='keyboard-backspace'
                    color={color1} size={40}
                    onPress={() => navigation.goBack()}
                />
                <MaterialCommunityIcons name='menu' color={color1} size={40} />
            </View>
            <View style={stylePages.logo}>
                <Iconbar name={icon} color={color1} size={size} />
                <Text style={stylePages.title}>{Title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 180,
        borderColor: '#fff',
        backgroundColor: color2,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    header: {
        height: 50,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    logo: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 10,
    },
    title: {
        color: color1,
        fontSize: 30,
        fontFamily: Bold,
        textTransform: 'uppercase',
        marginLeft: 5
    }
})

const stylePages = StyleSheet.create({
    headerContainer: {
        height: 150,
        borderColor: '#fff',
        borderBottomRightRadius: 100,
        backgroundColor: color2
    },
    header: {
        height: 50,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    logo: {
        flex: 3,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
    },
    title: {
        color: color1,
        fontSize: 20,
        fontFamily: Bold,
        textTransform: 'uppercase',
        marginLeft: 5
    },
})