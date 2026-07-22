package core

type Cie10Error struct {
	IsCie10Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewCie10Error(code string, msg string, ctx *Context) *Cie10Error {
	return &Cie10Error{
		IsCie10Error: true,
		Sdk:              "Cie10",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *Cie10Error) Error() string {
	return e.Msg
}
