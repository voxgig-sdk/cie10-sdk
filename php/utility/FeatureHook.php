<?php
declare(strict_types=1);

// Cie10 SDK utility: feature_hook

class Cie10FeatureHook
{
    public static function call(Cie10Context $ctx, string $name): void
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
