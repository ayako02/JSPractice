// 34: symbol
// A symbol is a unique and immutable data type and may be used as an identifier for object properties
// read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

// To do: make all tests pass, leave the assert lines unchanged!

describe('Symbol', function() {

  it('`Symbol` lives in the global scope', function(){
    const expected = Symbol;
    assert.equal(Symbol, expected);
  });

  it('every `Symbol()` is unique', function(){
    const sym1 = Symbol();
    const sym2 = Symbol();
    assert.notEqual(sym1, sym2);
  });

  it('every `Symbol()` is unique, also with the same parameter', function(){
    var sym1 = Symbol('foo');
    var sym2 = Symbol('foo');
    assert.notEqual(sym1, sym2);
  });

  it('`typeof Symbol()` returns "symbol"', function(){
    const theType = typeof Symbol('symbol');
    assert.equal(theType, 'symbol');
  });

  it('`new Symbol()` throws an exception, to prevent creation of Symbol wrapper objects', function(){
    function fn() {
      new Symbol();
    }
    assert.throws(fn);
  });

});



// 35: Symbol.for - retrieves or creates a runtime-wide symbol
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Symbol.for` for registering Symbols globally', function() {
  
  it('creates a new symbol (check via `typeof`)', function() {
    const symbolType = typeof Symbol.for('symbol');
    assert.equal(symbolType, 'symbol');
  });
  
  it('stores the symbol in a runtime-wide registry and retrieves it from it', function() {
    const sym = typeof Symbol.for('new symbol');
    const sym1 = typeof Symbol.for('new symbol1');
    
    assert.equal(sym, sym1);
  });
  
  it('is different to `Symbol()` which creates a symbol every time and does not store it', function() {
    var globalSymbol = Symbol.for('new symbol');
    var localSymbol = Symbol('new symbol');
    
    assert.notEqual(globalSymbol, localSymbol);
  });
  
  describe('`.toString()` on a Symbol', function() {
    
    const localSymbol = Symbol('new symbol');
    const symbolFromRegistry = Symbol.for('new symbol');
    
    it('also contains the key given to `Symbol.for()`', function() {
      const description = localSymbol.toString();
      assert.equal(description, 'Symbol(new symbol)');
    });
  
    describe('NOTE: the description of two different symbols', function() {
      it('might be the same', function() {
        const localDescription = localSymbol.toString();
        const fromRegistryDescription = symbolFromRegistry.toString();
        
        assert.equal(localDescription, fromRegistryDescription);
      });
      
      it('but the symbols are not the same!', function() {
        assert.notEqual(localSymbol, symbolFromRegistry);
      });
    });    
  });
  
});



// 36: Symbol.keyFor - retrieves a shared symbol key from the global symbol registry
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Symbol.keyFor()` gets the symbol key for a given symbol', function() {
  
  const sym = Symbol.for('foo');
  
  it('pass the symbol to `keyFor()` and you get its key', function() {
    const key = Symbol.keyFor(sym);
    
    assert.equal(key, 'foo');
  });
  
  it('local symbols are not in the runtime-wide registry', function() {
    // hint: `Symbol()` creates a local symbol!
    const localSymbol = Symbol('foo');
    const key = Symbol.keyFor(localSymbol);
    
    assert.equal(key, void 0);
  });
  
  it('predefined symbols are not in the runtime-wide registry either', function() {
    const key = Symbol.keyFor(Symbol.iteraTor);
 
    assert.equal(key, void 0);
  });
  
  it('for non-Symbols throws an error', function() {
    function fn(sym) {
      Symbol.keyFor(sym);
    }
    
    assert.throws(fn);
  });
  
});
