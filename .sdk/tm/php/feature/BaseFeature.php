<?php
declare(strict_types=1);

// FastlineVpn SDK base feature

class FastlineVpnBaseFeature
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

    public function init(FastlineVpnContext $ctx, array $options): void {}
    public function PostConstruct(FastlineVpnContext $ctx): void {}
    public function PostConstructEntity(FastlineVpnContext $ctx): void {}
    public function SetData(FastlineVpnContext $ctx): void {}
    public function GetData(FastlineVpnContext $ctx): void {}
    public function GetMatch(FastlineVpnContext $ctx): void {}
    public function SetMatch(FastlineVpnContext $ctx): void {}
    public function PrePoint(FastlineVpnContext $ctx): void {}
    public function PreSpec(FastlineVpnContext $ctx): void {}
    public function PreRequest(FastlineVpnContext $ctx): void {}
    public function PreResponse(FastlineVpnContext $ctx): void {}
    public function PreResult(FastlineVpnContext $ctx): void {}
    public function PreDone(FastlineVpnContext $ctx): void {}
    public function PreUnexpected(FastlineVpnContext $ctx): void {}
}
