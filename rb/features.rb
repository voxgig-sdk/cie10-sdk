# Cie10 SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Cie10Features
  def self.make_feature(name)
    case name
    when "base"
      Cie10BaseFeature.new
    when "test"
      Cie10TestFeature.new
    else
      Cie10BaseFeature.new
    end
  end
end
