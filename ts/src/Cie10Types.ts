// Typed models for the Cie10 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cie10 {
  codigo: string
  nivel: number
  nombre: string
  url: string
}

export interface Cie10ListMatch {
  codigo?: string
  nivel?: number
  nombre?: string
  url?: string
}

