# stack-slice

Slice a file or directory from the middle of an Error stack trace

## why

Sometimes you get an error at a point when you are the middle man, and you want to remove your function from the stack.

usualy if you are a masheling function and dont want to litter the stack with your implementation.

It is too late to use `captureStackTrace` thus this allows you to splice your call sites out of the stack.

## usage

###stackSlice(error, path[, allowPartialMatch])



``` javascript

    var stackSlice = require('stack-slice'),
        error = new Error('BANG!!!');

    // Assume error.stack is the following
    // Error: BANG!!!
    //    at run (/foo/bar/myCoolModule/node_modules/someOtherModule/node_modulesrun.js:11:11)
    //    at foo (/foo/bar/myCoolModule/node_modules/someOtherModule/run.js:11:11)
    //    at bar (/foo/bar/myCoolModule/run.js:11:11)
    //    at stuff (/foo/bar/myCoolModule/main.js:11:11)
    //    at processImmediate [as _immediateCallback] (timers.js:11:11)


    stackSlice(error, '/foo/bar/myCoolModule/main.js');


    // error.stack is now
    // Error: BANG!!!
    //    at run (/foo/bar/myCoolModule/node_modules/someOtherModule/node_modulesrun.js:11:11)
    //    at foo (/foo/bar/myCoolModule/node_modules/someOtherModule/run.js:11:11)
    //    at bar (/foo/bar/myCoolModule/run.js:11:11)
    //    at processImmediate [as _immediateCallback] (timers.js:11:11)


    stackSlice(error, '/foo/bar/myCoolModule/node_modules/someOtherModule', true);


    // error.stack is now
    // Error: BANG!!!
    //    at bar (/foo/bar/myCoolModule/run.js:11:11)
    //    at processImmediate [as _immediateCallback] (timers.js:11:11)


```

### more legitimate use

``` javascript

    childModule.run(functionFromParentModule, function(error, result){
        if(error){

            // remove all callsite for this module leaving parent and child
            stackSlice(error, __dirname, true);
            return callback(error);
        }

        callback(null, result);
    });

```