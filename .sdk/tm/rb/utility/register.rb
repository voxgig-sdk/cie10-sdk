# Cie10 SDK utility registration
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

Cie10Utility.registrar = ->(u) {
  u.clean = Cie10Utilities::Clean
  u.done = Cie10Utilities::Done
  u.make_error = Cie10Utilities::MakeError
  u.feature_add = Cie10Utilities::FeatureAdd
  u.feature_hook = Cie10Utilities::FeatureHook
  u.feature_init = Cie10Utilities::FeatureInit
  u.fetcher = Cie10Utilities::Fetcher
  u.make_fetch_def = Cie10Utilities::MakeFetchDef
  u.make_context = Cie10Utilities::MakeContext
  u.make_options = Cie10Utilities::MakeOptions
  u.make_request = Cie10Utilities::MakeRequest
  u.make_response = Cie10Utilities::MakeResponse
  u.make_result = Cie10Utilities::MakeResult
  u.make_point = Cie10Utilities::MakePoint
  u.make_spec = Cie10Utilities::MakeSpec
  u.make_url = Cie10Utilities::MakeUrl
  u.param = Cie10Utilities::Param
  u.prepare_auth = Cie10Utilities::PrepareAuth
  u.prepare_body = Cie10Utilities::PrepareBody
  u.prepare_headers = Cie10Utilities::PrepareHeaders
  u.prepare_method = Cie10Utilities::PrepareMethod
  u.prepare_params = Cie10Utilities::PrepareParams
  u.prepare_path = Cie10Utilities::PreparePath
  u.prepare_query = Cie10Utilities::PrepareQuery
  u.graphql_body = Cie10Utilities::GraphqlBody
  u.graphql_errors = Cie10Utilities::GraphqlErrors
  u.result_basic = Cie10Utilities::ResultBasic
  u.result_body = Cie10Utilities::ResultBody
  u.result_headers = Cie10Utilities::ResultHeaders
  u.transform_request = Cie10Utilities::TransformRequest
  u.transform_response = Cie10Utilities::TransformResponse
}
