package controllers

import (
	entity "myapp/internal/structures"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var (
	db *gorm.DB
)

func InitPersonalAccount(db1 *gorm.DB, s *gin.Engine) {
	db = db1

	s.POST("/updateavatar", UpdateUserAvatar())
	s.POST("/updatename", UpdateName())
	s.POST("/updatesurname", UpdateSurname())
	s.POST("/updatepassword", UpdatePassword)
	s.POST("/logout", Logout)
	s.POST("/page/personal", PersonalPage())
}

func PersonalPage() gin.HandlerFunc{
	return func(ctx *gin.Context) {
		sessions:=sessions.Default(ctx);
		id:=sessions.Get("id")

		if id==nil{
			ctx.JSON(204, gin.H{"message":"You ned to login to see this"});
			return;
		}

		var user entity.User
		query := "SELECT * FROM users WHERE user_id = ?"
		if err:=db.Raw(query, id).Scan(&user).Error; err!=nil{
			ctx.JSON(400, gin.H{"message":"Failed get user"});
			return;
		}

		ctx.JSON(200, user);
	}
}

func UpdatePassword(c *gin.Context) {
	var request struct {
		NewPassword string `json:"user_password"`
	}
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(400, gin.H{"message": "Invalid request"})
		return
	}

	sessions := sessions.Default(c)
	id := sessions.Get("id")

	if id == nil {
		c.JSON(400, gin.H{"Message": "Not logged"})
		return
	}

	if err := db.Exec("UPDATE users SET user_password = ? WHERE user_id = ?", request.NewPassword, id).Error; err != nil {
		c.JSON(400, gin.H{"message": "Error updating password"})
		return
	}

	c.JSON(200, gin.H{"message": "Password updated"})
}

func UpdateName() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request struct {
			Name string `json:"user_name"`
		}
		if err := ctx.ShouldBindJSON(&request); err != nil {
			ctx.JSON(400, gin.H{"message": "Invalid request"})
			return
		}

		sessions := sessions.Default(ctx)
		id := sessions.Get("id")

		if id == nil {
			ctx.JSON(400, gin.H{"Message": "Not logged"})
			return
		}

		if err := db.Exec("UPDATE users SET user_name = ? WHERE user_id = ?", request.Name, id).Error; err != nil {
			ctx.JSON(400, gin.H{"message": "Error updating name"})
			return
		}

		ctx.JSON(200, gin.H{"message": "Name updated"})
	}
}

func UpdateSurname() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var request struct {
			Surname string `json:"user_surname"`
		}
		if err := ctx.ShouldBindJSON(&request); err != nil {
			ctx.JSON(400, gin.H{"message": "Invalid request"})
			return
		}

		sessions := sessions.Default(ctx)
		id := sessions.Get("id")

		if id == nil {
			ctx.JSON(400, gin.H{"Message": "Not logged"})
			return
		}

		if err := db.Exec("UPDATE users SET user_surname = ? WHERE user_id = ?", request.Surname, id).Error; err != nil {
			ctx.JSON(400, gin.H{"message": "Error updating surname"})
			return
		}

		ctx.JSON(200, gin.H{"message": "Surname updated"})
	}
}

func UpdateUserAvatar() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var newImage struct {
			ImageData []byte `json:"user_avatar"`
		}
		if err := ctx.ShouldBindJSON(&newImage); err != nil {
			ctx.JSON(400, gin.H{"message": "Bad request"})
			return
		}

		sessions := sessions.Default(ctx)
		id := sessions.Get("id")

		if id == nil {
			ctx.JSON(400, gin.H{"Message": "Not logged"})
			return
		}

		if err := db.Exec("UPDATE users SET user_avatar = ? WHERE user_id = ?", newImage.ImageData, id).Error; err != nil {
			ctx.JSON(400, gin.H{"message": "Error updating avatar"})
			return
		}

		ctx.JSON(200, gin.H{"message": "Updated avatar"})
	}
}

func Logout(c *gin.Context) {
	sessions := sessions.Default(c)

	sessions.Delete("id")
	sessions.Delete("login")
	sessions.Delete("code")

	if err := sessions.Save(); err != nil {
		c.JSON(500, gin.H{"message": "Error saving session"})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully logged out"})
}
