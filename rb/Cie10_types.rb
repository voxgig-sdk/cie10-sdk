# frozen_string_literal: true

# Typed models for the Cie10 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Cie10 entity data model.
#
# @!attribute [rw] codigo
#   @return [String]
#
# @!attribute [rw] nivel
#   @return [Integer]
#
# @!attribute [rw] nombre
#   @return [String]
#
# @!attribute [rw] url
#   @return [String]
Cie10 = Struct.new(
  :codigo,
  :nivel,
  :nombre,
  :url,
  keyword_init: true
)

# Request payload for Cie10#list.
#
# @!attribute [rw] codigo
#   @return [String, nil]
#
# @!attribute [rw] nivel
#   @return [Integer, nil]
#
# @!attribute [rw] nombre
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Cie10ListMatch = Struct.new(
  :codigo,
  :nivel,
  :nombre,
  :url,
  keyword_init: true
)

