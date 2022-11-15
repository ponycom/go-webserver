package config

import (
	"go-server/controller"
	"go-server/middleware"
	"go-server/repository"
	"go-server/service"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var (
	db             *gorm.DB                  = SetupDatabaseConnection()
	userRepository repository.UserRepository = repository.NewUserReponsitory(db)
	bookRepository repository.BookRepository = repository.NewBookRepository(db)
	jwtService     service.JWTService        = service.NewJWTService()
	authService    service.AuthService       = service.NewAuthService(userRepository)
	userService    service.UserService       = service.NewUserService(userRepository)
	bookService    service.BookService       = service.NewBookService(bookRepository)
	authController controller.AuthController = controller.NewAuthController(authService, jwtService)
	userController controller.UserController = controller.NewUserController(userService, jwtService)
	bookController controller.BookController = controller.NewBookController(bookService, jwtService)
)

/**
 * WEB
 * */
func WebConfig(e *echo.Echo) {
	e.GET("/", controller.IndexController)

	//authRouter := e.Group("api/auth", middleware.AuthorizeJWT(jwtService))
	authRouter := e.Group("api/auth")
	authRouter.POST("/login", authController.Login)
	authRouter.POST("/register", authController.Register)
	authRouter.POST("/logout", authController.Logout)

	userRoutes := e.Group("api/user")
	userRoutes.Use(middleware.AuthorizeJWT(jwtService))
	userRoutes.GET("/profile", userController.Profile)
	userRoutes.PUT("/update", userController.Update)

	bookRoutes := e.Group("api/books", middleware.AuthorizeJWT(jwtService))
	bookRoutes.GET("/", bookController.All)
	bookRoutes.POST("/", bookController.Insert)
	bookRoutes.GET("/:id", bookController.FindByID)
	bookRoutes.PUT("/:id", bookController.Update)
	bookRoutes.DELETE("/:id", bookController.Delete)
}
