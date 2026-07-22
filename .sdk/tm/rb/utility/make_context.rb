# FastlineVpn SDK utility: make_context
require_relative '../core/context'
module FastlineVpnUtilities
  MakeContext = ->(ctxmap, basectx) {
    FastlineVpnContext.new(ctxmap, basectx)
  }
end
