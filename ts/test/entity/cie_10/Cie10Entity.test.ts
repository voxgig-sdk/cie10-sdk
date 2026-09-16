

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { Cie10SDK, BaseFeature, stdutil } from '../../..'

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


describe('Cie10Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CIE10_TEST_LIVE=TRUE.
  afterEach(liveDelay('CIE10_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = Cie10SDK.test()
    const ent = testsdk.Cie10()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CIE10_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cie_10.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"codigo","req":true,"short":"CIE-10 code or code range.","type":"`$STRING`","index$":0},{"active":true,"name":"nivel","req":true,"short":"Hierarchy level returned by NotaSalud.","type":"`$INTEGER`","index$":1},{"active":true,"name":"nombre","req":true,"short":"Spanish display name.","type":"`$STRING`","index$":2},{"active":true,"name":"url","req":true,"short":"Relative NotaSalud reference page URL for this code or range.","type":"`$STRING`","index$":3}],"name":"cie_10","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":3,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"diabetes","kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /buscar/cie-10","json":"{\"operationId\":\"searchCie10\",\"parameters\":[{\"description\":\"Search term or CIE-10 code, for example `diabetes`, `colera`, or `A00`.\",\"examples\":{\"code\":{\"summary\":\"Code search\",\"value\":\"A00\"},\"diagnosis\":{\"summary\":\"Diagnosis search\",\"value\":\"diabetes\"}},\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"minLength\":1,\"type\":\"string\"}},{\"description\":\"Maximum number of results to return.\",\"example\":3,\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":25,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"diabetesLimit3\":{\"summary\":\"Search for diabetes, limit 3\",\"value\":{\"query\":\"diabetes\",\"results\":[{\"codigo\":\"E10\",\"nivel\":2,\"nombre\":\"Diabetes mellitus insulinodependiente\",\"url\":\"/cie-10/e10\"},{\"codigo\":\"E10-E14\",\"nivel\":1,\"nombre\":\"Diabetes mellitus\",\"url\":\"/cie-10/e10-e14\"},{\"codigo\":\"E11\",\"nivel\":2,\"nombre\":\"Diabetes mellitus no insulinodependiente\",\"url\":\"/cie-10/e11\"}],\"total\":3}}},\"schema\":{\"additionalProperties\":false,\"properties\":{\"query\":{\"description\":\"Echo of the submitted query.\",\"type\":\"string\"},\"results\":{\"items\":{\"additionalProperties\":false,\"properties\":{\"codigo\":{\"description\":\"CIE-10 code or code range.\",\"type\":\"string\"},\"nivel\":{\"description\":\"Hierarchy level returned by NotaSalud.\",\"type\":\"integer\"},\"nombre\":{\"description\":\"Spanish display name.\",\"type\":\"string\"},\"url\":{\"description\":\"Relative NotaSalud reference page URL for this code or range.\",\"type\":\"string\"}},\"required\":[\"codigo\",\"nombre\",\"nivel\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"total\":{\"description\":\"Number of returned results.\",\"minimum\":0,\"type\":\"integer\"}},\"required\":[\"query\",\"total\",\"results\"],\"type\":\"object\"}}},\"description\":\"Search results\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/buscar/cie-10","segments":[{"lit":"buscar"},{"lit":"cie-10"}],"select":{"exist":["limit","q"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"cie_10","name__orig":"cie_10","Name":"Cie10","name_":"cie_10","name-":"cie-10","NAME":"CIE_10","index$":0}, {"active":true,"entity":"cie_10","key$":"BasicCie10Flow","kind":"basic","name":"BasicCie10Flow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"cie_10_ref01"}}],"index$":0}]}, 'Cie10')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cie_10_ref01_data = Object.values(setup.data.existing.cie_10)[0] as any

    // LIST
    const cie_10_ref01_ent = client.Cie10()
    const cie_10_ref01_match: any = {}

    const cie_10_ref01_list = (await cie_10_ref01_ent.list(cie_10_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cie_10/Cie10TestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = Cie10SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['cie_1001','cie_1002','cie_1003'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CIE10_TEST_CIE_10_ENTID': idmap,
    'CIE10_TEST_LIVE': 'FALSE',
    'CIE10_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CIE10_TEST_CIE_10_ENTID']

  const live = 'TRUE' === env.CIE10_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CIE10_TEST_CIE_10_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new Cie10SDK(merge([
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
    explain: 'TRUE' === env.CIE10_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
