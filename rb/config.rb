# Cie10 SDK configuration

module Cie10Config
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "Cie10",
        "slug" => "cie10",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://notasalud.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "cie_10" => {},
        },
      },
      "entity" => {
        "cie_10" => {
          "fields" => [
            {
              "name" => "codigo",
              "title" => "Codigo",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "CIE-10 code or code range.",
            },
            {
              "name" => "nivel",
              "title" => "Nivel",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Hierarchy level returned by NotaSalud.",
            },
            {
              "name" => "nombre",
              "title" => "Nombre",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Spanish display name.",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Relative NotaSalud reference page URL for this code or range.",
            },
          ],
          "name" => "cie_10",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/buscar/cie-10",
                  "segments" => [
                    {
                      "lit" => "buscar",
                    },
                    {
                      "lit" => "cie-10",
                    },
                  ],
                  "parts" => [
                    "buscar",
                    "cie-10",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 3,
                      },
                      {
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "diabetes",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "limit",
                      "q",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    Cie10Features.make_feature(name)
  end
end
