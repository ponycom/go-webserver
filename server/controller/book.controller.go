package controller

import (
	"fmt"
	"go-server/dto"
	"go-server/helper"
	"go-server/model"
	"go-server/service"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// BookController is a ...
type BookController interface {
	All(context echo.Context) error
	FindByID(context echo.Context) error
	Insert(context echo.Context) error
	Update(context echo.Context) error
	Delete(context echo.Context) error
}

type bookController struct {
	bookService service.BookService
	jwtService  service.JWTService
}

// NewBookController create a new instances of BoookController
func NewBookController(bookServ service.BookService, jwtServ service.JWTService) BookController {
	return &bookController{
		bookService: bookServ,
		jwtService:  jwtServ,
	}
}

func (c *bookController) All(context echo.Context) error {
	var books []model.Book = c.bookService.All()
	res := helper.BuildSuccessResponse(true, "OK", books)
	return context.JSON(http.StatusOK, res)
}

func (c *bookController) FindByID(context echo.Context) error {
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		res := helper.BuildErrorResponse("No param id was found", err.Error(), helper.EmptyObj{})

		return context.JSON(http.StatusBadRequest, res)
	}

	var book model.Book = c.bookService.FindByID(id)
	if (book == model.Book{}) {
		res := helper.BuildErrorResponse("Data not found", "No data with given id", helper.EmptyObj{})
		return context.JSON(http.StatusNotFound, res)
	} else {
		res := helper.BuildSuccessResponse(true, "OK", book)
		return context.JSON(http.StatusOK, res)
	}
}

func (c *bookController) Insert(context echo.Context) error {
	var bookCreateDTO dto.BookCreateDTO
	errDTO := context.Bind(&bookCreateDTO)
	if errDTO != nil {
		res := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})
		return context.JSON(http.StatusBadRequest, res)
	} else {
		authHeader := context.Request().Header.Get("Authorization")
		userID := c.getUserIDByToken(authHeader)
		convertedUserID, err := strconv.ParseUint(userID, 10, 64)
		if err == nil {
			bookCreateDTO.UserID = convertedUserID
		}
		result := c.bookService.Insert(bookCreateDTO)
		response := helper.BuildSuccessResponse(true, "OK", result)
		return context.JSON(http.StatusCreated, response)
	}
}

func (c *bookController) Update(context echo.Context) error {
	var bookUpdateDTO dto.BookUpdateDTO
	errDTO := context.Bind(&bookUpdateDTO)
	if errDTO != nil {
		res := helper.BuildErrorResponse("Failed to process request", errDTO.Error(), helper.EmptyObj{})

		return context.JSON(http.StatusBadRequest, res)
	}

	authHeader := context.Request().Header.Get("Authorization")
	token, errToken := c.jwtService.ValidateToken(authHeader)
	if errToken != nil {
		panic(errToken.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["user_id"])
	if c.bookService.IsAllowedToEdit(userID, bookUpdateDTO.ID) {
		id, errID := strconv.ParseUint(userID, 10, 64)
		if errID == nil {
			bookUpdateDTO.UserID = id
		}
		result := c.bookService.Update(bookUpdateDTO)
		response := helper.BuildSuccessResponse(true, "OK", result)
		return context.JSON(http.StatusOK, response)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		return context.JSON(http.StatusForbidden, response)
	}
}

func (c *bookController) Delete(context echo.Context) error {
	var book model.Book
	id, err := strconv.ParseUint(context.Param("id"), 0, 0)
	if err != nil {
		response := helper.BuildErrorResponse("Failed tou get id", "No param id were found", helper.EmptyObj{})
		return context.JSON(http.StatusBadRequest, response)
	}
	book.ID = id
	authHeader := context.Request().Header.Get("Authorization")
	token, errToken := c.jwtService.ValidateToken(authHeader)
	if errToken != nil {
		panic(errToken.Error())
	}
	claims := token.Claims.(jwt.MapClaims)
	userID := fmt.Sprintf("%v", claims["user_id"])
	if c.bookService.IsAllowedToEdit(userID, book.ID) {
		c.bookService.Delete(book)
		res := helper.BuildSuccessResponse(true, "Deleted", helper.EmptyObj{})
		return context.JSON(http.StatusOK, res)
	} else {
		response := helper.BuildErrorResponse("You dont have permission", "You are not the owner", helper.EmptyObj{})
		return context.JSON(http.StatusForbidden, response)
	}
}

func (c *bookController) getUserIDByToken(token string) string {
	aToken, err := c.jwtService.ValidateToken(token)
	if err != nil {
		panic(err.Error())
	}
	claims := aToken.Claims.(jwt.MapClaims)
	id := fmt.Sprintf("%v", claims["user_id"])
	return id
}
