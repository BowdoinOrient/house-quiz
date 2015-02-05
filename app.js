$(document).ready(function() {
    var process_form = function(event){
        event.preventDefault();
        $('.quiz').hide();
        // $('.quiz').slideUp("fast", function() {});

        $('.option input').each(function(){
            if (this.checked) {
                console.log(this.value);
            };

        });
        

        var houses = ["Baxter", "Reed", "Ladd", "Howell", "MacMillan", "Helmreich", "Burnett", "Quinby"];
        var i = Math.floor(houses.length * Math.random());
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
