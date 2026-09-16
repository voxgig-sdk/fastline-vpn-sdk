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
(0, node_test_1.describe)('ServerEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FASTLINE_VPN_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FASTLINE_VPN_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FastlineVpnSDK.test();
        const ent = testsdk.Server();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FASTLINE_VPN_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'server.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "servers", "req": false, "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "success", "req": false, "short": "Indicates if the request was successful", "type": "`$BOOLEAN`", "index$": 1 }], "name": "server", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /ajax/servers", "json": "{\"operationId\":\"getServersList\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{},\"type\":\"object\"}}},\"description\":\"Request body for retrieving server list\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"servers\":[{\"country\":\"United States\",\"encryption\":\"AES-256\",\"id\":\"server-001\",\"ip\":\"192.0.2.1\",\"load\":45,\"location\":\"New York\",\"name\":\"US East 1\",\"speed\":\"high\",\"status\":\"active\"},{\"country\":\"United Kingdom\",\"encryption\":\"AES-256\",\"id\":\"server-002\",\"ip\":\"192.0.2.2\",\"load\":32,\"location\":\"London\",\"name\":\"EU West 1\",\"speed\":\"high\",\"status\":\"active\"}],\"success\":true},\"schema\":{\"properties\":{\"servers\":{\"items\":{\"properties\":{\"country\":{\"description\":\"Country where the server is located\",\"type\":\"string\"},\"encryption\":{\"description\":\"Encryption protocol used\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the server\",\"type\":\"string\"},\"ip\":{\"description\":\"IP address of the server\",\"type\":\"string\"},\"load\":{\"description\":\"Server load percentage\",\"type\":\"number\"},\"location\":{\"description\":\"Geographic location of the server\",\"type\":\"string\"},\"name\":{\"description\":\"Server name\",\"type\":\"string\"},\"speed\":{\"description\":\"Connection speed rating\",\"type\":\"string\"},\"status\":{\"description\":\"Server status (active, maintenance, etc.)\",\"enum\":[\"active\",\"maintenance\",\"offline\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"description\":\"Indicates if the request was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of available VPN servers\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid request parameters\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error occurred\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/ajax/servers", "segments": [{ "lit": "ajax" }, { "lit": "servers" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "server", "name__orig": "server", "Name": "Server", "name_": "server", "name-": "server", "NAME": "SERVER", "index$": 0 }, { "active": true, "entity": "server", "key$": "BasicServerFlow", "kind": "basic", "name": "BasicServerFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "server_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Server');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const server_ref01_ent = client.Server();
        let server_ref01_data = setup.data.new.server['server_ref01'];
        server_ref01_data = (await server_ref01_ent.create(server_ref01_data)).data();
        (0, node_assert_1.default)(null != server_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/server/ServerTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FastlineVpnSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['server01', 'server02', 'server03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FASTLINE_VPN_TEST_SERVER_ENTID': idmap,
        'FASTLINE_VPN_TEST_LIVE': 'FALSE',
        'FASTLINE_VPN_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FASTLINE_VPN_TEST_SERVER_ENTID'];
    const live = 'TRUE' === env.FASTLINE_VPN_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FASTLINE_VPN_TEST_SERVER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FastlineVpnSDK(merge([
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
        explain: 'TRUE' === env.FASTLINE_VPN_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ServerEntity.test.js.map