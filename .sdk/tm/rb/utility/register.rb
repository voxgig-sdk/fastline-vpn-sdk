# FastlineVpn SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FastlineVpnUtility.registrar = ->(u) {
  u.clean = FastlineVpnUtilities::Clean
  u.done = FastlineVpnUtilities::Done
  u.make_error = FastlineVpnUtilities::MakeError
  u.feature_add = FastlineVpnUtilities::FeatureAdd
  u.feature_hook = FastlineVpnUtilities::FeatureHook
  u.feature_init = FastlineVpnUtilities::FeatureInit
  u.fetcher = FastlineVpnUtilities::Fetcher
  u.make_fetch_def = FastlineVpnUtilities::MakeFetchDef
  u.make_context = FastlineVpnUtilities::MakeContext
  u.make_options = FastlineVpnUtilities::MakeOptions
  u.make_request = FastlineVpnUtilities::MakeRequest
  u.make_response = FastlineVpnUtilities::MakeResponse
  u.make_result = FastlineVpnUtilities::MakeResult
  u.make_point = FastlineVpnUtilities::MakePoint
  u.make_spec = FastlineVpnUtilities::MakeSpec
  u.make_url = FastlineVpnUtilities::MakeUrl
  u.param = FastlineVpnUtilities::Param
  u.prepare_auth = FastlineVpnUtilities::PrepareAuth
  u.prepare_body = FastlineVpnUtilities::PrepareBody
  u.prepare_headers = FastlineVpnUtilities::PrepareHeaders
  u.prepare_method = FastlineVpnUtilities::PrepareMethod
  u.prepare_params = FastlineVpnUtilities::PrepareParams
  u.prepare_path = FastlineVpnUtilities::PreparePath
  u.prepare_query = FastlineVpnUtilities::PrepareQuery
  u.graphql_body = FastlineVpnUtilities::GraphqlBody
  u.graphql_errors = FastlineVpnUtilities::GraphqlErrors
  u.result_basic = FastlineVpnUtilities::ResultBasic
  u.result_body = FastlineVpnUtilities::ResultBody
  u.result_headers = FastlineVpnUtilities::ResultHeaders
  u.transform_request = FastlineVpnUtilities::TransformRequest
  u.transform_response = FastlineVpnUtilities::TransformResponse
}
