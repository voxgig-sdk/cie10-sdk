-- Cie10 SDK error

local Cie10Error = {}
Cie10Error.__index = Cie10Error


function Cie10Error.new(code, msg, ctx)
  local self = setmetatable({}, Cie10Error)
  self.is_sdk_error = true
  self.sdk = "Cie10"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function Cie10Error:error()
  return self.msg
end


function Cie10Error:__tostring()
  return self.msg
end


return Cie10Error
