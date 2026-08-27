<?php
declare(strict_types=1);

// Typed models for the Cie10 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cie10 entity data model. */
class Cie10
{
    public string $codigo;
    public int $nivel;
    public string $nombre;
    public string $url;
}

/** Request payload for Cie10#list. */
class Cie10ListMatch
{
    public ?int $limit = null;
    public ?string $q = null;
}

