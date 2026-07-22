# FastlineVpn SDK utility: make_context

from core.context import FastlineVpnContext


def make_context_util(ctxmap, basectx):
    return FastlineVpnContext(ctxmap, basectx)
