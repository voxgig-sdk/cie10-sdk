"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Cie10',
        slug: "cie10",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://notasalud.com",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            cie_10: {},
        }
    };
    entity = {
        "cie_10": {
            "fields": [
                {
                    "name": "codigo",
                    "req": true,
                    "short": "CIE-10 code or code range.",
                    "type": "`$STRING`"
                },
                {
                    "name": "nivel",
                    "req": true,
                    "short": "Hierarchy level returned by NotaSalud.",
                    "type": "`$INTEGER`"
                },
                {
                    "name": "nombre",
                    "req": true,
                    "short": "Spanish display name.",
                    "type": "`$STRING`"
                },
                {
                    "name": "url",
                    "req": true,
                    "short": "Relative NotaSalud reference page URL for this code or range.",
                    "type": "`$STRING`"
                }
            ],
            "name": "cie_10",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": 3,
                                        "kind": "query",
                                        "name": "limit",
                                        "orig": "limit",
                                        "type": "`$INTEGER`"
                                    },
                                    {
                                        "example": "diabetes",
                                        "kind": "query",
                                        "name": "q",
                                        "orig": "q",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/buscar/cie-10",
                            "segments": [
                                {
                                    "lit": "buscar"
                                },
                                {
                                    "lit": "cie-10"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "limit",
                                    "q"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.results`"
                            },
                            "parts": [
                                "buscar",
                                "cie-10"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map