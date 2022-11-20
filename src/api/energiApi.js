import axios from "axios";
var testy = "Elspotprices";
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();
let minute = today.getHours();
let hour = today.getMinutes();
let startDate = yyyy + "-" + mm + "-" + (dd - 2) + "T" + hour + ":" + minute;
let endDate = yyyy + "-" + mm + "-" + (dd - 1) + "T" + hour + ":" + minute;
const client = axios.create({
  baseURL: `https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=2022-11-18T00:00&end=2022-11-20T00:00&filter=%7B%22PriceArea%22:[%22DK1%22]%7D&sort=HourDK%20ASC&timezone=dk`,
  withCredentials: false,
});

export default client;
