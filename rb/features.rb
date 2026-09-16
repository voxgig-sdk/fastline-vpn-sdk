# FastlineVpn SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FastlineVpnFeatures
  def self.make_feature(name)
    case name
    when "base"
      FastlineVpnBaseFeature.new
    when "ratelimit"
      FastlineVpnRatelimitFeature.new
    when "retry"
      FastlineVpnRetryFeature.new
    when "test"
      FastlineVpnTestFeature.new
    when "timeout"
      FastlineVpnTimeoutFeature.new
    else
      FastlineVpnBaseFeature.new
    end
  end
end
