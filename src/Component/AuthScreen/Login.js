import React, { useState } from 'react';
import { StyleSheet, Text, marginTop, View, Image, TextInput, onChangeText, text, Button, ImageBackground, TouchableOpacity, fontFamily } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';

const img = { uri: 'https://media.istockphoto.com/photos/blue-abstract-background-or-texture-picture-id1138395421?k=6&m=1138395421&s=612x612&w=0&h=bJ1SRWujCgg3QWzkGPgaRiArNYohPl7-Wc4p_Fa_cyA=' }
const imgLogo = { uri: 'https://www.pikpng.com/pngl/m/60-602888_logo-globe-png-globe-clip-art-transparent-png.png' }

const Login = () => {

  const [email, setEmail] = useState("");      //for email
  const [pass, setPass] = useState("");        //for password

  const [emailErr, setEmailErr] = useState(false)   //to show inline err for email
  const [passErr, setPassErr] = useState(false)     //same for password

  const [sEmail, setSEmail] = useState("");
  const [sPass, setSPass] = useState("");

  useEffect(() => {
    readData()
  }, [])

  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem('Skey');
      let userData = JSON.parse(data);
      setSEmail(userData.mail);
      setSPass(userData.pass);
    }
    catch (e) {
      console.log(e);
    }
    console.log("Email and Pass Fetch Here");
  }


  //For Validation
  const validateForm = () => {
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

    // if (passReg.test(pass) === false) {
    //   alert("Password  is Invalid!!!!");
    // }
    // if (emailReg.test(email) === false) {
    //   alert("Email is not valid!!!")
    // }

    if (!(email || pass)) {
      setEmailErr(true);
      return false;
    }

    else if (!email || (email && emailReg.test(email)) == false) {
      setEmailErr(true);
      return false;

    }
    else if (email != sEmail) {
      setEmailErr(true);
      return false;
    }

    else if (email && emailReg.test(email) == true) {
      setEmailErr(false);
    }

    if (!pass || (pass && passReg.test(pass)) == false) {
      setPassErr(true);
      return false;
    }
    else if (pass != sPass) {
      setPassErr(true);
      return false;
    }
    else if (pass && passReg.test(pass) == true) {
      setPassErr(false);
    }


    alert("You have login successfully!!!! ");

  }


  const navigation = useNavigation();
  //will navigate to sign screen
  const PressHandler = () => { navigation.navigate('Sign') }
  //  const PressMe = ()=> {navigation.navigate('Home',{email,pass})}

  return (

    <ImageBackground source={img} style={styles.top}>

      <View style={styles.centerView}>
        <Image source={imgLogo} style={styles.imgS} />
      </View>

      <View style={styles.mainView} >
        <TextInput style={styles.container} onChangeText={(email) => { setEmail(email) }} placeholder="Enter your email" />
        {emailErr && <Text style={{ color: "red" }}> Wrong Email!! </Text>}

        <TextInput style={styles.container} onChangeText={(pass) => { setPass(pass) }} secureTextEntry={true} placeholder="Password" />
        {passErr && <Text style={{ color: "red" }}> Wrong Password!! </Text>}

        <TouchableOpacity style={styles.button1} onPress={validateForm}>
          <Text style={styles.LoginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.centerView} onPress={PressHandler}>
        <Text style={styles.SignText}>SignUp</Text>
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
  top: {
    flexDirection: "column",
    width: '100%',
    height: '100%'
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
  imgS: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 30
  },
  LoginText: {
    color: "white",
    fontSize: 16
  },
  SignText: {
    color: "white",
    fontSize: 30,
    marginBottom: 20,
    textDecorationLine: 'underline'

  }
});

export default Login;