"use strict";
document.addEventListener('DOMContentLoaded', () => {
	console.log("El documento esta listo para ejecutar código JS");

	if( existeValorLocalStorage() ){
		document.documentElement.style.setProperty('--colorPrimario', localPrimario);
		document.documentElement.style.setProperty('--colorSecundario', localSecundario);
	}else{
		let styles = getComputedStyle (document.documentElement);
		localPrimario = String (styles.getPropertyValue ('--colorPrimario')).trim();
		localSecundario = String (styles.getPropertyValue ('--colorSecundario')).trim();
	}


	

	obtenerContenido();

	cambiarColor();
	abrirColores();
	cerrarColores();
	enlacesNuevaVentana();
})

// * VARIABLES GLOBALES

let localPrimario,
	localSecundario;

	localPrimario = localStorage.getItem("primario");
	localSecundario = localStorage.getItem("secundario");

// * DECLARACIÓN DE LAS FUNCIONES 

function cambiarColor(){
	let styles = getComputedStyle (document.documentElement);

	// RECUPERAR EL VALOR DE UNA VARIABLE CSS
	let bgValue = String (styles.getPropertyValue ('--colorPrimario')).trim();
	// console.log(bgValue)
	

	// ASIGNANDO VALOR A UNA VARIABLE CSS
	// document.documentElement.style.setProperty ('--colorPrimario', '#FDA403');

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


			// * APLICANDO LOCAL STORAGE PARA MANTENER EL CAMBIO DE COLOR EN LA APLICACIÓN (ESTE TIPO DE ALMACENAMIENTO ES POR SESIONES)

			// * GUARDA LOS VALORES HEXADECIMALES DE LOS COLORES EN EL localStorage, TAMBIÉN ACTUALIZA LOS VALORES
			localStorage.setItem("primario", primario)
			localStorage.setItem("secundario", secundario)

		})

	})

}

	// * RECUPERAR LOS VALORES HEXADECIMALES DE LOS COLORES DEL LOCALSTORAGE

function existeValorLocalStorage(){

	if( localPrimario == null && localSecundario == null)
		return false
	else
		return true
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

// * ENTONCES QUE SE PASE POR MEDIO UN ARGUMENTO EL CURSO QUE SE QUIERE CARGA DENTRO DEL HTML, DE FORMA QUE SE REDUCE DE FORMA SIGNIFICATIVA EL MARCADO HTML ESCRITO MANUALMENTE
