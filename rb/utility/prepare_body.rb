# Cie10 SDK utility: prepare_body
require_relative 'media'
module Cie10Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return Cie10Utilities.raw_body(ctx.reqdata) if Cie10Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
