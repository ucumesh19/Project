import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';

const Password = () => {
    const [passw, setPassw] = useState("");  //fetch from asyc
    const [pass1, setPass1] = useState("");  //old password
    const [pass2, setPass2] = useState("");  //new password
    const [pass3, setPass3] = useState("");  //confirm new password

    // Fn to save new passsword async in same key 
    const setData = async () => {
        try {
            let data = await AsyncStorage.getItem('Skey');
            let userData = JSON.parse(data);
            userData.pass = pass2;
            console.log(userData);
            await AsyncStorage.setItem('Skey', JSON.stringify(userData));


            console.log("Saved Successfully");
        }
        catch (e) {
            console.log(e);
        }
    }
    const displayData = async () => {
        try {
            const abc = await AsyncStorage.getItem('Skey');
            let usData = JSON.parse(abc);
            console.log(usData.pass);
        }
        catch (e) {
            alert(e);
        }
    }

    const emp = () => {
        setPass1("");
        setPass2("");
        setPass3("");
    }

    //fn to fetch old password and storing it in a state
    const fetchData = async () => {
        try {
            const data = await AsyncStorage.getItem('Skey');
            let userData = JSON.parse(data);
            console.log(userData);
            setPassw(userData.pass);
        }
        catch (e) {
            console.log(e);
        }
        console.log("FetchData has worked");
    }


    useEffect(() => {
        fetchData()
    }, [])
    // fn for validation and at end to save the new data
    const validatePassword = () => {
        //fetchData();
        const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
        if (!(pass1 && pass2 && pass3)) {
            alert("All fields are required.")
            return false;
        }
        if (!pass1) {
            alert(" Field is Empty!")
            return false;
        }
        else if (passw != pass1) {
            alert("Old Password doesn't match")
            return false;
        }


        if (!pass2) {
            alert("Field is Empty!")
            return false;
        }
        else if (!(passReg.test(pass2))) {
            alert("Password pattern is incorrect.")
            return false;
        }
        else if (passw === pass2) {
            alert("Same as Old Password");
            return false;
        }
        if (!pass3) {
            alert("Field is empty.")
            return false;
        }
        else if (pass3 != pass2) {
            alert("New Password is not matching");
            return false;
        }
        else {
            setData();
            alert("Data Saved Sucessfully")
            return true;
        }
    }

    return (
        <ImageBackground source={{ uri: "https://media.istockphoto.com/photos/blue-abstract-background-or-texture-picture-id1138395421?k=6&m=1138395421&s=612x612&w=0&h=bJ1SRWujCgg3QWzkGPgaRiArNYohPl7-Wc4p_Fa_cyA=" }}
            style={styles.top}
        >
            <Header name="Password" />
            <View style={styles.centerView}>
                <Image source={{ uri: "https://www.pikpng.com/pngl/m/60-602888_logo-globe-png-globe-clip-art-transparent-png.png" }}
                    style={styles.imgS} />
            </View>

            <View style={styles.mainView}>
                <TextInput onChangeText={(a) => { setPass1(a) }} style={styles.container} placeholder="Old Password" />
                <TextInput onChangeText={(b) => { setPass2(b) }} style={styles.container} placeholder="New Password" />
                <TextInput onChangeText={(c) => { setPass3(c) }} style={styles.container} placeholder="Confirm Password" />
                <TouchableOpacity onPress={displayData}>
                    <Text>Touch ME</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.centerView} onPress={validatePassword}>
                <Text style={styles.button}>Change</Text>
            </TouchableOpacity>

        </ImageBackground>

    );

}

const styles = StyleSheet.create({
    top: {
        width: '100%',
        height: '100%'
    },
    centerView: {
        justifyContent: "center",
        alignItems: "center"
    },
    imgS: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginTop: 30
    },
    mainView: {
        backgroundColor: "white",
        borderRadius: 10,
        margin: 50,
        marginTop: 40,
        padding: 20
    },
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
    button: {
        color: "white",
        fontSize: 36,
        marginBottom: 20,
        textDecorationLine: 'underline'
    }

})

export default Password;