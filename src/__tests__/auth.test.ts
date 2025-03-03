import { GraphQLError } from "graphql";
import { authenticateWithJwt } from "../auth";
import jwt from "jsonwebtoken";
import { Context } from "../types";

jest.mock("jsonwebtoken");

describe("authenticateWithJwt()", () => {
    const verifySpy = jest.spyOn(jwt, "verify");

    it("handles no auth headers", () => {
        expect(() =>
            authenticateWithJwt({
                req: { headers: {} },
            } as Context)
        ).toThrow(new GraphQLError("Authentication required"));
    });

    it("handles incorrect auth token", () => {
        verifySpy.mockImplementationOnce(() => {
            throw new Error("invalid");
        });
        expect(() =>
            authenticateWithJwt({
                req: { headers: { authorization: "test" } },
            } as Context)
        ).toThrow(new GraphQLError("Invalid token"));
    });
});
