import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native';
import { Pressable, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { Modal } from 'react-native';
import { color1, color2 } from '../Themes/Color';
import { Bold } from '../Themes/FontFamily';

export default function Status({ message, open }) {
    const [status, setStatus] = useState(false);
    console.log('yes')
    const checkStatus = () => {
        if (message) {
            setStatus(open);
        }
    }
    useEffect(() => {
        checkStatus();
    }, []);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={status}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setStatus(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text>{message}</Text>
                <Pressable onPress={() => setStatus(!status)}>
                    <Text>Close</Text>
                </Pressable>
                </View>
            </View>
        </Modal >
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
})
