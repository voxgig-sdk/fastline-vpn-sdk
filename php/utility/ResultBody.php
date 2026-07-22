<?php
declare(strict_types=1);

// FastlineVpn SDK utility: result_body

class FastlineVpnResultBody
{
    public static function call(FastlineVpnContext $ctx): ?FastlineVpnResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
