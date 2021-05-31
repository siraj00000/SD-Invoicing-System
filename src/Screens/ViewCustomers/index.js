import React, { useEffect, useState } from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View, TextInput, Dimensions, StatusBar, ScrollView, Text, TouchableOpacity, Alert, FlatList } from 'react-native'
import { color2, color1, color4, color3 } from '../../Themes/Color';
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
                    <Ionicons name='person' color={color3} size={20} />
                    <Text style={styles.text}>{`${item.contact_person} (${item.contact_person_arabic})`}</Text>
                </View>
                <View style={styles.column}>
                    <Entypo name='shop' color={color3} size={20} />
                    <Text style={styles.text}>{item.company_name}{` (${item.company_name_arabic})`}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome name='envelope' color={color3} size={20} />
                    <Text style={styles.text}>{item.email}</Text>
                </View>
                <View style={styles.column}>
                    <Entypo name='address' color={color3} size={20} />
                    <Text style={styles.text}>{item.address}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome5 name='phone-alt' color={color3} size={20} />
                    <Text style={styles.text}>{item.telephone_number}</Text>
                </View>
                <View style={styles.column}>
                    <MaterialCommunityIcons name='finance' color={color3} size={20} />
                    <Text style={styles.text}>{item.VAT_number}</Text>
                </View>
                <View style={styles.column}>
                    <FontAwesome5 name='credit-card' color={color3} size={20} />
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
        width: Dimensions.get('window').width * .9,
        flexDirection: 'row',
        alignSelf: 'center',
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
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        paddingHorizontal: 5
    },
    text: {
        color: color4,
        fontFamily: Bold,
        marginLeft: 5,
        margin: 5,
        flexWrap: 'wrap',
        fontSize: 12
    }

})

