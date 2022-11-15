package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func IndexController(c echo.Context) error {
	//render only file, must full name with extension
	return c.String(http.StatusOK, "Hello mn!!!!!")
}
