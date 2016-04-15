$(document).ready(function() {
    var classYear = 0;

    var buildings = {
        "bw": "Brunswick Apartments",
        "hp": "Harpswell Apartments",
        "fh": "52 Harpswell",
        "os": "Osher Hall (5th Floor)",
        "we": "West Hall (5th Floor)",
        "ho": "Howard Hall",
        "st": "Stowe Hall",
        "cl": "Coles Tower",
        "ch": "Chamberlain Hall",
        "mf": "Mayflower Apartments",
        "ps": "Pine Street Apartments",
        "si": "Stowe Inn",
        "cv": "Cleaveland Street",
    };
    // bw hp fh os we ho st cl ch mf ps si cv
    var scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // len = 13
    var codes = ["bw", "hp", "fh", "os", "we", "ho", "st", "cl", "ch",
        "mf", "ps", "si", "cv"
    ];

    // 1 = normal negative
    // 2 = normal positive
    // 3 = +/- 1 negative
    // 4 = +/- 1 positive
    var answers = [
      // bw hp fh os we ho st cl ch mf ps si cv
       [[1, 1, 1, 3, 3, 1, 1, 4, 1, 1, 2, 1, 1],  // question 1, 2017
        [4, 2, 2, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1],  // question 1, 2018
        [1, 1, 1, 3, 3, 2, 4, 1, 1, 1, 1, 1, 1]], // question 1, 2019
        [1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1],  // question 2
        [2, 2, 2, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1],  // question 3
        [4, 4, 2, 1, 1, 1, 1, 1, 1, 4, 4, 4, 1],  // question 4
        [1, 1, 4, 2, 2, 2, 1, 1, 4, 2, 2, 4, 2],  // question 5
        [1, 1, 1, 2, 2, 4, 4, 4, 4, 3, 3, 1, 2],  // question 6
        [2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2],  // question 7
        [1, 1, 4, 4, 4, 4, 1, 4, 4, 2, 1, 2, 1],  // question 8
        [2, 4, 2, 4, 4, 2, 2, 2, 2, 1, 1, 1, 1]   // question 9
    ];

    var processForm = function(event) {
        event.preventDefault();

        if (classYear == 0) {
            swal("Uh oh!", "You need to choose a class year.", "error");
            return;
        }

        for (var i = 1; i <= 9; i++) {
            var selected = $("input[type='radio'][name='" + i + "']:checked").val();
            if(!selected) {
                swal("Uh oh!", "Make sure you've answered every question.", "error");
                return;
            }
            scoreLogic(i, selected);
        }

        var max = scores[0];
        var maxIndex = 0;
        var ties = [];

        for (var i = 1; i < scores.length; i++) {
            if (scores[i] > max) {
                maxIndex = i;
                max = scores[i];
            }
        }

        for (var i = 0; i < scores.length; i++) {
            if (scores[i] == max) {
                ties.push(i);
            }
        }

        response = prettyString(ties)

        swal(response);

        scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        ties = [];
    }

    var prettyString = function(array) {
        if (!array || array.length == 0) return "";
        var clone = array.slice(0);

        return function build() {
            if (clone.length == 1) return buildings[codes[clone[0]]];
            if (clone.length == 2) return buildings[codes[clone[0]]] + ' and ' + buildings[codes[clone[1]]];
            return buildings[codes[clone.shift()]] + ", " + build();
        }();
    }

    var scoreLogic = function(questionNum, response) {
        if (questionNum == 1) {
            if (classYear == 2017) {
                updateScores(response, answers[0][0]);
                return;
            } else if (classYear == 2018) {
                updateScores(response, answers[0][1]);
                return;
            } else if (classYear == 2019) {
                updateScores(response, answers[0][2]);
                return;
            } else {
                swal("Uh oh.", "Something went wrong.", "error");
                return;
            }
        } else {
            updateScores(response, answers[questionNum - 1])
        }
    }

    var updateScores = function(response, houseArray) {
        console.log("Calling updateScores on " + response + " with " + houseArray);
        var variance = 0;

        switch (response) {
            case "vi":
                variance = 2;
                break;
            case "si":
                variance = 1;
                break;
            case "su":
                variance = -1;
                break;
            case "vu":
                variance = -2;
                break;
        }

        for (var i = 0; i < houseArray.length; i++) {
            score = houseArray[i];
            if (score > 2 && variance == 2) {
                variance = 1;
            }

            if (score > 2 && variance == -2) {
                variance = -1;
            }

            if (score == 1 || score == 3) {
                scores[i] -= variance;
            }

            if (score == 2 || score == 4) {
                scores[i] += variance;
            }
        }
    }

    $('form').on("submit", processForm);

    $('.year-button').on('click', function() {
        var clicked = $(this);
        $('.year-button').removeClass('year-button-selected').addClass('year-button-unselected');
        $(clicked).removeClass('year-button-unselected').addClass('year-button-selected')
        classYear = clicked.html();
    });
});
