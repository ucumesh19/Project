import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, secureTextEntry, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const img = { uri: 'https://media.istockphoto.com/photos/blue-abstract-background-or-texture-picture-id1138395421?k=6&m=1138395421&s=612x612&w=0&h=bJ1SRWujCgg3QWzkGPgaRiArNYohPl7-Wc4p_Fa_cyA=' }
const imgLogo = { uri: 'https://www.pikpng.com/pngl/m/60-602888_logo-globe-png-globe-clip-art-transparent-png.png' }


const Sign = () => {

  const [email, setEmail] = useState("Ume123@gmail.com"); //Email
  const [name, setName] = useState("Umesh Chander");      //Name
  const [mobile, setMobile] = useState("9645247841");     //Mobile
  const [pass, setPass] = useState("Ume@123");            //Password
  const [cpass, setCpass] = useState("Ume@123");          //Confirm Password

  const navigation = useNavigation();             //to use navigation
  const PressHandler = () => { navigation.navigate('Login') }    //to navigate to Login Screen
  // const PressMe = () => { navigation.navigate('Home', { name, email, mobile }) }
  // Will navigate to Home Screen under AppDrawer and take params along with.
  const PressMe = () => { navigation.navigate('AppDrawer', { screen: 'Home', params: { name, email, mobile } }) }
  const goToProfile = () => { navigation.navigate('AppDrawer', { screen: 'Profile', params: { name, email, mobile } }) }

  // Validation function and will navigate at end 
  const validateNavigateForm = () => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
    const nameReg = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
    const mobileReg = /^[1-9]{1}[0-9]{9}$/;

    if (!(email && name && mobile && pass && cpass)) {
      alert("All fields are required.")
      return false;
    }

    if (!email) {
      alert("Email is empty.")
      return false;
    }
    else if (!(emailReg.test(email))) {
      alert("Email is incorrect.")
      return false;
    }

    if (!name) {
      alert("Name is empty.")
      return false;
    }
    else if (!(nameReg.test(name))) {
      alert("Name is incorrect.")
      return false;
    }

    if (!mobile) {
      alert("Number is empty.")
      return false;
    }
    else if (!(mobileReg.test(mobile))) {
      alert("Number is incorrect.")
      return false;
    }

    if (!pass) {
      alert("Password is empty.")
      return false;
    }
    else if (!(passReg.test(pass))) {
      alert("Password is incorrect.")
      return false;
    }

    if (!cpass) {
      alert("Field is empty.")
      return false;
    }
    else if (cpass != pass) {
      alert("Password not matching");
      return false;
    }

    else {
      saveData();
      navigation.navigate('AppDrawer', { screen: 'Profile' });
      return true;
    }
  }
  //Fn to save data using async
  const saveData = async () => {
    let obj = {
      mail: email,
      name: name,
      num: mobile,
      pass: pass
    }
    try {
      const val = JSON.stringify(obj);
      await AsyncStorage.setItem('Skey', val);
    }
    catch (e) {
      console.log(e);
    }
    console.log("Data Saved:SignUp");
  }

  return (

    <ImageBackground source={img} style={styles.top}>

      <View style={styles.centerView}>
        <Image source={imgLogo} style={styles.imgS} />
      </View>

      <View style={styles.mainView} >
        <TextInput value={email} style={styles.container} onChangeText={(email) => { setEmail(email) }} placeholder="Enter your email" />
        <TextInput value={name} style={styles.container} onChangeText={(name) => { setName(name) }} placeholder="Enter your Name" />
        <TextInput value={mobile} style={styles.container} onChangeText={(mobile) => { setMobile(mobile) }} keyboardType={'number-pad'} placeholder="Mobile No" />
        <TextInput value={pass} style={styles.container} onChangeText={(pass) => { setPass(pass) }} secureTextEntry={true} placeholder="Password" />
        <TextInput value={cpass} style={styles.container} onChangeText={(cpass) => { setCpass(cpass) }} secureTextEntry={true} placeholder="Confirm Password" />
        {/* <TouchableOpacity style={styles.button2} onPress={() => { validateForm() && PressMe() }}> */}
        <TouchableOpacity style={styles.button2} onPress={validateNavigateForm}>
          <Text style={styles.SignText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.centerView} onPress={PressHandler}>
        <Text style={styles.LoginText}>Login</Text>
      </TouchableOpacity>

    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    color: "#4E4AAD",
    fontSize: 16,
    backgroundColor: "#0EB2BF",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    fontWeight: "bold"
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center"
  },
  mainView: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: 50,
    marginTop: 40,
    padding: 20
  },
  button1: {
    width: "60%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#4E4AAD",
    marginLeft: 50
  },
  button2: {
    width: "60%",
    borderRadius: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    backgroundColor: "#4E4AAD",
    marginLeft: 50
  },
  top: {
    flexDirection: "column",
    width: '100%',
    height: '100%'
  },
  imgS: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 30
  },
  SignText: {
    color: "white",
    fontSize: 16
  },
  LoginText: {
    color: "white",
    fontSize: 36,
    marginBottom: 20,
    textDecorationLine: 'underline'

  }
});

export default Sign;
