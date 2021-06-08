import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, Pressable, Image, TextInput, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import Header from '../common/Header'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { Icon } from 'native-base';

const Profile = () => {

    //  const { name, email, mobile } = route.params;
    //const [uData, setUData] = useState(null);
    const [modal, setModal] = useState(false);
    const [img, setImg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegdLPBUw9F-YVGoqjyYcgSA8VQOfyF4aFTg&usqp=CAU");

    const [nameP, setNameP] = useState("");
    const [emailP, setEmailP] = useState("");
    const [numP, setNumP] = useState("");
    const [editMode, setEditMode] = useState(false);
    // const [imageP, setImageP] = useState("");

    //For validation
    const validateForm = () => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const nameReg = /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/;
        const mobileReg = /^[1-9]{1}[0-9]{9}$/;

        if (!(emailP && numP && nameP)) {
            alert("All fields are required.")
            return false;
        }

        if (!emailP) {
            alert("Email is empty.")
            return false;
        }
        else if (!(emailReg.test(emailP))) {
            alert("Email is incorrect.")
            return false;
        }

        if (!nameP) {
            alert("Name is empty.")
            return false;
        }
        else if (!(nameReg.test(nameP))) {
            alert("Name is incorrect.")
            return false;
        }

        if (!numP) {
            alert("Number is empty.")
            return false;
        }
        else if (!(mobileReg.test(numP))) {
            alert("Number is incorrect.")
            return false;
        }

        else {
            updateData();
            return true;
        }
    }

    //For updating our data async after user wil edit any information
    const updateData = async () => {
        let obj = {
            name: nameP,
            mail: emailP,
            num: numP,
            profile: img
        }
        try {
            const val = JSON.stringify(obj);
            await AsyncStorage.setItem('Skey', val).then(
                () => {
                    setEditMode(!editMode)
                }
            );
        }
        catch (e) {
            console.log(e);
        }
        console.log("Data Updated Successfully");
    }
    //For readig our data usig async which we have sent from Profile compnent
    const readData = async () => {
        try {
            const data = await AsyncStorage.getItem('Skey');
            // setUData(JSON.parse(data));
            let userData = JSON.parse(data);
            setEmailP(userData.mail);
            setNameP(userData.name);
            setNumP(userData.num);
            if (userData.profile) {
                setImg(userData.profile);
            }
        }
        catch (e) {
            console.log(e);
        }
        console.log("Data Fetch Here");
    }
    // This hook let us perform the data fetching through async storage
    //fetching data (known as side effects)
    //here we have used editMode state and based on this condn,useEffect will call no of times
    useEffect(() => {
        if (!editMode) {
            readData();
        }
    }, [editMode])
    // This is for using camera and here we have also set the path of our capturing image
    // and we have also set the condition for Modal,so that it will disappear once we capture 
    const cameraFunc = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
            setImg(image.path);
            setModal(!modal);
        }).catch(err => {
            console.log(err);
        });

    }

    //Choose pics from gallery
    const libraryFunc = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            setImg(image.path);
            setModal(!modal);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <ImageBackground source={{ uri: "https://media.istockphoto.com/photos/blue-abstract-background-or-texture-picture-id1138395421?k=6&m=1138395421&s=612x612&w=0&h=bJ1SRWujCgg3QWzkGPgaRiArNYohPl7-Wc4p_Fa_cyA=" }}
            style={styles.top}
        >
            <Header name="Profile" showBack={false} leftIcon={

                <TouchableOpacity onPress={() => {
                    setEditMode(!editMode);
                }}>
                    {!editMode ? <Icon name="edit" type="FontAwesome5" style={styles.icon} /> : null}
                </TouchableOpacity>}
            />
            <View style={styles.top1} >

                <Image source={{ uri: img }}
                    style={{ height: 160, width: 160, borderRadius: 80, borderWidth: 5, borderColor: "white" }} />


                {/* Here TouchableOpacity is not working properly while using absolute position */}
                {/* Use Zindex for this issue */}
                {editMode ?
                    <Pressable style={{ position: "absolute", bottom: 10, right: 120 }}
                        onPress={() => { setModal(true) }} >
                        <Icon name="camera" type="FontAwesome5" style={{ color: "white", fontSize: 40 }} />
                    </Pressable> : null}

            </View>
            <View style={styles.top2}>
                <TextInput style={styles.container2} editable={editMode} onChangeText={(n) => setNameP(n)} value={nameP}></TextInput>
                <TextInput style={styles.container2} editable={editMode} onChangeText={(m) => setEmailP(m)} value={emailP}></TextInput>
                <TextInput style={styles.container2} editable={editMode} onChangeText={(num) => setNumP(num)} value={numP}></TextInput>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        Alert.alert("Image Upload Failed!! ");
                        setModal(!modal);
                    }}
                >
                    <View style={styles.container}>
                        <View style={styles.modalView}>

                            <Pressable style={styles.button2} onPress={cameraFunc}>
                                <Text style={styles.text}>Open Camera</Text>
                            </Pressable>
                            <Pressable style={styles.button2} onPress={libraryFunc}>
                                <Text style={styles.text}>Open Gallery</Text>
                            </Pressable>
                            <Pressable style={styles.button3} onPress={() => setModal(!modal)}>
                                <Text style={styles.text}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                {/* <Text>{emailP}</Text>
                <Text>{nameP}</Text> */}
                {/* <Pressable
                    onPress={() => setModal(true)}
                >
                    <Text>Show Modal</Text>
                </Pressable> */}
                {/* <TouchableOpacity onPress={cameraFunc}>
                    <Text style={{ fontWeight: "bold" }}> Camera</Text>
                </TouchableOpacity> */}
            </View>


            {    editMode ?
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.button} onPress={() => { validateForm() }} >
                        <Text style={{ color: "white", fontSize: 20 }}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => {
                        setEditMode(!editMode);
                    }}>
                        <Text style={{ color: "white", fontSize: 20 }}>Cancel</Text>
                    </TouchableOpacity>
                </View> : null}


        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    f1: {
        color: "green",
        fontSize: 20,
        fontWeight: "bold"

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 60,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderColor: "blue",
        borderWidth: 1
    },
    container2: {
        height: 60,
        color: "#4E4AAD",
        fontSize: 16,
        backgroundColor: "#0EB2BF",
        padding: 10,
        borderRadius: 10,
        margin: 5,
        fontWeight: "bold"
    },
    top: {
        width: '100%',
        height: '100%'
    },
    top1: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    top2: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        margin: 40

    },
    button: {
        width: "60%",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#4E4AAD",
        marginLeft: 90,
    },
    btn: {
        width: "60%",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
        marginLeft: 90,
    },
    icon: {
        fontSize: 40,
        color: "#4E4AAD",
        fontWeight: "bold"
    },
    button2: {
        borderRadius: 15,
        padding: 10,
        margin: 4,
        backgroundColor: "#0EB2BF",
        alignItems: "center",
        borderWidth: 1,
    },
    button3: {
        borderRadius: 15,
        padding: 10,
        margin: 4,
        backgroundColor: "red",
        alignItems: "center",
        borderWidth: 1,

    },
    text: {
        color: "white",
        fontSize: 16
    }
});

export default Profile;