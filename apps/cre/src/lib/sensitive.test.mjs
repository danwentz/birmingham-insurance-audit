import test from "node:test";
import assert from "node:assert/strict";
import { findSensitive, redactSensitive } from "./sensitive.js";

test("flags formatted and keyword SSNs", () => {
  assert.deepEqual(findSensitive("my ssn is 123-45-6789"), ["ssn"]);
  assert.deepEqual(findSensitive("123 45 6789"), ["ssn"]);
  assert.deepEqual(findSensitive("SSN: 123456789"), ["ssn"]);
  assert.deepEqual(findSensitive("social security number 123-45-6789"), ["ssn"]);
});

test("flags Luhn-valid card numbers", () => {
  assert.deepEqual(findSensitive("card 4111 1111 1111 1111"), ["card"]);
  assert.deepEqual(findSensitive("5500-0000-0000-0004"), ["card"]);
  assert.deepEqual(findSensitive("4111111111111111"), ["card"]);
});

test("flags bank numbers only with context words", () => {
  assert.deepEqual(findSensitive("routing 021000021"), ["bank"]);
  assert.deepEqual(findSensitive("account number: 000123456789"), ["bank"]);
  assert.deepEqual(findSensitive("wire to checking 12345678"), ["bank"]);
});

test("ignores legitimate CRE lead details", () => {
  const ok = [
    "TIV $25,000,000 across 4 locations, 312 units, renewal 6/1/2027",
    "Call me at 205-555-1234 or (205) 555-1234",
    "Property at 1200 Main St, Birmingham AL 35209-1234",
    "FEIN 12-3456789",
    "Premium 425000 with a 5% named storm deductible",
    "Account is with Carrier A, policy CPP 1234567 renews 9/1",
    "1234567890123456", // 16 digits that fail Luhn
  ];
  for (const text of ok) assert.deepEqual(findSensitive(text), [], text);
});

test("redacts sensitive values and keeps the rest", () => {
  assert.equal(
    redactSensitive("312 units. SSN 123-45-6789, card 4111 1111 1111 1111"),
    "312 units. [REDACTED], card [REDACTED]"
  );
  assert.equal(redactSensitive("routing 021000021 thanks"), "[REDACTED] thanks");
});
