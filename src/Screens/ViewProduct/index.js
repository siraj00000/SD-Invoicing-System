import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { getAllProducts } from '../../SqliteDatabase/Product';
import { ScreenHeader } from '../../Component/Header';

export default function ViewProduct({ navigation, route }) {
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = async () => {
        const product = await getAllProducts();
        setFlatListItems(product)
    }

    let listItemView = (item) => {
        return (
            <View
                key={item.product_id}
                style={styles.productCart}>
                <View style={styles.productItem}>
                    <FontAwesome5 name='box-open'  color={color1} size={20} />
                    <Text style={styles.cardText}>{item.product_name}</Text>
                </View>
                <View style={styles.productItem}>
                    <MaterialCommunityIcons name='weight-kilogram'  color={color1} size={30} />
                    <Text style={styles.cardText}>{item.product_weight}</Text>
                </View>
                <View style={styles.productItem}>
                    <Entypo name='price-tag'  color={color1} size={20} />
                    <Text style={styles.cardText}>{item.unit_price}</Text>
                </View>
                <View style={styles.productItem}>
                    <FontAwesome5 name='dollar-sign'  color={color1} size={20} />
                    <Text style={styles.cardText}>{item.unit_cost}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.section}>
            <StatusBar size='auto' />
            <ScreenHeader 
                Title={route.name} 
                icon={'view-in-ar'} 
                Iconbar={MaterialIcons} 
                size={40}
                navigation={navigation} 
                />            
            <View style={{ flex: 1 }}>
                <FlatList
                    data={flatListItems}
                    style={styles.list}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
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
    body: {
        paddingVertical: 20,
    },
    cr_product: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
        paddingRight: 10,
    },
    icon: {
        width: '20%',
        textAlign: 'center',
    },
    TextInput: {
        width: '80%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderColor: color2,
        color: color2,
        fontFamily: 'Montserrat-Bold',
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        height: 100,
        paddingVertical: 10
    },
    btn: {
        justifyContent: 'flex-end',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        width: Dimensions.get('window').width * .78,
        height: 50,
        backgroundColor: color2,
        borderWidth: 1,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        borderColor: color2,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnTxt: {
        color: color1,
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        textTransform: 'uppercase',
    },
    icon: {
        marginLeft: 15,
        width: Dimensions.get('window').width * .2,
    },
    list: {
        flex: 1,
        paddingVertical: 40,
    },
    productCart: {
        borderColor: color2,
        backgroundColor: color1,
        padding: 10,
        marginVertical: 10,
        backgroundColor: color2,
        borderWidth: 1,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    cardText: {
        color: color1,
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        marginHorizontal: 5
    },
    productItem: {     
        width: '25%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    }
})