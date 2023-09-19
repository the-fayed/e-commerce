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

## Installing

First, clone a fresh copy:
```$ git clone https://github.com/the-fayed/e-commerce.git```

Then, you need to run `npm install` to install app dependencies.

## Schemas

### Category schema

```javascript
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
  }
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

```JavaScript
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
``
`
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
