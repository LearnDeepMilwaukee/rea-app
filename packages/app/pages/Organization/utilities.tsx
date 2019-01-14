"use strict";
import {isNullOrUndefined} from "util";

export function sortByName(elements) {
  elements.sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
  return elements;
}

export function sortByDistance(elements, baseLocation) {
  elements.sort(function (a, b) {
    return getDistanceBetweenPoints(a.primaryLocation, baseLocation) - getDistanceBetweenPoints(b.primaryLocation, baseLocation)
  });
  return elements;
}

export function getDistanceBetweenPoints(location, baseLocation) {
  if (isNullOrUndefined(location)) {
    return Number.MAX_SAFE_INTEGER;
  }
//Code below this, including the deg2rad method were taken from the following location, with the credit to them:
//https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula/11178145
  let R = 3959; // Radius of the earth in km
  let dLat = deg2rad(location.latitude - baseLocation.latitude);  // deg2rad below
  let dLon = deg2rad(location.longitude - baseLocation.longitude);
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(location.latitude)) * Math.cos(deg2rad(baseLocation.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  return Math.abs(R * c);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

export function filterByType(elements, type) {
  return elements.filter(function (element) {
    return element.type === type;
  });
}

export function filterByDistance(elements, maxDistance, baseLocation) {
  let nullLocationCounter = 0;
  elements.forEach(function (element) {
    nullLocationCounter += (isNullOrUndefined(element.primaryLocation) ? 1 : 0);
  });
  if (nullLocationCounter > 0) {
    console.log("There were " + nullLocationCounter + " Organizations without a location");
  }
  return elements.filter(function (element) {
    return getDistanceBetweenPoints(element.primaryLocation, baseLocation) < maxDistance;
  })
}
