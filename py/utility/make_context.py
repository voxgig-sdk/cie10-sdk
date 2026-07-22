# Cie10 SDK utility: make_context

from core.context import Cie10Context


def make_context_util(ctxmap, basectx):
    return Cie10Context(ctxmap, basectx)
