import { createRequestTypes } from "./ajax";

describe("fetch module", () => {
  describe("createRequestTypes function", () => {
    it("should generate three types", () => {
      const base = "TEST";
      const types = createRequestTypes(base);
      expect(types).toEqual({
        TEST: "TEST",
        TEST_PENDING: "TEST_PENDING",
        TEST_FULFILLED: "TEST_FULFILLED",
        TEST_REJECTED: "TEST_REJECTED"
      });
    });

    it("should accept a empty string argument", () => {
      const base = "";
      const types = createRequestTypes(base);
      expect(types).toEqual({
        _PENDING: "_PENDING",
        _FULFILLED: "_FULFILLED",
        _REJECTED: "_REJECTED"
      });
    });

    it("should get a empty object when the argument is not a string", () => {
      const bases = [0, false, [], {}];
      bases.forEach(base => {
        const types = createRequestTypes(base);
        expect(types).toEqual({});
      });
    });
  });
});
