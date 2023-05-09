import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
    console.log("titleLocation", route.params);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 32.08088,
                    longitude: 34.78057,
                    latitudeDelta: 0.007,
                    longitudeDelta: 0.007,
                }}
            >
                <Marker
                    coordinate={{ latitude: 32.08088, longitude: 34.78057 }}
                    title="travel photo"
                />
            </MapView>
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

