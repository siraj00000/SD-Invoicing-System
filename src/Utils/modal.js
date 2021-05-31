import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Alert, Pressable, Text, Modal } from 'react-native';
import { color1, color2, color3, color4 } from '../Themes/Color';
import { Bold, Italic, Semi_Bold } from '../Themes/FontFamily';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ItemChanges({ open, onModalClose, item, addChangesValue }) {
    const { name, price, weight, id, productIndex, quantity: quan, priceOld, weightOld } = item;
    const [quantity, setQuantity] = useState(quan);
    const [newWeight, setNewWeight] = useState(weightOld);
    const [newPrice, setNewPrice] = useState(priceOld);
    const [decimal, setDecimal] = useState(0);

    const changeQuantity = (val) => {
        if (val == +1) {
            setQuantity(quantity + val);
        } else if (val == -1) {
            if (quantity > 1) {
                setQuantity(quantity + val);
            }
        }
    };
    const changeWeight = (val) => {
        if (val == +.1) {
            let weight = parseFloat(Number(newWeight) + val).toFixed(1);
            setNewWeight(weight);
        } else if (val == -.1) {
            if (newWeight > 0.1) {
                let weight = parseFloat(Number(newWeight) + val).toFixed(1);
                setNewWeight(weight);
            };
        };
    };
    const changePrice = (val) => {
        if (val == +1) {
            let price = parseFloat(Number(newPrice) + val).toFixed(0);
            setNewPrice(price);
        }
        else if (val == -1) {
            let price = parseFloat(Number(newPrice) + val).toFixed(0);
            setNewPrice(price);
        }
    }
    const totalWeight = parseFloat(newWeight * quantity).toFixed(1)
    const doChanges = async () => {
        const obj = {
            id: id,
            price: newPrice * quantity,
            priceOld: newPrice,
            weight: totalWeight,
            weightOld: newWeight,
            quantity: quantity,
            name: name,
            productIndex: productIndex
        };
        addChangesValue(obj);
        onModalClose(!open);
    };
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
                    <Pressable style={styles.button} onPress={() => onModalClose(!open)}>
                        <Text style={styles.modalText}>X</Text>
                    </Pressable>
                    <View style={styles.modalItem}>
                        <View style={styles.itemSpec}>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Product</Text>
                                <Text style={styles.itemText}>{name}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Quantity</Text>
                                <View style={styles.changeSpec}>
                                    <FontAwesome5
                                        name='chevron-left'
                                        size={15}
                                        color={color4}
                                        style={styles.iconBtn}
                                        onPress={() => changeQuantity(+1)}
                                    />
                                    <Text style={styles.itemText}>{quantity || quan}</Text>
                                    <FontAwesome5
                                        name='chevron-right'
                                        size={15}
                                        color={color4}
                                        style={styles.iconBtn}
                                        onPress={() => changeQuantity(-1)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemSpec}>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Total Weight</Text>
                                <Text style={styles.itemText}>{totalWeight}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Weight</Text>
                                <View style={styles.changeSpec}>
                                    <FontAwesome5
                                        name='chevron-left'
                                        size={15}
                                        color={color4}
                                        style={styles.iconBtn}
                                        onPress={() => changeWeight(+.1)}
                                    />
                                    <Text style={styles.itemText}>{newWeight}</Text>
                                    <FontAwesome5
                                        name='chevron-right'
                                        size={15}
                                        color={color4}
                                        style={styles.iconBtn}
                                        onPress={() => changeWeight(-.1)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemSpec}>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Total Price</Text>
                                <Text style={styles.itemText}>{newPrice * quantity}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Price</Text>
                                <View style={styles.changeSpec}>
                                    <FontAwesome5
                                        name='chevron-left'
                                        size={15}
                                        color={color4}
                                        style={styles.iconBtn}
                                        onPress={() => changePrice(+1)}
                                    />
                                    <Text style={styles.itemText}>{newPrice}</Text>
                                    <FontAwesome5
                                        name='chevron-right'
                                        size={15}
                                        color={color4}
                                        style={styles.iconBtn}
                                        onPress={() => changePrice(-1)}
                                    />
                                </View>
                            </View>
                        </View>
                        <View
                            style={[
                                styles.itemSpec,
                                {
                                    alignSelf: 'center',
                                    marginTop: '10%'
                                }
                            ]} >
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
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    modalView: {
        alignSelf: 'center',
        backgroundColor: color2,
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').width * .8,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: color4,
        backgroundColor: color2,
        borderRadius: 20,
        padding: 10,
    },
    modalText: {
        color: color3,
        fontFamily: Bold,
        fontSize: 25
    },
    button: {
        flex: .1,
    },
    btn: {
        backgroundColor: color3,
        width: Dimensions.get('window').width * .5,
        borderRadius: 10,
        padding: 10,
    },
    btnText: {
        color: color4,
        fontFamily: Bold,
        textAlign: 'center',
        fontSize: 20
    },
    modalItem: {
        flex: 1,
        width: '100%',
        paddingVertical: 10,
        borderWidth: 0
    },
    itemSpec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    container: {
        width: '50%',
        alignItems: 'center'
    },
    itemHeading: {
        fontFamily: Semi_Bold,
        fontSize: 18,
        color: color4
    },
    changeSpec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '80%'
    },
    iconBtn: {
        borderWidth: 1,
        width: 20,
        textAlign: 'center',
        paddingTop: 2,
        backgroundColor: color3,
        borderColor: color3,
        borderRadius: 5
    },
    itemText: {
        fontFamily: Italic,
        color: color3,
        fontSize: 15
    }
});