# Cie10 SDK utility: make_context
require_relative '../core/context'
module Cie10Utilities
  MakeContext = ->(ctxmap, basectx) {
    Cie10Context.new(ctxmap, basectx)
  }
end
