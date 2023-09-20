# RESTful E-Commerce API

![Static Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![Static Badge](https://img.shields.io/badge/18.13.0-Node.Js-green)
![Static Badge](https://img.shields.io/badge/4.18.2-Express.Js-blue)
![Static Badge](https://img.shields.io/badge/DB-MongoDB-green)
![Static Badge](https://img.shields.io/badge/7.4.0-mongoose-green)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-red)
![Static Badge](https://img.shields.io/badge/2.8.5-cors-red)
![Static Badge](https://img.shields.io/badge/1.20.2-body--parser-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-red)
![Static Badge](https://img.shields.io/badge/2.2.0-http--status--codes-red)
![Static Badge](https://img.shields.io/badge/17.9.2-joi-red)
![Static Badge](https://img.shields.io/badge/5.1.0-bcrypt-red)
![Static Badge](https://img.shields.io/badge/9.0.1-jsonwebtoken-red)
![Static Badge](https://img.shields.io/badge/3.2.0-easy--rbac-red)
![Static Badge](https://img.shields.io/badge/6.9.4-nodemailer-red)
![Static Badge](https://img.shields.io/badge/1.10.0-morgan-red)
![Static Badge](https://img.shields.io/badge/1.6.6-slugify-red)
![Static Badge](https://img.shields.io/badge/0.32.5-sharp-red)
![Static Badge](https://img.shields.io/badge/8.48.0-eslint-8A2BE2)
![Static Badge](https://img.shields.io/badge/13.6.0-stripe-blue)

## Key feature

1. Authentication:

- User can sign up, after that a verification email will be sent to his inbox to verify his email, then he can login to the system.
- A new Admin can be added only by another admin.

2. Authorization:

- Admin:

  - Can add, modify and delete categories, subcategories, brands, products and coupons.
  - Can add, modify and delete either users or admins.
  - Can add, modify and delete app setting _like tax price and shipment price_.
  - Can delete offensive user's reviews.
  - Can modify order status _like if the order has been delivered, and if the order has been paid if it was a cash order_.

- User:

  - Can modify his own data _like addresses, email or phone number_.
  - Can add products to his wishlist.
  - Can add items to his cart.
  - Can do either cash or online order.
  - Can add an only one review for each product.

3. Online payment gateway

## Installing

First, clone a fresh copy:

```Bash

git clone https://github.com/the-fayed/e-commerce.git

```

Then, you need to run `npm install` to install app dependencies.

Finally, you need to set up the environment variables:

``` env
# DB
DB_CONNECTION_STRING: either a local or atlas mongodb connection

# APP SETTINGS
NODE_ENV: either development or production
PORT: listen port for the app
BASE_URL: app baseurl

# JWT
SECRET_KEY: create a JWT secret key at lest 32 character.
EXPIRATION_PERIOD: how long the JWT user access token will be valid

# NODEMAILER
EMAIL_HOST: ex. smtp.gmail.com
EMAIL_PORT: ex. 587 and the secure option will set as false
EMAIL_USER: sender email
EMAIL_PASSWORD: sender password

# STRIPE SETTINGS
STRIPE_API_KEY: strip secret api key, and the public key will be sent to the front-end developer
STRIPE_WEBHOOK_KEY: webhook secret key

```

## APIs

### categories APIs

1. Create new category `POST /api/v1/category`

- Allowed to: only admins.
- Type: form data.
- Request body example:

| Key | Value |
|----:|-------|
|name | Category name |
|image| Category image|

Response body example:

```JSON
{
  "status": "success",
  "data": {
      "name": "new category",
      "slug": "new-category",
      "image": "https://host.domain/categories/category-1695220377744.jpeg",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

2. Get all categories `GET /api/v1/categories`

- Open endpoint.
- No authentication required for this API call.
- API support pagination by adding page and size to request quey `/categories?page=1&size=20`.
- API support field limiting by adding which fields to return in request query ex. `/categories?fields=name,image`.
- API support search by adding search key word to request query ex. `/categories?keyword=category`.
- API support sorting by adding sort method to request query ex. `/categories?sort=name`.
- Response body example:

```json
{
  "status": "success",
  "page": 1,
  "numberOfPages": 1,
  "results": 4,
  "data": [
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new category",
        "slug": "new-category",
        "image": "https://host.domain/categories/category-1695220377744.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new category",
        "slug": "new-category",
        "image": "https://host.domain/categories/category-1693998837911.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new category",
        "slug": "new-category",
        "image": "https://host.domain/categories/category-1693939557425.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new category",
        "slug": "new-category",
        "image": "https://host.domain/categories/category-1693855905828.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      }
  ]
}
```

3. Get specific category: `GET /api/v1/categories/:id`

- Open endpoint.
- No authentication required for this API call.
- Response body example:

```JSON
{
  "status": "success",
  "data": {
      "_id": "650b02996dde3fe0155a2f5a",
      "name": "new category",
      "slug": "new-category",
      "image": "https://host.domain/categories/category-1695220377744.jpeg",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

4. Update specific category: `PUT /api/v1/categories/:id`

- Allowed to: only admins.
- Type: form data.
- Request body example:

| Key | Value |
|----:|-------|
|name | Category name |
|image| Category image|

Response body example:

```JSON
{
  "status": "success",
  "data": {
      "name": "updated category",
      "slug": "updated-category",
      "image": "https://host.domain/categories/category-1695220377744.jpeg",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

5. Delete specific category: `DELETE /api/v1/categories/:id`

- Allowed to: only admins.

### Subcategories APIs

Nested routes from category routes

1. Create new subcategory: `POST /api/v1/categories/:categoryId/subcategories`

- Allowed to: only admins
Request body example:

```JSON
{
  "name": "new subcategory"
}
```

Response body example:

```JSON
{
  "status": "success",
  "data": {
      "name": "new subcategory",
      "slug": "new-subcategory",
      "category": "650b02996dde3fe0155a2f5a"
      "image": "https://host.domain/subcategories/subcategory-1695220377744.jpeg",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

2. Get all subcategories: `GET /api/v1/category/:categoryId/subcategories`

- Open endpoint.
- No authentication required for this API call.
- API support pagination by adding page and size to request quey `/subcategory?page=1&size=20`.
- API support field limiting by adding which fields to return in request query ex. `/subcategory?fields=name,image`.
- API support search by adding search key word to request query ex. `/subcategory?keyword=subcategory`.
- API support sorting by adding sort method to request query ex. `/subcategory?sort=name`.
- Response body example:

```json
{
  "status": "success",
  "page": 1,
  "numberOfPages": 1,
  "results": 4,
  "data": [
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a"
        "image": "https://host.domain/categories/subcategory-1695220377744.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a"
        "image": "https://host.domain/categories/subcategory-1693998837911.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a"
        "image": "https://host.domain/categories/subcategory-1693939557425.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a"
        "image": "https://host.domain/categories/subcategory-1693855905828.jpeg"
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      }
  ]
}
```
