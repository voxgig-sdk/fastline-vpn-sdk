<?php
declare(strict_types=1);

// FastlineVpn SDK utility: result_headers

class FastlineVpnResultHeaders
{
    public static function call(FastlineVpnContext $ctx): ?FastlineVpnResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
