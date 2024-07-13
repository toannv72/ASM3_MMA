import React, { useState } from "react";
import { Image, View } from "react-native";
import Nav1 from "../../../assets/icon/Nav1_1.png";
import Nav2 from "../../../assets/icon/Nav2_1.png";
import Nav5 from "../../../assets/icon/Nav5_1.png";

import Nav1_1 from "../../../assets/icon/Nav1_2.png";
import Nav2_1 from "../../../assets/icon/Nav2_2.png";
import Nav5_1 from "../../../assets/icon/Nav5_2.png";
import { useEffect } from "react";

export default function ComIcon({ icon }) {
  const [navBar, setNavBar] = useState(null);

  useEffect(() => {
    let bar;
    switch (icon) {
      case "Nav1":
        setNavBar(Nav1_1);
        break;
      case "Nav2":
        setNavBar(Nav2_1);
        break;
      case "Nav5":
        setNavBar(Nav5_1);
        break;
      case "Nav1_1":
        setNavBar(Nav1);
        break;
      case "Nav2_1":
        setNavBar(Nav2);
        break;
      case "Nav5_1":
        setNavBar(Nav5);
        break;

      default:
        break;
    }
    return () => {
      setNavBar(bar);
    };
  }, []);
  return (
    <View>
      <Image
        source={navBar}
        style={{ width: 40, height: 40, objectFit: "fill" }}
      />
    </View>
  );
}
