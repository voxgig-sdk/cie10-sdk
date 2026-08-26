# Cie10 SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Cie10",
            "slug": "cie10",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://notasalud.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "cie_10": {},
            },
        },
        "entity": {
      "cie_10": {
        "fields": [
          {
            "name": "codigo",
            "req": True,
            "short": "CIE-10 code or code range.",
            "type": "`$STRING`",
          },
          {
            "name": "nivel",
            "req": True,
            "short": "Hierarchy level returned by NotaSalud.",
            "type": "`$INTEGER`",
          },
          {
            "name": "nombre",
            "req": True,
            "short": "Spanish display name.",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "req": True,
            "short": "Relative NotaSalud reference page URL for this code or range.",
            "type": "`$STRING`",
          },
        ],
        "name": "cie_10",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 3,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "diabetes",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/buscar/cie-10",
                "parts": [
                  "buscar",
                  "cie-10",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
