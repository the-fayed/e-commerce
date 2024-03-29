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
    - <a href= "https://github.com/the-fayed/e-commerce#auth-endpoints">Auth endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#sign-up-endpoint">Sign up endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#verify-email-endpoint">Verify email endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#log-in-endpoint">Log in endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#fortgot-password-endpoint">Forgot password endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#verify-password-reset-code-endpoint">Verfiy password reset code endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#reset-password-endpoint">Reset password endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#user-endpoints">User endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-new-user-endpoint">Create new user endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-users">Get all user endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-specific-user">Get a specific user endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-specific-user">Update a specific user endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-specific-user-password">Update a specific user password endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-specific-user">Delete a specific user endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-logged-user-data">Get logged user data endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#updated-logged-user-data">Update logged user data endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-logged-user-password">Update logged user password end point</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-logged-user">Delete logged user endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#categories-endpoints">Categories endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-a-new-category">Create new category endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-categories">Get all categories endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-category">Get a specific category endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-specific-category">Update a specific category endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-specific-category">Delete a specifc category endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#subcategories-endpoints">Subcategories endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-a-new-subcategory">Create a new subcategory endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-subcategories">Get all subcategories endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-subcategory">Get a specific subcategory endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-a-specific-subcategory">Update a specific subcategory endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-a-specific-subcategory">Delete a specific subcategory endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#brands-endpoints">Brands endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-a-new-brand">Create a new brand endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-brands">Get all brands endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-brand">Get specific brand endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-a-specific-brand">Update a specific brand endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-a-specific-brand">Delete a specific brand endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#products-endpoints">Products endpoinsts</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-a-new-product">Create a new product endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-products">Get all products endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-product">Get a specific prodcut endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-a-specific-product">Update a specific product endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-a-specific-product">Delete a specific product endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#wishlist-endpoints">Wishlist endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#add-product-to-wishlist">Add product to wishlist endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-logged-user-wishlist">Get logged user wishlist endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#remove-product-from-wishlist">Revmove product from wishlist</a>
    - <a href = "https://github.com/the-fayed/e-commerce#address-endpoints">Addresses endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#add-a-new-address-to-the-logged-user">Add new address endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-logged-user-addresses">Get logged user addresses endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#address-from-logged-user-addresses-list">Remove address from logged user addresses</a>
    - <a href = "https://github.com/the-fayed/e-commerce#cart-endpoints">Cart endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#add-item-to-cart-endpoint">Add item to cart endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-logged-user-cart-endpoint">Get logged user cart endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-specific-item-quantity-endpoint">Update a specific item quantity endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#remove-a-specific-item-from-the-cart">Remove a specific item from cart endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#clear-user-cart">Clear logged user cart endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#apply-coupon-to-the-cart">Apply coupon to cart endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#coupon-endpoints">Coupons endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-a-new-coupon">Create a new coupon endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-coupons">Get all coupons endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-coupon">Get a specific coupon endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-a-specific-coupon">Update a specific coupon endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-a-specific-coupon">Delete a specific coupon endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#review-endpoint">Reviews endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#add-a-new-review">Add a new review endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-reviews">Get ll reviews endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-review">Get a specific review endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-a-specific-review">Update a specific review endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-a-specific-review">Delete a specific review endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#order-endpoints">Order endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-a-new-cash-order">Create a new cash order endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-all-orders">Get all orders endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-order">Get a specific order endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-logged-user-all-orders">Get logged user orders endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-a-specific-order-for-the-logged-user">Get a specific order for the logged user endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-order-delivery-status">Update order delivery status endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-order-paid-status">Update order paid status endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#create-an-online-paid-order">Create an online paid order endpoint</a>
    - <a href = "https://github.com/the-fayed/e-commerce#app-settings-endpoints">App settings endpoints</a>
        - <a href = "https://github.com/the-fayed/e-commerce#add-tax-and-shipment-price">Add tax and shipment prices endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#get-tax-and-shipment-prices">Get tax and shipment prices endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#update-tax-and-shipment-prices">Update tax and shipment prices endpoint</a>
        - <a href = "https://github.com/the-fayed/e-commerce#delete-tax-and-shipment-prices">Delete tax and shipment prices endpoint</a>

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

3. User wishlist.
4. User cart.
5. User addresses.
6. Online orders.
7. Cash orders.
8. Product review and rating.


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

# CSRF
CSRF_SECRET: create a CSRF secret key of at least 32 characters.

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


#### Verify email endpoint

```
GET /api/v1/auth/verify/:token
```
_note that an email verification will be sent to the user's email address._

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

#### Fortgot password endpoint

```curl
POST /api/v1/auth/forgotPassword
```
- Open endpoint

Request body example:
```json
{
    "email": "user@email.com"
}
```

#### Verify password reset code endpoint

```curl
POST /api/v1/auth/verifyResetCode
```

- Open endpoint

Request body example:

```json
{
    "resetCode": 123456
}
```

#### Reset password endpoint

```curl
POST /api/v1/auth/resetPassword
```

- Open endpoint

Request body example:

```json
{
    "email": "user@email.com",
    "password": "new password"
    "passwordConfirmation": "new password"
}
```

### User endpoints

#### Create new user endpoint

```curl
POST /api/v1/users
```

- Allowed to: only admins.
- Request body type: form-data

Request body example:

| Key | Value |
|----:|-------|
| name | new admin |
| email | admin@email.com |
| phone | 010123456789 |
| avatar | user image|
| role | admin |
| password | new password|
| passwordConfirmation | new password |
| emailVerified | true|


#### Get all users

```curl
GET /api/v1/users
```

- Allowed to: only admins
- Endpoint supports pagination by adding page and size to request query, e.g. `/users?page=1&size=20`.
- Endpoint support field limiting by adding which fields to return in request query e.g. `/users?fields=name,image`.
- Endpoint supports search by adding search keywords to request query, e.g. `/users?keyword=user`.
- Endpoint supports sorting by adding a sort method to request query, e.g. `/users?sort=name`.

#### Get specific user

```curl
GET /api/v1/users/:id
```
- Allowed to: only admins

#### Update specific user

```curl
PUT /api/v1/users/:id
```

- Allowed to: only admins
- Request body type: form-data

Request body example:

| Key | Value |
|----:|-------|
| name | updated admin |
| email | admin@email.com |
| phone | 010123456789 |
| avatar | user image|
| role | admin |
| emailVerified | true |

#### Update specific user password

```curl
PUT /api/v1/users/changePassword/:id
```

- Allowed to: only admins

Request body example:

```json
{
    "currentPassword": "password",
    "newPassword": "updated password",
    "passwordConfirmation": "updated password"
}
```

#### Delete specific user

```curl
DELETE /api/v1/users/:id
```
- Allowed to: only admins

#### Get logged user data

```curl
GET /api/v1/users/getLoggedUser
```
- Allowed to: users and admins

#### Updated logged user data

```curl
PUT /api/v1/user/updateLoggedUserData
```
- Allowed to: users and admins
- Request body type: form-data

Request body example:

| Key | Value |
|----:|-------|
| name | admin |
| email | user@email.com |
| phone | 010123456789 |
| avatar | user image|

#### Update logged user password

```curl
PUT /api/v1/user/updateLoggedUserPassword
```
- Allowed to: users and admins

Request body example:

```json
{
    "currentPassword": "password",
    "newPassword": "updated password",
    "passwordConfirmation": "updated password"
}
```

#### Delete logged user

```curl
DELETE /api/v1/user/deleteLoggedUser
```
- Allowed to: users and admins


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


#### Get a specific category:
```
GET /api/v1/categories/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.


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

 _note that to get all subcategories not the subcategories on a specific category the endpoint will be `GET /api/v1/subcategories`._

#### Get a specific subcategory
```
GET /api/v1/subcategories/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.


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


#### Get a specific brand:

```
GET /api/v1/brand/:id
```

- Open endpoint.
- No authentication is required for this API call.


#### Update a specific brand:

```
PUT /api/v1/brands/:id
```

- Allowed to: only admins
- Request body type: form-data

Request body example:

| Key | Value |
|----:|-------|
|name | Brand name |
|image| Brand image|


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


#### Get a specific product:

```
GET /api/v1/products/:id
```

- Open endpoint.
- No authentication is required for this endpoint call.


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


#### Delete a specific product

```
DELETE /api/v1/products/:id
```
- Allowed to: only admins.

### Wishlist endpoints

#### Add product to wishlist

```curl
POST /api/v1/wishlist
```
- Allowed to: only users.

Request body example:

```json
{
    "productId": "650b02996dde3fe0155a2f5a"
}
```

#### Get logged user wishlist

```curl
GET /api/v1/wishlist
```

- Allowed to: only users.

#### Remove product from wishlist

```curl
DELETE /api/v1/wishlist/:productId
```
-Allowed to: only users

### Address endpoints

#### Add a new address to the logged user

```curl
POST /api/v1/address
```
- Allowed to: only users

Request body example:

```json
{
    "alias": "alias",
    "city": "City",
    "details": "address details",
    "phone": "010123456789",
    "postal code": "1234"
}
```

#### Get logged user addresses

```curl
GET /api/v1/address
```
- Allowed to: only users.

#### Address from logged user addresses list

```curl
DELETE /api/v1/address/:addressId
```
- Allowed to: only users

#### Cart endPoints

#### Add item to cart endpoint

```curl
POST /api/v1/cart
```

- Allowed to: only users.

Request body example:

```json
{
    "productId": "650b02996dde3fe0155a2f5a",
    "color": "red",
    "size": "XL"
}
```

#### Get logged user cart endpoint

```curl
GET /api/v1/cart
```

- Allowed to: only users

#### Update specific item quantity endpoint

```curl
PUT /api/v1/cart/:itemId
```
- Allowed to: only users

Request body example:

```json
{
    "quantity": 4
}
```

#### Remove a specific item from the cart

```curl
DELETE /api/v1/cart/:itemId
```
- Allowed to: only users

#### Clear user cart

```curl
DELETE /api/v1/cart
```
- Allowed to: only users.

#### Apply coupon to the cart

```curl
POST /api/v1/cart/applyCoupon
```
- Allowed to: only users

Request body example:

```json
{
    "coupon": "name"
}
```


### Coupon endpoints

#### Create a new coupon

```curl
POST /api/v1/coupons
```

- Allowed to: only admins

Request body example:

```json
{
    "name": "HAPPY_MOTHER'S_DAY",
    "expire": "09/25/2023",
    "discount": 25
}
```

#### Get all coupons

```curl
GET /api/v1/coupons
```
- Allowed to: only admins

#### Update a specific coupon

```curl
PUT /api/v1/coupons/:id
```
- Allowed to: only admins

Request body example:

```json
{
    "name": "HAPPY_MOTHER'S_DAY",
    "expire": "09/25/2023",
    "discount": 25
}
```

#### Delete a specific coupon

```curl
DELETE /api/v1/coupons/:id
```
- Allowed to: only admins.

### Review endpoint

_Nasted endpoints from products endpoints._

#### Add a new review

```curl
POST /api/v1/prodcut/:productId/reviews
```
- Allowed to: only users.

Request body example:

```json
{
    "title": "review title",
    "rating": 4
}
```

#### Get all reviews

```curl
GET /api/v1/prodcut/:productId/reviews
```

- Open endpoint

#### Get a specific review

```curl
GET /api/v1/prodcut/:productId/reviews/:id
```
- Open endpoint

#### Update a specific review

```curl
PUT /api/v1/prodcut/:productId/reviews/:id
```

- Allowed to: Review owner (user)

Request body example:

```json
{
    "title": "review title",
    "rating": 4
}
```

#### Delete a specific review

```curl
DELETE /api/v1/prodcut/:productId/reviews/:id
```
- Allowed to: admins and review owner.

### Order endpoints

#### Create a new cash order

```curl
POST /api/v1/orders/:cartId
```
- Allowed to: only users

Request body example:

```json
{
    "alias": "alias",
    "city": "City",
    "details": "address details",
    "phone": "010123456789",
    "postal code": "1234"
}
```

#### Get all orders

```curl
GET /api/v1/orders
```
- Allowed to: only admins

#### GET a specific order

```curl
GET /api/v1/orders/:id
```
- Allowed to: only admins

#### Get logged user all orders

```curl
GET /api/v1/orders
```
- Allowed to: users.

#### GET a specific order for the logged user

```curl
GET /api/v1/orders/:id
```
- Allowed: users

#### Update order delivery status

```curl
PUT /api/v1/orders/:id
```
- Allowed to: only admins

Request body example

```json
{
    "isDelivered": true
}
```

#### Update order paid status

```curl
PUT /api/v1/orders/:id
```
- Allowed to: only admins

Request body example

```json
{
    "isPaid": true
}
```

#### Create an online paid order

```curl
POST /api/v1/orders/checkout-session/:cartId
```
- Allowed to: only users.

Request body example:

```json
{
    "alias": "alias",
    "city": "City",
    "details": "address details",
    "phone": "010123456789",
    "postal code": "1234"
}
```

### App settings endpoints

#### Add tax and shipment price

```curl
POST /api/v1/appSetting/taxAndShipmentPrices
```
- Allowed to: only admins.

Request body example:

```json
{
    "taxPrice": 15,
    "shipmentPrice": 30
}
```

_note that only one tax price and one shipment price can be added._

#### Get tax and shipment prices

```curl
GET /api/v1/appSetting/taxAndShipmentPrices
```
- Allowed to: only admins.

#### Update tax and shipment prices

```curl
PUT /api/v1/appSetting/taxAndShipmentPrices
```
- Allowed to: only admins.

#### Delete tax and shipment prices

```curl
DELETE /api/v1/appSetting/taxAndShipmentPrices
```
- Allowed to: only admins.
