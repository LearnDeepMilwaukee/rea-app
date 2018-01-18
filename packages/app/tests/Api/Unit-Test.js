import React from 'react';
import { createRenderer } from 'react-dom/test-utils';
import createComponent from 'react-unit';
import tape from 'tape';
import addAssertions from 'extend-tape';
import jsxEquals from 'tape-jsx-equals';
const test = addAssertions(tape, {jsxEquals});

// Component to test
import {Unit, UnitList, GetSingleUnit}  from '../../pages/Api/unit';


test('UnitDisplaysUnit', (t) => {

const renderer = createRenderer();
renderer.render(<Unit id="1" name='test' symbol='!'/>);
const result = renderer.getRenderOutput();
t.jsxEquals(result, <div>
  <div>id: 1</div>
  <div>name: test</div>
  <div>symbol: !</div>
  <br/>
</div>);

t.end();
});
//change to file
