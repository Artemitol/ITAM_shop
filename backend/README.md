# ITAM_Shop Backend

ITAM_Shop - это веб-приложение, разработанное с использованием Go и фреймворка Gin. Эта часть репозитория содержит серверную часть приложения, которая обрабатывает запросы, управляет сессиями и взаимодействует с базой данных.

### Предварительные требования

- Установите [Go]
- Убедитесь что с вашего компьютера есть доступ к удаленной базе данных. Если такогого нет обращаться к @BRDDRTy в Telegram

### Клонирование репозитория

```bash
git clone https://github.com/Artemitol/ITAM_shop
```
### Запуск проекта

## Быстрый запуск из директории ITAM_Shop
```bash
    ./docker/build.sh
    ./docker/compose_up.sh
```
## Отключение из директории ITAM_Shop
```bash
    ./docker/compose_down.sh
```
## Дополнительная информация по запуску
Если отказано в доступе
```bash
    chmod -R +x ./docker
```
Посмотреть логи приложения
```bash
    docker logs shop-itam
```

- Переключитесь на нужную ветку(подразумевается develop)
```bash
git checkout develop
```

- Перейдите в директорию backend
```bash
cd backend/
```

- Проверьте установленные зависимости
```bash
go mod tidy
```

- Перед запуском проекта настройте брандмауэр
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 8080/tcp
sudo ufw allow 9090/tcp
sudo ufw reload
sudo ufw status
```

- Для запуска пропишите следущие команды
```bash
cd cmd
go run .
```
Сервер будет запущен на порту http://localhost:8080
Проверить cтатус сервера можно по http://localhost:8080/health

### Эндпоинты
Здоровье сервера

    GET /health - Проверка состояния сервера.

Регистрация и вход

    POST /register - Добавляет пользователя в базу данных и сохраняет в cookie код подтверждения почты Request -> entity.User Response -> .
    POST /login    - Вход пользователя в аккаунт.
    POST /checkemail - Отправка email с кодом и его подтверждение Request -> {"code":"..."}. Response -> 200 если код правильный
    POST /newpassword - Обновление пароля если пользователь зарегистрирован или восстановление пароль Request -> `json:"user_password"`
    POST /recoverpassword - Восстановление пароля Request -> `json:"user_login"`

    Сценарии:
        Регистрация:
        - 1. /register Отправка запроса на регистрацию формата entity.User(user_login, user_email, user_password)
        - 2. Со стороны бэка отправляется письмо пользователю с кодом подтверждения после чего пользователь должен подтвердить почту
        - 3. /checkemail Запрос -> `json:"code"`. Подтверждение почты Response 200 OK
        - 4. После получения ответа пользователь успешно зарегистрирован
        Вход:
        - 1. /login Вход пользователя
        Восстановление пароля:
        - 1. /recoverpassword Отправка запроса `json:"user_login"`
        - 2. Со стороны бэка отправляется письмо пользователю с кодом подтверждения после чего пользователь должен подтвердить почту
        - 3. /checkemail Запрос -> `json:"code"`. Подтверждение почты Response 200 OK
        - 4. После подтверждения почты обновление пароля
        - 5. /newpassword Запрос -> `json:"user_password"`
        - 6. После получения ответа 200 пароль успешно изменен

Личный кабинет

	POSt /page/personal - получение всей информации о пользователе для страницы личного кабинета Response -> entity.User
    POST /logout - выход из личного кабинета(удаляет информацию о сессии. После вызова сделать редирект к каталогу)
    POST /updateavatar - Обновить аватар пользователя Request -> `json:"user_avatar"` формат jpeg 60Кб id пользователя определяется автоматически
    POST /updatename - Обновить имя пользователя Request -> `json:"user_name"` 
    POST /updatesurname - Обновить фамилию пользователя Request -> `json:"user_surname"` 
    POST /updatepassword - Обновить пароль пользователя Request -> `json:"user_password"` 


Транзакции

    POST /givemoney Request {`json:"user_login"`, `json:"user_money"`} Добавить деньги на счет пользователя

    Для бэкэнда:
        - Добавлена функция TakeOffMoney(login, price) -> bool Возвращает прошла ли оплата или нет

Каталог

	GET /catalog - Получение списка товаров из каталога
	POST /filter - Применение фильтра к товарам в каталоге

	GET /fav_items - Получение списка товаров, добавленных в избранное в виде массива entity.Product
	GET /get_item_page/:id - Получение параметров товара по его id в виде entity.Product
	POST /fav_items/:id - Добавление товара в избранное
	DELETE /fav_items/:id - Удаление товара из избранного

	GET /cart - Получение списка товаров в корзине в виде массива entity.Product
	POST /cart/add/:id - Добавление товара в корзину
	DELETE /cart/remove/:id - Удаление товара из корзины

	POST /serch_item/name - Request -> json:"product_name" Response -> массив entity.Product


Административные функции

    POST /createnewproduct - создание нового продукта(без логики администратора) Request -> entity.Product

    POST /editproductname/:id - редактирование имени продукта(без логики администратора) Request -> `json:"product_name"`
    POST /editproductprice/:id - редактирование цены продукта(без логики администратора) Request -> int `json:"product_price"`
    POST /editproductdescription/:id - редактирование описания продукта(без логики администратора) Request -> `json:"product_description"`
    POST /editproductcategory/:id - редактирование категории продукта(без логики администратора) Request -> `json:"product_category"`
    POST /editproductquantity/:id - редактирование колличества продукта(без логики администратора) Request -> int `json:"product_quantity"`
    POST /editproductstockquantity/:id - редактирование продукта(без логики администратора) Request -> int `json:"product_stock_quantity"`
    POST /deleteproduct/:id - удаление продукта(без логики администратора)

    POST /add_features_to_item/:id_item/:id_features - к предмету по id_item добавить фичу(параметр) c id = id_features(их все можно в бд посмотреть, надо обсудить как на фронте их добавлять пользователю). У каждого параметра есть значение которое нужно передать Request -> 'json:"message"'

	POST /updateimageforproduct/:id Добавление/обновление фото продукта Request -> `json:"user_avatar"` формат jpeg 60Кб


### Используемые сущности

# User
```bash
type User struct {
	gorm.Model
	ID          uint    `json:"user_id"`
	Balance     float64 `json:"user_balance"`
	UserName    string  `json:"user_name"
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
```bash
type FilterParams struct {
	Category string  `json:"category"`
	MinPrice float64 `json:"minPrice"`
	MaxPrice float64 `json:"maxPrice"`
}
```
# Product
```bash
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
```bash
type Feature struct {
	Name                string `json:"name_of_feature"`
	Value               string `json:"value_for_feature"`
	Unit_of_measurement string `json:"Unit_of_measurement"`
}
```
# CartItem
```bash
type CartItem struct {
	ProductID_cart uint    `json:"product_id"`
	Quantity       int     `json:"quantity"`
	Product        Product `json:"product"`
}
```
# Cart
```bash
type Cart struct {
	Items []CartItem `json:"items"`
}
```
# Favourite
```bash
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
```bash
type Order struct {
	gorm.Model
	UserID uint   `gorm:"not null" json:"user_id"`
	Status string `gorm:"not null" json:"status"`
}
```
