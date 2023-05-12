import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
    const { longitude, latitude } = route.params.location;
    const { title } = route.params;
    console.log("titleLocation", route.params);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.007,
                    longitudeDelta: 0.007,
                }}
            >
                <Marker
                    coordinate={{ latitude, longitude }}
                    title={title}
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

