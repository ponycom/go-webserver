package main

import (
	"go-server/config"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

var (
	db *gorm.DB = config.SetupDatabaseConnection()
)

func main() {
	defer config.CloseDatabaseConnection(db)
	e := echo.New()
	//CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowCredentials: true,
	}))
	//CSRF
	//e.Use(middleware.CSRF())
	// Routing
	config.WebConfig(e)

	e.Logger.Fatal(e.Start(":1323"))
}
