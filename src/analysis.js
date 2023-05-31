const { getTrips, getDriver} = require('api');

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  let allTrips = await getTrips()
  let result = {};
  let noOfCashTrips = 0
  let noOfNonCashTrips =0
  let billedTotal = 0
  let cashBilledTotal = 0
  let nonCashBilledTotal = 0
  let driverId = []
  let driverTrips = {}
  let driverEarnings = {}
  let mostTripId = "";
for (let i = 0; i< allTrips.length; i++){
    let element = allTrips[i]
    driverId.push(element.driverID)
    element.billedAmount = Number(element.billedAmount.toString().replace(/,/g, ""))
    if (element.isCash){
      noOfCashTrips++
      cashBilledTotal += element.billedAmount
    } else if (!element.isCash){
        noOfNonCashTrips++
        nonCashBilledTotal += element.billedAmount
    }
    billedTotal = (cashBilledTotal + nonCashBilledTotal).toFixed(2)

    // console.log(element.billedAmount)
    if (!driverTrips.hasOwnProperty(element.driverID)){
       driverTrips[element.driverID] = 1
    } else {
      driverTrips[element.driverID] ++
    }

    if (!driverEarnings.hasOwnProperty(element.driverID)){
      driverEarnings[element.driverID] = element.billedAmount
    }
}
driverId = [... new Set(driverId)]
let keys = Object.values(driverTrips)
let highestTrip = Math.max(...keys)

for (let k in driverTrips){
  if (driverTrips[k] === highestTrip){
    mostTripId += k
    break;
  }
}
let mostTripsByDriver = {}
let driverWithMostTrips = await getDriver(mostTripId)
 mostTripsByDriver['name'] = driverWithMostTrips.name;
 mostTripsByDriver['email'] = driverWithMostTrips.email;
 mostTripsByDriver['phone'] = driverWithMostTrips.phone;
 mostTripsByDriver['noOfTrips'] = highestTrip;
 mostTripsByDriver['totalAmountEarned'] = driverEarnings[mostTripId];

console.log(driverWithMostTrips);


}
analysis()
module.exports = analysis; 
