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
  return await addDoc(collection(firestore, "devices"), {
    name: data.name,
    charge_time: Number(data.chargeTime),
    charge_days: Number(data.chargeDays),
  });
};

export const addChargingPlan = async (data) => {
  const socketRef = firestore.collection("charging_plan").doc(data.socket);

  return await socketRef.update({
    charge_time: data.chargePlan,
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
export const getChargingPlan = async () => {
  const querySnapshot = await getDocs(collection(firestore, "charging_plan"));
  let plan = [];
  querySnapshot.forEach((doc) => {
    plan.push(doc.data());
  });

  return plan;
};
