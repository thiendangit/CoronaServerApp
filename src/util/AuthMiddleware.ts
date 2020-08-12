// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");
/**
 * private function generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateToken = (user: any, secretSignature: any, tokenLife: any) => {
    return new Promise((resolve, reject) => {
        // Định nghĩa những thông tin của user mà bạn muốn lưu vào token ở đây
        const userData = {
            success: true,
            data: {
                id: user.id,
                // name: user.name,
                email: user.email,
                name: "Thiện Đăng",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBXNywrIN2svfAQNTUgejhwlnrlgMbz5qX391ighXPMg&usqp=CAU&ec=45688575",
            },
            message: "Login Success"
        };
        // Thực hiện ký và tạo token
        jwt.sign(
            {data: userData},
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (error: any, token: string) => {
                if (error) {
                    return reject(error);
                }
                resolve(token);
            });
    });
};
/**
 * This module used for verify jwt token
 * @param {*} token
 * @param {*} secretKey
 */
const verifyToken = (token: string, secretKey: string) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error: any, decoded: any) => {
            if (error) {
                return reject(error);
            }
            resolve(decoded);
        });
    });
};
module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};
