<?php
declare(strict_types=1);

// Cie10 SDK configuration

class Cie10Config
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Cie10",
                "slug" => "cie10",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://notasalud.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "cie_10" => [],
                ],
            ],
            "entity" => [
        'cie_10' => [
          'fields' => [
            [
              'name' => 'codigo',
              'req' => true,
              'short' => 'CIE-10 code or code range.',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nivel',
              'req' => true,
              'short' => 'Hierarchy level returned by NotaSalud.',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'nombre',
              'req' => true,
              'short' => 'Spanish display name.',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'req' => true,
              'short' => 'Relative NotaSalud reference page URL for this code or range.',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'cie_10',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 3,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'diabetes',
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/buscar/cie-10',
                  'segments' => [
                    [
                      'lit' => 'buscar',
                    ],
                    [
                      'lit' => 'cie-10',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'limit',
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'buscar',
                    'cie-10',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return Cie10Features::make_feature($name);
    }
}
