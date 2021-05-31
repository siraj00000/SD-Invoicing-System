import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View } from 'react-native';
import { color1, color2, color3, color4 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';
import { Image } from 'react-native';
import { PixelRatio } from 'react-native';

export const DeshboardHeader = ({ icon, Title, navigation }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Image source={require('../../Assest/Logo.jpeg')} style={styles.Image} />
                <MaterialCommunityIcons
                    name='menu'
                    color={color4}
                    style={styles.icon}
                    size={35} 
                    onPress={() => navigation.toggleDrawer()}
                />
            </View>
            <View style={styles.logo}>
                <Ionicons name={icon} color={color3} size={35} />
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
                    color={color4} size={35}
                    onPress={() => navigation.goBack()}
                    style={stylePages.icon}
                />
                <Image source={require('../../Assest/Logo.jpeg')} style={styles.Image} />
                <MaterialCommunityIcons
                    name='menu'
                    color={color4}
                    size={35}
                    onPress={() => navigation.toggleDrawer()}
                    style={stylePages.icon}
                />
            </View>
            <View style={stylePages.logo}>
                <Iconbar name={icon} color={color3} size={size}/>
                <Text style={stylePages.title}>{Title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 150,
        borderColor: '#fff',
        backgroundColor: color2,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        marginBottom: 5,
    },
    header: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    Image: {
        width: 80,
        height: 50,
        resizeMode: 'cover'
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0
    },
    icon: {
        borderWidth: 1,
        paddingTop: 8,
        textAlign: 'center',
        backgroundColor: color3,
        borderColor: color3,
        height: 50,
        width: 50,
        borderRadius: 50 / PixelRatio.get(),
    },
    title: {
        color: color4,
        fontSize: 30,
        fontFamily: Bold,
        textTransform: 'uppercase',
        marginLeft: 5
    }
})

const stylePages = StyleSheet.create({
    headerContainer: {
        height: 120,
        backgroundColor: color2,
        marginBottom: 10,
    },
    header: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 20,
        paddingHorizontal: 15,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    icon: {
        borderWidth: 1,
        paddingTop: 8,
        marginVertical: 0,
        textAlign: 'center',
        backgroundColor: color3,
        borderColor: color3,
        height: 50,
        width: 50,
        borderRadius: 50 / PixelRatio.get(),        
    },
    title: {
        color: color4,
        fontSize: 20,
        fontFamily: Bold,
        textTransform: 'uppercase',
        marginLeft: 5
    },
})