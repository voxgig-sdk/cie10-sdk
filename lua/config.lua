-- Cie10 SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Cie10",
      slug = "cie10",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://notasalud.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["cie_10"] = {},
      },
    },
    entity = {
      ["cie_10"] = {
        ["fields"] = {
          {
            ["name"] = "codigo",
            ["req"] = true,
            ["short"] = "CIE-10 code or code range.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "nivel",
            ["req"] = true,
            ["short"] = "Hierarchy level returned by NotaSalud.",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "nombre",
            ["req"] = true,
            ["short"] = "Spanish display name.",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["req"] = true,
            ["short"] = "Relative NotaSalud reference page URL for this code or range.",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "cie_10",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 3,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "diabetes",
                      ["kind"] = "query",
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/buscar/cie-10",
                ["parts"] = {
                  "buscar",
                  "cie-10",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "q",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
