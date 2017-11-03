// 49: Generator - creation
// To do: make all tests pass, leave the assert lines unchanged!

describe('generator can be created in multiple ways', function() {
  
  it('the most common way is by adding `*` after `function`', function() {
    function* g() {}
    assertIsGenerator(g());
  });
  
  it('as a function expression, by adding a `*` after `function`', function() {
    let g = function*() {};
    assertIsGenerator(g());
  });
  
  it('inside an object by prefixing the function name with `*`', function() {
    let obj = {
      *g() {}
    };
    assertIsGenerator(obj.g());
  });
  
  it('computed generator names, are just prefixed with a `*`', function() {
    const generatorName = 'g';
    let obj = {
      *[generatorName]() {}
    };
    assertIsGenerator(obj.g());
  });
  
  it('inside a class the same way', function() {
    const generatorName = 'g';
    class Klazz {
      *[generatorName]() {}
    }
    assertIsGenerator(new Klazz().g());
  });

  function assertIsGenerator(gen) {
    const toStringed = '' + gen;
    assert.equal(toStringed, '[object Generator]');
  }
  
});


// 50: Generator - iterator
// To do: make all tests pass, leave the assert lines unchanged!

describe('a generator returns an iterable object', function() {
  
  function* generatorFunction(){
    yield 1;
    yield 2;
  }
  
  let generator;
  
  beforeEach(() => {
    generator = generatorFunction();
  });
    
  it('a generator returns an object', function() {
    const typeOfTheGenerator = 'object';
    assert.equal(typeof generator, typeOfTheGenerator);
  });
  
  it('a generator object has a key `Symbol.iterator`', function() {
    const key = Symbol.iterator;
    assert.equal(key in generator, true);
  });
  
  it('the `Symbol.iterator` is a function', function() {
    const theType = typeof generator[Symbol.iterator];
    assert.equal(theType, 'function');
  });
  
  it('can be looped with `for-of`, which expects an iterable', function() {
    function iterateForOf(){
      for (let value of generator) {
        // no statements needed
      }
    }
    assert.doesNotThrow(iterateForOf);
  });
  
});


