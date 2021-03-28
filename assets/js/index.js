$("#add_movie").submit(function (event) {
    alert("Filme/Serie Adicionado com Sucesso!");
})

$("#update_movie").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/movies/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Filme/Serie alterado com sucesso!");
    })

})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/movies/${id}`,
            "method": "DELETE"
        }

        if (confirm("Voce realmente deseja deletar esse item?")) {
            $.ajax(request).done(function (response) {
                alert("Item deletado com sucesso");
                location.reload();
            })
        }

    })
}