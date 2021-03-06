const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
const User = require("../models/People");
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}
// add user
async function addUser(req, res) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
      avatar: req.files[0].filename,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }
  // save user or send error
  try {
    const result = await newUser.save();
    // console.log(result);
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured",
        },
      },
    });
  }
}

async function updateUser(req, res, next) {}

// remove user controller
async function removeUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    // avatar remove if exist
    if (user.avatar) {
      unlink(
        path.join(
          __dirname,
          `./../public/uploads/avatars/${user.avatar}`,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        )
      );
    }
    res.status(200).json({
      message: "User was removed successfully",
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
}
module.exports = {
  getUsers,
  addUser,
  updateUser,
  removeUser,
};
