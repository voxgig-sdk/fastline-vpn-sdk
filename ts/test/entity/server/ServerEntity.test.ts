

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FastlineVpnSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ServerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FASTLINE_VPN_TEST_LIVE=TRUE.
  afterEach(liveDelay('FASTLINE_VPN_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FastlineVpnSDK.test()
    const ent = testsdk.Server()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FASTLINE_VPN_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'server.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"servers","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"success","req":false,"short":"Indicates if the request was successful","type":"`$BOOLEAN`","index$":1}],"name":"server","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /ajax/servers","json":"{\"operationId\":\"getServersList\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{},\"type\":\"object\"}}},\"description\":\"Request body for retrieving server list\",\"required\":false},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"servers\":[{\"country\":\"United States\",\"encryption\":\"AES-256\",\"id\":\"server-001\",\"ip\":\"192.0.2.1\",\"load\":45,\"location\":\"New York\",\"name\":\"US East 1\",\"speed\":\"high\",\"status\":\"active\"},{\"country\":\"United Kingdom\",\"encryption\":\"AES-256\",\"id\":\"server-002\",\"ip\":\"192.0.2.2\",\"load\":32,\"location\":\"London\",\"name\":\"EU West 1\",\"speed\":\"high\",\"status\":\"active\"}],\"success\":true},\"schema\":{\"properties\":{\"servers\":{\"items\":{\"properties\":{\"country\":{\"description\":\"Country where the server is located\",\"type\":\"string\"},\"encryption\":{\"description\":\"Encryption protocol used\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the server\",\"type\":\"string\"},\"ip\":{\"description\":\"IP address of the server\",\"type\":\"string\"},\"load\":{\"description\":\"Server load percentage\",\"type\":\"number\"},\"location\":{\"description\":\"Geographic location of the server\",\"type\":\"string\"},\"name\":{\"description\":\"Server name\",\"type\":\"string\"},\"speed\":{\"description\":\"Connection speed rating\",\"type\":\"string\"},\"status\":{\"description\":\"Server status (active, maintenance, etc.)\",\"enum\":[\"active\",\"maintenance\",\"offline\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"success\":{\"description\":\"Indicates if the request was successful\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of available VPN servers\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid request parameters\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Internal server error occurred\",\"type\":\"string\"},\"success\":{\"example\":false,\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/ajax/servers","segments":[{"lit":"ajax"},{"lit":"servers"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"server","name__orig":"server","Name":"Server","name_":"server","name-":"server","NAME":"SERVER","index$":0}, {"active":true,"entity":"server","key$":"BasicServerFlow","kind":"basic","name":"BasicServerFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"server_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Server')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const server_ref01_ent = client.Server()
    let server_ref01_data = setup.data.new.server['server_ref01']

    server_ref01_data = (await server_ref01_ent.create(server_ref01_data)).data()
    assert(null != server_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/server/ServerTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FastlineVpnSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['server01','server02','server03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FASTLINE_VPN_TEST_SERVER_ENTID': idmap,
    'FASTLINE_VPN_TEST_LIVE': 'FALSE',
    'FASTLINE_VPN_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FASTLINE_VPN_TEST_SERVER_ENTID']

  const live = 'TRUE' === env.FASTLINE_VPN_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FASTLINE_VPN_TEST_SERVER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FastlineVpnSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
