<?php
declare(strict_types=1);

// Cie10 SDK utility: result_body

class Cie10ResultBody
{
    public static function call(Cie10Context $ctx): ?Cie10Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
