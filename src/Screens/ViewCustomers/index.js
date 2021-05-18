import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { color2, color1 } from '../../Themes/Color';
import { getAllCustomers } from '../../SqliteDatabase/Customer';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { Bold } from '../../Themes/FontFamily';


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
            <View key={item.customer_id} style={styles.row}>
                <View style={styles.column}>
                    <Ionicons name='person' color={color2} size={20} />
                    <Text style={styles.text}>{`${item.contact_person} (${item.contact_person_arabic})`}</Text>
                </View>
                <View style={styles.column}>
                    <Entypo name='shop' color={color2} size={20} />
                    <Text style={styles.text}>{item.company_name}{` (${item.company_name_arabic})`}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome name='envelope' color={color2} size={20} />
                    <Text style={styles.text}>{item.email}</Text>
                </View>
                <View style={styles.column}>
                    <Entypo name='address' color={color2} size={20} />
                    <Text style={styles.text}>{item.address}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome5 name='phone-alt' color={color2} size={20} />
                    <Text style={styles.text}>{item.telephone_number}</Text>
                </View>
                <View style={styles.column}>
                    <MaterialCommunityIcons name='finance' color={color2} size={20} />
                    <Text style={styles.text}>{item.VAT_number}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome5 name='credit-card' color={color2} size={20} />
                    <Text style={styles.text}>{item.CR_number}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={STYLE.section}>
            <StatusBar size='auto' />
            <ScreenHeader
                Title={route.name}
                icon={'remove-red-eye'}
                Iconbar={MaterialIcons}
                size={40}
                navigation={navigation}
            />
            <View style={STYLE.body}>
                <FlatList
                    data={flatListItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
        backgroundColor: color1,
        borderWidth: 1,
        borderColor: color2,
        borderLeftWidth: 0,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 100,
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
    },
    text: {
        color: color2,
        fontFamily: Bold,
        marginLeft: 5,
        margin: 5
    }

})

