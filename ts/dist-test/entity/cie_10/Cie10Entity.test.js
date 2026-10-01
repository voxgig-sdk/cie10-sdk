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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "codigo": { "a": true, "h": "Codigo", "n": "codigo", "r": true, "sh": "CIE-10 code or code range.", "t": "`$STRING`", "key$": "codigo", "index$": 0 }, "nivel": { "a": true, "h": "Nivel", "n": "nivel", "r": true, "sh": "Hierarchy level returned by NotaSalud.", "t": "`$INTEGER`", "key$": "nivel", "index$": 1 }, "nombre": { "a": true, "h": "Nombre", "n": "nombre", "r": true, "sh": "Spanish display name.", "t": "`$STRING`", "key$": "nombre", "index$": 2 }, "url": { "a": true, "h": "Url", "n": "url", "r": true, "sh": "Relative NotaSalud reference page URL for this code or range.", "t": "`$STRING`", "key$": "url", "index$": 3 } }, "name": "cie_10", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /buscar/cie-10", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 3, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "diabetes", "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/buscar/cie-10", "q": { "exist": ["limit", "q"] }, "r": {}, "s": [{ "lit": "buscar" }, { "lit": "cie-10" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "cie_10", "name__orig": "cie_10", "Name": "Cie10", "name_": "cie_10", "name-": "cie-10", "NAME": "CIE_10", "index$": 0 }, { "active": true, "entity": "cie_10", "key$": "BasicCie10Flow", "kind": "basic", "name": "BasicCie10Flow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "cie_10_ref01" } }], "index$": 0 }] }, 'Cie10', { "GET /buscar/cie-10": { "protocol": "http", "parameters": [{ "name": "q", "in": "query", "required": false, "description": "Search term or CIE-10 code, for example `diabetes`, `colera`, or `A00`.", "schema": { "type": "string", "minLength": 1 }, "examples": { "diagnosis": { "summary": "Diagnosis search", "value": "diabetes" }, "code": { "summary": "Code search", "value": "A00" } }, "index$": 0 }, { "name": "limit", "in": "query", "required": false, "description": "Maximum number of results to return.", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "default": 25 }, "example": 3, "index$": 1 }] } });
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