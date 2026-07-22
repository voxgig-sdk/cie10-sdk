-- Typed models for the Cie10 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cie10
---@field codigo string
---@field nivel number
---@field nombre string
---@field url string

---@class Cie10ListMatch
---@field codigo? string
---@field nivel? number
---@field nombre? string
---@field url? string

local M = {}

return M
