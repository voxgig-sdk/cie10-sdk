<?php
declare(strict_types=1);

// Cie10 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class Cie10MakeContext
{
    public static function call(array $ctxmap, ?Cie10Context $basectx): Cie10Context
    {
        return new Cie10Context($ctxmap, $basectx);
    }
}
