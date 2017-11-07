// 58: Reflect - basics
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Reflect` basics', function() {
  
  describe('Reflect is special, it is different to e.g. `Object`', function() {
    it('is not a function', function() {
      const expectedType = 'object';
      assert.equal(typeof Reflect, expectedType);
    });
    
    it('it can not be instantiated', function() {
      const tryToConstruct = () => { Reflect(); };
      assert.throws(tryToConstruct, TypeError);
    });
    
    it('has no `call` method (as opposed to e.g. Object)', function() {
      const expected = 'undefined';
      assert.equal(typeof Reflect.call, expected);
    });
    
  });  
  
  describe('some `Reflect` usages', function() {
    
    it('`Reflect.construct()` is like new', function() {
      let Class = () => {};
      assert.equal(Reflect.construct(Class, []) instanceof Class, true);
    });
    
    it('`Reflect.get()` returns a property`s value', function() {
      let obj = {x: 23};
      assert.equal(Reflect.get(obj, 'x'), 23);
    });
    
    it('`Reflect.has()` is like `in` just as a function', function() {
      let obj = {x: true};
      assert.equal(Reflect.has(obj, 'x'), true);
    });
    
  });
  
});


// 59: Reflect - apply 
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Reflect.apply` calls a target function', function() {

  it('it is a static method', function() {
    const expectedType = 'function';
    assert.equal(typeof Reflect.apply, expectedType)
  });

  describe('the 1st parameter', () => {
    it('is a callable, e.g. a function', () => {
      let fn = () => 42;
      assert.equal(Reflect.apply(fn, void 0, []), 42);
    });
    it('passing it a non-callable throws a TypeError', function() {
      let applyOnUncallable = () => {
        Reflect.apply(Array);
      };
      assert.throws(applyOnUncallable, TypeError);
    });
  });
  describe('the 2nd parameter', () => {
    it('is the scope (or the `this`)', function() {
      class FourtyTwo {
        constructor() { this.value = 42}
        fn() {return this.value}
      }
      
      let instance = new FourtyTwo();
      
      const fourtyTwo = Reflect.apply(instance.fn, instance, instance);
      
      assert.deepEqual(fourtyTwo, 42);
    });
  });

  describe('the 3rd parameter', () => {
    it('must be an array (or array-like)', () => {
      const thirdParam = [];
      
      assert.doesNotThrow(() => Reflect.apply(() => void 0, null, thirdParam));
    });
    
    it('is an array of parameters passed to the call', function() {
      let emptyArrayWithFiveElements = Reflect.apply(Array, 42, [42, 42, 42, 42, 42]);
      
      assert.deepEqual(emptyArrayWithFiveElements.fill(42), [42, 42, 42, 42, 42]);
    });
  });

  describe('example usages', () => {
    it('simple function call', () => {
      const fn = () => 'the return value';
      assert.equal(Reflect.apply(fn, void 0, []), 'the return value');
    });
    it('call a function on an array', () => {
      const fn = [].slice;
      assert.deepEqual(Reflect.apply(fn, [0, 23, 42], [1]), [23, 42]);
    });
    it('pass in the `this` that the function to call needs', () => {
      class Bob {
        constructor() { this._name = 'Bob'; }
        name() { return this._name; }
      }
      const bob = new Bob();
      const scope = bob;
      assert.equal(Reflect.apply(bob.name, scope, []), 'Bob');
    });
  });

});



// 60: Reflect - getPrototypeOf 
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Reflect.getPrototypeOf` returns the prototype', function() {

  it('works like `Object.getPrototypeOf`', function() {
    const viaObject = Object.getPrototypeOf({});
    const viaReflect = Reflect.getPrototypeOf({});
    
    assert.strictEqual(viaObject, viaReflect);
  });

  it('throws a TypeError for a non-object', function() {
    let fn = () => { Reflect.getPrototypeOf() };
    assert.throws(fn, TypeError);
  });

  it('a `new Set()` has a prototype', function() {
    const aSet = new Set();
    
    assert.equal(Reflect.getPrototypeOf(aSet), Set.prototype);
  });

  it('for a class, it is `Klass.prototype`', function() {
    class Klass {}
    const proto = Reflect.getPrototypeOf(new Klass());
    
    assert.equal(proto, Klass.prototype);
  });

  it('for a old-style class, works too', function() {
    function Klass() {}
    const proto = Reflect.getPrototypeOf(new Klass());
    
    assert.equal(proto, Klass.prototype);
  });

  it('an array has a prototype too', function() {
    let arr = [];
    const expectedProto = Array.prototype;
    
    assert.equal(Reflect.getPrototypeOf(arr), expectedProto);
  });

  // TODO
  // it('getting the prototype of an "exotic namespace object" returns `null`', function() {
  //   http://www.ecma-international.org/ecma-262/6.0/#sec-module-namespace-exotic-objects-getprototypeof
  //   Don't know how to write a test for this yet, without creating a dep in tddbin hardcoded
  //   PRs welcome
  //   assert.equal(Reflect.getPrototypeOf(namespace exotic object), null);
  // });
});


// 68: Reflect - construct 
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Reflect.construct` is the `new` operator as a function', function() {

  describe('the function itself', function() {
    it('is static on the `Reflect` object', function() {
      const name = 'constructor';
      assert.equal(name in Reflect, true);
    });
    
    it('is of type `function`', function() {
      const expectedType = 'function';
      assert.equal(typeof Reflect.construct, expectedType)
    });
  });
  
  describe('the 1st parameter is the constructor to be invoked', function() {
    it('fails when given a number as constructor', function() {
      let aNumber = () => {};
      assert.throws(() => { Reflect.construct(aNumber, []) }, TypeError);
    });
    
    it('works giving a function', function() {
      let aFunction = () => {};
      assert.doesNotThrow(() => { Reflect.construct(aFunction, []) });
    });
    
    it('works giving a class', function() {
      const aClass = class {};
      assert.doesNotThrow(() => { Reflect.construct(aClass, []) });
    });
  });

  describe('the 2nd parameter is a list of arguments, that will be passed to the constructor', function() {
    
    const aClass = class {};
    it('fails when it`s not an array(-like), e.g. a number', function() {
      let aNumber = 11;
      assert.throws(() => { Reflect.construct(aClass, aNumber) }, TypeError);
    });
    
    it('works with an array-like object (the `length` property look up should not throw)', function() {
      let arrayLike = {get length() {}};
      assert.doesNotThrow(() => { Reflect.construct(aClass, arrayLike) });
    });
    
    it('works with a real array', function() {
      let realArray = ['111111'];
      assert.doesNotThrow(() => { Reflect.construct(aClass, realArray) });
    });
  });

  describe('in use', function() {
    
    it('giving it a class it returns an instance of this class', function() {
      class Constructable {}
      let instance = Reflect.construct(Constructable, []); // use Reflect.construct here!!!
      
      assert.equal(instance instanceof Constructable, true);
    });
    
    describe('the list of arguments are passed to the constructor as given', function() {
      class Constructable {
        constructor(...args) { this.args = args; }
      }
      
      it('if none given, nothing is passed', function() {
        let instance = Reflect.construct(Constructable, []);
        
        assert.deepEqual(instance.args, []);
      });
      
      it('passing an array, all args of any type are passed', function() {
        const argumentsList = ['arg1', ['arg2.1', 'arg2.2'], {arg: 3}];
        let instance = Reflect.construct(Constructable, argumentsList);
        
        assert.deepEqual(instance.args, argumentsList);
      });
    });
  });

  describe('the length property', function() {
    it('of `Reflect.construct` is 2', function() {
      let expected = 2;
      assert.equal(Reflect.construct.length, expected);
    });
  });
  
});



// 69: Reflect - defineProperty 
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Reflect.defineProperty()` is like `Object.defineProperty()` but returns a Boolean.', function() {

  describe('the function itself', function() {
    it('is static on the `Reflect` object', function() {
      const name = 'defineProperty';
      assert.equal(name in Reflect, true);
    });
    it('is of type `function`', function() {
      const expectedType = 'function';
      assert.equal(typeof Reflect.defineProperty, expectedType)
    });
  });
  
  describe('the 1st parameter is the object on which to define a property', function() {
    it('fails if it is not an object', function() {
      let noObj;
      assert.throws(() => { Reflect.defineProperty(noObj, 'property', {value: 'value'}); }, TypeError);
    });
    it('accepts an object', function() {
      let obj = {};
      assert.doesNotThrow(() => { Reflect.defineProperty(obj, 'property', {value: 'value'}); });
    });
    it('accepts an instance (of a class)', function() {
      let instance = class {};
      assert.doesNotThrow(() => { Reflect.defineProperty(instance, 'property', {value: 'value'}); });
    });
  });

  describe('2nd parameter is the name of the property to be defined on the object (normally a string)', function() {
    it('works with a `normal` string', function() {
      let obj = {};
      Reflect.defineProperty(obj, 'prop', {});
      assert.equal('prop' in obj, true);
    });
    it('a number gets converted into a string', function() {
      let obj = {};
      Reflect.defineProperty(obj, 1 , {});
      assert.equal('1' in obj, true);
    });
    it('`undefined` also gets converted into a string (watch out!)', function() {
      let obj = {};
      let undef = 1;
      Reflect.defineProperty(obj, undefined, {});
      assert.equal('undefined' in obj, true);
    });
    it('it can be a symbol', function() {
      let obj = {};
      const sym = Symbol.for('prop');
      Reflect.defineProperty(obj, sym, {});
      assert.equal(sym in obj, true);
    });
  });

  describe('the `value` is part of the 3rd parameter, given as a property in an object `{value: ...}`', function() {
    // The entire complexity of the 3rd parameter might be covered in a later kata. 
    
    it('contains the initial value of the property, as an object in the property `value`', function() {
      let obj = {};
      Reflect.defineProperty(obj, 'prop', {value: 'property value'});
      assert.equal(obj.prop, 'property value');
    });
    
    it('can be of any type (even itself)', function() {
      let obj = {};
      Reflect.defineProperty(obj, 'prop', {value: obj});
      assert.equal(obj.prop, obj);
    });
  });

  describe('the return value of the function indicates wether the property was defined successfully', function() {
    describe('returns true', function() {
      it('when the property was created (which requires the 3rd parameter too!!!)', function() {
        let instance = new class {};
        const wasPropertyDefined = Reflect.defineProperty(instance, 'property' ,{value: true});
        assert.equal(wasPropertyDefined, true);
      });
      
      it('no matter what the value of the property is (just the 3rd param has to exist as `{}`)', function() {
        let instance = new class {};
        const wasPropertyDefined = Reflect.defineProperty(instance, 'property' ,{value: true});
        assert.equal(wasPropertyDefined, true);
      });
    });
    
    describe('returns false', function() {
      it('when no property name is given (since no property has been added)', function() {
        let instance = new class {};
        const wasPropertyDefined = Reflect.defineProperty(instance);
        assert.equal(wasPropertyDefined, false);
      });
      
      it('when no 3rd parameter, the descriptor is given', function() {
        let instance = new class {};
        const wasPropertyDefined = Reflect.defineProperty(instance, 'prop');
        assert.equal(wasPropertyDefined, false);
      });
    });
  });
  
});
