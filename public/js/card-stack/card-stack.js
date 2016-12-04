$(document).ready(function () {
    $("body").bind("touchstart", function() { });
    $(".fan li").hover(function() {
        $(this).nextAll().each(function(i) {
            $(this).addClass("after prefix_" + (i+1));
        });
        $(this).prevAll().each(function(i) {
            $(this).addClass("before prefix_" + (i+1));
        });
    }, function() {
        $(this).nextAll().each(function(i) {
            $(this).removeClass("after prefix_" + (i+1));
        });
        $(this).prevAll().each(function(i) {
            $(this).removeClass("before prefix_" + (i+1));
        });
    });
    $("a[rel='external']").attr("target", "_blank");
});