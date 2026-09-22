import assert from "node:assert/strict";
import { test } from "node:test";
import { escapeHtml } from "../lib/leads/escape.ts";

test("escapes markup and quotes", () => {
  assert.equal(escapeHtml(`<img src=x onerror="a('b')">&`), "&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;");
});

test("leaves plain text alone", () => {
  assert.equal(escapeHtml("Hello world"), "Hello world");
});
