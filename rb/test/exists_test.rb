# Cie10 SDK exists test

require "minitest/autorun"
require_relative "../Cie10_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Cie10SDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
