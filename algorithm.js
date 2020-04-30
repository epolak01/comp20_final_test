exports.dog_rating = function (q, r) {
    query = JSON.parse(q)
    result = JSON.parse(r)

    // create an array of zeros
    scores = []
    for (var i = 0; i < result.length; i++) {
        scores.push(0)
    }
    // calculate scores for each breed
    for (var i = 0; i < result.length; i++) {
        if (result[i].breed_group == query.breed_group) {
            scores[i] += 5;
        }
        if (result[i].color1 == query.color1) {
            scores[i] += 3;
        }
        if (result[i].color2 == query.color2) {
            scores[i] += 1;
        }
        if (result[i].coat_len == query.coat_len) {
            scores[i] += 2;
        }
        if (result[i].allergy_friendly == query.allergy_friendly) {
            scores[i] += 3;
        }
        if (result[i].kid_friendly == query.kid_friendly) {
            scores[i] += 3;
        }

        scores[i] -= Math.abs(query.energy_level - result[i].energy_level);
        scores[i] -= Math.abs(query.playfulness - result[i].playfulness);
        scores[i] -= Math.abs(query.shedding - result[i].shedding);
        scores[i] -= Math.abs(query.exercise - result[i].exercise);
        scores[i] -= Math.abs(query.bark_tendency - result[i].bark_tendency);
        scores[i] -= Math.abs(query.trainability - result[i].trainability);
        scores[i] -= Math.abs(query.friendliness - result[i].friendliness);
    }

    //Find best fit
    max = -10000;
    ind_max = 0;

    for (var i = 0; i < scores.length; i++) {
        if (scores[i] > max) {
            max = scores[i];
            ind_max = i;
        }
    }
    return result[ind_max].name
}