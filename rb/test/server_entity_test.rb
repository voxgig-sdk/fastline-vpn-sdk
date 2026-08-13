# Server entity test

require "minitest/autorun"
require "json"
require_relative "../FastlineVpn_sdk"
require_relative "runner"

class ServerEntityTest < Minitest::Test
  def test_create_instance
    testsdk = FastlineVpnSDK.test(nil, nil)
    ent = testsdk.Server(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = server_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "server." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set FASTLINE_VPN_TEST_SERVER_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    server_ref01_ent = client.Server(nil)
    server_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.server"), "server_ref01"))

    server_ref01_data_result = server_ref01_ent.create(server_ref01_data, nil)
    server_ref01_data = Helpers.to_map(server_ref01_data_result.respond_to?(:data_get) ? server_ref01_data_result.data_get : server_ref01_data_result)
    assert !server_ref01_data.nil?

  end
end

def server_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "server", "ServerTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = FastlineVpnSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["server01", "server02", "server03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["FASTLINE_VPN_TEST_SERVER_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "FASTLINE_VPN_TEST_SERVER_ENTID" => idmap,
    "FASTLINE_VPN_TEST_LIVE" => "FALSE",
    "FASTLINE_VPN_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["FASTLINE_VPN_TEST_SERVER_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["FASTLINE_VPN_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = FastlineVpnSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["FASTLINE_VPN_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["FASTLINE_VPN_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
