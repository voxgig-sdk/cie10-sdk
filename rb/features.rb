# Cie10 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Cie10Features
  def self.make_feature(name)
    case name
    when "base"
      Cie10BaseFeature.new
    when "ratelimit"
      Cie10RatelimitFeature.new
    when "retry"
      Cie10RetryFeature.new
    when "test"
      Cie10TestFeature.new
    when "timeout"
      Cie10TimeoutFeature.new
    else
      Cie10BaseFeature.new
    end
  end
end
