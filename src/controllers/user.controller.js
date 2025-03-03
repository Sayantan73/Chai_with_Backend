import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    const {fullName, email, userName, password} = req.body;
    console.log("email: ", email);
    // validation - Not empty
    if ([fullName, email, userName, password].some((item) => item?.trim() === "")) {
        throw new ApiError(400, "all fields are required");
    }
    // check if user already exists: email, username
    const existedUser = await User.findOne({
        $or: [{ email }, { userName }]
    })
    if (existedUser) {
        throw new ApiError(409, "User already exists with email or username");
    }

    // check for images check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");  
    }
    const avatar = uploadOnCloudinary(avatarLocalPath)
    const coverImage = uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }
    // create user Object - create entry in db
    const user = await User.create({
        userName: userName.toLowerCase(),
        email,
        fullName,
        avatar: avatar.secure_url,
        coverImage: coverImage?.secure_url || "",
        password
    })
    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }
    // return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
});

export {registerUser};