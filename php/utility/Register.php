<?php
declare(strict_types=1);

// FastlineVpn SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FastlineVpnUtility::setRegistrar(function (FastlineVpnUtility $u): void {
    $u->clean = [FastlineVpnClean::class, 'call'];
    $u->done = [FastlineVpnDone::class, 'call'];
    $u->make_error = [FastlineVpnMakeError::class, 'call'];
    $u->feature_add = [FastlineVpnFeatureAdd::class, 'call'];
    $u->feature_hook = [FastlineVpnFeatureHook::class, 'call'];
    $u->feature_init = [FastlineVpnFeatureInit::class, 'call'];
    $u->fetcher = [FastlineVpnFetcher::class, 'call'];
    $u->make_fetch_def = [FastlineVpnMakeFetchDef::class, 'call'];
    $u->make_context = [FastlineVpnMakeContext::class, 'call'];
    $u->make_options = [FastlineVpnMakeOptions::class, 'call'];
    $u->make_request = [FastlineVpnMakeRequest::class, 'call'];
    $u->make_response = [FastlineVpnMakeResponse::class, 'call'];
    $u->make_result = [FastlineVpnMakeResult::class, 'call'];
    $u->make_point = [FastlineVpnMakePoint::class, 'call'];
    $u->make_spec = [FastlineVpnMakeSpec::class, 'call'];
    $u->make_url = [FastlineVpnMakeUrl::class, 'call'];
    $u->param = [FastlineVpnParam::class, 'call'];
    $u->prepare_auth = [FastlineVpnPrepareAuth::class, 'call'];
    $u->prepare_body = [FastlineVpnPrepareBody::class, 'call'];
    $u->prepare_headers = [FastlineVpnPrepareHeaders::class, 'call'];
    $u->prepare_method = [FastlineVpnPrepareMethod::class, 'call'];
    $u->prepare_params = [FastlineVpnPrepareParams::class, 'call'];
    $u->prepare_path = [FastlineVpnPreparePath::class, 'call'];
    $u->prepare_query = [FastlineVpnPrepareQuery::class, 'call'];
    $u->result_basic = [FastlineVpnResultBasic::class, 'call'];
    $u->result_body = [FastlineVpnResultBody::class, 'call'];
    $u->result_headers = [FastlineVpnResultHeaders::class, 'call'];
    $u->transform_request = [FastlineVpnTransformRequest::class, 'call'];
    $u->transform_response = [FastlineVpnTransformResponse::class, 'call'];
});
