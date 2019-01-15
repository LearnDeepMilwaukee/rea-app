describe('organizationCatalog', function () {
  before(function () {
    browser.url('http://0.0.0.0:3000/organizationCatalog');
    browser.setValue('#usernameField', "connor");
    browser.setValue('#passwordField', "iuc4ur42");
    browser.click("#loginButton");
    browser.waitForVisible("#baseElement");
  });

  it('Orgs matching name filter are displayed', function () {
    var originalHtml = browser.getHTML("#cardContainer");
    browser.setValue('#orgName', "Library\uE007");

    browser.waitForVisible("#baseElement");
    var filteredHtml = browser.getHTML("#cardContainer");

    expect(filteredHtml).to.not.equal(originalHtml);
  });
});
