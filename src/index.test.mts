import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { paginate } from "./index.mts";

describe("総ページ数が 7 以下の時", () => {
  test("総ページ数が 1 の場合、[1] を返すこと", () => {
    assert.deepEqual(paginate(1, 1), [1]);
  });
  test("総ページ数が 2 の場合、[1, 2] を返すこと", () => {
    assert.deepEqual(paginate(1, 2), [1, 2]);
  });
  test("総ページ数が 7 の場合、1 から 7 までの配列を返すこと", () => {
    assert.deepEqual(paginate(1, 7), [1, 2, 3, 4, 5, 6, 7]);
  });
});

describe("現在ページが先頭に近い時 (総ページ数 > 7)", () => {
  test("1/8 ページの場合、末尾が省略されること", () => {
    assert.deepEqual(paginate(1, 8), [1, 2, 3, 4, 5, null, 8]);
  });
  test("4/8 ページの場合、末尾が省略されること", () => {
    assert.deepEqual(paginate(4, 8), [1, 2, 3, 4, 5, null, 8]);
  });
});

describe("現在ページが末尾に近い時 (総ページ数 > 7)", () => {
  test("5/8 ページの場合、先頭が省略されること", () => {
    assert.deepEqual(paginate(5, 8), [1, null, 4, 5, 6, 7, 8]);
  });
  test("8/8 ページの場合、先頭が省略されること", () => {
    assert.deepEqual(paginate(8, 8), [1, null, 4, 5, 6, 7, 8]);
  });
});

describe("現在ページが中間にある時 (総ページ数 > 7)", () => {
  test("5/9 ページの場合、両端が省略されること", () => {
    assert.deepEqual(paginate(5, 9), [1, null, 4, 5, 6, null, 9]);
  });
  test("6/20 ページの場合、両端が省略されること", () => {
    assert.deepEqual(paginate(6, 20), [1, null, 5, 6, 7, null, 20]);
  });
});

describe("例外処理", () => {
  test("現在のページが 1 未満の場合、RangeError が送出されること", () => {
    assert.throws(() => paginate(0, 5), RangeError);
  });
  test("現在のページが総ページ数より大きい場合、RangeError が送出されること", () => {
    assert.throws(() => paginate(6, 5), RangeError);
  });
});
