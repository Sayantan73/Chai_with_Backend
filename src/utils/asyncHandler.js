// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         });
//     }
// }

// export default asyncHandler;

const asyncHandler = (requesrHandler) => {
    (req, res, next) => {
        Promise.resolve(requesrHandler(req, res, next))
        .catch(err => next(err));
    }
}

export default asyncHandler;