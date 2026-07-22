# FastlineVpn SDK feature factory

from feature.base_feature import FastlineVpnBaseFeature
from feature.test_feature import FastlineVpnTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FastlineVpnBaseFeature(),
        "test": lambda: FastlineVpnTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
