<?php
declare(strict_types=1);

// FastlineVpn SDK utility: prepare_body

class FastlineVpnPrepareBody
{
    public static function call(FastlineVpnContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
