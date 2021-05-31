import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Deshboard from '../Screens/Deshboard';
import CreateInvoices from '../Screens/CreateInvoices';
import ViewCustomers from '../Screens/ViewCustomers';
import ViewInvoices from '../Screens/ViewInvoices';
import ViewProduct from '../Screens/ViewProduct';
import Addproduct from '../Screens/AddProduct';
import Addcustomer from '../Screens/AddCustomer';
import Setting from '../Screens/Settings';
import Settingoption from '../Screens/Settings/SettingOption';
import Currency from '../Screens/Settings/Currency';
import TAX from '../Screens/Settings/TAX';
import Customername from '../Screens/AddCustomer/CustomerName';
import InvoiceCreate from '../Screens/CreateInvoices/AddInvoice';
import Invoicedetail from '../Screens/ViewInvoices/invoiceDetail';
import CustomDrawerContent from '../Component/CustomDrawerContent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const SD_Deshboard = () => {
    return (
        <Stack.Navigator headerMode='none'
            screenOptions={({ route, navigation }) => ({
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerStatusBarHeight:
                    navigation
                        .dangerouslyGetState()
                        .routes.findIndex((r) => r.key === route.key) > 0
                        ? 0
                        : undefined,
                ...TransitionPresets.ModalPresentationIOS,
            })}
        >
            <Stack.Screen name='Home' component={Deshboard} />
            <Stack.Screen name='Add Product' component={Addproduct} />
            <Stack.Screen name='Add Customer' component={Addcustomer} />
            <Stack.Screen name='Customer name' component={Customername} />
            <Stack.Screen name='View Products' component={ViewProduct} />
            <Stack.Screen name='View Customers' component={ViewCustomers} />
            <Stack.Screen name='Create Invoices' component={CreateInvoices} />
            <Stack.Screen name='Add Invoices' component={InvoiceCreate} />
            <Stack.Screen name='View Invoices' component={ViewInvoices} />
            <Stack.Screen name='Invoice Detail' component={Invoicedetail} />
            <Stack.Screen name='Setting Option' component={Settingoption} />
            <Stack.Screen name='Currency' component={Currency} />
            <Stack.Screen name='TAX' component={TAX} />
            <Stack.Screen name='Setting' component={Setting} />
        </Stack.Navigator>
    )
}

const MyDrawer = () => {
    return (
        <Drawer.Navigator 
            drawerContent={(props)=> <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Deshboard" component={SD_Deshboard} />
        </Drawer.Navigator>
    );
};



function AppNavigator() {
    return (
        <NavigationContainer >
            <MyDrawer />
        </NavigationContainer>
    );
}


export default function Navigation() {
    return (
        <AppNavigator />
    )
}



