const { succssResponse } = require("../../utilitis/apiSuccess");
const { errorResponse } = require("../../utilitis/apiError");
const { userModel } = require("../../models/userSchemaModel");

// registration controller
const registrationController = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;
    if (!userName || !email || !password || !confirmPassword) {
      return res
        .status(404)
        .json(new errorResponse(404, `Credential missing!`, true, false));
    }

    // check if user is already exist in database
    const isAlreadyUserExist = userModel.find({
      //or mongoDB er ekti logical operator ja ekadik object ke ekshathe find korte help kore
      $or: [{ userName: userName }, { email: email }],
    });

    if (isAlreadyUserExist?.length) {
      return res
        .status(401)
        .json(
          new errorResponse(
            401,
            `User is already exist! try with another account`,
            `${Error}`,
            null
          )
        );
    }

    // make a otp generator
    const Otp = otpgenetor();
    // send email verification to user (send otp)
    const messageId = await sendEmail(firstName, Otp, email);
    
    if (messageId) {
      if (password === confirmPassword) {
        const hassPass = await passEncryption(confirmPassword);
        //save user data to database
        const saveUserData = await userModel.create({
          //item key (ueserModel)  and value(req.body er value) same hole single name use kora jabe
          userName,
          email,
          confirmPassword: hassPass,
        });
        //email send hole amar OTP ta database e save korbo find > email use kore database khujbe and email khuje pele Otp ta DB te store kore felbe (new : true > DB te save koro)
        const userUpdated = await userModel.findOneAndUpdate(
          { email: email }, //find using email
          {
            // update otp , expireOtp
            otp: Otp,
            // new Date().getTime() + min + sec + milisecond
            expireOtp: new Date().getTime() + 10 * 60 * 1000,
          },
          //update successful
          { new: true }
        );
        if (userUpdated) {
          return res
            .status(200)
            .json(
              new succssResponse(
                200,
                "Registration successfull",
                false,
                userUpdated
              )
            );
        }
      } else {
        return res
          .status(401)
          .json(new errorResponse(401, `Password dosen't match`, true, null));
      }
    } else {
      return res
        .status(401)
        .json(new errorResponse(500, `Registration  unsuccessful`, true, null));
    }
    return res
      .status(200)
      .json(new succssResponse(200, `successfully `, false, null));
  } catch (error) {
    return res
      .status(500)
      .json(new errorResponse(500, `Error from registration`, error, null));
  }
};

module.exports = { registrationController };
