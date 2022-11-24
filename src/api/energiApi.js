import axios from "axios";
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
let yyyy = today.getFullYear();

let tomorrow = String(today.getDate() + 1).padStart(2, "0");
let startDate = yyyy + "-" + mm + "-" + dd;
let endDate = yyyy + "-" + mm + "-" + tomorrow;

const client = axios.create({
  baseURL: `https://api.energidataservice.dk/dataset/Elspotprices?offset=0&start=${startDate}T00:00&end=${endDate}T00:00&filter=%7B%22PriceArea%22:[%22DK1%22]%7D&sort=HourDK%20ASC&timezone=dk`,
  withCredentials: false,
});

export default client;
