import { StyleSheet, View, Text, ScrollView, Image, Animated } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { getData, putData } from '../../api/api';

export default function DetailOrder({ navigation }) {

    const route = useRoute();
    const { itemData } = route.params;
    const [products, setProducts] = useState([]);
    const [order1, setOrder1] = useState([]);
    const [order, setOrder] = useState([]);
    const [runData, setRunData] = useState(true);

    useEffect(() => {
        getData('/api/product/staff', {})
            .then((productData) => {
                getData('/api/product/trash', {})
                    .then((productDatas) => {
                        setProducts([...productData?.data?.docs, ...productDatas?.data]);
                    })
                    .catch((error) => {
                        console.error("Error fetching products:", error);
                    });
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });


        getData(`/api/order/user/${itemData}`)
            .then((data) => {
                setOrder(data.data);
                setOrder1(data.data.products)
            })
            .catch((error) => {

                console.error("Lỗi khi lấy dữ liệu đơn hàng:", error);
            });
    }, []);

    const Canceled = () => {
        putData(`/api/order/user/Canceled/${itemData}/Canceled`, '', {})
            .then((e) => {
                Toast.show({
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Đã hủy đơn hàng thành công.',
                });
                setRunData(!runData)
            })
            .catch(err => console.log(err))

    }
    const getProductById = (productId) => {
        return products.find(product => product?._id === productId);
    };

    console.log('====================================');
    console.log(order.status=='Pending');
    console.log('====================================');
    return (
        <View style={styles.container} >
            <ScrollView >
                <View>
                    <Text style={styles.title} >Tên người nhận:{order?.name}</Text>
                    <Text style={styles.title} >Địa chỉ:{order?.shippingAddress}</Text>
                    <Text style={styles.title} >Số điện thoại:{order?.phone}</Text>
                    <Text style={styles.title} >Tổng số tiền đơn hàng:{order?.totalAmount?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}</Text>
                </View>
                <View style={{ flexDirection: 'column-reverse', rowGap: 10, padding: 14 }}>
                    {order1?.map((product, index) => {
                        const fullProduct = getProductById(product.product);
                        return (
                            <View style={{ padding: 10 }} key={index}>
                                <TouchableOpacity
                                    style={styles.origin}

                                    onPress={() => {
                                        navigation.navigate("Detail", { itemData: fullProduct._id });
                                    }}
                                >
                                    <Image source={{ uri: fullProduct?.image[0] }} style={styles.image} />
                                    <View style={{ padding: 10 }} >
                                        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{fullProduct?.name}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text>{`Giá : ${product?.price?.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}`}</Text>
                                                <Text>{`Số lượng: ${product.quantity}`}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        )
                    }
                    )}
                </View>
                <View style={{ height: 100 }}></View>
            </ScrollView>
            {order.status=='Pending'?<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 80 }} >

                <View style={{ width: "100%", }}>
                    <TouchableOpacity onPress={Canceled} >
                        <View style={{ backgroundColor: 'red', height: "100%", flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Hủy đơn hàng</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>:<></>}
            <Toast />

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 100,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        marginVertical: 5,

    },
    origin: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        // borderRadius: 20,
        elevation: 10, // Bóng đổ cho Android
        shadowColor: '#000', // Màu của bóng đổ cho iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});