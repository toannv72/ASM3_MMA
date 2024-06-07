import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import { LanguageContext } from "../../../contexts/LanguageContext";
import ComInput from "../../../Components/ComInput/ComInput";
import ComButton from "../../../Components/ComButton/ComButton";
import ComSelect from "../../../Components/ComInput/ComSelect";
import Avatar from "./Avatar";
import ComDatePicker from "../../../Components/ComInput/ComDatePicker";
import { ScrollView } from "react-native";
import { firebaseImg } from "../../../api/firebaseImg";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { postData } from "../../../api/api";
import ComPopup from "../../../Components/ComPopup/ComPopup";
import { useModalState } from "../../../hooks/useModalState";

export default function EditProfile() {
  const [date, setDate] = useState(new Date());
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("null");
  const navigation = useNavigation();
  const modal = useModalState();

  const {
    text: {
      EditProfile,
      common: { button },
    },
    setLanguage,
  } = useContext(LanguageContext);
  const loginSchema = yup.object().shape({
    perfumeName: yup.string().trim().required(EditProfile?.message?.fullName),
    gender: yup.string().trim().required(EditProfile?.message?.gender),

    price: yup.string().trim().required("Vui lòng nhập giá tiền"),
    company: yup.string().trim().required("Vui lòng nhập company"),
    perfumeDescription: yup.string().trim().required("vui lòng nhập"),
  });

  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      gender: true,
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = methods;

  const data = [
    {
      value: false,
      label: "Nam",
    },
    {
      value: true,
      label: "Nữ",
    },
  ];

  const setImg = (data) => {
    setImage(data);
  };
  const handleCreate = (data) => {
    console.log("====================================");
    console.log(1232, data);
    console.log("====================================");
    firebaseImg(image).then((imageUrl) => {
      console.log("Image uploaded successfully:", imageUrl);
      postData("/data", { ...data, image: imageUrl })
        .then((e) => {
          console.log(e);
          modal.handleOpen();
          reset()
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <>
      <ComHeader title={EditProfile?.title} showTitle showBackIcon />

      <ComPopup
        visible={modal.isModalOpen}
        title="Tạo thành công"
        buttons={[
          // { text: "Hủy", onPress: modal.handleClose, check: true },
          {
            text: "Xác nhận",
            onPress: () => {
              modal.handleClose();
            },
          },
        ]}
        onClose={modal.handleClose}
      ></ComPopup>
      <View style={styles.body}>
        <View style={styles.container}>
          <FormProvider {...methods}>
            <View style={{ width: "100%", gap: 10, flex: 1 }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <Avatar image={image} setImg={setImg} />
                <View style={{ gap: 10 }}>
                  <ComInput
                    label={EditProfile?.label?.fullName}
                    placeholder={EditProfile?.placeholder?.fullName}
                    name="perfumeName"
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    required
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: 10,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <ComSelect
                        label={EditProfile?.label?.gender}
                        name="gender"
                        control={control}
                        // keyboardType="visible-password" // Set keyboardType for Last Name input
                        errors={errors} // Pass errors object
                        options={data}
                        required
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ComInput
                        label={"Giá tiền"}
                        placeholder={"nhập giá tiền"}
                        name="price"
                        control={control}
                        keyboardType="number-pad" // Set keyboardType for First Name input
                        errors={errors} // Pass errors object
                        required
                      />
                    </View>
                  </View>

                  <ComInput
                    label={"Công ty"}
                    placeholder={"company"}
                    name="company"
                    control={control}
                    keyboardType="default" // Set keyboardType for First Name input
                    errors={errors} // Pass errors object
                    required
                  />

                  <ComTextArea
                    label={"chi tiết sản phẩm"}
                    placeholder={"chi tiết sản phẩm"}
                    name="perfumeDescription"
                    control={control}
                    errors={errors}
                    required
                  />

                  <ComButton onPress={handleSubmit(handleCreate)}>
                    Tạo mới
                  </ComButton>
                </View>
                <View style={{ height: 150 }}></View>
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
    paddingTop: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    gap: 10,
  },
  container: {
    flex: 1,
  },
});
