<?php
declare(strict_types=1);

// Cie10 SDK base feature

class Cie10BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(Cie10Context $ctx, array $options): void {}
    public function PostConstruct(Cie10Context $ctx): void {}
    public function PostConstructEntity(Cie10Context $ctx): void {}
    public function SetData(Cie10Context $ctx): void {}
    public function GetData(Cie10Context $ctx): void {}
    public function GetMatch(Cie10Context $ctx): void {}
    public function SetMatch(Cie10Context $ctx): void {}
    public function PrePoint(Cie10Context $ctx): void {}
    public function PreSpec(Cie10Context $ctx): void {}
    public function PreRequest(Cie10Context $ctx): void {}
    public function PreResponse(Cie10Context $ctx): void {}
    public function PreResult(Cie10Context $ctx): void {}
    public function PreDone(Cie10Context $ctx): void {}
    public function PreUnexpected(Cie10Context $ctx): void {}
}
