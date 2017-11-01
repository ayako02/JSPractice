// 22: class - creation
// To do: make all tests pass, leave the assert lines unchanged!

describe("class creation", () => {
  it("is as simple as `class XXX {}`", function() {
    class TestClass {}

    const instance = new TestClass();
    assert.equal(typeof instance, "object");
  });

  it("class is block scoped", () => {
    {
      class Inside {}
    }
    assert.equal(typeof Inside, "undefined");
  });

  it("special method is `constructor`", function() {
    class User {
      constructor(id) {
        this.id = id;
      }
    }

    const user = new User(42);
    assert.equal(user.id, 42);
  });

  it("defining a method is simple", function() {
    class User {
      writesTests() {
        return false;
      }
    }

    const notATester = new User();
    assert.equal(notATester.writesTests(), false);
  });

  it("multiple methods need no commas (opposed to object notation)", function() {
    class User {
      wroteATest() {
        this.everWroteATest = true;
      }
      isLazy() {
        return !this.everWroteATest;
      }
    }

    const tester = new User();
    assert.equal(tester.isLazy(), true);
    tester.wroteATest();
    assert.equal(tester.isLazy(), false);
  });

  it("anonymous class", () => {
    const classType = typeof class {};
    assert.equal(classType, "function");
  });
});

// 23: class - accessors
// To do: make all tests pass, leave the assert lines unchanged!

describe("class accessors (getter and setter)", () => {
  it("only a getter is defined like a method prefixed with `get`", () => {
    class MyAccount {
      get balance() {
        return Infinity;
      }
    }

    assert.equal(new MyAccount().balance, Infinity);
  });

  it("a setter has the prefix `set`", () => {
    class MyAccount {
      get balance() {
        return this.amount;
      }
      set balance(amount) {
        this.amount = amount;
      }
    }

    const account = new MyAccount();
    account.balance = 23;
    assert.equal(account.balance, 23);
  });

  describe("dynamic accessors", () => {
    it("a dynamic getter name is enclosed in [ and ]", function() {
      const balance = "yourMoney";
      class YourAccount {
        get yourMoney() {
          return -Infinity;
        }
      }

      assert.equal(new YourAccount().yourMoney, -Infinity);
    });

    it("a dynamic setter name as well", function() {
      const propertyName = "balance";
      class MyAccount {
        get [propertyName]() {
          return this.amount;
        }
        set balance(amount) {
          this.amount = 23;
        }
      }

      const account = new MyAccount();
      account.balance = 42;
      assert.equal(account.balance, 23);
    });
  });
});

// 24: class - static keyword
// To do: make all tests pass, leave the assert lines unchanged!

describe("inside a class you can use the `static` keyword", () => {
  describe("for methods", () => {
    class IntegrationTest {}
    class UnitTest {}

    it("a static method just has the prefix `static`", () => {
      class TestFactory {
        static makeTest() {
          return new UnitTest();
        }
      }

      assert.ok(TestFactory.makeTest() instanceof UnitTest);
    });

    it("the method name can be dynamic/computed at runtime", () => {
      const methodName = "createTest";
      class TestFactory {
        static [methodName]() {
          return new UnitTest();
        }
      }

      assert.ok(TestFactory.createTest() instanceof UnitTest);
    });
  });

  describe("for accessors", () => {
    it("a getter name can be static, just prefix it with `static`", () => {
      class UnitTest {
        static get testType() {
          return "unit";
        }
      }

      assert.equal(UnitTest.testType, "unit");
    });

    it("even a static getter name can be dynamic/computed at runtime", () => {
      const type = "test" + "Type";
      class IntegrationTest {
        static get [type]() {
          return "integration";
        }
      }

      assert.ok("testType" in IntegrationTest);
      assert.equal(IntegrationTest.testType, "integration");
    });
  });
});
