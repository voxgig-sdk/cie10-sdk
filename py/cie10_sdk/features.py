# Cie10 SDK feature factory

from cie10_sdk.feature.base_feature import Cie10BaseFeature
from cie10_sdk.feature.ratelimit_feature import Cie10RatelimitFeature
from cie10_sdk.feature.retry_feature import Cie10RetryFeature
from cie10_sdk.feature.test_feature import Cie10TestFeature
from cie10_sdk.feature.timeout_feature import Cie10TimeoutFeature


_FEATURES = {
    "base": lambda: Cie10BaseFeature(),
    "ratelimit": lambda: Cie10RatelimitFeature(),
    "retry": lambda: Cie10RetryFeature(),
    "test": lambda: Cie10TestFeature(),
    "timeout": lambda: Cie10TimeoutFeature(),
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
