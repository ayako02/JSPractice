// 18: rest - as-parameter
// To do: make all tests pass, leave the assert lines unchanged!

describe('rest in function params', () => {
    
  it('must be the last parameter', () => {
    const fn = (...rest) => {
      assert.deepEqual([1, 2], rest);
    };
    fn(1, 2);
  });
  
  it('can be used to get all other parameters', () => {
    const fn = (firstParam, secondParam, ...rest) => {
      assert.deepEqual([3,4], rest);
    };
    fn(null, 2, 3, 4);
  });
  
  it('makes `arguments` obsolete', () => {
    const fn = (...args) => {
      assert.deepEqual([42, 'twenty three', 'win'], args);
    };
    fn(42, 'twenty three', 'win');
  });
    
  it('eliminate `arguments`!!!', () => {
    const fn = (...args) => args;
    const [firstArg, ...rest] = fn(1, 2, 3);
    assert.deepEqual([2, 3], rest);
  });
    
});



// 19: rest - with-destructuring
// To do: make all tests pass, leave the assert lines unchanged!

describe('rest with destructuring', () => {
    
  it('rest parameter must be last', () => {
    const [...all] = [1, 2, 3, 4];
    assert.deepEqual(all, [1, 2, 3, 4]);
  });
  
  it('assign rest of an array to a variable', () => {
    const [...all] = [2, 3, 4];
    assert.deepEqual(all, [2, 3, 4]);
  });
  
  // the following are actually using `spread` ... oops, to be fixed
  it('concat differently', () => {
    const theEnd = [3, 4];
    const allInOne = [1, 2, ...theEnd];
    assert.deepEqual(allInOne, [1, 2, 3, 4]);
  });
  
  it('`apply` made simple, even for constructors', () => {
    const theDate = [2015, 1, 1];
    const date = new Date(...theDate);
    assert.deepEqual(new Date(2015, 1, 1), date);
  });
  
});
