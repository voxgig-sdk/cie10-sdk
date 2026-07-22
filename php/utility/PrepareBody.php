<?php
declare(strict_types=1);

// Cie10 SDK utility: prepare_body

class Cie10PrepareBody
{
    public static function call(Cie10Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
