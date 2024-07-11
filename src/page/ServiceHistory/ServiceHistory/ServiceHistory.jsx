import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import ComHeader from "../../../Components/ComHeader/ComHeader";
import ComInputSearch from "../../../Components/ComInput/ComInputSearch";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ComLoading from "../../../Components/ComLoading/ComLoading";
import ComServiceHistoryPackage from "./ComServiceHistoryPackage";
import { LanguageContext } from "./../../../contexts/LanguageContext";
import { useRoute } from "@react-navigation/native";
import { getData } from "../../../api/api";
import { useStorage } from "../../../hooks/useLocalStorage";

export default function ServiceHistory() {
  const {
    text: { addingPackages },
    setLanguage,
  } = useContext(LanguageContext);
  const [data, setData] = useState([]);
  const route = useRoute();
  const { itemData } = route.params;
  const [loading, setLoading] = useState(false);
  const [accessToken, setToken] = useStorage("@user", {});

  console.log(11111, data);
  const searchSchema = yup.object().shape({
    search: yup.string(),
  }); 
  const methods = useForm({
    resolver: yupResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data) => {
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    setLoading(!loading);
  };
  useEffect(() => {
    if (accessToken._id) {
      getData(`/api/order/user/${itemData}/${accessToken._id}`)
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
  }, [accessToken, itemData]);
  return (
    <>
      <ComHeader
        showBackIcon={true}
        showTitle={true}
        title={addingPackages?.history?.title}
      />
      <View style={styles.container}>
        <ComLoading show={loading}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
          >
            <View>
              {data?.map((value, index) => (
                <ComServiceHistoryPackage key={index} data={value} />
              ))}
            </View>
            <View style={{ height: 120 }}></View>
          </ScrollView>
        </ComLoading>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 15,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  scrollView: {
    marginTop: 20,
  },
});