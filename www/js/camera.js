var app = {
	inicio: function(){
		this.iniciaFastClick()
		// this.iniciaBoton()
		this.iniciaBotones()
	},

	iniciaFastClick: function(){
		FastClick.attach(document.body)
	},

	// iniciaBoton: function(){
	// 	var buttonAction = document.querySelector('#button-action')
		
	// 	buttonAction.addEventListener('click', this.tomarFoto)
	// },

	iniciaBotones: function(){
		var buttonAction = document.querySelector('#button-action'),
			filterButtons = document.querySelectorAll('.button-filter'),
			buttonGallery = document.querySelector('#button-gallery')
		
	 	// buttonAction.addEventListener('click', this.tomarFoto)
	 	buttonAction.addEventListener('click', function(){
	 		app.cargarFoto(Camera.PictureSourceType.CAMERA)
	 	})
	 	
	 	filterButtons[0].addEventListener('click', function(){
	 		app.aplicaFiltro('gray')
	 	})
	 	filterButtons[1].addEventListener('click', function(){
	 		app.aplicaFiltro('negative')
	 	})
	 	filterButtons[2].addEventListener('click', function(){
	 		app.aplicaFiltro('sepia')
	 	})

	 	buttonGallery.addEventListener('click', function(){
	 		app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY)
	 	})
	},

	// tomarFoto: function(){
	// 	var opciones = {
	// 		quality: 50,
	// 		destinationType: Camera.DestinationType.FILE_URI,
	// 		targetWidth: 300,
	// 		targetHeight: 300,
	// 		correctOrientation: true
	// 	}
	// 	navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones)
	// },

	cargarFoto: function(pictureSourceType){
		var opciones = {
			quality: 90,
			sourceType: pictureSourceType,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth: 300,
			targetHeight: 300,
			correctOrientation: true,
			// cameraDirection: BACK,
			saveToPhotoAlbum: true
		}
		navigator.camera.getPicture(app.fotoCargada, app.errorAlCargarFoto, opciones)
	},

	// fotoTomada: function(imageURI){
	// 	// var image = document.querySelector('#foto')
	// 	// image.src = imageURI
	// 	var img = document.createElement('img')
		
	// 	img.onload = function(){
	// 		app.pintarFoto(img)
	// 	}
	// 	img.src = imageURI
	// },

	fotoCargada: function(imageURI){
		var img = document.createElement('img')
		img.onload = function(){
			app.pintarFoto(img)
		}
		img.src = imageURI
	},

	pintarFoto: function(img){
		var canvas = document.querySelector('#foto'),
			context = canvas.getContext('2d')

		canvas.width = img.width
		canvas.height = img.height
		context.drawImage(img, 0, 0, img.width, img.height)
	},

	errorAlTomarFoto: function(message){
		console.log('fallo al tomar foto o toma cancelada: '+message)
	},

	aplicaFiltro: function(filterName){
		var canvas = document.querySelector('#foto'),
			context = canvas.getContext('2d')

		imageData = context.getImageData(0, 0, canvas.width, canvas.height)

		effects[filterName](imageData.data)

		context.putImageData(imageData, 0, 0)
	}
}

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio()
	}, false)
}