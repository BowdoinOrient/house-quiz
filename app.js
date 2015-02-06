$(document).ready(function() {
    var process_form = function(event){
        event.preventDefault();
        $('.quiz').hide();
        // $('.quiz').slideUp("fast", function() {});

        var scores = [0, 0, 0, 0, 0, 0, 0 ,0]

        $('.option input').each(function(){
            if (this.checked) {
                if(this.value.indexOf("ba") >= 0){
                    scores[0]++;
                } else if(this.value.indexOf("r") >= 0) {
                    scores[1]++;
                } else if(this.value.indexOf("l") >= 0) {
                    scores[2]++;
                } else if(this.value.indexOf("ho") >= 0) {
                    scores[3]++;
                } else if(this.value.indexOf("m") >= 0) {
                    scores[4]++;
                } else if(this.value.indexOf("he") >= 0) {
                    scores[5]++;
                } else if(this.value.indexOf("bu") >= 0) {
                    scores[6]++;
                } else if(this.value.indexOf("q") >= 0) {
                    scores[7]++;
                }
            };
        });

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

        $('.results img')[0].src = imageURL;
        $('.results').show();
    };

    var reset = function(event){
        $('.results').hide();
        $('.quiz').show();
    };
    
    // Initial setup
    $('.quiz').on("submit", process_form);
    $('.reset').click(reset);
    $('.results').hide();
});
