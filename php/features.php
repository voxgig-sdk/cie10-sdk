<?php
declare(strict_types=1);

// Cie10 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class Cie10Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new Cie10BaseFeature();
            case "test":
                return new Cie10TestFeature();
            default:
                return new Cie10BaseFeature();
        }
    }
}
