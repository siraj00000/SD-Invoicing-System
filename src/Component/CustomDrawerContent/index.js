import React from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color1, color2, color3, color4 } from '../../Themes/Color';
import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import { Bold, Semi_Bold } from '../../Themes/FontFamily';
import { Image } from 'react-native';

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}
            contentContainerStyle={styles.DrawerContentScrollView} >
            <DrawerHeader {...props} />
            <DrawerContent {...props} />
            <Setting {...props} />
        </DrawerContentScrollView>
    )
};

const DrawerHeader = (props) => {
    return (
        <Pressable
            style={styles.header}
            onPress={() => props.navigation.navigate('Home')}
        >
            <Image
                source={require('../../Assest/Logo.jpeg')}
                style={styles.Image}
            />
        </Pressable>
    )
};


const DrawerContent = (props) => {
    return (
        <View style={styles.DrawerContent} >
            <DeshboardOptions
                routeName={'Add Product'}
                Title={'Add products'}
                Iconbar={FontAwesome5}
                icon={'box-open'}
                size={25}
                color={color3}
                nav={props.navigation}
            />
            <DeshboardOptions
                routeName={'Customer name'}
                Title={'Add customers'}
                Iconbar={Ionicons}
                icon={'people-sharp'}
                size={25}
                color={color3}
                nav={props.navigation}
            />
            <DeshboardOptions
                routeName={'Create Invoices'}
                Title={'Create invoices'}
                Iconbar={MaterialCommunityIcons}
                icon={'file-document-edit'}
                size={25}
                color={color3}
                nav={props.navigation}
            />
            <DeshboardOptions
                routeName={'View Products'}
                Title={'View products'}
                Iconbar={MaterialIcons}
                icon={'view-in-ar'}
                size={25}
                color={color3}
                nav={props.navigation}
            />
            <DeshboardOptions
                routeName={'View Customers'}
                Title={'View customers'}
                Iconbar={MaterialIcons}
                icon={'remove-red-eye'}
                size={25}
                color={color3}
                nav={props.navigation}
            />

            <DeshboardOptions
                routeName={'View Invoices'}
                Title={'View invoice'}
                Iconbar={MaterialCommunityIcons}
                icon={'file-document'}
                size={25}
                color={color3}
                nav={props.navigation}
            />
        </View>
    )
};


const DeshboardOptions = ({ nav, Title, Iconbar, routeName, icon, size, color }) => {
    return (
        <Pressable
            onPress={() => nav.navigate(routeName)}
            style={styles.options}
        >
            <Iconbar name={icon} color={color} size={size} style={styles.icon} />
            <Text style={styles.text}>{Title}</Text>
        </Pressable>
    )
};

const Setting = (props) => {
    return (
        <View style={styles.setting}>
            <View style={styles.divider}></View>
            <DeshboardOptions
                routeName={'Setting Option'}
                Title={'Setting'}
                Iconbar={Ionicons}
                icon={'settings'}
                size={25}
                color={color4}
                nav={props.navigation}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    DrawerContentScrollView: {
        flex: 1,
        backgroundColor: color2
    },
    header: {
        flex: 3,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    Image: {
        width: 150,
        height: 100,
        resizeMode: 'cover'
    },
    logo: {
        color: color2,
        fontFamily: Bold,
        fontSize: 50
    },
    DrawerContent: {
        flex: 8,
        paddingHorizontal: 10,
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    icon: {
        width: '15%',
        margin: 5,
    },
    text: {
        width: '80%',
        color: color4,
        fontFamily: Bold,
        fontSize: 15,
        marginLeft: 10
    },
    setting: {
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: color3,
        backgroundColor: color3,
        flex: 1,
        paddingHorizontal: 10
    },
})
