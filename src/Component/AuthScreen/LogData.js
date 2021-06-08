import React, { useState } from 'react';
import { StyleSheet, Dimensions, Text, marginTop, View, Image, TextInput, onChangeText, text, Button, ImageBackground, TouchableOpacity, fontFamily } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';
const img = { uri: 'https://media.istockphoto.com/photos/blue-abstract-background-or-texture-picture-id1138395421?k=6&m=1138395421&s=612x612&w=0&h=bJ1SRWujCgg3QWzkGPgaRiArNYohPl7-Wc4p_Fa_cyA=' }
const imgLogo = { uri: 'https://www.pikpng.com/pngl/m/60-602888_logo-globe-png-globe-clip-art-transparent-png.png' }

const LogData = () => {

    const [email, setEmail] = useState("");      //for email
    const [pass, setPass] = useState("");        //for password

    return (

        <ImageBackground source={img} style={styles.top}>

            <View style={styles.centerView}>
                <Image source={imgLogo} style={styles.imgS} />
            </View>

            <View style={styles.mainView} >
                <TextInput style={styles.container} onChangeText={(email) => { setEmail(email) }} placeholder="Enter your email" />
                <TextInput style={styles.container} onChangeText={(pass) => { setPass(pass) }} secureTextEntry={true} placeholder="Password" />

                <TouchableOpacity style={styles.button1}>
                    <Text style={styles.LoginText}>Login</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.centerView}>
                <Text style={styles.SignText}>SignUp</Text>
            </TouchableOpacity>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({
    container: {
        height: hp(7),
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
        alignItems: "center",
        borderWidth: 5,
        borderColor: "white"
    },
    mainView: {
        backgroundColor: "white",
        borderRadius: 10,
        margin: hp(6),
        marginTop: hp(7),
        padding: 20
    },
    top: {
        flexDirection: "column",
        width: wp(100),
        height: hp(100)
    },
    button1: {
        width: wp(40),
        borderRadius: 10,
        height: hp(6),
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp(1.5),
        backgroundColor: "#4E4AAD",
        marginLeft: wp(14)
    },
    imgS: {
        // width: wp(40),
        // height: hp(20),
        width: 150,
        height: 150,
        borderRadius: hp(20) / 2,
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

export default LogData;