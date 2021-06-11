"use strict";
document.addEventListener('DOMContentLoaded', () => {
	console.log("El documento esta listo para ejecutar código JS");

	obtenerContenido();
	generarContenido();
})

function generarContenido(){
	let enlaces,
		contador; 
	enlaces = document.querySelectorAll("a");
	contador = 0;

	enlaces.forEach( (enlace) => {
		enlace.setAttribute("target", "_blank");
	});

	console.log(contador);
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
	datos.forEach( (materia) => {

		materia.contenido.forEach( (silabo) => {

			console.log(silabo.primeraUnidad)
		})

	})
	
}
