# ProjectName SDK exists test

import pytest
from fastlinevpn_sdk import FastlineVpnSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FastlineVpnSDK.test(None, None)
        assert testsdk is not None
