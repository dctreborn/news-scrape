module.exports = function(app) {
    //scrape website
    app.get("/scrape", function(res, res) {
        request("http://reddit.com", function(error, resp, html) {
            var $ = cheerio.load(html);

            var result = {};

            $("p .title").each(function(i, element) {

                //get title and link
                result.title = $(this).text();
                result.link = $(element).children().attr("href");

                var entry = new Article(result);

                entry.save(function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(doc);
                    }
                });
            });
        });

        res.send("Scape complete");
    });

    //get all articles
    app.get("/articles", function(req, res) {
        Article.find({}, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                res.json(doc);
            }
        });
    });

    //get article by ID
    app.get("/articles/:id", function(req, res) {
        Article.findOne({
                _id: req.params.id
            })
            .populate("note")
            .exec(function(err, doc) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(doc);
                }
            })
    });

    //create new note or replacec existing note
    app.post("/articles/:id", function(req, res) {
        var newNote = new Note(req.body);

        newNote.save(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                Article.findOneAndUpdate({
                        _id: req.params.id
                    }, {
                        note: doc._id
                    })
                    .exec(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send(data);
                        }
                    });
            }
        });
    });
};