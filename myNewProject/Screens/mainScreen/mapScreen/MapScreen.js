import React from "react";
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const MapScreen = ({ }) => (

    <View style={styles.container}>
        <MapView></MapView>
    </View>

)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MapScreen;