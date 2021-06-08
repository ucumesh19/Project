import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';

// Have used name prop to dynamically display header based on req of component
// showback true:default: so that it will display all time and dynamically we can control it by setting it state to false
//have used left icon specially for profile page so that we can dynamically use left icon prop there
const Header = ({ name, showBack = true, leftIcon = null }) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            { showBack ?
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" type="Ionicons" style={styles.icon} />
                </TouchableOpacity> :
                leftIcon}
            <Text style={styles.head1}>{name}</Text>

            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon name="menu" type="Ionicons" style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "#0EB2BF"
    },
    icon: {
        fontSize: 40,
        color: "#4E4AAD",
        fontWeight: "bold"
    },
    head1: {
        fontSize: 30,
        color: "white",
        fontWeight: "bold"
    }
})

export default Header;