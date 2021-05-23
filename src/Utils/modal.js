import React, { useState } from 'react'
import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';
import { View, Alert, Pressable, Text, Modal } from 'react-native';
import { color1, color2 } from '../Themes/Color';
import { Bold, Italic, Semi_Bold } from '../Themes/FontFamily';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function ItemChanges({ open, onModalClose, item, addChangesValue }) {
    const { name, price, weight, id, productIndex, quantity: quan, priceOld, weightOld } = item;
    const [quantity, setQuantity] = useState(quan);
    const [newWeight, setNewWeight] = useState(weightOld);
    const [newPrice, setNewPrice] = useState(priceOld);
    const [decimal, setDecimal] = useState(0);
    // const changeWeight = (val) => {
    //     if (val == +.1) {
    //         let desc = decimal + val;
    //         let value = Number(newWeight) + val;
    //         let desPoint = parseFloat(desc.toFixed(1));
    //         let newVal = parseFloat(value.toFixed(1));
    //         console.log('value', newVal);
    //         setDecimal(desPoint);
    //         setNewWeight(newVal);
    //     } else if (val == -.1) {
    //         let desc = decimal + val;
    //         let value = Number(newWeight) + val;
    //         let desPoint = parseFloat(desc.toFixed(2));
    //         let newVal = parseFloat(value.toFixed(2));
    //         console.log('value', newVal);
    //         setDecimal(desPoint);
    //         setNewWeight(newVal);
    //     }
    // }
    // const setValues = (val, q) => {
    //     let forWeight = ((newWeight/q) * (q + val));
    //     let calPrice = priceOld * (quantity + val);
    //     let calWeight = (weightOld + decimal) * (quantity + val);
    //     let price = parseFloat(calPrice).toFixed(0);
    //     let weight = parseFloat(forWeight).toFixed(1);
    //     console.log(
    //         forWeight,calPrice,calWeight,price,weight
    //     );
    //     setNewPrice(price);
    //     setNewWeight(weight);
    // }
    // const changeQuantity = (val) => {
    //     if (weight === weightOld && price === priceOld) {
    //         if (val == +1) {
    //             setQuantity(quantity + val);
    //             setValues(val, quantity);
    //         } else if (val == -1) {
    //             if (quantity > 1) {
    //                 setQuantity(quantity + val);
    //                 setValues(val, quantity);
    //             }
    //         }
    //     } else if (weight !== weightOld && price !== priceOld) {
    //         if (val == +1) {
    //             setQuantity(quantity + val);
    //             setValues(val, quantity);
    //         } else if (val == -1) {
    //             if (quantity > 1) {
    //                 setQuantity(quantity + val);
    //                 setValues(val, quantity);
    //             }
    //         }
    //     }
    // }
    // const changePrice = (val) => {
    //     if (val == +10) {
    //         let v = Number(newPrice) + val;
    //         let value = parseFloat(v.toFixed(1));
    //         setNewPrice(value)
    //     } else if (val == -10) {
    //         let v = Number(newPrice) + val;
    //         let value = parseFloat(v.toFixed(1));
    //         setNewPrice(value)
    //     }
    // }
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
        if(val == +10){
            let price = parseFloat(Number(newPrice) + val).toFixed(0);
            setNewPrice(price);
        }
        else if(val == -10){
            let price = parseFloat(Number(newPrice) + val).toFixed(0);
            setNewPrice(price);
        }
    }
    const doChanges = async () => {
        const obj = {
            id: id,
            price: newPrice * quantity,
            priceOld: newPrice,
            weight: newWeight * quantity,
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
                                    <FontAwesome5 name='chevron-left' size={15} color={color1} onPress={() => changeQuantity(+1)} />
                                    <Text style={styles.itemText}>{quantity || quan}</Text>
                                    <FontAwesome5 name='chevron-right' size={15} color={color1} onPress={() => changeQuantity(-1)} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.itemSpec}>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Total Weight</Text>
                                <Text style={styles.itemText}>{newWeight * quantity}</Text>
                            </View>
                            <View style={styles.container}>
                                <Text style={styles.itemHeading}>Weight</Text>
                                <View style={styles.changeSpec}>
                                    <FontAwesome5 name='chevron-left' size={15} color={color1} onPress={() => changeWeight(+.1)} />
                                    <Text style={styles.itemText}>{newWeight}</Text>
                                    <FontAwesome5 name='chevron-right' size={15} color={color1} onPress={() => changeWeight(-.1)} />
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
                                    <FontAwesome5 name='chevron-left' size={15} color={color1} onPress={() => changePrice(+10)} />
                                    <Text style={styles.itemText}>{newPrice}</Text>
                                    <FontAwesome5 name='chevron-right' size={15} color={color1} onPress={() => changePrice(-10)} />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.itemSpec, { alignSelf: 'center', marginTop: '10%' }]} >
                            <Pressable style={styles.btn} onPress={doChanges}>
                                <Text style={styles.btnText}>Done</Text>
                            </Pressable>
                        </View>
                    </View>
                    {/* <View style={styles.modalItem}>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Product name</Text>
                            <Text style={styles.itemText}>{name}</Text>
                        </View>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Weight</Text>
                            <View style={styles.itemQuantity}>
                                <FontAwesome5 name='chevron-left' size={20} color={color1} />
                                <Text style={styles.itemText}>{newWeight}kg</Text>
                                <FontAwesome5 name='chevron-right' size={20} color={color1} />
                            </View>
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
                            <View style={styles.itemQuantity}>
                                <FontAwesome5 name='chevron-left' size={20} color={color1} />
                                <Text style={styles.itemText}>${newPrice}</Text>
                                <FontAwesome5 name='chevron-right' size={20} color={color1} />
                            </View>
                        </View>
                        <View style={styles.itemSpec} >
                            <Text style={styles.itemHeading}>Price</Text>
                            <Text style={styles.itemText}>${newPrice}</Text>
                        </View>
                        <View style={styles.itemSpec} >
                            <Pressable style={styles.btn} onPress={doChanges}>
                                <Text style={styles.btnText}>Done</Text>
                            </Pressable>
                        </View> 
                    </View>*/}
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
    button: {
        flex: .1,
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
        color: color1
    },
    changeSpec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        width: '80%'
    },
    itemText: {
        fontFamily: Italic,
        color: color1,
        fontSize: 15
    }
});