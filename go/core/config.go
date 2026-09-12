package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Cie10",
			"slug": "cie10",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://notasalud.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cie_10": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cie_10": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "codigo",
						"req": true,
						"short": "CIE-10 code or code range.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nivel",
						"req": true,
						"short": "Hierarchy level returned by NotaSalud.",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nombre",
						"req": true,
						"short": "Spanish display name.",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"req": true,
						"short": "Relative NotaSalud reference page URL for this code or range.",
						"type": "`$STRING`",
					},
				},
				"name": "cie_10",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 3,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "diabetes",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/buscar/cie-10",
								"segments": []any{
									map[string]any{
										"lit": "buscar",
									},
									map[string]any{
										"lit": "cie-10",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"parts": []any{
									"buscar",
									"cie-10",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
