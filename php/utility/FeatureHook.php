<?php
declare(strict_types=1);

// FastlineVpn SDK utility: feature_hook

class FastlineVpnFeatureHook
{
    public static function call(FastlineVpnContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
