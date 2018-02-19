/**
 * Test file for the common elements of
 *
 * @package: REA app
 * @author:  Steven Fontaine <fontainesw@msoe.edu>
 * @since:   2019-01-18
 */

import React from "react";
import { createRenderer } from "react-dom/test-utils";
import tape from "tape";
import addAssertions from "extend-tape";
import jsxEquals from "tape-jsx-equals";
const test = addAssertions(tape, {jsxEquals});

import { concatArray }  from "../../pages/Api/common.js";

test("nullArrayDisplaysNone", (t) => {

  let array = null;

  let result = concatArray(array);

  t.equal(result, "none");
  t.end();
});

test("emptyArrayDisplaysNone", (t) => {

  let array = [];

  let result = concatArray(array);

  t.equal(result, "none");
  t.end();
});

test("oneElementArrayDisplaysOneElement", (t) => {

  let one = {id: 1};
  let array = [one];

  let result = concatArray(array);

  t.equal(result, 1);
  t.end();
});

test("ThreeElementArrayDisplaysThreeElements", (t) => {

  let one = {id: 1};
  let seven = {id: 7};
  let twenty = {id: 20};
  let array = [one, seven, twenty];

  let result = concatArray(array);

  t.equal(result, "1, 7, 20");
  t.end();
});
