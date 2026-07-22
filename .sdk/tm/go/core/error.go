package core

type FastlineVpnError struct {
	IsFastlineVpnError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFastlineVpnError(code string, msg string, ctx *Context) *FastlineVpnError {
	return &FastlineVpnError{
		IsFastlineVpnError: true,
		Sdk:              "FastlineVpn",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FastlineVpnError) Error() string {
	return e.Msg
}
