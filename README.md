meteor-busboy
===============

Meteor package for Node.js busboy module - A streaming parser for HTML form data for node.js
More info about the mailgun-js: https://github.com/1lobby/mailgun-js

Install
-----
```bach
meteor add risul:busboy
```

Usage
-----
Multipart POST request does not work on Iron Router after 1.0.0.
A simple solution to this problem is to use the Busboy module as middleware.

This snippet is adapted from [pmgration's comment](https://github.com/EventedMind/iron-router/issues/909#issuecomment-63055513) on the Iron Router issues page.
This snippet would belong in your Iron Router `routes.js` file.

```js
if (Meteor.isServer) {
    var fs = Npm.require("fs"),
        os = Npm.require("os"),
        path = Npm.require("path");

    Router.onBeforeAction(function(req, res, next) {
        var file = {}; // Store a file and then pass it to the request.

        if (req.method === "POST") {
            var busboy = new Busboy({
                headers: req.headers
            });
            busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
                var saveTo = path.join(os.tmpDir(), filename);
                var fileSizeBytes = 0;
                file.pipe(fs.createWriteStream(saveTo));

                file.on("data", function(data) {
                    fileSizeBytes = fileSizeBytes + data.length;
                });

                file.on('end', function() {
                    file = {
                        originalFilename: filename,
                        path: saveTo,
                        size: fileSizeBytes
                    };
                });
            });
            busboy.on("finish", function() {
                // Pass the file on to the request
                req.file = file;
                next();
            });
            // Pass request to busboy
            req.pipe(busboy);
        } else {
            next();
        }
    });
}
```

Documentation
-----
Please see [Busboy Documentation](https://github.com/mscdex/busboy) for full Busboy API reference.