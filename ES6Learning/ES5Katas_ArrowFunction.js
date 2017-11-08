// 5: arrow functions - basics
// To do: make all tests pass, leave the asserts unchanged!

describe('arrow functions', function() {

  it('are shorter to write', function() {
    var func = () => {
      return 'I am func';
    };
    assert.equal(func(), 'I am func');
  });

  it('a single expression, without curly braces returns too', function() {
    var func = () => 'I return too';
    assert.equal(func(), 'I return too');
  });

  it('one parameter can be written without parens', () => {
    var func = param => param - 1;
    assert.equal(func(25), 24);
  });

  it('many params require parens', () => {
    var func = (param, param1) => param + param1;
    assert.equal(func(23, 42), 23+42);
  });

  it('body needs parens to return an object', () => {
    var func = () => ({iAm: 'an object'});
    assert.deepEqual(func(), {iAm: 'an object'});
  });

});




// 6: arrow functions - binding
// To do: make all tests pass, leave the asserts unchanged!

class LexicallyBound {
  
  getFunction() {
    return () => {
      return this;
    }
  }
  
  getArgumentsFunction() {
    return () => {
      return arguments
    }
  }
  
}

describe('arrow functions have lexical `this`, no dynamic `this`', () => {
 
  it('bound at definition time, use `=>` ', function() {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();
    
    assert.strictEqual(fn(), bound);
  });
 
  it('can NOT bind a different context', function() {
    var bound = new LexicallyBound();
    var fn = bound.getFunction();
    var anotherObj = {};
    var expected = bound;
    
    assert.strictEqual(fn.call(anotherObj), expected);
  });
  
  it('`arguments` doesnt work inside arrow functions', function() {
    var bound = new LexicallyBound();
    var fn = bound.getArgumentsFunction();
    
    assert.equal(fn(1, 2).length, 0);
  });
  
});
