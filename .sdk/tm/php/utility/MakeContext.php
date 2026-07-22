<?php
declare(strict_types=1);

// FastlineVpn SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FastlineVpnMakeContext
{
    public static function call(array $ctxmap, ?FastlineVpnContext $basectx): FastlineVpnContext
    {
        return new FastlineVpnContext($ctxmap, $basectx);
    }
}
