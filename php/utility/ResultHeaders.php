<?php
declare(strict_types=1);

// Cie10 SDK utility: result_headers

class Cie10ResultHeaders
{
    public static function call(Cie10Context $ctx): ?Cie10Result
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
