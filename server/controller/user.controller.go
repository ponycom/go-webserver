package controller

import (
	"fmt"
	"go-server/dto"
	"go-server/helper"
	"go-server/service"
	"log"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// UserController is a ....
type UserController interface {
	Update(context echo.Context) error
	Profile(context echo.Context) error
}

type userController struct {
	userService service.UserService
	jwtService  service.JWTService
}

// NewUserController is creating anew instance of UserControlller
func NewUserController(userService service.UserService, jwtService service.JWTService) UserController {
	return &userController{
		userService: userService,
		jwtService:  jwtService,
	}
}

func (c *userController) Update(context echo.Context) error {
	var userUpdateDTO dto.UserUpdateDTO
	errDTO := context.Bind(&userUpdateDTO)
	if errDTO != nil {
		res := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		return context.JSON(http.StatusBadRequest, res)
	}

	//authHeader := context.Request().Header.Get("Authorization")
	cookie, err := context.Cookie("access_token")
	if err != nil {
		return err
	}
	token, errToken := c.jwtService.ValidateToken(cookie.Value)
	if errToken != nil {
		panic(errToken.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	id, err := strconv.ParseUint(fmt.Sprintf("%v", claims["user_id"]), 10, 64)
	if err != nil {
		panic(err.Error())
	}
	userUpdateDTO.ID = id
	u := c.userService.Update(userUpdateDTO)
	res := helper.BuildSuccessResponse(true, "OK!", u)
	return context.JSON(http.StatusOK, res)
}

func (c *userController) Profile(context echo.Context) error {
	//authHeader := context.Request().Header.Get("Authorization")
	log.Println("Profile: Start")
	cookie, err := context.Cookie("access_token")
	if err != nil {
		return err
	}
	token, err := c.jwtService.ValidateToken(cookie.Value)
	if err != nil {
		panic(err.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	user := c.userService.Profile(id)
	res := helper.BuildSuccessResponse(true, "OK", user)
	log.Println("Profile: End")
	return context.JSON(http.StatusOK, res)
}
