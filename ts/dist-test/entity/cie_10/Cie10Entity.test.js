"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('Cie10Entity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when CIE10_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('CIE10_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.Cie10SDK.test();
        const ent = testsdk.Cie10();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.CIE10_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'cie_10.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "codigo", "req": true, "short": "CIE-10 code or code range.", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "nivel", "req": true, "short": "Hierarchy level returned by NotaSalud.", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "name": "nombre", "req": true, "short": "Spanish display name.", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "url", "req": true, "short": "Relative NotaSalud reference page URL for this code or range.", "type": "`$STRING`", "index$": 3 }], "name": "cie_10", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 3, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": "diabetes", "kind": "query", "name": "q", "orig": "q", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /buscar/cie-10", "json": "{\"operationId\":\"searchCie10\",\"parameters\":[{\"description\":\"Search term or CIE-10 code, for example `diabetes`, `colera`, or `A00`.\",\"examples\":{\"code\":{\"summary\":\"Code search\",\"value\":\"A00\"},\"diagnosis\":{\"summary\":\"Diagnosis search\",\"value\":\"diabetes\"}},\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"minLength\":1,\"type\":\"string\"}},{\"description\":\"Maximum number of results to return.\",\"example\":3,\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":25,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"diabetesLimit3\":{\"summary\":\"Search for diabetes, limit 3\",\"value\":{\"query\":\"diabetes\",\"results\":[{\"codigo\":\"E10\",\"nivel\":2,\"nombre\":\"Diabetes mellitus insulinodependiente\",\"url\":\"/cie-10/e10\"},{\"codigo\":\"E10-E14\",\"nivel\":1,\"nombre\":\"Diabetes mellitus\",\"url\":\"/cie-10/e10-e14\"},{\"codigo\":\"E11\",\"nivel\":2,\"nombre\":\"Diabetes mellitus no insulinodependiente\",\"url\":\"/cie-10/e11\"}],\"total\":3}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"query\":{\"description\":\"Echo of the submitted query.\",\"type\":\"string\"},\"results\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"codigo\":{\"description\":\"CIE-10 code or code range.\",\"type\":\"string\"},\"nivel\":{\"description\":\"Hierarchy level returned by NotaSalud.\",\"type\":\"integer\"},\"nombre\":{\"description\":\"Spanish display name.\",\"type\":\"string\"},\"url\":{\"description\":\"Relative NotaSalud reference page URL for this code or range.\",\"type\":\"string\"}},\"required\":[\"codigo\",\"nombre\",\"nivel\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Number of returned results.\",\"minimum\":0,\"type\":\"integer\"}},\"required\":[\"query\",\"total\",\"results\"],\"type\":\"object\"}}},\"description\":\"Search results\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/buscar/cie-10", "segments": [{ "lit": "buscar" }, { "lit": "cie-10" }], "select": { "exist": ["limit", "q"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "cie_10", "name__orig": "cie_10", "Name": "Cie10", "name_": "cie_10", "name-": "cie-10", "NAME": "CIE_10", "index$": 0 }, { "active": true, "entity": "cie_10", "key$": "BasicCie10Flow", "kind": "basic", "name": "BasicCie10Flow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "cie_10_ref01" } }], "index$": 0 }] }, 'Cie10');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let cie_10_ref01_data = Object.values(setup.data.existing.cie_10)[0];
        // LIST
        const cie_10_ref01_ent = client.Cie10();
        const cie_10_ref01_match = {};
        const cie_10_ref01_list = (await cie_10_ref01_ent.list(cie_10_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/cie_10/Cie10TestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.Cie10SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['cie_1001', 'cie_1002', 'cie_1003'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'CIE10_TEST_CIE_10_ENTID': idmap,
        'CIE10_TEST_LIVE': 'FALSE',
        'CIE10_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['CIE10_TEST_CIE_10_ENTID'];
    const live = 'TRUE' === env.CIE10_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['CIE10_TEST_CIE_10_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.Cie10SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.CIE10_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=Cie10Entity.test.js.map