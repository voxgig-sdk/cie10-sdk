"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "cie_10",
        "accessor": "Cie10",
        "op": "list",
        "method": "GET",
        "path": "/buscar/cie-10",
        "args": [],
        "select": {
            "limit": 3,
            "q": "diabetes"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "q",
            "limit"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "q",
                "wire": "q"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "query": "diabetes",
            "total": 3,
            "results": [
                {
                    "codigo": "E10",
                    "nombre": "Diabetes mellitus insulinodependiente",
                    "nivel": 2,
                    "url": "/cie-10/e10"
                },
                {
                    "codigo": "E10-E14",
                    "nombre": "Diabetes mellitus",
                    "nivel": 1,
                    "url": "/cie-10/e10-e14"
                },
                {
                    "codigo": "E11",
                    "nombre": "Diabetes mellitus no insulinodependiente",
                    "nivel": 2,
                    "url": "/cie-10/e11"
                }
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map