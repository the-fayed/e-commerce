const mongoose = require(`mongoose`);
const bcrypt = require(`bcrypt`);

const userSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// hook to add baseurl to image name
userSchema.post([`init`, `save`], (doc) => {
  if (doc.avatar) doc.avatar = `${process.env.BASE_URL}/users/${doc.avatar}`;
});

// hook to hash user password pre save
userSchema.pre(`save`, async function (next) {
  const obj = this.getChanges();
  if (!obj["$set"]) {
    return next();
  } else {
    if (obj["$set"].password) {
      this.password = await bcrypt.hash(this.password, 9);
    }
    next();
  }
});

// hook to hash user password on update
userSchema.pre([`findOneAndUpdate`, `updateOne`], async function () {
  const updatedObj = this.getUpdate();
  if (updatedObj.password) {
    const hashedPassword = await bcrypt.hash(updatedObj.password, 9);
    updatedObj.passwordChangedAt = Date.now();
    updatedObj.password = hashedPassword;
  }
});

const userModel = mongoose.model(`user`, userSchema);

module.exports = userModel;
