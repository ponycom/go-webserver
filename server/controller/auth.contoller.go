package controller

import (
	"go-server/dto"
	"go-server/helper"
	"go-server/model"
	"go-server/service"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/labstack/echo/v4"
)

type AuthController interface {
	Login(ctx echo.Context) error
	Register(ctx echo.Context) error
	Logout(ctx echo.Context) error
}

type authController struct {
	authService service.AuthService
	jwtService  service.JWTService
}

func NewAuthController(authService service.AuthService, jwtService service.JWTService) AuthController {
	return &authController{
		authService: authService,
		jwtService:  jwtService,
	}
}

func (c *authController) Login(ctx echo.Context) error {
	log.Println("Login: Start")
	var loginDTO dto.LoginDTO
	errDTO := ctx.Bind(&loginDTO)
	if errDTO != nil {
		response := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		return ctx.JSON(http.StatusBadRequest, response)
	}
	authResult := c.authService.VerifyCredential(loginDTO.Email, loginDTO.Password)
	if v, ok := authResult.(model.User); ok {
		generatedToken := c.jwtService.GenerateToken(strconv.FormatUint(v.ID, 10))
		v.Token = generatedToken
		//Set cookie jwt
		cookieJWT := new(http.Cookie)
		cookieJWT.Name = "access_token"
		cookieJWT.Value = generatedToken
		cookieJWT.Expires = time.Now().AddDate(1, 0, 0)
		cookieJWT.HttpOnly = true
		cookieJWT.Path = "/"
		ctx.SetCookie(cookieJWT)

		response := helper.BuildSuccessResponse(true, "OK!", v)
		log.Println("Login: End Success!!!!")
		return ctx.JSON(http.StatusOK, response)
	}
	response := helper.BuildErrorResponse("Please check again your credential", "Invalid credential", helper.EmptyObj{})
	return ctx.JSON(http.StatusUnauthorized, response)
}

func (c *authController) Register(ctx echo.Context) error {

	var registerDTO dto.RegisterDTO
	errDTO := ctx.Bind(&registerDTO)
	if errDTO != nil {
		response := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		return ctx.JSON(http.StatusBadRequest, response)
	}

	if !c.authService.IsDuplicateEmail(registerDTO.Email) {
		response := helper.BuildErrorResponse("Failed to process request", "Duplicate email", helper.EmptyObj{})
		return ctx.JSON(http.StatusUnauthorized, response)
	} else {
		createdUser := c.authService.CreateUser(registerDTO)
		token := c.jwtService.GenerateToken(strconv.FormatUint(createdUser.ID, 10))
		createdUser.Token = token
		response := helper.BuildSuccessResponse(true, "OK!", createdUser)
		return ctx.JSON(http.StatusOK, response)
	}
	// return ctx.JSON(http.StatusOK, echo.Map{
	// 	"message": "Hello Register!",
	// })
}

func (c *authController) Logout(ctx echo.Context) error {
	cookieJWT := new(http.Cookie)
	cookieJWT.Name = "access_token"
	cookieJWT.Value = ""
	cookieJWT.Expires = time.Now().Add(-time.Hour)
	cookieJWT.Path = "/"
	ctx.SetCookie(cookieJWT)
	response := helper.BuildSuccessResponse(true, "OK!", echo.Map{
		"message": "Thank you!!!!",
	})
	return ctx.JSON(http.StatusOK, response)
}
