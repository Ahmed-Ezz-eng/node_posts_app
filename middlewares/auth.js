import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const isCustomToken = token.length < 500;
        let decoded;

        if (token && isCustomToken) {
            decoded = jwt.verify(token, "test");
            console.log("decoded token : ", decoded);
            req.userId = decoded.id;
        } else {
            decoded = jwt.decode(token);
            req.userId = decoded.sub;
        }
    } catch (error) {
        console.log("Auth error")
    }

    next();
}

export default auth;