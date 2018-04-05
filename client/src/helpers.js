export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function calcBedrooms(bedrooms) {
  if (bedrooms === 0) {
    return "Studio";
  } else if (bedrooms === 1) {
    return "1 Bedroom";
  } else {
    return bedrooms + " Bedrooms";
  }
}

export function formatDate(date) {
  var monthToString = monthNum => {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthNames[monthNum - 1];
  };
  var month = date.toString().slice(0, 2);
  var year = date.toString().slice(4, 8);
  return monthToString(month) + " " + year;
}
