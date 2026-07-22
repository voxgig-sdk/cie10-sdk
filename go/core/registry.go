package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCie10EntityFunc func(client *Cie10SDK, entopts map[string]any) Cie10Entity

