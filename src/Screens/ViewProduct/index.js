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
import { STYLE } from '../../Utils/Stylesheet/Style';

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
        <View style={STYLE.section}>
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