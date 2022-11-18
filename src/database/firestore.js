import { firestore } from "../utils/firebase";
import { doc, addDoc, getDoc, collection, getDocs } from "firebase/firestore";
export const getTest = async () => {
  const docRef = doc(firestore, "test", "test");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("Cannot access doc");
  }
};

export const addDeviceFirestore = async (data) => {
  console.log(data);
  // Add a new document in collection "cities"
  return await addDoc(collection(firestore, "devices"), {
    name: data.name,
    battery_size: Number(data.batterySize),
    charger_output_V: Number(data.chargerOutputV),
    charger_output_A: Number(data.chargerOutputA),
    charge_days: Number(data.chargeDays),
  });
};

export const getDevices = async () => {
  const querySnapshot = await getDocs(collection(firestore, "devices"));
  let devices = [];
  querySnapshot.forEach((doc) => {
    devices.push(doc.data());
  });

  return devices;
};
