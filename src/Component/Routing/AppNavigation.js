import 'react-native-gesture-handler';
import * as React from 'react';
import Login from '../AuthScreen/Login'
import Sign from '../AuthScreen/Sign';
import Home from '../Home/Home';
import Header from '../common/Header';
import FlattList from '../AuthScreen/FlattList';
import UserList from '../Users/UserList';
import UserDetail from '../Users/UserDetail';
import Profile from '../Users/Profile';
import Password from '../Users/Password';
import LogData from '../AuthScreen/LogData';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


//This is our main component,from here we are moving to all screens in our app
// using Navgation(mainly) 

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
//const SiStack = createStackNavigator();

const AppDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName={Profile}>
      <Drawer.Screen name="Home" component={Home} />
      {/* <Drawer.Screen name="Login" component={Login} /> */}
      {/* <Drawer.Screen name="Header" component={Header} /> */}
      {/* <Drawer.Screen name="FlattList" component={FlattList} /> */}
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="AppTab" component={AppTab} />
      <Drawer.Screen name="UserList" component={UserList} />
      <Drawer.Screen name="UserDetail" component={UserDetail} />
      <Drawer.Screen name="Password" component={Password} />
      <Drawer.Screen name="LogData" component={LogData} />


    </Drawer.Navigator>
  );
}

const AppTab = () => {
  return (
    <Tab.Navigator initialRouteName={Login}>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Sign" component={Sign} />
    </Tab.Navigator>
  );
}

// const SignStack = () => {
//   return (
//     <SiStack.Navigator initialRouteName={Sign}>
//       <SiStack.Screen name="Sign" component={Sign} />
//     </SiStack.Navigator>
//   );
// }

const AppNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={Sign}>
        {/* <Stack.Screen name="AppTab" component={AppTab} /> */}
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="SignStack" component={SignStack} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="AppDrawer">
          {(props) => <AppDrawer {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default AppNavigation;
