"use strict";
document.addEventListener('DOMContentLoaded', () => {
	console.log("El documento esta listo para ejecutar código JS");


	

	// obtenerContenido();
	// generarContenido();
	cambiarColor();
	abrirColores();
	cerrarColores();
	enlacesNuevaVentana();
})


function cambiarColor(){
	let styles = getComputedStyle (document.documentElement);

	// RECUPERAR EL VALOR DE UNA VARIABLE CSS
	let bgValue = String (styles.getPropertyValue ('--colorPrimario')).trim();
	console.log(bgValue)
	

	// ASIGNANDO VALOR A UNA VARIABLE CSS
	// document.documentElement.style.setProperty ('--colorPrimario', '#FDA403');


	// * RECUPERAR LA CANTIDA DE COLORES DISPONIBLES

	let cantidadColores;

	cantidadColores = document.querySelectorAll(".colores");
	cantidadColores.forEach( (color) => {

		color.addEventListener('click', () => {
			let primario,
				secundario

			primario = color.dataset.primario;
			secundario = color.dataset.secundario;

			// * ASIGNAR EL VALOR DE LOS COLORES PRIMARIOS A NUESTRAS VARIABLE CSS GLOBALES

			document.documentElement.style.setProperty('--colorPrimario', primario);
			document.documentElement.style.setProperty('--colorSecundario', secundario);

		})

	})
}

function abrirColores(){
	let btnAbrir,
		contenedorColores;
	contenedorColores = document.querySelector(".cambiar-color");
	btnAbrir = document.getElementById("mostrar-colores");

	btnAbrir.addEventListener('click', () => {
		contenedorColores.classList.add('activado');
		btnAbrir.classList.add('activado');
	})
}

function cerrarColores(){
	let btnCerrar = document.getElementById("ocultar-colores"),
		contenedorColores = document.querySelector(".cambiar-color"),
		btnAbrir = document.getElementById("mostrar-colores");

	btnCerrar.addEventListener('click', () => {
		contenedorColores.classList.remove('activado')
		btnAbrir.classList.remove('activado')
	})
}

function enlacesNuevaVentana(){
	let enlaces,
		contador; 
	enlaces = document.querySelectorAll("a");

	enlaces.forEach( (enlace) => {
		enlace.setAttribute("target", "_blank");
	});
}


function obtenerContenido(){
	const url = "https://bremdows.github.io/aprendamosjuntos/js/datos.json";


	fetch(url)
		.then(respuesta => respuesta.json() ) // * SIGNIFICA QUE ESPERAMOS UNA RESPUESTA EN FORMATO JSON
		.then( datos => {

			generarMarcadoHTML( datos );
			
		})		
}

function generarMarcadoHTML( datos ){

	// let datos = [3, 45, 6 ];

	let html = "<div>";

	datos.forEach( (materia) => {
		console.log(materia);

		html += `<h1> ${materia.curso} </h1>`;

		html += "<ul>"
		materia.contenido.forEach( ( silabo, index ) => {
			console.log(index);
			html += ` <li> <a href="${silabo.enlace}" target="_blank"> ${silabo.sesion} </a> </li>`;
		} )
		html += "</ul>"
	})

	html += "</div>";

	console.log(html);
	
}


