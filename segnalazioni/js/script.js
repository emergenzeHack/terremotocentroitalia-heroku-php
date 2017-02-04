$(function () {
    var a = $("#alloggi")
        , b = $("#result");
    $(a).submit(function (c) {
        $("#gif").css("visibility", "visible");
        c.preventDefault();
        var d = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: "php/alloggi.php",
            data: d,
            cache: false,
            contentType: false,
            processData: false
        }).done(function (a) {
            $("#gif").css("visibility", "hidden");
            $(b).text("Alloggio inserito!");
            $("#tel").val("");
            $("#email").val("");
            $("#descrizione").val("");
            $("#us3-address").val("");
            $("#us3-lat").val("");
            $("#us3-lon").val("");
            $("#link").val("");
            $("#image").val("")
        }).fail(function (a) {
            $("#gif").css("visibility", "hidden");
            "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
        })
    })
}),
    $(function () {
        var a = $("#donazioni")
            , b = $("#result");
        $(a).submit(function (c) {
            $("#gif").css("visibility", "visible");
            c.preventDefault();
            var d = new FormData($(this)[0]);
            $.ajax({
                type: "POST",
                url: "php/donazioni.php",
                data: d,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (a) {
                $("#gif").css("visibility", "hidden");
                $(b).text("Donazione inserita!");
                $("#tel").val("");
                $("#email").val("");
                $("#cosa").val("");
                $("#descrizione").val("");
                $("#us3-address").val("");
                $("#us3-lat").val("");
                $("#us3-lon").val("");
                $("#link").val("");
                $("#image").val("")
            }).fail(function (a) {
                $("#gif").css("visibility", "hidden");
                "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
            })
        })
    }),
    $(function () {
        var a = $("#lavoro")
            , b = $("#result");
        $(a).submit(function (c) {
            $("#gif").css("visibility", "visible");
            c.preventDefault();
            var d = new FormData($(this)[0]);
            $.ajax({
                type: "POST",
                url: "php/lavoro.php",
                data: d,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (a) {
                $("#gif").css("visibility", "hidden");
                $(b).text("Donazione inserita!");
                $("#nom").val("");
                $("#tel").val("");
                $("#email").val("");
                $("#co").val("");
                $("#cosa").val("");
                $("#descrizione").val("");
                $("#us3-address").val("");
                $("#us3-lat").val("");
                $("#us3-lon").val("");
                $("#link").val("")
            }).fail(function (a) {
                $("#gif").css("visibility", "hidden");
                "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
            })
        })
    }),
    $(function () {
        var a = $("#fabbisogni")
            , b = $("#result");
        $(a).submit(function (c) {
            $("#gif").css("visibility", "visible");
            c.preventDefault();
            var d = new FormData($(this)[0]);
            $.ajax({
                type: "POST",
                url: "php/fabbisogni.php",
                data: d,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (a) {
                $("#gif").css("visibility", "hidden");
                $(b).text("Segnalazione aperta!");
                $("#tel").val("");
                $("#email").val("");
                $("#cosa").val("");
                $("#descrizione").val("");
                $("#us3-address").val("");
                $("#us3-lat").val("");
                $("#us3-lon").val("");
                $("#link").val("");
                $("#image").val("")
            }).fail(function (a) {
                $("#gif").css("visibility", "hidden");
                "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
            })
        })
    }),
    $(function () {
        var a = $("#fondi")
            , b = $("#result");
        $(a).submit(function (c) {
            $("#gif").css("visibility", "visible");
            c.preventDefault();
            var d = new FormData($(this)[0]);
            $.ajax({
                type: "POST",
                url: "php/fondi.php",
                data: d,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (a) {
                $("#gif").css("visibility", "hidden");
                $(b).text("Segnalazione inserita!");
                $("#chi").val("");
                $("#descrizione").val("");
                $("#intestazione").val("");
                $("#iban").val("");
                $("#bic").val("");
                $("#postale").val("");
                $("#causale").val("");
                $("#link").val("");
                $("#email").val("")
            }).fail(function (a) {
                $("#gif").css("visibility", "hidden");
                "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
            })
        })
    }),
    $(function () {
        var a = $("#notizie")
            , b = $("#result");
        $(a).submit(function (c) {
            $("#gif").css("visibility", "visible");
            c.preventDefault();
            var d = new FormData($(this)[0]);
            $.ajax({
                type: "POST",
                url: "php/notizie.php",
                data: d,
                cache: false,
                contentType: false,
                processData: false
            }).done(function (a) {
                $("#gif").css("visibility", "hidden");
                $(b).text("Segnalazione inserita!");
                $("#titolo").val("");
                $("#descrizione").val("");
                $("#link").val("")
            }).fail(function (a) {
                $("#gif").css("visibility", "hidden");
                "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
            })
        })
    });
$(function () {
    var a = $("#contatti")
        , b = $("#result");
    $(a).submit(function (c) {
        $("#gif").css("visibility", "visible");
        c.preventDefault();
        var d = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: "php/contatti.php",
            data: d,
            cache: false,
            contentType: false,
            processData: false
        }).done(function (a) {
            $("#gif").css("visibility", "hidden");
            $(b).text("Contatto inserito!");
            $("#nome").val("");
            $("#tel").val("");
            $("#email").val("");
            $("#descrizione").val("");
            $("#us3-address").val("");
            $("#us3-lat").val("");
            $("#us3-lon").val("");
            $("#link").val("")
        }).fail(function (a) {
            $("#gif").css("visibility", "hidden");
            "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
        })
    })
});
$(function () {
    var a = $("#bufale")
        , b = $("#result");
    $(a).submit(function (c) {
        $("#gif").css("visibility", "visible");
        c.preventDefault();
        var d = new FormData($(this)[0]);
        $.ajax({
            type: "POST",
            url: "php/bufale.php",
            data: d,
            cache: false,
            contentType: false,
            processData: false
        }).done(function (a) {
            $("#gif").css("visibility", "hidden");
            $(b).text("Segnalazione inserita!");
            $("#titolo").val("");
            $("#descrizione").val("");
            $("#link").val("")
        }).fail(function (a) {
            $("#gif").css("visibility", "hidden");
            "" !== a.responseText ? $(b).text(a.responseText) : $(b).text("Errore")
        })
    })
});

$('.terremoto').on('keyup keypress', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        e.preventDefault();
        return false;
    }
});
function Cancella() {
    $('#us3-address').val('');
    $('#us3-lat').val('');
    $('#us3-lon').val('');
}
