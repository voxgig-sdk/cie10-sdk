package core

import "encoding/json"

type Cie10Error struct {
	IsCie10Error bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
}

func NewCie10Error(code string, msg string, ctx *Context) *Cie10Error {
	return &Cie10Error{
		IsCie10Error: true,
		Sdk:                "Cie10",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
	}
}

func (e *Cie10Error) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *Cie10Error) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *Cie10Error) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
