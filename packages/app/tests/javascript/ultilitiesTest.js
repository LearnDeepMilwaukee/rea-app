"use strict";
const utilities = require("../../pages/Organization/utilities.js");
const chai = require('chai');
const should = require('chai').should();
describe('sortingByName', function () {

  it('Should return list in alphabetical order', function () {

    var org1 = {name: "A"};
    var org2 = {name: "B"};
    var org3 = {name: "C"};
    var orgArray = [org2, org3, org1];
    var returnValue = utilities.sortByName(orgArray);
    returnValue.length.should.equal(3);
    returnValue[0].name.should.equal("A");
    returnValue[1].name.should.equal("B");
    returnValue[2].name.should.equal("C");
  });
});
describe('Testing distance', function () {

  it('Should return correct distance', function () {
    var org1 = {latitude: 10, longitude: 10};
    var org2 = {latitude: 20, longitude: 20};
    var distance = utilities.getDistanceBetweenPoints(org1, org2);
    distance.should.be.below(960);
    distance.should.be.above(959);
  });
  it('Sorting with Valid distances', function () {
    var org1 = {name: "org1", primaryLocation: {latitude: 10, longitude: 10}};
    var org2 = {name: "org2", primaryLocation: {latitude: 11, longitude: 11}};
    var org3 = {name: "org3", primaryLocation: {latitude: 12, longitude: 12}};
    var org4 = {name: "org4", primaryLocation: {latitude: 13, longitude: 13}};
    var reference = {latitude: 20, longitude: 20};
    var orderedArray = utilities.sortByDistance([org1, org2, org3, org4], reference);
    orderedArray.length.should.equal(4);
    orderedArray[0].should.equal(org4);
    orderedArray[1].should.equal(org3);
    orderedArray[2].should.equal(org2);
    orderedArray[3].should.equal(org1);
  });
  it('Sorting with invalid distances', function () {
    var org1 = {name: "org1", primaryLocation: {latitude: 10, longitude: 10}};
    var org2 = {name: "org2", primaryLocation: {latitude: 11, longitude: 11}};
    var org3 = {name: "org3", primaryLocation: null};
    var reference = {latitude: 20, longitude: 20};
    var orderedArray = utilities.sortByDistance([org1, org2, org3], reference);
    orderedArray.length.should.equal(3);
    orderedArray[0].should.equal(org2);
    orderedArray[1].should.equal(org1);
    orderedArray[2].should.equal(org3);
  });
});
describe('Testing filtering', function () {
  it('Should correctly filter by type', function () {
    var org1 = {type: "school"};
    var org2 = {type: "church"};
    var org3 = {type: "school"};
    var filteredArray = utilities.filterByType([org1, org2, org3], "school");
    filteredArray.length.should.equal(2);
    filteredArray[0].should.equal(org1);
    filteredArray[1].should.equal(org3);
  });
  it('Filter by distance', function () {
    var org1 = {name: "org1", primaryLocation: {latitude: 10, longitude: 10}};
    var org2 = {name: "org2", primaryLocation: {latitude: 11, longitude: 11}};
    var reference = {latitude: 20, longitude: 20};
    var orderedArray = utilities.filterByDistance([org1, org2], 864, reference);
    orderedArray.length.should.equal(1);
    orderedArray[0].should.equal(org2);
  });
});



