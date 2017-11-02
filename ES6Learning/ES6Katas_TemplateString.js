// 1: template strings - basics
// To do: make all tests pass, leave the asserts unchanged!

describe("a template string, is wrapped in ` (backticks) instead of ' or \"", function() {
  describe("by default, behaves like a normal string", function() {
    it("just surrounded by backticks", function() {
      var str = `like a string`;
      assert.equal(str, "like a string");
    });
  });

  var x = 42;
  var y = 23;

  describe('can evaluate variables, which are wrapped in "${" and "}"', function() {
    it('e.g. a simple variable "${x}" just gets evaluated', function() {
      var evaluated = `x=${x}`;
      assert.equal(evaluated, "x=" + x);
    });

    it("multiple variables get evaluated too", function() {
      var evaluated = `${x}+${y}`;
      assert.equal(evaluated, x + "+" + y);
    });
  });

  describe('can evaluate any expression, wrapped inside "${...}"', function() {
    it('all inside "${...}" gets evaluated', function() {
      var evaluated = `${x + y}`;
      assert.equal(evaluated, x + y);
    });

    it('inside "${...}" can also be a function call', function() {
      function getDomain() {
        return document.domain;
      }
      var evaluated = `${getDomain()}`;
      assert.equal(evaluated, "tddbin.com");
    });
  });
});

// 2: template strings - multiline
// To do: make all tests pass, leave the asserts unchanged!

describe('template string, can contain multiline content', function() {

  it('a normal string can`t span across multiple lines', function() {
    var normalString = 'line1\n' +
                       'line2';
    assert.equal(normalString, 'line1\nline2');
  });
  
  it('wrapped in backticks it can span over multiple lines', function() {
    var templateString = `line1\nline2`;
    assert.equal(templateString, 'line1\nline2');
  });
  
  it('even over more than two lines', function() {
    var multiline = `line 1
                     line 2
                     line 3
                     line 4`;
    assert.equal(multiline.split('\n').length, 4);
  });

  describe('and expressions inside work too', function() {
    
    var x = 42;
    
    it('like simple variables', function() {
        var multiline = `line 1
          ${x}`;
      assert.equal(multiline, 'line 1\n          42');
    });
    
    it('also here spaces matter', function() {
      var multiline = `
${x}`;
      assert.equal(multiline, '\n42');
    });
    
  });
  
});

// 3: template strings - tagged
// To do: make all tests pass, leave the asserts unchanged!

describe('tagged template strings, are an advanced form of template strings', function() {
  
  it('syntax: prefix the template string with a function to call (without "()" around it)', function() {
    function tagFunction(s) {
      return s.toString();
    }
    var evaluated = tagFunction `template string`;
    assert.equal(evaluated, 'template string');
  });
  
  describe('the function can access each part of the template', function() {

    describe('the 1st parameter - receives only the pure strings of the template string', function() {

      function tagFunction(strings) {
        return strings;
      }

      it('the strings are an array', function() {
        var result = ['template string'];
        assert.deepEqual(tagFunction`template string`, result);
      });

      it('expressions are NOT passed to it', function() {
        var tagged = tagFunction`one${23}two`; 
        assert.deepEqual(tagged, ['one', 'two']);
      });

    });

    describe('the 2nd and following parameters - contain the values of the processed substitution', function() {

      var one = 1;
      var two = 2;
      var three = 3;
      it('the 2nd parameter contains the first expression`s value', function() {
        function firstValueOnly(strings, firstValue) { 
          return firstValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 1);
      });
      
      it('the 3rd parameter contains the second expression`s value', function() {
        function firstValueOnly(strings, firstValue, secondValue) { 
          return secondValue;
        }
        assert.equal(firstValueOnly`uno ${one}, dos ${two}`, 2);
      });
      
      it('using ES6 rest syntax, all values can be accessed via one variable', function() {
        function valuesOnly(stringsArray, ...allValues) { // using the new ES6 rest syntax
          return allValues;
        }
        assert.deepEqual(valuesOnly`uno=${one}, dos=${two}, tres=${three}`, [1, 2, 3]);
      });
      
    });     
  });

});



