import React, { useEffect } from "react";
import { LogBox } from "react-native";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/firebase";

LogBox.ignoreAllLogs();


export default function App() {

  return <Navigation />;
}


