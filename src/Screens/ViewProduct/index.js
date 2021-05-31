import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { color2, color1, color4, color3 } from '../../Themes/Color';
import { getAllProducts } from '../../SqliteDatabase/Product';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { Bold } from '../../Themes/FontFamily';

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
                    <FontAwesome5 name='box-open'  color={color3} size={20} />
                    <Text style={styles.cardText}>{item.product_name}</Text>
                </View>
                <View style={styles.productItem}>
                    <MaterialCommunityIcons name='weight-kilogram'  color={color3} size={30} />
                    <Text style={styles.cardText}>{item.product_weight}</Text>
                </View>
                <View style={styles.productItem}>
                    <Entypo name='price-tag'  color={color3} size={20} />
                    <Text style={styles.cardText}>{item.unit_price}</Text>
                </View>
                <View style={styles.productItem}>
                    <FontAwesome5 name='boxes' color={color3} size={20} />
                    <Text style={styles.cardText}>{item.quantity}</Text>
                </View>
                <View style={styles.productItem}>
                    <FontAwesome5 name='dollar-sign'  color={color3} size={20} />
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
        paddingVertical: 20,

    },
    productCart: {
        width: Dimensions.get('window').width * .9,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: color2,
        borderWidth: 3,
        borderColor: color4,
        borderRadius: 10
    },
    cardText: {
        color: color4,
        fontFamily: Bold,
        marginLeft: 5,
        margin: 5
    },
    productItem: {     
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
    }
})