$(document).ready(function () {
    $("#search-form").submit(function (event) {
        event.preventDefault();
        
        var searchTerm = $("#search-term").val();

        $("#search-term").val("");

        $.ajax({
            url: "https://api.giphy.com/v1/gifs/search",
            data: {
                q: searchTerm,
                api_key: "fTfxGfhdcBFhiq0EB7AIU42FNt0ZjydS",
                limit: 12
            },
            success: function (response) {
                var gifs = response.data.slice(0, 12);

                $("#gif-container").empty();

                $.each(gifs, function (index, gif) {
                    $("#gif-container").append('<div class="col-md-4 mb-3"><img src="' + gif.images.fixed_height.url + '" alt="' + gif.title + '" class="img-fluid"></div>');
                });

                $("#button-container").empty();

                $.each(response.data, function (index, gif) {
                    var searchTerm = gif.title.split(" ").join("+");
                    $("#button-container").append('<button type="button" class="btn btn-outline-primary mr-2 mb-2" data-search-term="' + searchTerm + '">' + gif.title + '</button>');
                });
            }
        });
    });

    $(document).on("click", "#button-container button", function () {
        var searchTerm = $(this).data("search-term");

        $("#search-term").val(searchTerm);
        $("#search-form").submit();
    });
});


