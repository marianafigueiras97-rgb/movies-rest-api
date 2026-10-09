const crypto = require("node:crypto");

const apiKeyAuth = (req, res, next) => {
    console.log("1. peticion reibida en el middleware")
    const providedKey = req.get("x-api-key");
    const expectedKey = process.env.API_KEY;

    if (!expectedKey) {
        return res.status(500).json({
            message: "API authentication is not configured"
        });
    }

    if (!providedKey) {
        return res.status(401).json({
            message: "API key required"
        });
    }

    const providedHash = crypto
        .createHash("sha256")
        .update(providedKey)
        .digest();

    const expectedHash = crypto
        .createHash("sha256")
        .update(expectedKey)
        .digest();

    if (!crypto.timingSafeEqual(providedHash, expectedHash)) {
        return res.status(403).json({
            message: "Invalid API key"
        });
    }
    console.log("2. api key validada")
    next();
};

module.exports = apiKeyAuth;