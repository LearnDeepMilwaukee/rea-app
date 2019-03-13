describe('organizationRegistration', function () {
  before(function () {
    browser.url('http://0.0.0.0:3000/register/organization');
    browser.setValue('#usernameField', "connor");
    browser.setValue('#passwordField', "iuc4ur42");
    browser.click("#loginButton");
  });
  beforeEach(function () {
    browser.url('http://0.0.0.0:3000/register/organization');
    browser.waitForVisible("#baseElement");
  });
  it('Should alert the user that required no fields are not filled in', function () {
    // setup();

    browser.click("#submit");
    var alertText = browser.alertText();
    browser.alertDismiss();
    alertText.should.equal("Please enter valid data into all required fields!");
  });


  it('Verifying the OrgType dropdown is correctly rendered', function () {
    var NUMBER_OF_ORG_TYPES = 8;
    var dropdownHTML = browser.getHTML("#orgTypeDropdown");
    var count = (dropdownHTML.match(/<\/option>/g || []).length);
    expect(count).to.be.at.least(NUMBER_OF_ORG_TYPES);
  });

  it('Verifying that clicking on OrgType dropdown selects the element', function () {
    browser.click("#orgTypeDropdown");
    browser.click("#School");
    var dropdownHTML = browser.getValue("#orgTypeDropdown");
    dropdownHTML.should.equal("School");
  });

  it('Verifying cancel button brings us to the base page', function () {
    browser.click("#cancelButton");
    browser.getUrl().should.equal("http://0.0.0.0:3000/")
  })
});


