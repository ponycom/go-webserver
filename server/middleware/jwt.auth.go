package middleware

import (
	"go-server/helper"
	"go-server/service"
	"log"
	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

func AuthorizeJWT(jwtService service.JWTService) echo.MiddlewareFunc {

	return func(next echo.HandlerFunc) echo.HandlerFunc {

		return func(c echo.Context) error {
			// authHeader := c.Request().Header.Get("Authorization")
			// if authHeader == "" {
			// 	response := helper.BuildErrorResponse("Failed to process request", "No token found", nil)
			// 	return c.JSON(http.StatusBadRequest, response)
			// }
			log.Println("AuthorizeJWT: Start")
			cookie, err := c.Cookie("access_token")
			if err != nil {
				log.Println(err)
				response := helper.BuildErrorResponse("Cookie is not valid", err.Error(), nil)
				return c.JSON(http.StatusInternalServerError, response)
			}
			log.Println("cookie: ", cookie.Value)
			token, err := jwtService.ValidateToken(cookie.Value)
			if token.Valid {
				claims := token.Claims.(jwt.MapClaims)
				log.Println("Claim[user_id]: ", claims["user_id"])
				log.Println("Claim[issuer]: ", claims["issuer"])
			} else {
				log.Println(err)
				response := helper.BuildErrorResponse("Token is not valid", err.Error(), nil)
				return c.JSON(http.StatusUnauthorized, response)
			}
			log.Println("AuthorizeJWT: End")
			return nil
		}
	}

}
