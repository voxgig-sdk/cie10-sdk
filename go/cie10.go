package voxgigcie10sdk

import (
	"github.com/voxgig-sdk/cie10-sdk/go/core"
	"github.com/voxgig-sdk/cie10-sdk/go/entity"
	"github.com/voxgig-sdk/cie10-sdk/go/feature"
	_ "github.com/voxgig-sdk/cie10-sdk/go/utility"
)

// Type aliases preserve external API.
type Cie10SDK = core.Cie10SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Cie10Entity = core.Cie10Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Cie10Error = core.Cie10Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewCie10EntityFunc = func(client *core.Cie10SDK, entopts map[string]any) core.Cie10Entity {
		return entity.NewCie10Entity(client, entopts)
	}
}

// Constructor re-exports.
var NewCie10SDK = core.NewCie10SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewCie10SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *Cie10SDK  { return NewCie10SDK(nil) }
func Test() *Cie10SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
