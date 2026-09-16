# FastlineVpn SDK feature factory

from fastlinevpn_sdk.feature.base_feature import FastlineVpnBaseFeature
from fastlinevpn_sdk.feature.ratelimit_feature import FastlineVpnRatelimitFeature
from fastlinevpn_sdk.feature.retry_feature import FastlineVpnRetryFeature
from fastlinevpn_sdk.feature.test_feature import FastlineVpnTestFeature
from fastlinevpn_sdk.feature.timeout_feature import FastlineVpnTimeoutFeature


_FEATURES = {
    "base": lambda: FastlineVpnBaseFeature(),
    "ratelimit": lambda: FastlineVpnRatelimitFeature(),
    "retry": lambda: FastlineVpnRetryFeature(),
    "test": lambda: FastlineVpnTestFeature(),
    "timeout": lambda: FastlineVpnTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
