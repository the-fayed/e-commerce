# RESTful E-Commerce API

![Static Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
![Static Badge](https://img.shields.io/badge/18.13.0-Node.Js-green)
![Static Badge](https://img.shields.io/badge/4.18.2-Express.Js-blue)
![Static Badge](https://img.shields.io/badge/DB-MongoDB-green)
![Static Badge](https://img.shields.io/badge/7.4.0-mongoose-green)
![Static Badge](https://img.shields.io/badge/3.0.1-nodemon-red)
![Static Badge](https://img.shields.io/badge/2.8.5-cors-red)
![Static Badge](https://img.shields.io/badge/1.7.4-compression-red)
![Static Badge](https://img.shields.io/badge/16.3.1-dotenv-red)
![Static Badge](https://img.shields.io/badge/2.2.0-http--status--codes-red)
![Static Badge](https://img.shields.io/badge/7.0.1-express--validator-red)
![Static Badge](https://img.shields.io/badge/1.2.0-express--async--handler-red)
![Static Badge](https://img.shields.io/badge/5.1.0-bcrypt-red)
![Static Badge](https://img.shields.io/badge/9.0.1-jsonwebtoken-red)
![Static Badge](https://img.shields.io/badge/3.2.0-easy--rbac-red)
![Static Badge](https://img.shields.io/badge/6.9.4-nodemailer-red)
![Static Badge](https://img.shields.io/badge/1.10.0-morgan-red)
![Static Badge](https://img.shields.io/badge/1.6.6-slugify-red)
![Static Badge](https://img.shields.io/badge/0.32.5-sharp-red)
![Static Badge](https://img.shields.io/badge/8.48.0-eslint-8A2BE2)
![Static Badge](https://img.shields.io/badge/13.6.0-stripe-blue)

## Tabel of content
- <a href= "https://github.com/the-fayed/e-commerce#key-feature">Key feature</a>
- <a href= "https://github.com/the-fayed/e-commerce#installation">Installation</a>
- <a href= "https://github.com/the-fayed/e-commerce#schemas">Schemas</a>
    - <a href= "https://github.com/the-fayed/e-commerce#category-schema">Category schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#subcategory-schema">Subcategory schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#brand-schema">Brand schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#product-schema">Product schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#user-schema">User shema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#cart-schema">Cart schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#review-schema">Review schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#coupon-schema">Coupon schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#order-schema">Order schema</a>
    - <a href= "https://github.com/the-fayed/e-commerce#app-settings-schema">App settings schema</a>
- <a href= "https://github.com/the-fayed/e-commerce#endpoints">Endpoints</a>

## Key feature

1. Authentication:

The user can sign up, and after that a verification email will be sent to his inbox to verify his email, then he can log in to the system.
- A new Admin can be added only by another admin.

2. Authorization:

- Admin:

  - Can add, modify, and delete categories, subcategories, brands, products, and coupons.
  - Can add, modify, and delete either users or admins.
  - Can add, modify, and delete app settings _like tax price and shipment price_.
  - Can delete offensive user's reviews.
  - Can modify order status _like if the order has been delivered, and if the order has been paid if it was a cash order_.

- User:

  - Can modify his own data _like addresses, email or phone number_.
  - Can modify his password or reset it. 
  - Can add products to his wishlist.
  - Can add items to his cart.
  - Can do either cash or online orders.
  - Can add only one review for each product.

3. Online payment gateway

## Installation

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
SECRET_KEY: create a JWT secret key of at least 32 characters.
EXPIRATION_PERIOD: how long the JWT user access token will be valid

# NODEMAILER
EMAIL_HOST: ex. smtp.gmail.com
EMAIL_PORT: ex. 587 and the secure option will be set as false
EMAIL_USER: sender email
EMAIL_PASSWORD: sender password

# STRIPE SETTINGS
STRIPE_API_KEY: strip the secret api key, and the public key will be sent to the front-end developer
STRIPE_WEBHOOK_KEY: webhook secret key

```

## Schemas

### Category Schema

```Javascript
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, `Too short category name`],
      maxlength: [32, `Too long category name`],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    image: {
      type: String,
    },
  }
```

### Subcategory schema

```Javascript
  {
    name: {
      type: String,
      required: true,
      minlength: [2, `Too short subcategory name`],
      maxlength: [32, `Too long subcategory name`],
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `category`,
      required: true,
    },
  }
```

### Brand schema

```Javascript
{
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, `Too short brand name`],
    maxlength: [32, `Too long brand name`],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  image: {
    type: String,
  }
}
```
### Product schema

```Javascript
  {
    title: {
      type: String,
      required: true,
      minlength: [2, `Too short product name`],
      maxlength: [100, `Too long product name`],
      unique: [true, `Product name must be unique`],
    },
    slug: {
      type: String,
      required: true,
      minlength: [2, `Too short product slug`],
      maxlength: [100, `Too long product slug`],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [2, `Too short product description`],
      maxlength: [2000, `Too long product description`],
    },
    price: {
      type: Number,
      required: true,
      min: [0, `Price cannot be negative`],
      maxlength: [2000, `Too long product price`],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `category`,
      required: true,
    },
    subcategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: `subcategory`,
      },
    ],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `brand`,
    },
    images: [String],
    cover: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [
      {
        type: String,
      },
    ],
    sizes: [
      {
        type: String
      }
    ],
    ratingsAverage: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  }
```

### User schema 

```Javascript
  {
    name: {
      type: String,
      required: [true, `name is required`],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, `email is required`],
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      required: [true, `password is required`],
      minlength: [8, `Too short password`],
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    addresses: [
      {
        id: mongoose.Schema.Types.ObjectId,
        alias: String,
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
    ],
    passwordChangedAt: Date,
    resetPasswordCode: String,
    resetPasswordExpire: Date,
    resetCodeVerified: Boolean,
    role: {
      type: String,
      eunm: [`admin`, `user`],
      default: `user`,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verifyEmailToken: String,
  }
```

### Cart schema

```Javascript
  {
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: [true, "product id is required"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        size: String,
        price: Number,
      },
    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User id is required"],
    },
  }
```

### Review schema

```Javascript
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    tile: {
      type: String,
    },
    rating: {
      type: Number,
      min: [1, "Minimum ratings value is 1.0"],
      max: [5, "Max ratings value is 5.0"],
      required: true,
    },
  }
```
_note that after any new review total reviews and average rating for the product reviewed will be change automatically, and any user can review every product one time only._

### Coupon schema

```Javascript
  {
    name: {
      type: String,
      required: [true, "Coupon name is required"],
      trim: true,
    },
    expire: {
      type: Date,
      required: [true, "Coupon expire date is required"],
    },
    discount: {
      type: Number,
      required: [true, "Coupon discount is required"],
    },
  }
```

### Order schema

```Javascript
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user id is required"],
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: [true, "product id is required"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
        color: String,
        size: String,
        price: Number,
      },
    ],
    taxPrice: {
      type: Number,
      default: 0,
    },
    shipmentPrice: {
      type: Number,
      default: 0,
    },
    shippingAddress: {
      details: String,
      phone: String,
      city: String,
      postalCode: String
    },
    totalPrice: Number,
    paymentMethod: {
      type: String,
      enum: ["online", "cash"],
      default: "cash",
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  }
```
_note that after every new order total stock of every product will be decreased automatically by the quantity of it on that order, on the other hand, the total sold of this product will be increased automatically by the quantity of it on that order._

### App settings schema

```Javascript
  {
    taxPrice: {
      type: Number,
      required: true,
    },
    shipmentPrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  }
```

## Endpoints

### Auth endpoints

#### Sign up endpoint

```
POST /api/v1/auth/signup
```
- Open endpoint.
- Request body type: form-data.

Request body example:

| Key | Value |
|----:|-------|
| name | new user |
| avatar | user image |
| email | user@email.com |
| password | new password |
| passwordConfirmation | new pawword |

Response body example: 

```JSON
{
    "status": "success",
    "message": "A verification email sent to you, please check your email."
}
```

#### Verify email endpoint

```
GET /api/v1/auth/verify/:token
```
_note that an email verification will be sent to the user's email address._

Response body example: 
```JSON
{
    "status": "success",
    "message": "Email verified"
}
```

#### Log in endpoint

```
POST /api/v1/auth/login
```
- Open endpoint.

Request body example: 

```json
{
    "email": "user@email.com",
    "password": "new password"
}
```

Response body example: 

```json
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmY0ZDBkZjkzZTA1NThiMDJiZTQ2NyIsImlhdCI6MTY5NTM5Nzc1MCwiZXhwIjoxNzAzMTczNzUwfQ.UwSFauV9ryue_VAmIv5uTFcMju2LuhyKAS-dyM3kuPY",
    "data": {
        "wishlist": [],
        "_id": "64ff4d0df93e0558b02be467",
        "name": "new user",
        "slug": "new-user",
        "email": "user@email.com",
        "password": "$2b$09$b4xWTNbbSvoIS/mKRFO2H.T9de5lLwUbb8CP2dfvnns6ZtGuamPu2",
        "role": "user",
        "emailVerified": true,
        "createdAt": "2023-09-11T17:23:25.067Z",
        "updatedAt": "2023-09-11T17:23:25.067Z",
        "__v": 0,
        "addresses": []
    }
}
```

### categories endpoints

#### Create a new category:

```bash
POST /api/v1/category
```

- Allowed to: only admins.
- Type: form data.

 Request body example:

| Key | Value |
|----:|-------|
|name | new category |
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

#### Get all categories:

```
GET /api/v1/categories
```

- Open endpoint.
- No authentication is required for this endpoint call.
- Endpoint supports pagination by adding page and size to request query `/categories?page=1&size=20`.
- Endpoint support field limiting by adding which fields to return in request query ex. `/categories?fields=name,image`.
- Endpoint supports search by adding search keywords to request query, e.g. `/categories?keyword=category`.
- Endpoint supports sorting by adding a sort method to request query, e.g. `/categories?sort=name`.

Response body example:

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

#### Get a specific category:
```
GET /api/v1/categories/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.

 Response body example:

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

#### Update specific category:
```
PUT /api/v1/categories/:id
```

- Allowed to: only admins.
- Type: form data.
  
 Request body example:

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

#### Delete specific category:
```
DELETE /api/v1/categories/:id
```

- Allowed to: only admins.

### Subcategories endpoints

Nested routes from category routes

#### Create a new subcategory:
```
POST /api/v1/categories/:categoryId/subcategories
```

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
      "category": "650b02996dde3fe0155a2f5a",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

#### Get all subcategories:
```
GET /api/v1/category/:categoryId/subcategories
```

- Open endpoint.
- No authentication is required for this endpoint call.
- Endpoint supports pagination by adding page and size to request query `/subcategory?page=1&size=20`.
- Endpoint supports field limiting by adding which fields to return in a request query, e.g. `/subcategory?fields=name,image`.
- Endpoint supports search by adding search keywords to request query, e.g. `/subcategory?keyword=subcategory`.
- Endpoint supports sorting by adding a sort method to request query, e.g. `/subcategory?sort=name`.

Response body example:

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
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new subcategory",
        "slug": "new-subcategory",
        "category": "650b02996dde3fe0155a2f5a",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      }
  ]
}
```
 _note that to get all subcategories not the subcategories on a specific category the endpoint will be `GET /api/v1/subcategories`._

#### Get a specific subcategory
```
GET /api/v1/subcategories/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.

Response body example: 

```JSON
{
  "status": "success",
  "data": {
      "name": "new subcategory",
      "slug": "new-subcategory",
      "category": "650b02996dde3fe0155a2f5a",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```
#### Update a specific subcategory:
```
PUT /api/v1/subcategories/:id
```

- Allowed to: only admins
  
Request body example:

```JSON
{
  "name": "updated subcategory"
}
```

Response body example: 
```JSON
{
  "status": "success",
  "data": {
      "name": "updated subcategory",
      "slug": "updated-subcategory",
      "category": "650b02996dde3fe0155a2f5a",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```
#### Delete a specific subcategory:
```
DELETE /api/v1/subcategories/:id
```

- Allowed to: only admins

### Brands endpoints

#### Create a new brand

```
POST /api/v1/brands
```

- Allowed to: only admins.
- Type: form data.

 Request body example:

| Key | Value |
|----:|-------|
|name | Brand name |
|image| Brand image|

Response body example:

```JSON
{
  "status": "success",
  "data": {
      "name": "new brand",
      "slug": "new-brand",
      "image": "https://host.domain/categories/brand-1695220377744.jpeg",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

#### Get all brands:

```
GET /api/v1/brands
```

- Open endpoint.
- No authentication is required for this endpoint call.
- Endpoint supports pagination by adding page and size to request query `/brands?page=1&size=20`.
- Endpoint supports field limiting by adding which fields to return in a request query, e.g. `/brands?fields=name,image`.
- Endpoint supports search by adding search keywords to request query, e.g. `/brands?keyword=brands`.
- Endpoint supports sorting by adding a sort method to request query, e.g. `/brands?sort=name`.

Response body example:

```json
{
  "status": "success",
  "page": 1,
  "numberOfPages": 1,
  "results": 4,
  "data": [
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new brand",
        "slug": "new-brand",
        "image": "https://host.domain/brands/brand-1695220377744.jpeg",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new brand",
        "slug": "new-brand",
        "image": "https://host.domain/brands/brand-1693998837911.jpeg",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new brand",
        "slug": "new-brand",
        "image": "https://host.domain/brands/brand-1693939557425.jpeg",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      },
      {
        "_id": "650b02996dde3fe0155a2f5a",
        "name": "new brand",
        "slug": "new-brand",
        "image": "https://host.domain/brands/brand-1693855905828.jpeg",
        "createdAt": "2023-09-20T14:32:57.852Z",
        "updatedAt": "2023-09-20T14:32:57.852Z",
        "__v": 0
      }
  ]
}
```

#### Get a specific brand:
```
GET /api/v1/brand/:id
```

- Open endpoint.
- No authentication is required for this API call.

Response body example: 

```JSON
{
  "status": "success",
  "data": {
      "name": "new brand",
      "slug": "new-brand",
      "image": "https://host.domain/brands/brand-1693939557425.jpeg",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```
#### Update a specific brand:
```
PUT /api/v1/brands/:id
```

- Allowed to: only admins
  
Request body example:

```JSON
{
  "name": "updated brand"
}
```

Response body example: 
```JSON
{
  "status": "success",
  "data": {
      "name": "updated brand",
      "slug": "updated-brand",
      "image": "https://host.domain/brands/brand-1693939557425.jpeg",
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```
#### Delete a specific brand:
```
DELETE /api/v1/brands/:id
```

- Allowed to: only admins

### Products endpoints

#### Create a new product 

```
POST /api/v1/products
```
- Allowed to: only admin.
- Request body type: form-data

Request body example: 

| Key | Value |
|----:|-------|
| title | new product |
| description | new product description |
| price | 3000 |
| priceAfterDiscount | 2500 |
| quantity | 15 |
| category | 650b02996dde3fe0155a2f5a |
| subcategories | 650b02996dde3fe0155a2f5a, 650b02996dde3fe0155a2f5b
| brand | 650b02996dde3fe0155a2f5a |
| cover | product cover image |
| images | product image |
| images | product image |

Response body example: 
```JSON
{
  "status": "success",
  "data": {
      "name": "new product",
      "slug": "new-products",
      "description": "new product description",
      "price": 3000,
      "priceAfterDiscount": 2500,
      "quantity": 15,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

#### Get all products: 

```
GET /api/v1/products
```

- Open endpoint.
- No authentication is required for this endpoint call.
- Endpoint supports pagination by adding page and size to request query `/products?page=1&size=20`.
- Endpoint supports field limiting by adding which fields to return in a request query, e.g. `/products?fields=name,image`.
- Endpoint supports search by adding search keywords to request query, e.g. `/products?keyword=products`.
- Endpoint supports sorting by adding a sort method to request query, e.g. `/products?sort=name`.

Response body example: 
```JSON
{
  "status": "success",
  "page": 1,
  "numberOfPages": 1,
  "results": 4,
  "data": [
 {
      "name": "new product",
      "slug": "new-products",
      "description": "new product description",
      "price": 3000,
      "priceAfterDiscount": 2500,
      "quantity": 15,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  },
  {
      "name": "new product",
      "slug": "new-products",
      "description": "new product description",
      "price": 3000,
      "priceAfterDiscount": 2500,
      "quantity": 15,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  },
  {
      "name": "new product",
      "slug": "new-products",
      "description": "new product description",
      "price": 3000,
      "priceAfterDiscount": 2500,
      "quantity": 15,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  },
  {
      "name": "new product",
      "slug": "new-products",
      "description": "new product description",
      "price": 3000,
      "priceAfterDiscount": 2500,
      "quantity": 15,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
]
}
```

#### Get a specific product: 

```
GET /api/v1/products/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.

Response body example: 

```JSON
{
  "status": "success",
  "data": {
      "name": "new product",
      "slug": "new-products",
      "description": "new product description",
      "price": 3000,
      "priceAfterDiscount": 2500,
      "quantity": 15,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```

#### Update a specific product

```
PUT /api/v1/products/:id
```

- Allowed to: only admins.
- Request body type: form-data.

Request body example: 

| Key | Value |
|----:|-------|
| title | updated product |
| description | updated product description |
| price | 3000 |
| quantity | 20 |
| category | 650b02996dde3fe0155a2f5a |
| subcategories | 650b02996dde3fe0155a2f5a, 650b02996dde3fe0155a2f5b
| brand | 650b02996dde3fe0155a2f5a |
| cover | product cover image |
| images | product image |
| images | product image |

Response body example: 
```JSON
{
  "status": "success",
  "data": {
      "name": "updated product",
      "slug": "updated-products",
      "description": "updated product description",
      "price": 3000,
      "quantity": 20,
      "sold": 0,
      "coveer": "https://host.domain/prodcuts/prodcut-1693939557425.jpeg",
      "images": ["https://host.domain/prodcuts/prodcut-1693939557425.jpeg", "https://host.domain/prodcuts/prodcut-1693939557425.jpeg"],
      "category": "650b02996dde3fe0155a2f5a",
      "subcategories": ["650b02996dde3fe0155a2f5a", "650b02996dde3fe0155a2f5a"],
      "brand": "650b02996dde3fe0155a2f5a"
      "ratingQuantity": 0,
      "ratingAverage": 0
      "_id": "650b02996dde3fe0155a2f5a",
      "createdAt": "2023-09-20T14:32:57.852Z",
      "updatedAt": "2023-09-20T14:32:57.852Z",
      "__v": 0
  }
}
```
#### Delete a specific product

```
DELETE /api/v1/products/:id
```
- Allowed to: only admins.
