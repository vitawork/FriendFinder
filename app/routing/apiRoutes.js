var people = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(people);
  });

  app.post("/api/survey", function(req, res) {
    var newF = req.body;
    var found = false;
    var tempDiff = 41;
    var bestMatch = {};

    for (let i = 0; i < people.length; i++) {
      if (newF.name === people[i].name) {
        found = true;
        people[i].photo = newF.photo;
        people[i].scores = newF.scores;
      } else {
        var totalDifference = 0;
        for (let j = 0; j < people[i].scores.length; j++) {
          totalDifference += Math.abs(people[i].scores[j] - newF.scores[j]);
        }
        if (totalDifference < tempDiff) {
          tempDiff = totalDifference;
          bestMatch = people[i];
        }
      }
    }

    if (!found) {
      res.json(bestMatch);
    } else {
      people.push(newF);
      res.json(false); //////////////////////////////////
    }
  });
};
