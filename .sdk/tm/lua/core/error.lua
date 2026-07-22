-- FastlineVpn SDK error

local FastlineVpnError = {}
FastlineVpnError.__index = FastlineVpnError


function FastlineVpnError.new(code, msg, ctx)
  local self = setmetatable({}, FastlineVpnError)
  self.is_sdk_error = true
  self.sdk = "FastlineVpn"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FastlineVpnError:error()
  return self.msg
end


function FastlineVpnError:__tostring()
  return self.msg
end


return FastlineVpnError
