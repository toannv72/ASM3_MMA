import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../contexts/LanguageContext";
import ComInput from "../../Components/ComInput/ComInput";
import ComButton from "../../Components/ComButton/ComButton";
import ComSelect from "../../Components/ComInput/ComSelect";
import ComDatePicker from "../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import ComHeader from "../../Components/ComHeader/ComHeader";
import { useStorage } from "../../hooks/useLocalStorage";

export default function DetailProfile() {
  const [date, setDate] = useState(new Date());
  const [accessToken, setToken] = useStorage("@user", {});

  const navigation = useNavigation();
  const {
    text: {
      EditProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const loginSchema = yup.object().shape({
    name: yup.string().trim().required(EditProfile?.message?.fullName),
    phone: yup.string().trim().required(EditProfile?.message?.phoneNumber),
    email: yup
      .string()
      .email(EditProfile?.message?.emailInvalid)
      .trim()
      .required(EditProfile?.message?.email),
    address: yup.string().trim().required(EditProfile?.message?.address),
  });
  const Edit = () => {
    navigation.navigate("EditProfile");
  };
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    values: {
      email: accessToken?.email,
      name: accessToken?.name,
      phone: accessToken?.phone,
      address: accessToken?.address,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;


  return (
    <>
      <ComHeader title="Thông tin" showTitle showBackIcon />
      <View style={styles.body}>
        <View style={styles.container}>
          <FormProvider {...methods}>
            <View style={{ width: "100%", gap: 10, flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.avatarContainer}>
                  <Image
                    source={{
                      uri: accessToken.avatar,
                    }}
                    style={styles.avatar}
                  />
                </View>
                <View style={{ gap: 10 }}>
                  <ComInput
                    label={EditProfile?.label?.fullName}
                    placeholder={EditProfile?.placeholder?.fullName}
                    name="name"
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    edit={false}
                    required
                  />

                  <ComInput
                    label={EditProfile?.label?.phoneNumber}
                    placeholder={EditProfile?.placeholder?.phoneNumber}
                    name="phone"
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    edit={false}
                    required
                  />
                  <ComInput
                    label={EditProfile?.label?.email}
                    placeholder={EditProfile?.placeholder?.email}
                    name="email"
                    edit={false}
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    required
                  />

                  <ComInput
                    label={EditProfile?.label?.address}
                    placeholder={EditProfile?.placeholder?.address}
                    name="address"
                    edit={false}
                    control={control}
                    errors={errors} // Pass errors object
                    required
                  />
                </View>
                <ComButton onPress={Edit} style={{ marginTop: 10 }}>
                  Sủa thông tin
                </ComButton>
                <View style={{ height: 100 }}></View>
              </ScrollView>
            </View>
            <View></View>
          </FormProvider>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    flex: 1,
  },
  avatarContainer: {
    position: "relative", // Quan trọng!
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 1000,
    borderWidth: 1,
    borderColor: "gray",
  },
});
