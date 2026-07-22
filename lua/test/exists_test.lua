-- Cie10 SDK exists test

local sdk = require("cie10_sdk")

describe("Cie10SDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
