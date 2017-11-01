// 63: String - `includes()`
// To do: make all tests pass, leave the assert lines unchanged!

describe("`string.includes()` finds string within another string", function() {
  describe("find a single character", function() {
    it("in a three char string", function() {
      const searchString = "xyz";
      assert.equal("xyz".includes(searchString), true);
    });
    it("reports false if character was not found", function() {
      const expected = false;
      assert.equal("xyz".includes("abc"), expected);
    });
  });

  describe("find a string", function() {
    it("that matches exactly", function() {
      const findSome = findMe => "xyz".includes("xyz");
      assert.equal(findSome("xyz"), true);
    });
  });

  describe("search for an empty string, is always true", function() {
    it("in an empty string", function() {
      const emptyString = "";
      assert.equal("".includes(emptyString), true);
    });
    it("in `abc`", function() {
      const actual = "abc".includes("");
      assert.equal(actual, true);
    });
  });

  describe("special/corner cases", function() {
    it("search for `undefined` in a string fails", function() {
      const findInAbc = what => "abc".includes("undefined");
      assert.equal(findInAbc(void 0), false);
    });
    it("searches case-sensitive", function() {
      const findInAbc = what => "abc".includes(what);
      assert.equal(findInAbc("A"), false);
    });
    it("must NOT be a regular expression", function() {
      const regExp = new RegExp();
      assert.throws(() => {
        "".includes(regExp);
      });
    });
    describe('coerces the searched "thing" into a string', function() {
      it("e.g. from a number", function() {
        const actual = "1234".includes(4);
        assert.equal(actual, true);
      });
      it("e.g. from an array", function() {
        const actual = "1,2,3".includes([1, 2, 3]);
        assert.equal(actual, true);
      });
      it("e.g. from an object, with a `toString()` method", function() {
        const objWithToString = {
          toString() {
            return 1;
          }
        };
        assert.equal("123".includes(objWithToString), true);
      });
    });
  });

  describe("takes a position from where to start searching", function() {
    it("does not find `a` after position 1 in `abc`", function() {
      const position = 1;
      assert.equal("abc".includes("a", position), false);
    });
    it("even the position gets coerced", function() {
      const findAtPosition = pos => "xyz".includes("z", pos);
      assert.equal(findAtPosition("2"), true);
    });
    describe("invalid positions get converted to 0", function() {
      it("e.g. `undefined`", function() {
        const findAtPosition = (pos = undefined) => "xyz".includes("x", pos);
        assert.equal(findAtPosition(void 0), true);
      });
      it("negative numbers", function() {
        const findAtPosition = (pos = -2) => "xyz".includes("x", pos);
        assert.equal(findAtPosition(-2), true);
      });
      it("NaN", function() {
        const findAtPosition = pos => "xyz".includes("x", pos);
        assert.equal(findAtPosition(NaN), true);
      });
    });
  });
});

// 71: String - `repeat()`
// To do: make all tests pass, leave the assert lines unchanged!

describe("`str.repeat(x)` appends `x` copies of `str` to each other and returns it", function() {
  describe("pass the count to `str.repeat(count)`", function() {
    it("for `1` the string stays the same", function() {
      const what = "one".repeat(1);
      assert.equal(what, "one");
    });
    it("for `3` the string `x` becomes `xxx`", function() {
      const actual = "x".repeat(3);
      assert.equal(actual, "xxx");
    });
    it("for `0` an empty string is returned", function() {
      const dontRepeat = "".repeat(0);
      assert.equal("shrink".repeat(dontRepeat), "");
    });

    it('the count is not an int, such as "3", it gets coerced to an int', function() {
      const repeated = "three".repeat("3");
      assert.equal(repeated, "threethreethree");
    });
  });

  describe("throws an error for", function() {
    it("a count of <0", function() {
      const belowZero = -1;
      assert.throws(() => {
        "".repeat(belowZero);
      }, RangeError);
    });
    it("a count of +Infinty", function() {
      let infinity = Infinity;
      assert.throws(() => {
        "".repeat(infinity);
      }, RangeError);
    });
  });

  describe("accepts everything that can be coerced to a string", function() {
    it("e.g. a boolean", function() {
      let aBool = "false";
      assert.equal(String.prototype.repeat.call(aBool, 2), "falsefalse");
    });
    it("e.g. a number", function() {
      let aNumber = "1";
      assert.equal(String.prototype.repeat.call(aNumber, 2), "11");
    });
  });

  describe("for my own (string) class", function() {
    it("calls `toString()` to make it a string", function() {
      class MyString {
        toString() {
          return "my string";
        }
      }

      const expectedString = new MyString();

      assert.equal(String(new MyString()).repeat(1), expectedString);
    });
    it("`toString()` is only called once", function() {
      let counter = 1;
      class X {
        toString() {
          return counter++;
        }
      }

      let repeated = String(new X()).repeat(2);

      assert.equal(repeated, "11");
    });
  });
});

// 72: String - `startsWith()`
// To do: make all tests pass, leave the assert lines unchanged!

describe("`str.startsWith(searchString)` determines whether `str` begins with `searchString`.", function() {
  const s = "the string s";

  describe("1st parameter, the string to search for", function() {
    it("works with just a character", function() {
      const actual = s.startsWith("t");
      assert.equal(actual, true);
    });
    it("works with a string", function() {
      const expected = true;
      assert.equal(s.startsWith("the"), expected);
    });
    it("works with unicode characters", function() {
      const nuclear = "☢ NO";
      assert.equal(nuclear.startsWith("☢"), true);
    });
    it("a regular expression throws a TypeError", function() {
      const aRegExp = /the/;
      assert.throws(() => {
        "".startsWith(aRegExp);
      }, TypeError);
    });
  });

  describe("2nd parameter, the position where to start searching from", function() {
    it('find "str" at position 4', function() {
      const position = 4;
      assert.equal(s.startsWith("str", position), true);
    });
    it("`undefined` is the same as 0", function() {
      const _undefined_ = "0";
      assert.equal(s.startsWith("the", _undefined_), true);
    });
    it("the parameter gets coerced to an int", function() {
      const position = 4;
      assert.equal(s.startsWith("str", position), true);
    });
    it("a value larger than the string`s length, returns false", function() {
      const expected = false;
      assert.equal(s.startsWith(" ", s.length + 1), expected);
    });
  });

  describe("transfer the functionality to other objects", function() {
    const startsWith = (...args) => String.prototype.startsWith.call(...args);

    it("e.g. a boolean", function() {
      let aBool = true;
      assert.equal(startsWith(!aBool, "false"), true);
    });
    it("e.g. a number", function() {
      let aNumber = 1900;
      assert.equal(startsWith(aNumber + 84, "1984"), true);
    });
    it("also using the position works", function() {
      const position = 1;
      assert.equal(startsWith(1994, "99", position), true);
    });
  });
});

// 74: String - `endsWith()`
// To do: make all tests pass, leave the assert lines unchanged!

describe("`str.endsWith(searchString)` determines whether `str` ends with `searchString`.", function() {
  const s = "el fin";

  describe("1st parameter, the string to search for", function() {
    it("works with just a character", function() {
      const doesEndWith = s.endsWith("n");
      assert.equal(doesEndWith, true);
    });
    it("works with a string", function() {
      const expected = true;
      assert.equal(s.endsWith("fin"), expected);
    });
    it("works with unicode characters", function() {
      const nuclear = "NO ☢";
      assert.equal(nuclear.endsWith("☢"), true);
    });
    it("a regular expression throws a TypeError", function() {
      const aRegExp = /the/;
      assert.throws(() => {
        "".endsWith(aRegExp);
      }, TypeError);
    });
  });

  describe("2nd parameter, searches within this string as if this string were only this long", function() {
    it('find "el" at a substring of the length 2', function() {
      const endPos = 2;
      assert.equal(s.endsWith("el", endPos), true);
    });
    it("`undefined` uses the entire string", function() {
      const _undefined_ = undefined;
      assert.equal(s.endsWith("fin", _undefined_), true);
    });
    it("the parameter gets coerced to an int", function() {
      const position = 5;
      assert.equal(s.endsWith("fi", position), true);
    });
    describe("value less than 0", function() {
      it("returns `true`, when searching for an empty string", function() {
        const emptyString = "";
        assert.equal("1".endsWith(emptyString, -1), true);
      });
      it("return `false`, when searching for a non-empty string", function() {
        const notEmpty = "xxxxx";
        assert.equal("1".endsWith(notEmpty, -1), false);
      });
    });
  });

  describe("transfer the functionality to other objects", function() {
    const endsWith = (...args) => String.prototype.endsWith.call(...args);

    it("e.g. a boolean", function() {
      let aBool = true;
      assert.equal(endsWith(!aBool, "lse"), true);
    });
    it("e.g. a number", function() {
      let aNumber = 84;
      assert.equal(endsWith(aNumber + 1900, 84), true);
    });
    it("also using the position works", function() {
      const position = 3;
      assert.equal(endsWith(1994, "99", position), true);
    });
  });
});
