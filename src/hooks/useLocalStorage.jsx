import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export const useStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  const loadStoredValue = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setStoredValue(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadStoredValue();
  }, [key]); // Chỉ chạy lại khi key thay đổi

  const updateStoredValue = async (value, callback) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setStoredValue(value);
      if (callback) callback(); // Gọi callback sau khi cập nhật xong
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, updateStoredValue, loadStoredValue]; // Loại bỏ checkAsyncStorage
};