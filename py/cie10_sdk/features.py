# Cie10 SDK feature factory

from cie10_sdk.feature.base_feature import Cie10BaseFeature
from cie10_sdk.feature.test_feature import Cie10TestFeature


_FEATURES = {
    "base": lambda: Cie10BaseFeature(),
    "test": lambda: Cie10TestFeature(),
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
