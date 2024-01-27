$(document).ready(function() {
    $('#Buscar-poke').click(function() {
        let nombrePokemon = $('#Buscar').val().toLowerCase();

        // NOS PREGUNTAMOS SI EXISTE O NO ES VACIO
        if (nombrePokemon) {
            buscarPokemon(nombrePokemon);
        };    
    });

    // SOLICITAR POKEMON A LA API
    function buscarPokemon(pokemon) {
        $.ajax({
			type: "GET",
			url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
			dataType: "json",
			success: function (data) {
				renderPokeData(data);
			}
		});

        // LIMPIAMOS EL INPUT
        $('#Buscar').val('');
    }

    function renderPokeData(data) {
        // Eliminar el div auxiliar
        $('.card').remove();

        let div = $('<div></div>');
        div.addClass('poke card');

        let name = $('<h3></h3>');
        name.addClass('card-title');
        name.append(data.id + ' ' + data.name.toUpperCase());
        div.append(name);

        let img = $('<img />');
        img.attr('src', data.sprites.other["official-artwork"].front_default);
        img.addClass('card-img');
        div.append(img);

        let body = $('<div></div>');
        body.addClass('card-body');

        // LOGICA PARA MOSTRAR LOS TIPOS
        let pokeType = data.types;
        let tipos = '';

        pokeType.forEach(function(type, index, array) {
            // SI NO ES EL ULTIMO AGREGO GUION
            if (index < array.length - 1) {
                tipos += `${type['type']['name']} - `.toUpperCase();
            }
            else {
                tipos += `${type['type']['name']}`.toUpperCase();
            }
        });

        body.append(`<div>Tipo: ${tipos}</div>`);
        div.append(body);

        $('#pokemon-container').append(div);
    };

    buscarPokemon(1);
});