import { getDateYYYYMMDDHHMMSS } from "./dateParser";
/*
const prices = [
  { SpotPriceDKK: 1493, HourDK: "2022-11-20T00:00:00" },
  { SpotPriceDKK: 1333, HourDK: "2022-11-20T01:00:00" },
  { SpotPriceDKK: 1360, HourDK: "2022-11-20T02:00:00" },
  { SpotPriceDKK: 1339, HourDK: "2022-11-20T03:00:00" },
  { SpotPriceDKK: 1266, HourDK: "2022-11-20T04:00:00" },
  { SpotPriceDKK: 1308, HourDK: "2022-11-20T05:00:00" },
  { SpotPriceDKK: 1312, HourDK: "2022-11-20T06:00:00" },
  { SpotPriceDKK: 1444, HourDK: "2022-11-20T07:00:00" },
  { SpotPriceDKK: 1487, HourDK: "2022-11-20T08:00:00" },
  { SpotPriceDKK: 1599, HourDK: "2022-11-20T09:00:00" },
  { SpotPriceDKK: 1577, HourDK: "2022-11-20T10:00:00" },
  { SpotPriceDKK: 1621, HourDK: "2022-11-20T11:00:00" },
  { SpotPriceDKK: 1562, HourDK: "2022-11-20T12:00:00" },
  { SpotPriceDKK: 1478, HourDK: "2022-11-20T13:00:00" },
  { SpotPriceDKK: 1525, HourDK: "2022-11-20T14:00:00" },
  { SpotPriceDKK: 1670, HourDK: "2022-11-20T15:00:00" },
  { SpotPriceDKK: 1799, HourDK: "2022-11-20T16:00:00" },
  { SpotPriceDKK: 1988, HourDK: "2022-11-20T17:00:00" },
  { SpotPriceDKK: 430, HourDK: "2022-11-20T18:00:00" },
  { SpotPriceDKK: 1981, HourDK: "2022-11-20T19:00:00" },
  { SpotPriceDKK: 1821, HourDK: "2022-11-20T20:00:00" },
  { SpotPriceDKK: 1599, HourDK: "2022-11-20T21:00:00" },
  { SpotPriceDKK: 1099, HourDK: "2022-11-20T22:00:00" },
  { SpotPriceDKK: 1199, HourDK: "2022-11-20T23:00:00" },
];*/
//device object:charge_days(frequency of charging-number),charge_time(minutes-number),name(string)
export const getChargeTimes = (
  device,
  timeToCharge,
  prices,
  currentPercentage
) => {
  const timeToChargeMinutes = timeToCharge * 60;
  const now = new Date();
  const currentH = now.getHours();
  //slice available time array to charge phone from current hour to available chargint ime period
  //we can now work with this array of prices
  //sort array from lowest to highest electricity price
  let slicedSorted = prices.slice(
    currentH,
    currentH + Number.parseInt(timeToCharge)
  );
  slicedSorted.sort(sortElPrices);
  let chargingSlotMinutes = [];
  let deviceNeedCharge = ((100 - currentPercentage) / 100) * device.charge_time;
  //user have more time to charge phone than it actually requires
  if (deviceNeedCharge < timeToChargeMinutes) {
    //variable to estimate actual time blocks to use for charging
    //if time is 00:31 and phone needs to be charged 100 minutes result is 2 BECAUSE 2 block = 120 minutes
    let deviceChargeH = Math.floor(deviceNeedCharge / 60);
    if (deviceChargeH % 60 !== 0) {
      deviceChargeH++;
    }
    if (deviceNeedCharge < 60 && deviceNeedCharge > 0) {
      console.log();
      const date = new Date(slicedSorted[0].HourDK);
      chargingSlotMinutes.push({
        charge_time: deviceNeedCharge,
        date: getDateYYYYMMDDHHMMSS(date),
      });
    }
    for (let count = 0; count < deviceChargeH; count++) {
      const date = new Date(slicedSorted[count].HourDK);
      if (deviceNeedCharge - 60 > 0) {
        chargingSlotMinutes.push({
          charge_time: 60,
          date: getDateYYYYMMDDHHMMSS(date),
        });
        deviceNeedCharge = deviceNeedCharge - 60;
      } else
        chargingSlotMinutes.push({
          charge_time: deviceNeedCharge,
          date: getDateYYYYMMDDHHMMSS(date),
        });
    }
  }
  //charge phone right away
  else {
    let counter = 0;
    for (counter; counter < timeToCharge; counter++) {
      const date = new Date(prices[currentH + counter].HourDK);
      if (deviceNeedCharge - 60 > 0) {
        chargingSlotMinutes.push({
          charge_time: 60,
          date: getDateYYYYMMDDHHMMSS(date),
        });
        deviceNeedCharge = deviceNeedCharge - 60;
      } else
        chargingSlotMinutes.push({
          charge_time: deviceNeedCharge,
          date: getDateYYYYMMDDHHMMSS(date),
        });
    }
    if (now.getMinutes() !== 0) {
      const date = new Date(prices[currentH + counter].HourDK);
      chargingSlotMinutes.push({
        charge_time: now.getMinutes(),
        date: getDateYYYYMMDDHHMMSS(date),
      });
    }
  }
  return chargingSlotMinutes;
};

const sortElPrices = (a, b) => {
  if (a.SpotPriceDKK < b.SpotPriceDKK) {
    return -1;
  }
  if (a.SpotPriceDKK > b.SpotPriceDKK) {
    return 1;
  }
  return 0;
};
