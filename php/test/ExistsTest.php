<?php
declare(strict_types=1);

// Cie10 SDK exists test

require_once __DIR__ . '/../cie10_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = Cie10SDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
