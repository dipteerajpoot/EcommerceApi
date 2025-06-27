import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const auth = async (request, response, next) => {
    try {
        let { token } = request.cookies;
        if (!token) {
            throw new Error("Token not found");
        }
        let decodedData = jwt.verify(token, process.env.SECRET_KEY);
        request.user = decodedData;
        console.log(decodedData);
        next();
    }

    catch (error) {
        console.log(error);
        return response.status(401).json({ error: "Unauthorized user || Invalid or expired token" });
    }
}