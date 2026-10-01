-- Cie10 SDK error

local json = require("dkjson")

local Cie10Error = {}
Cie10Error.__index = Cie10Error

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function Cie10Error.new(code, msg, ctx)
  local self = setmetatable({}, Cie10Error)
  self.is_sdk_error = true
  self.sdk = "Cie10"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function Cie10Error:context()
  return CONTEXT[self]
end


function Cie10Error:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function Cie10Error:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function Cie10Error:to_json()
  return json.encode(self:to_table())
end


function Cie10Error:__tostring()
  return self.msg
end


function Cie10Error.__tojson(self)
  return self:to_json()
end


return Cie10Error
