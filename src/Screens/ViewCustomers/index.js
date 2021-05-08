import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { getAllCustomers } from '../../SqliteDatabase/Customer';
import { ScreenHeader } from '../../Component/Header';


export default function ViewCustomers({ navigation, route }) {
    let [flatListItems, setFlatListItems] = useState([]);

    useEffect(() => {
        getAllCustomer();
    }, []);

    const getAllCustomer = async () => {
        const customer = await getAllCustomers();
        setFlatListItems(customer);
    }

    let listItemView = (item) => {
        return (
                <View key={item.customer_id} style={styles.tr}>
                        <Text style={styles.th}>{item.customer_name}</Text>
                        <Text style={styles.th}>{item.shop_name}</Text>
                        <Text style={styles.th1}>{item.shop_address}</Text>
                        <Text style={styles.th1}>{item.phone_number}</Text>            
                </View>
        );
    };

    return (
        <View style={styles.section}>
            <StatusBar size='auto' />
            <ScreenHeader 
                Title={route.name} 
                icon={'remove-red-eye'} 
                Iconbar={MaterialIcons} 
                size={40}
                navigation={navigation} 
                />             
            <View style={styles.tableContainer}>
                <View style={styles.tr1}>
                    <Text style={styles.th2} >Name</Text>
                    <Text style={styles.th2} >Shop</Text>
                    <Text style={styles.th3} >Address</Text>
                    <Text style={styles.th3} >Phone</Text>
                </View>
                <FlatList
                    style={styles.table}
                    data={flatListItems}
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
})
