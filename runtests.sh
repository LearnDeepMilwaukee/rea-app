#!/bin/bash
echo "Make sure rea-app and the database are started, otherwise the WebdriverIO tests will fail"
echo "WebdriverIO tests"
../node_modules/.bin/wdio ./wdio.conf.js
echo "***********************************************************************"
echo "Javascript testing"
mocha "./packages/app/tests/javascript/*.js"
echo "***********************************************************************"
