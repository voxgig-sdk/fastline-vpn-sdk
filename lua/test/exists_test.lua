-- FastlineVpn SDK exists test

local sdk = require("fastline-vpn_sdk")

describe("FastlineVpnSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
