var fileNameRegex = /\(?((?:\w:\\|\/).*?):/;

function stackSlice(error, path, partialMatches){
    var callSites = error.stack.split('\n'),
        validCallSites = [];

    for (var i = 0; i < callSites.length; i++) {
        var site = callSites[i],
            match = site.match(fileNameRegex),
            fileName;

        if(match){
            fileName = match[1];

            if(fileName === path || ~fileName.indexOf(path) && partialMatches){
                continue;
            }
        }

        validCallSites.push(site);
    }

    error.stack = validCallSites.join('\n');
    return error;
}

module.exports = stackSlice;