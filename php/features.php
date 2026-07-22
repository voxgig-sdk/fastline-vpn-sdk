<?php
declare(strict_types=1);

// FastlineVpn SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FastlineVpnFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FastlineVpnBaseFeature();
            case "test":
                return new FastlineVpnTestFeature();
            default:
                return new FastlineVpnBaseFeature();
        }
    }
}
