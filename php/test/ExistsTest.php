<?php
declare(strict_types=1);

// FastlineVpn SDK exists test

require_once __DIR__ . '/../fastlinevpn_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FastlineVpnSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
