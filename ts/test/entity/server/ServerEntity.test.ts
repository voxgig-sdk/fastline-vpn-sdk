

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"servers":{"a":true,"h":"Servers","n":"servers","r":false,"t":"`$ARRAY`","key$":"servers","index$":0},"success":{"a":true,"h":"Success","n":"success","r":false,"sh":"Indicates if the request was successful","t":"`$BOOLEAN`","key$":"success","index$":1}},"name":"server","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /ajax/servers","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/ajax/servers","q":{},"r":{},"s":[{"lit":"ajax"},{"lit":"servers"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"server","name__orig":"server","Name":"Server","name_":"server","name-":"server","NAME":"SERVER","index$":0}, {"active":true,"entity":"server","key$":"BasicServerFlow","kind":"basic","name":"BasicServerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"server_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Server', {"POST /ajax/servers":{"protocol":"http","operationId":"getServersList","requestBody":{"description":"Request body for retrieving server list","required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"index$":1}}}},"responses":{"200":{"description":"Successful response with list of available VPN servers","content":{"application/json":{"schema":{"type":"object","properties":{"servers":{"type":"array","items":{"type":"object","properties":{"id":{"type":"string","description":"Unique identifier for the server"},"name":{"type":"string","description":"Server name"},"location":{"type":"string","description":"Geographic location of the server"},"country":{"type":"string","description":"Country where the server is located"},"ip":{"type":"string","description":"IP address of the server"},"speed":{"type":"string","description":"Connection speed rating"},"encryption":{"type":"string","description":"Encryption protocol used"},"status":{"type":"string","description":"Server status (active, maintenance, etc.)","enum":["active","maintenance","offline"]},"load":{"type":"number","description":"Server load percentage"}}},"key$":"servers"},"success":{"type":"boolean","description":"Indicates if the request was successful","key$":"success"}},"index$":0},"example":{"success":true,"servers":[{"id":"server-001","name":"US East 1","location":"New York","country":"United States","ip":"192.0.2.1","speed":"high","encryption":"AES-256","status":"active","load":45},{"id":"server-002","name":"EU West 1","location":"London","country":"United Kingdom","ip":"192.0.2.2","speed":"high","encryption":"AES-256","status":"active","load":32}]}}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"Invalid request parameters"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"success":{"type":"boolean","example":false},"error":{"type":"string","example":"Internal server error occurred"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
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
  
