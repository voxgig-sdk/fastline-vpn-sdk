# frozen_string_literal: true

# Typed models for the FastlineVpn SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Server entity data model.
#
# @!attribute [rw] server
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
Server = Struct.new(
  :server,
  :success,
  keyword_init: true
)

# Request payload for Server#create.
#
# @!attribute [rw] server
#   @return [Array, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
ServerCreateData = Struct.new(
  :server,
  :success,
  keyword_init: true
)

