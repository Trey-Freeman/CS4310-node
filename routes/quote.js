/*
var Account = require('../models/account');
var libxmljs = require("libxmljs");
var router = express.Router();


router.post('/quoteXML2', function(req,res) {
    var data = req.xmldata;
    //Do the parsing code here
    var xml =  '<?xml version="1.0" encoding="UTF-8"?>' +
               '<root>' +
                   '<child foo="bar">' +
                       '<grandchild baz="fizbuzz">grandchild content</grandchild>' +
                   '</child>' +
                   '<sibling>with content!</sibling>' +
               '</root>';

    var xmlDoc = libxmljs.parseXml(xml);

    // xpath queries
    var gchild = xmlDoc.get('//grandchild');

    console.log(gchild.text());  // prints "grandchild content"

    var children = xmlDoc.root().childNodes();
    var child = children[0];
    res.send(9999999);
    console.log(9999999999999);
});


module.exports = router;