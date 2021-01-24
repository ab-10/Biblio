var $cell = $('.card');

//open and close card when clicked on card
$cell.find('.js-expander').click(function () {

    var $thisCell = $(this).closest('.card');

    if ($thisCell.hasClass('is-collapsed')) {
        $cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed').addClass('is-inactive');
        $thisCell.removeClass('is-collapsed').addClass('is-expanded');

        if ($cell.not($thisCell).hasClass('is-inactive')) {
            //do nothing
        } else {
            $cell.not($thisCell).addClass('is-inactive');
        }

    } else {
        $thisCell.removeClass('is-expanded').addClass('is-collapsed');
        $cell.not($thisCell).removeClass('is-inactive');
    }
});


//close card when click on cross
$cell.find('.js-collapser').click(function () {

    var $thisCell = $(this).closest('.card');

    $thisCell.removeClass('is-expanded').addClass('is-collapsed');
    $cell.not($thisCell).removeClass('is-inactive');

});

// get the Django CSRF Cookie
$(function () {
    var csrftoken = Cookies.get('csrftoken');
});

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

// Ensure jQuery AJAX calls set the CSRF header to prevent security errors
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

$("html").on("dragover", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).addClass('dragging');
});

$("html").on("dragleave", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass('dragging');
});

$("html").on("drop", function (event) {
    event.preventDefault();
    event.stopPropagation();
    event.originalEvent.dataTransfer.dropEffect = 'move';
    var reader = new FileReader();
    reader.onload = function (event) {
        //todo: in order to send the file data pack the result in AJAX post request
        // console.log(event.target.result);	
    };

    file = event.originalEvent.dataTransfer.files[0];
    reader.readAsText(file, 'UTF-8');
    console.log(reader.result)
    $.ajax({
        type: "POST",
        data: "test",
        url: ""
    }).delay(2000);
    location.reload();
});


