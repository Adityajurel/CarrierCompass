import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import analyzeResume from "../utils/gemini.js";
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All required fields are mandatory");
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase(),
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  return res.status(201).json(
    new ApiResponse(201, createdUser, "User registered successfully")
  );
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, "All fields are mandatory");
  }

  // Find User
  const user = await User.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Check Password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  // Generate Tokens
 const { accessToken, refreshToken } =
  await generateAccessAndRefreshTokens(user._id);

  // Remove Sensitive Data
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Cookie Options
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
};

  // Response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current user fetched successfully"
    )
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: "",
      },
    },
    {
      new: true,
    }
  );

  const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "Refresh Token is expired or already used");
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
        },
        "Access token refreshed"
      )
    );
});
const uploadResume = asyncHandler(async (req, res) => {
   console.log("Step 1: Request received");
    const localFilePath = req.file?.path;
console.log("Step 2:", localFilePath);

    

    if (!localFilePath) {
        throw new ApiError(400, "Resume file is required");
    }

    const resume = await uploadOnCloudinary(localFilePath);
 console.log("Step 3: Uploaded to Cloudinary");
    if (!resume) {
        throw new ApiError(500, "Error uploading resume");
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
    resume: resume.secure_url,
    resumeAnalysis: null,
    analysisDate: null,
},
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");


    console.log("Step 4: MongoDB Updated");
    return res.status(200).json(
        new ApiResponse(
            200,
            updatedUser,
            "Resume uploaded successfully"
        )
    );
});

const analyzeResumeController = async (req, res) => {
    try {
        const user = req.user;

        if (!user.resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not uploaded",
            });
        }
        if (user.resumeAnalysis) {
    return res.status(200).json({
        success: true,
        message: "Resume already analyzed",
        analysis: user.resumeAnalysis,
    });
}

        // Analyze resume directly from Cloudinary URL
  const analysis = await analyzeResume(user.resume);

await User.findByIdAndUpdate(
    user._id,
    {
        $set: {
            resumeAnalysis: analysis,
            analysisDate: new Date(),
        },
    }
);

return res.status(200).json({
    success: true,
    message: "Resume analyzed successfully",
    analysis,
});

    } catch (error) {

    console.error("Resume Analysis Error:");
    console.error(error);

    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
};

const getResumeAnalysis = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "resumeAnalysis analysisDate"
    );

    if (!user.resumeAnalysis) {
        throw new ApiError(404, "Resume analysis not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user.resumeAnalysis,
            "Resume analysis fetched successfully"
        )
    );
});

export { registerUser,loginUser,logoutUser,getCurrentUser,refreshAccessToken,uploadResume,analyzeResumeController,getResumeAnalysis };