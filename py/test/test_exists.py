# ProjectName SDK exists test

import pytest
from cie10_sdk import Cie10SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = Cie10SDK.test(None, None)
        assert testsdk is not None
