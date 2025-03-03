import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { Context } from "./types.js";

export const authenticateWithJwt = (context: Context) => {
    const authHeader = context.req.headers.authorization;

    if (authHeader) {
        const token = authHeader.startsWith("Bearer")
            ? authHeader.split(" ")[1]
            : authHeader; // handle Bearer auth

        try {
            jwt.verify(token, process.env.JWT_SECRET || "JWT_SECRET");
        } catch {
            throw new GraphQLError("Invalid token");
        }
    } else {
        throw new GraphQLError("Authentication required");
    }
};
