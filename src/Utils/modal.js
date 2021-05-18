import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Alert, Pressable, Text, Modal } from 'react-native';
import { color1, color2 } from '../Themes/Color';
import { Bold, Semi_Bold } from '../Themes/FontFamily';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ItemChanges({ open, onModalClose, item, addChangesValue }) {
    const { name, price, weight, id, productIndex, quantity: quan, priceOld, weightOld } = item;
    const [quantity, setQuantity] = useState(quan);
    const [newWeight, setNewWeight] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const changeQuantity = (val) => {
        if (weight === weightOld && price === priceOld) {
            if (val == +1) {
                setQuantity(quantity + val);
                setNewPrice(price * (quantity + val));
                setNewWeight(weight * (quantity + val));
            } else if (val == -1) {
                if (quantity > 1) {
                    setQuantity(quantity + val);
                    setNewPrice(priceOld * (quantity + val));
                    setNewWeight(weightOld * (quantity + val));
                }
            }
        } else if (weight !== weightOld && price !== priceOld) {
            if (val == +1) {
                setQuantity(quantity + val);
                setNewPrice(priceOld * (quantity + val));
                setNewWeight(weightOld * (quantity + val));
            } else if (val == -1) {
                if (quantity > 1) {
                    setQuantity(quantity + val);
                    setNewPrice(priceOld * (quantity + val));
                    setNewWeight(weightOld * (quantity + val));
                }
            }
        }
    }
    const doChanges = async () => {
        const obj = {
            id: id,
            price: newPrice || price,
            priceOld: priceOld,
            weight: newWeight || weight,
            weightOld: weightOld,
            quantity: quantity,
            name: name,
            productIndex: productIndex
        };
        addChangesValue(obj);
        onModalClose(!open);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={open}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                onModalClose(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Pressable style={{ flex: 0.1 }} onPress={() => onModalClose(!open)}>
                        <Text style={styles.modalText}>X</Text>
                    </Pressable>
                    <View style={styles.modalItem}>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Product name</Text>
                            <Text style={styles.itemText}>{name}</Text>
                        </View>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Weight</Text>
                            <Text style={styles.itemText}>{newWeight || weight}kg</Text>
                        </View>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Quantity</Text>
                            <View style={styles.itemQuantity}>
                                <FontAwesome5 name='chevron-left' size={20} color={color1} onPress={() => changeQuantity(+1)} />
                                <Text style={styles.itemText}>{quantity || quan}</Text>
                                <FontAwesome5 name='chevron-right' size={20} color={color1} onPress={() => changeQuantity(-1)} />
                            </View>
                        </View>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Price</Text>
                            <Text style={styles.itemText}>${newPrice || price}</Text>
                        </View>
                        <View style={styles.itemSpec} >
                            <Pressable style={styles.btn} onPress={doChanges}>
                                <Text style={styles.btnText}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: Dimensions.get('window').width * .8,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    modalView: {
        backgroundColor: color2,
        height: Dimensions.get('window').width,
        width: '100%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color2,
        borderRadius: 20,
        padding: 10,
    },
    modalText: {
        color: color1,
        fontFamily: Bold,
        fontSize: 25
    },
    modalItem: {
        flex: 1,
        width: '100%',
        borderColor: color1,
        alignItems: 'center',
    },
    itemSpec: {
        flex: 1,
        alignItems: 'center',
    },
    itemHeading: {
        color: color1,
        fontFamily: Bold,
        fontSize: 20
    },
    itemText: {
        color: color1,
        fontFamily: Semi_Bold,
        fontSize: 18
    },
    itemQuantity: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        backgroundColor: color1,
        width: Dimensions.get('window').width * .5,
        borderRadius: 10,
        padding: 10,
    },
    btnText: {
        color: color2,
        fontFamily: Bold,
        textAlign: 'center',
        fontSize: 20
    }
});