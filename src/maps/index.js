import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';

const GOOGLE_MAPS_API = ""

const Maps = () => {

    const [coordinates, setCoordinates] = useState([]);
    const [polyLines, setPolyLines] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [locationPermission, setLocationPermission] = useState(null);

    const fetchDirection = async () => {
        Promise.all((coordinates.map((_, index) => {
            if (index == coordinates.length - 1) {
                return;
            }
            const originlalo = `${coordinates[index].latitude},${coordinates[index].longitude}`
            const destlalo = `${coordinates[index + 1].latitude},${coordinates[index + 1].longitude}`
            return fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${originlalo}&destination=${destlalo}&key=${GOOGLE_MAPS_API}`)
                .then((resp) => resp.json())
                .then((resp) => {
                    const { routes } = resp || {};
                    return decodePolyline(routes?.[0]?.overview_polyline?.points);

                })
                .catch(err => err)
        }))).then((val) => {
            setPolyLines(val);
            const markerAngles = val.map((item, index) => {
                if (!item) {
                    return;
                }

                return {
                    coordinates: coordinates[index],
                    angle: getArrowRotation(item?.[0], item?.[1])
                }
            })
            setMarkers(markerAngles)
        })
    }

    const decodePolyline = (encoded) => {
        if (!encoded) {
            return [];
        }
        var poly = [];
        var index = 0, len = encoded.length;
        var lat = 0, lng = 0;

        while (index < len) {
            var b, shift = 0, result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result = result | ((b & 0x1f) << shift);
                shift += 5;
            } while (b >= 0x20);

            var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
            lat += dlat;

            shift = 0;
            result = 0;

            do {
                b = encoded.charCodeAt(index++) - 63;
                result = result | ((b & 0x1f) << shift);
                shift += 5;
            } while (b >= 0x20);

            var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
            lng += dlng;

            var p = {
                latitude: lat / 1e5,
                longitude: lng / 1e5,
            };
            poly.push(p);
        }
        return poly;
    }

    const getArrowRotation = (coord1, coord2) => {
        if (!coord2 || !coord1) {
            return 0;
        }
        const dx = coord2.longitude - coord1.longitude;
        const dy = coord2.latitude - coord1.latitude;

        return Math.atan2(dy, dx) * (180 / Math.PI);
    };

    useEffect(() => {
        const requestPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app need location"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getLocation()
                    setLocationPermission(true);
                } else {
                    setLocationPermission(false);
                }
            } catch (error) {
                console.warn(error);
            }
        }
        requestPermission();


        const locationTimer = setInterval(() => {
            getLocation();
        }, 600000)
        return () => clearInterval(locationTimer)

    }, [])

    useEffect(() => {
        fetchDirection()
    }, [coordinates.length])

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            position => {
                setCoordinates((prev) => [...prev, {
                    latitude: position?.coords.latitude,
                    longitude: position?.coords.longitude,
                }])
            },
            error => {

            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    latitude: coordinates?.[0]?.latitude || 37.8025259,
                    longitude: coordinates?.[0]?.longitude || -122.4351431,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                //The code below is for testing
                // onLongPress={(event) => {
                //     const { coordinate } = event.nativeEvent;
                //     setCoordinates((prev) => {
                //         return [...prev, {
                //             ...coordinate
                //         }]
                //     })
                // }}
            >
                {
                    polyLines.map((item, _) => {
                        if (!item) {
                            return;
                        }

                        return <Polyline
                            coordinates={item}
                            strokeColor='#FF0000'
                            strokeWidth={3}
                        />
                    })
                }
                {
                    markers.map((item, _) => {
                        if (!item) {
                            return;
                        }

                        return (<Marker
                            coordinate={item.coordinates}
                            rotation={item.angle}
                            anchor={{ x: 0.5, y: 0.5 }}
                        >
                            <View style={{
                                width: 0,
                                height: 0,
                                backgroundColor: 'transparent',
                                borderStyle: 'solid',
                                borderTopWidth: 15,
                                borderRightWidth: 10,
                                borderBottomWidth: 0,
                                borderLeftWidth: 10,
                                borderTopColor: '#FF0000',
                                borderRightColor: 'transparent',
                                borderBottomColor: 'transparent',
                                borderLeftColor: 'transparent',
                            }} />
                        </Marker>)
                    })
                }
            </MapView>
            {locationPermission !== null && !locationPermission && <Text style={{ color: 'red', backgroundColor: 'white', fontSize: 16 }}>{`Location Permission denied`}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '60%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Maps;