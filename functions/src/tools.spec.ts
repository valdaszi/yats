import { subtractPoints, arraysEqual, shuffle, answerPointsCalculator } from './tools'

// Chai is a commonly used library for creating unit test suites. It is easily extended with plugins.
import chai = require('chai');
const assert = chai.assert;

describe('subtractPoints function', () => {
  it('should return 0', () => {
    const result = subtractPoints({}, undefined)
    assert.equal(result, 0);
  });
  it('should return 10', () => {
    const result = subtractPoints({ points: 10 }, {})
    assert.equal(result, 10);
  });
  it('should return -10', () => {
    const result = subtractPoints({}, { points: 10 })
    assert.equal(result, -10);
  });
  it('should return 4', () => {
    const result = subtractPoints({ points: 10 }, { points: 6 })
    assert.equal(result, 4);
  });
})

describe('arraysEqual function', () => {
  it('[] == []', () => {
    assert.equal(arraysEqual([], []), true);
  });
  it('[1, 2] != []', () => {
    assert.equal(arraysEqual([1, 2], []), false);
  })
  it('[1, 2] != [1, 2, 3]', () => {
    assert.equal(arraysEqual([1, 2], [1, 2, 3]), false);
  })
  it('[1, 2, 3] != [1, 2]', () => {
    assert.equal(arraysEqual([1, 2, 3], [1, 2]), false);
  })
  it('[1, 2, 3] == [1, 2, 3]', () => {
    assert.equal(arraysEqual([1, 2, 3], [1, 2, 3]), true);
  })
  it('[1, 2, "3"] != [1, 2, 3]', () => {
    assert.equal(arraysEqual([1, 2, '3'], [1, 2, 3]), false);
  })
})

describe('shuffle function', () => {
  it('should return true', () => {
    const a = [1, 2, 3, 4, 5]
    shuffle(a)
    assert.equal(a.length, 5);
    assert.includeMembers(a, [1, 2, 3, 4, 5]);
  });
})

describe('answerPointsCalculator function - no proportional, no penalties', () => {
  const calculations = {}
  it('no answers - should return 0/10', () => {
    const result = answerPointsCalculator({ questionPoints: 10 }, calculations, ['a'], '')
    assert.equal(result, 0);
  });
  it('ok - should return 20/20', () => {
    const result = answerPointsCalculator({ questionPoints: 20 }, calculations, ['a'], 'a')
    assert.equal(result, 20);
  });
  it('too many answers - should return 0/30', () => {
    const result = answerPointsCalculator({ questionPoints: 30 }, calculations, ['a'], ['a', '1'])
    assert.equal(result, 0);
  });
  it('not all answers - should return 0/40', () => {
    const result = answerPointsCalculator({ questionPoints: 40 }, calculations, ['a', 'b'], 'a')
    assert.equal(result, 0);
  });
  it('ok - should return 50/50', () => {
    const result = answerPointsCalculator({ questionPoints: 50 }, calculations, ['a', 'b'], ['b', 'a'])
    assert.equal(result, 50);
  });
  it('partly wrong answers - should return 0/60', () => {
    const result = answerPointsCalculator({ questionPoints: 60 }, calculations, ['a', 'b'], ['1', 'a'])
    assert.equal(result, 0);
  });
});

describe('answerPointsCalculator function - no proportional, with penalties', () => {
  const calculations = { proportional: false, penalties: true }
  it('no answers - should return 0 even with penalty', () => {
    const result = answerPointsCalculator({ questionPoints: 10, penaltyPoints: 5 }, calculations, ['a'], '')
    assert.equal(result, 0);
  });
  it('wrong answer - should return -5', () => {
    const result = answerPointsCalculator({ questionPoints: 20, penaltyPoints: 5 }, calculations, ['a'], ['1'])
    assert.equal(result, -5);
  });
  it('only many wrong answer - should return -5', () => {
    const result = answerPointsCalculator({ questionPoints: 30, penaltyPoints: 5 }, calculations, ['a'], ['x', '1'])
    assert.equal(result, -5);
  });
  it('correct and wrong answers - should return -5', () => {
    const result = answerPointsCalculator({ questionPoints: 40, penaltyPoints: 5 }, calculations, ['a'], ['a', '1'])
    assert.equal(result, -5);
  });
});

describe('answerPointsCalculator function - proportional, no penalties', () => {
  const calculations = { proportional: true, penalties: false }
  it('no answers - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 10, penaltyPoints: 5 }, calculations, ['a'], '')
    assert.equal(result, 0);
  });
  it('wrong answer - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 20, penaltyPoints: 5 }, calculations, ['a'], ['1'])
    assert.equal(result, 0);
  });
  it('only many wrong answers - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 30, penaltyPoints: 5 }, calculations, ['a'], ['1', '2'])
    assert.equal(result, 0);
  });
  it('correct and wrong answers - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 40, penaltyPoints: 5 }, calculations, ['a'], ['a', '1'])
    assert.equal(result, 0);
  });
  it('partial correct answers - should return 25', () => {
    const result = answerPointsCalculator({ questionPoints: 50, penaltyPoints: 5 }, calculations, ['a', 'b'], ['a'])
    assert.equal(result, 25);
  });
  it('partial correct and wrong answers - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', '1'])
    assert.equal(result, 0);
  });
  it('partial correct and wrong answers #2 - should return 20', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', '1'])
    assert.equal(result, 20);
  });
  it('partial correct and wrong answers #3 - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', '1', '2'])
    assert.equal(result, 0);
  });
  it('partial correct and wrong answers #4 - should return 20', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', 'c', '1', '2'])
    assert.equal(result, 20);
  });
  it('partial correct and wrong answers #5 - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', 'c', '1', '2', '3', '4'])
    assert.equal(result, 0);
  });
});

describe('answerPointsCalculator function - proportional, with penalties', () => {
  const calculations = { proportional: true, penalties: true }
  it('no answers - should return 0 even with penalty', () => {
    const result = answerPointsCalculator({ questionPoints: 10, penaltyPoints: 5 }, calculations, ['a'], '')
    assert.equal(result, 0);
  });
  it('wrong answer - should return -20', () => {
    const result = answerPointsCalculator({ questionPoints: 20, penaltyPoints: 5 }, calculations, ['a'], ['1'])
    assert.equal(result, -20);
  });
  it('only many wrong answer - should return -60', () => {
    const result = answerPointsCalculator({ questionPoints: 30, penaltyPoints: 5 }, calculations, ['a'], ['1', '2'])
    assert.equal(result, -60);
  });
  it('correct and wrong answers - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 40, penaltyPoints: 5 }, calculations, ['a'], ['a', '1'])
    assert.equal(result, 0);
  });
  it('partial correct answers - should return 25', () => {
    const result = answerPointsCalculator({ questionPoints: 50, penaltyPoints: 5 }, calculations, ['a', 'b'], ['a'])
    assert.equal(result, 25);
  });
  it('partial correct and wrong answers - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', '1'])
    assert.equal(result, 0);
  });
  it('partial correct and wrong answers #2 - should return 20', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', '1'])
    assert.equal(result, 20);
  });
  it('partial correct and wrong answers #3 - should return -20', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', '1', '2', '3'])
    assert.equal(result, -20);
  });
  it('partial correct and wrong answers #4 - should return 0', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', 'c', '1', '2', '4'])
    assert.equal(result, 0);
  });
  it('partial correct and wrong answers #5 - should return -40', () => {
    const result = answerPointsCalculator({ questionPoints: 60, penaltyPoints: 5 }, calculations, ['a', 'b', 'c'], ['a', 'b', 'c', '1', '2', '3', '4', '5'])
    assert.equal(result, -40);
  });

});
