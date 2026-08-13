# FastlineVpn SDK utility: make_context

from projectname_sdk.core.context import FastlineVpnContext


def make_context_util(ctxmap, basectx):
    return FastlineVpnContext(ctxmap, basectx)
