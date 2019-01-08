import {isNull, isNullOrUndefined} from "util";

export function sortByName(elements){
  elements.sort(function(a, b) {
    return a.name.localeCompare(b.name);
  });
  return elements;
}
export function sortByDistance(elements,baseLocation){
  console.log(elements);
  elements.sort(function(a,b) {
    return getDistanceBetweenPoints(a.primaryLocation,baseLocation) - getDistanceBetweenPoints(b.primaryLocation,baseLocation)
  });
  console.log(elements);
  return elements;
}
function getDistanceBetweenPoints(location,baseLocation) {
  if (isNullOrUndefined(location)) {
    return Number.MAX_SAFE_INTEGER;
    //TODO Figure out how we want to handle organization without a location
  }
  let baseLongitude = baseLocation[0];
  let baseLatitude = baseLocation[1];
  return 1;
}
