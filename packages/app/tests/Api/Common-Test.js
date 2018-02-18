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

  array = null;

  result = concatArray(array);

  t.equal(result, "none");
  t.end();
});

test("emptyArrayDisplaysNone", (t) => {

  array = [];

  result = concatArray(array);

  t.equal(result, "none");
  t.end();
});

test("oneElementArrayDisplaysOneElement", (t) => {

  array = [1];

  result = concatArray(array);

  t.equal(result, "1");
  t.end();
});

test("ThreeElementArrayDisplaysThreeElements", (t) => {

  array = [1, 7, 20];

  result = concatArray(array);

  t.equal(result, "1, 7, 20");
  t.end();
});
