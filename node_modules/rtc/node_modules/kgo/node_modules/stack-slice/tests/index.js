var test = require('tape'),
    path = require('path'),
    stackSlice = require('../');

test('no touchy', function(t){
    t.plan(1);

    var testError = new Error('BANG!!!!'),
        originalStack = testError.stack;

    stackSlice(testError, 'something that wont match');

    t.equal(originalStack, testError.stack, 'stack was not modified');
});

test('exact match', function(t){
    t.plan(1);

    var testError = new Error('BANG!!!!'),
        originalStack = testError.stack.split('\n');

    originalStack.splice(1,1);

    var expectedStack = originalStack.join('\n');

    stackSlice(testError, __filename);

    t.equal(testError.stack, expectedStack, 'stack was modified correctly');
});

test('exact match with anonomous function', function(t){
    t.plan(1);

    var testError = function(){
            return new Error('BANG!!!!');
        }(),
        originalStack = testError.stack.split('\n');

    originalStack.splice(1,2);

    var expectedStack = originalStack.join('\n');

    stackSlice(testError, __filename);

    t.equal(testError.stack, expectedStack, 'stack was modified correctly');
});

test('partial match', function(t){
    t.plan(1);

    var testError = new Error('BANG!!!!'),
        originalStack = testError.stack.split('\n'),
        expectedStack = [];

    expectedStack.push(originalStack.shift());
    expectedStack.push(originalStack.pop());

    stackSlice(testError, path.resolve(__dirname, '..'), true);

    t.equal(testError.stack, expectedStack.join('\n'), 'stack was modified correctly');
});

test('partial match with anonomous function', function(t){
    t.plan(1);

    var testError = function(){
            return new Error('BANG!!!!');
        }(),
        originalStack = testError.stack.split('\n'),
        expectedStack = [];

    expectedStack.push(originalStack.shift());
    expectedStack.push(originalStack.pop());

    stackSlice(testError, path.resolve(__dirname, '..'), true);

    t.equal(testError.stack, expectedStack.join('\n'), 'stack was modified correctly');
});