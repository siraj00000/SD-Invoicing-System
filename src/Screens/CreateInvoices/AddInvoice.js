import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { color2, color1, color3 } from '../../Themes/Color';
import { Bold } from '../../Themes/FontFamily';
import { ScreenHeader } from '../../Component/Header';
import { STYLE } from '../../Utils/Stylesheet/Style';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import { AddCustomerForInvoice, AddDesForInvoice, AddProductsForInvoice, createFactTableForDescription, createFactTableForProduct, createTableForCustomer, customerIdForCheck, desIdForCheck, updateDes } from '../../SqliteDatabase/Invoices';

export default function InvoiceCreate({ navigation, route }) {
    const { customer, products } = route.params;
    const [descriptionEng, setDescriptionEng] = useState('');
    const [descriptionArabic, setDescriptionArabic] = useState('');
    const { id: uniqueId, contactPerson, contactPersonArabic, companyName, companyNameArabic, email, address, tele, CR, VAT } = customer[0];
    useEffect(() => {
        createTableForCustomer();
        createFactTableForProduct();
        createFactTableForDescription();
    }, []);
    const addProductToDb = () => {
        for (let i = 0; i <= products.length - 1; i++) {
            const { name, weightOld, weight, priceOld, price, quantity } = products[i];
            AddProductsForInvoice(name, weightOld, weight, priceOld, price, quantity, uniqueId);
            console.log('chek product table', i, products.length);
        }
    };
    const createOrEditDes = async (des) => {
        const check = des.some(i => {
            console.log(i.desId, 'd', uniqueId);
            return i.desId == uniqueId;
        });
        if (check) {
            updateDes(descriptionEng, descriptionArabic, uniqueId);
        } else if (!check) {
            AddDesForInvoice(descriptionEng, descriptionArabic, uniqueId);
        }
    };
    const allTables = (des) => {
        AddCustomerForInvoice(contactPerson, contactPersonArabic, companyName, companyNameArabic, email, address, tele, VAT, CR, uniqueId);
        addProductToDb();
        createOrEditDes(des);
    };
    const val = (id1, id2) => { return id1 == id2 };
    const checkAndCreateTables = (id, des) => {
        if (id.length) {
            const check = id.some((i) => val(i.customerId, uniqueId));            
            if (check) {
                addProductToDb();
                createOrEditDes(des);
            } else if (!check) {
                allTables(des);
            }
        } else if (!id.length) {
            allTables(des);            
        }
    };
    const addInvoiceToDb = async () => {
        const des = await desIdForCheck();
        const id = await customerIdForCheck();
        checkAndCreateTables(id, des);
    };
    return (
        <View style={STYLE.section}>
            <ScreenHeader
                Title={route.name}
                icon={'file-document-edit'}
                Iconbar={MaterialCommunityIcons}
                size={40}
                navigation={navigation}
            />
            <View style={STYLE.body}>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='Discription' value={descriptionEng}
                        style={STYLE.TextInput} onChangeText={setDescriptionEng} />
                </View>
                <View style={STYLE.cr_product}>
                    <TextInput selectionColor={color3} placeholderTextColor={color3} placeholder='??????' value={descriptionArabic}
                        style={STYLE.TextInput} onChangeText={setDescriptionArabic} />
                </View>
                <View style={STYLE.cr_product}>
                    <TouchableOpacity style={STYLE.btn} onPress={addInvoiceToDb}  >
                        <Text style={STYLE.btnTxt}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};
