# ITAM_Shop Backend

ITAM_Shop is a web application developed using Go and the Gin framework. This part of the repository contains the backend of the application, which handles requests, manages sessions, and interacts with the database.

### Prerequisites

- Install [Go]
- Ensure that your computer has access to the remote database. If not, contact @BRDDRTy on Telegram.

### Cloning the repository

```bash
git clone https://github.com/Artemitol/ITAM_shop
```
### Running the project

## Quick start from the ITAM_Shop directory
```bash
	./docker/build.sh
	./docker/compose_up.sh
```
## Shutting down from the ITAM_Shop directory
```bash
	./docker/compose_down.sh
```
## Additional information for running
If access is denied
```bash
	chmod -R +x ./docker
```
View application logs
```bash
	docker logs shop-itam
```

- Switch to the required branch (assumed to be develop)
```bash
git checkout develop
```

- Navigate to the backend directory
```bash
cd backend/
```

- Check installed dependencies
```bash
go mod tidy
```

- Configure the firewall before running the project
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 9090/tcp
sudo ufw reload
sudo ufw status
```

- To start, run the following commands
```bash
cd cmd
go run .
```
The server will be running on port http://localhost:8080
Check the server status at http://localhost:8080/health

### Endpoints
Server health

	GET /health - Check server status.

Registration and login

	POST /register - Adds a user to the database and saves the email confirmation code in a cookie. Request -> entity.User Response -> .
	POST /login    - User login.
	POST /checkemail - Send email with code and confirm it. Request -> {"code":"..."}. Response -> 200 if the code is correct.
	POST /newpassword - Update password if the user is registered or recover password. Request -> `json:"user_password"`
	POST /recoverpassword - Recover password. Request -> `json:"user_login"`

	Scenarios:
		Registration:
		- 1. /register Send registration request in the format entity.User(user_login, user_email, user_password)
		- 2. The backend sends an email to the user with a confirmation code, after which the user must confirm the email.
		- 3. /checkemail Request -> `json:"code"`. Email confirmation Response 200 OK
		- 4. After receiving the response, the user is successfully registered.
		Login:
		- 1. /login User login
		Password recovery:
		- 1. /recoverpassword Send request `json:"user_login"`
		- 2. The backend sends an email to the user with a confirmation code, after which the user must confirm the email.
		- 3. /checkemail Request -> `json:"code"`. Email confirmation Response 200 OK
		- 4. After confirming the email, update the password.
		- 5. /newpassword Request -> `json:"user_password"`
		- 6. After receiving the response 200, the password is successfully changed.

Personal account

	POST /page/personal - Get all user information for the personal account page. Response -> entity.User
	POST /logout - Log out of the personal account (deletes session information. After calling, redirect to the catalog).
	POST /updateavatar - Update user avatar. Request -> `json:"user_avatar"` format jpeg 60KB, user ID is determined automatically.
	POST /updatename - Update user name. Request -> `json:"user_name"`
	POST /updatesurname - Update user surname. Request -> `json:"user_surname"`
	POST /updatepassword - Update user password. Request -> `json:"user_password"`

Transactions

	POST /givemoney Request {`json:"user_login"`, `json:"user_money"`} Add money to the user's account.

	For the backend:
		- Added function TakeOffMoney(login, price) -> bool Returns whether the payment was successful or not.

Catalog

	GET /catalog - Get a list of products from the catalog.
	POST /filter - Apply filter to products in the catalog.

	GET /fav_items - Get a list of favorite products as an array of entity.Product.
	GET /get_item_page/:id - Get product parameters by its ID as entity.Product.
	POST /fav_items/:id - Add product to favorites.
	DELETE /fav_items/:id - Remove product from favorites.

	GET /cart - Get a list of products in the cart as an array of entity.Product.
	POST /cart/add/:id - Add product to cart.
	DELETE /cart/remove/:id - Remove product from cart.

	POST /search_item/name - Request -> json:"product_name" Response -> array of entity.Product.

Administrative functions

	POST /createnewproduct - Create a new product (without admin logic). Request -> entity.Product.

	POST /editproductname/:id - Edit product name (without admin logic). Request -> `json:"product_name"`
	POST /editproductprice/:id - Edit product price (without admin logic). Request -> int `json:"product_price"`
	POST /editproductdescription/:id - Edit product description (without admin logic). Request -> `json:"product_description"`
	POST /editproductcategory/:id - Edit product category (without admin logic). Request -> `json:"product_category"`
	POST /editproductquantity/:id - Edit product quantity (without admin logic). Request -> int `json:"product_quantity"`
	POST /editproductstockquantity/:id - Edit product stock quantity (without admin logic). Request -> int `json:"product_stock_quantity"`
	POST /deleteproduct/:id - Delete product (without admin logic).

	POST /add_features_to_item/:id_item/:id_features - Add a feature (parameter) with id = id_features to the item by id_item (all of them can be viewed in the database, we need to discuss how to add them to the user on the frontend). Each parameter has a value that needs to be passed. Request -> 'json:"message"'

	POST /updateimageforproduct/:id Add/update product photo. Request -> `json:"user_avatar"` format jpeg 60KB.

### Used entities

# User
```go
type User struct {
	gorm.Model
	ID          uint    `json:"user_id"`
	Balance     float64 `json:"user_balance"`
	UserName    string  `json:"user_name"`
	UserSurname string  `json:"user_surname"`
	Login       string  `json:"user_login"`
	Email       string  `json:"user_email"`
	Password    string  `json:"user_password"`
	Admin       bool    `json:"user_admin_rights"`
	Avatar      []byte  `json:"user_avatar"`
	//
}
```
# FilterParams
```go
type FilterParams struct {
	Category string  `json:"category"`
	MinPrice float64 `json:"minPrice"`
	MaxPrice float64 `json:"maxPrice"`
}
```
# Product
```go
type Product struct {
	ProductID     uint    `json:"product_id"`
	Price         float64 `json:"product_price"`
	Name          string  `json:"product_name"`
	Image         []byte  `json:"product_image"`
	Description   string  `json:"product_description"`
	Category      string  `json:"product_category"`
	Quantity      int     `json:"product_quantity"`
	StockQuantity int     `json:"product_stock_quantity"`
	Is_in_cart    int     `json:"is_in_cart"`
	Is_in_fav     int     `json:"is_in_fav"`
	//
}
```
# Feature
```go
type Feature struct {
	Name                string `json:"name_of_feature"`
	Value               string `json:"value_for_feature"`
	Unit_of_measurement string `json:"Unit_of_measurement"`
}
```
# CartItem
```go
type CartItem struct {
	ProductID_cart uint    `json:"product_id"`
	Quantity       int     `json:"quantity"`
	Product        Product `json:"product"`
}
```
# Cart
```go
type Cart struct {
	Items []CartItem `json:"items"`
}
```
# Favorite
```go
type Favorite struct {
	gorm.Model
	ProductID      uint    `json:"product_id"`
	Price          float64 `json:"product_price"`
	Name           string  `json:"product_name"`
	Image          uint    `json:"product_image"`
	Description    string  `json:"product_description"`
	Category       string  `json:"product_category"`
	Specifications string  `json:"product_specifications"`
	Quantity       int     `json:"product_quantity"`
	StockQuantity  int     `json:"product_stock_quantity"`
	IsFavorite     bool    `json:"is_favorite"`
}
```

# Order
```go
type Order struct {
	gorm.Model
	UserID uint   `gorm:"not null" json:"user_id"`
	Status string `gorm:"not null" json:"status"`
}
```