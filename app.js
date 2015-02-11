$(document).ready(function() {
    var process_form = function(event){
        event.preventDefault();
        // $('.quiz').hide();
        // $('.quiz').slideUp("fast", function() {});

        var scores = [0, 0, 0, 0, 0, 0, 0 ,0]

        $('.option input').each(function(){
            if (this.checked) {
                if(this.value.indexOf("ba") >= 0){
                    scores[0]++;
                }
                if(this.value.indexOf("r") >= 0) {
                    scores[1]++;
                }
                if(this.value.indexOf("l") >= 0) {
                    scores[2]++;
                }
                if(this.value.indexOf("ho") >= 0) {
                    scores[3]++;
                }
                if(this.value.indexOf("m") >= 0) {
                    scores[4]++;
                }
                if(this.value.indexOf("he") >= 0) {
                    scores[5]++;
                }
                if(this.value.indexOf("bu") >= 0) {
                    scores[6]++;
                }
                if(this.value.indexOf("q") >= 0) {
                    scores[7]++;
                }
            };
        });

        var answered = scores.reduce(function(a, b) { return a + b });
        console.log("answer: "+answered);

        if(answered < 10){
            $('#incomplete').show();
        } else {
            $('#incomplete').hide();
            var houses = ["Baxter", "Reed", "Ladd", "Howell", "MacMillan", "Helmreich", "Burnett", "Quinby"];
            var i = scores.indexOf(Math.max.apply(Math, scores));
            var house = houses[i];
            $('.house').text(house + " House");

            var imageURL = "http://www.bowdoin.edu/reslife/images/"
            if (house == "Burnett") {
                imageURL += house + "1.jpg"
            } else{
                imageURL += house + ".jpg"
            }; 

            console.log(scores);

            $('.results img')[0].src = imageURL;
            $('.results').show();
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");
        }
    };

    var reset = function(event){
        $('.results').hide();
        $('.quiz')[0].reset();
        $("html, body").animate({ scrollTop: 0}, "slow");
    };
    


    // ~ Initial setup ~

    $('.quiz').on("submit", process_form);

    // Allow only one checkbox to be selected at a time
    $("input:checkbox").on('click', function() {
        var $box = $(this);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);
        } else {
            $box.prop("checked", false);
        }
    });

    // Results setup
    $('.reset').click(reset);
    $('.results').hide();
    // image shouldn't be bigger than the screen
    $('.results img').css("max-width", $(window).width());
});
