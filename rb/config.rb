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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "nivel",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nombre",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "cie_10",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 3,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => "diabetes",
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/buscar/cie-10",
                  "parts" => [
                    "buscar",
                    "cie-10",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "q",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
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
