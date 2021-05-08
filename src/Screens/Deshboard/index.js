import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, } from 'react-native';
import { color2, color1} from '../../Themes/Color';
import { createTableForProduct } from '../../SqliteDatabase/Product';
import { createTableForCustomer } from '../../SqliteDatabase/Customer';
import { Bold } from '../../Themes/FontFamily';
import { DeshboardHeader } from '../../Component/Header';
import {Pages} from '../../Component/Pages';

export default function Deshboard({navigation}) {
    useEffect(() => {
        createTableForProduct();
        createTableForCustomer();
    }, []);
    return (
        <View style={styles.section}>
            <StatusBar size='auto' />
            <DeshboardHeader icon={'settings'} Title={'Deshboard'} />           
            <ScrollView                 
                style={styles.body}>
                <View style={styles.deshboard}>
                    <Pages 
                        routeName={'Add Product'}
                        Title={'Add products'}
                        Iconbar={FontAwesome5}
                        icon={'box-open'}
                        size={40}
                        nav={navigation}
                    />
                    <Pages 
                        routeName={'Add Customer'}
                        Title={'Add customers'}
                        Iconbar={Ionicons}
                        icon={'people-sharp'}
                        size={40}
                        nav={navigation}
                    />                                   
                    <Pages 
                        routeName={'View Products'}
                        Title={'View products'}
                        Iconbar={MaterialIcons}
                        icon={'view-in-ar'}
                        size={40}
                        nav={navigation}
                    />                                                       
                    <Pages 
                        routeName={'View Customers'}
                        Title={'View customers'}
                        Iconbar={MaterialIcons}
                        icon={'remove-red-eye'}
                        size={40}
                        nav={navigation}
                    />                                                                           
                    <Pages 
                        routeName={'Create Invoices'}
                        Title={'Create invoices'}
                        Iconbar={MaterialCommunityIcons}
                        icon={'file-document-edit'}
                        size={40}
                        nav={navigation}
                    />                                                                                               
                    <Pages 
                        routeName={'View Invoices'}
                        Title={'View invoice'}
                        Iconbar={MaterialCommunityIcons}
                        icon={'file-document'}
                        size={40}
                        nav={navigation}
                    />                                                                                                                                  
                    <Pages 
                        routeName={'Setting'}
                        Title={'Setting'}
                        Iconbar={Ionicons}
                        icon={'settings'}
                        size={40}
                        nav={navigation} 
                    />                                                                                                                                  
                </View>
            </ScrollView>
        </View >
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
    body: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: color1,   
        paddingTop: 30,
        paddingHorizontal: 20
    },
    deshboard: {
        width: '100%',        
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 50
    },
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