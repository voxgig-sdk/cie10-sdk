# Cie10 SDK feature factory

from cie10_sdk.feature.base_feature import Cie10BaseFeature
from cie10_sdk.feature.test_feature import Cie10TestFeature


def _make_feature(name):
    features = {
        "base": lambda: Cie10BaseFeature(),
        "test": lambda: Cie10TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
