import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, StyleSheet, TouchableOpacity, View, Image, TextInput } from 'react-native';
import { IconButton, Text, } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { getData } from '../../api/api';
import backArrowBlack from "../../../assets/icon/backArrowBlack.png";

export default function Search({ }) {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const searchInputRef = useRef(null);
    const [data, setData] = useState([]);
    const [api, setApi] = useState(0);


    useEffect(() => {
        // Kích hoạt bàn phím tự động khi màn hình được tải
        setTimeout(() => {
            searchInputRef.current.focus();
        }, 10);
    }, []);
    const handleGoBack = () => {
        navigation.goBack(); // Điều này sẽ quay lại màn hình trước đó trong Stack Navigator
    };
    const handleSearch = () => {
        if (!search) {
            Alert.alert('Error', 'Please enter your search.');
            searchInputRef.current.focus();
            return;
        }
        getData(`/api/product/search?name=${search}`)
            .then((data) => {
                setData(data?.products);

            })
            .catch((error) => {
                console.log(error);
            })

    };

    const handleBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.navigate("Homes");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={{ width: "10%", marginLeft: -20 }}>
                    <TouchableOpacity
                        onPress={handleBackPress}
                        style={styles.backIconContainer}
                    >
                        <Image source={backArrowBlack} style={styles.backIcon} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "84%" }}>
                    <TextInput
                        ref={searchInputRef}
                        placeholder="Search"
                        style={[
                            styles.input
                        ]}
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                        onSubmitEditing={handleSearch}
                    />
                </View>
                <View style={{ margin: 10 }} />
            </View>

            {api == 2 ?
                <View>

                    <Text style={{ fontSize: 20, padding: 30, textAlign: 'center' }}>
                        Không Tìm Thấy Sản Phẩm
                    </Text>
                </View>
                :
                <></>}
            <ScrollView >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {data?.map((data, index) => (
                        <View style={{ width: '50%', padding: 7 }} key={index}>
                            <TouchableOpacity
                                style={styles.origin}
                                onPress={() => navigation.navigate("Details", { id: data._id })}
                            >
                                <Image source={{ uri: data.image[0] }} style={styles.image} />
                                <View style={{ padding: 10 }} >
                                    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{data.name}</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text>{`Giá : ${data.price.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}`}</Text>
                                            <Text>{`Đã bán: ${data.sold}`}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                    }
                </View>
                <View style={{ height: 120 }}></View>
            </ScrollView>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    body: {
        display: 'flex',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        gap: 24
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,

    },
    backIconContainer: {
        position: "absolute",
        left: 5,
        bottom: -38,
        paddingVertical: 20,
        paddingRight: 20,
        paddingLeft: 10,
    },
    backIcon: {
        width: 30,
        height: 30,
    },
    origin: {
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 10, // Bóng đổ cho Android
        shadowColor: '#000', // Màu của bóng đổ cho iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    input: {
        backgroundColor: "#fff",
        height: 50,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#33B39C",
        fontWeight: "bold",
        color: "#000",
        elevation: 5, // Bóng đổ cho Android
        shadowColor: "#000", // Màu của bóng đổ cho iOS
        shadowOffset: { width: 0, height: 200 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});
