var tableId = "1t2d4WAWfcUIGvLffXwOAZcihFjTlO-Bxp76Wysi1";

function initMap() {
  //Inizializzazione della var contenete la mappa, con definizione del centro, del livello di zoom e della div su cui far partire la cosa
  var coordDuomo = {lat:45.464211, lng:9.191383}
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coordDuomo,
    zoom: 14
  });

  if (navigator.geolocation) {//richiesta permessi di geolocalizzazione
    navigator.geolocation.getCurrentPosition(function(position) {
      var posUtente = { //settaggio posizione utente
        lat: position.coords.latitude,//latitudine utente
        lng: position.coords.longitude//longitudine utente
      };
      finInfo= new google.maps.InfoWindow;
      /*
        Se l'utente si trova in un generico confine all'interno di Milano
      */
      if(posUtente.lng > 9.147290 && posUtente.lat < 45.487366 && posUtente.lng < 9.213301 && posUtente.lat > 45.452131){
        /*
        var marker = new google.maps.Marker({//crea una marker sulla posizione dell'utente
          position: posUtente,
          map: map
        });
        */
    		finInfo.setPosition(posUtente),	//aprire una finestra 'Tu sei qui' sulla posizione dell'utente
    		finInfo.setContent('Tu sei qui'),
    		finInfo.open(map);
        map.setCenter(posUtente);//setta il centro della mappa sulla posizione dell'utente
      }
    }, function() {
      console.log("Errore di geolocalizzazione");
	    //errGeo();
      //gestioneErrori(true, finInfo, map.getCenter());
    });
  } else {
    //se il browser non supporta la geolocalizzazione
    console.log("Errore di geolocalizzazione");
	  //errGeo();
	  //gestioneErrori(false, finInfo, map.getCenter());
  }

  //Inizializzazione del layer di poligoni derivato dalla fusion table, con definizione del tipo, della tabella, e di vari elementi di stile
  var layer = new google.maps.FusionTablesLayer(layerSelector(1));
  //Caricamento del layer sopra alla mappa inizializzata in precedenza
  layer.setMap(map);
  //Bottoni
  var mod1 = document.getElementById('mod1');
  var mod2 = document.getElementById('mod2');
  var mod3 = document.getElementById('mod3');
  //Listener di eventi per click dei bottoni
  mod1.addEventListener('click', function(event) {
    layer.setOptions(layerSelector(1));
    console.log("mod1");
  });
  mod2.addEventListener('click', function(event) {
    layer.setOptions(layerSelector(2));
    console.log("mod2");
  });
  mod3.addEventListener('click', function(event) {
    layer.setOptions(layerSelector(3));
    console.log("mod3");
  });
  //Cose da ricaricare quando si modifica la dimensione della finestra
  $(window).on('resize', function() {
    var currCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);
  })
}
function layerSelector(mode){
  var layer;
  if(mode == 1){
    var color1 = "#31fe18";
    var color2 = "#8fff00";
    var color3 = "#d7f900";
    var color4 = "#ffbc00";
	var color5 = "#ff6200";
	var color6 = "#ff3c00";
	var color7 = "#ff0000";
    var start = "0%";
	var midlow = "25%";
	var midhigh = "50%";
    var finish = "100%";
    var title = "Percentuale di stranieri<br> su popolazione residente";
    layer = {
      query: {
        select: 'geometry',
        from: tableId
      },
      templateId: 2,
      styles: [{
        polygonOptions: {
          fillColor: color1,
          fillOpacity: 0.50
        }
      }, {
        where: 'pST > 25',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.50
        }
      }, {
        where: 'pST > 30',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.70
        }
      }, {
        where: 'pST > 35',
        polygonOptions: {
          fillColor: color5,
          fillOpacity: 0.70
        }
      }, {
        where: 'pST > 50',
        polygonOptions: {
          fillColor: color6,
          fillOpacity: 0.70
        }
      }, {
        where: 'pST > 55',
        polygonOptions: {
          fillColor: color7,
          fillOpacity: 0.80
        }
      }]
    };
    generateLegend(title, start, midlow, midhigh, finish, color1, color3, color4, color7);
  }
  else if(mode == 2){
    var color1 = "#00f5b6";
    var color2 = "#00d2f5";
    var color3 = "#007cf5";
    var color4 = "#1902f1";
    var start = "0%";
	var midlow = "25%";
	var midhigh = "50%";
    var finish = "100%";
    var title = "Percentuale di stranieri<br>maschi";
    layer = {
      query: {
        select: 'geometry',
        from: tableId
      },
      templateId: 2,
      styles: [{
        polygonOptions: {
          fillColor: color1,
          fillOpacity: 0.3
        }
      }, {
        where: 'pMST > 50',
        polygonOptions: {
          fillColor: color2,
          fillOpacity: 0.5
        }
      }, {
        where: 'pMST > 75',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.5
        }
      },
      {
        where: 'pMST > 90',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.5
        }
      }]
    };
    generateLegend(title, start, midlow, midhigh, finish, color1, color2, color3, color4);
  }
  else if(mode == 3){
    var color1 = "#ffe6e6";
    var color2 = "#ffb3b3";
    var color3 = "#ff6666";
    var color4 = "#ff0000";
    var start = "0%";
	var midlow = "25%";
	var midhigh = "50%";
    var finish = "100%";
    var title = "Percentuale di stranieri<br>non europei";
    layer = {
      query: {
        select: 'geometry',
        from: tableId
      },
      templateId: 2,
      styles: [{
        polygonOptions: {
          fillColor: color1,
          fillOpacity: 0.3
        }
      }, {
        where: 'pSTCONTEU < 60 AND pST > 0',
        polygonOptions: {
          fillColor: color2,
          fillOpacity: 0.50
        }
      }, {
        where: 'pSTCONTEU < 30 AND pST > 0',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.50
        }
      },
      {
        where: 'pSTCONTEU < 15 AND pST > 0',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.55
        }
      },
      {
        where: 'pSTCONTEU < 10 AND pST > 0',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.65
        }
      },
      {
        where: 'pSTCONTEU < 5 AND pST > 0',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.73
        }
      },
      {
        where: 'pSTCONTEU < 2 AND pST > 0',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.80
        }
      }]
    };
    generateLegend(title, start, midlow, midhigh, finish, color1, color2, color3, color4);
  }
  return layer;
}


/*
//Deprecated
function gestioneErrori(browserHasGeolocation, finInfo, posUtente) { //commento, tanto non la richiamiamo più (riga 35 e 40)
    finInfo.setPosition(coordDuomo);
    finInfo.setContent(browserHasGeolocation ?
      'Errore: Impossibile trovare la tua posizione' :
      'Errore: Il tuo browser non supporta la geolocalizzazione');
    finInfo.open(map);
    console.log("Errore di geolocalizzazione");
}
*/


function generateLegend(title, start, midlow, midhigh, finish, color1, color2, color3, color4){
  var htmlCode = ["<input id=\"googft-legend-open\" style=\"display:none\" value=\"Legend\" type=\"button\">"];
  htmlCode.push("<div id=\"googft-legend\">");
    htmlCode.push("<p id=\"googft-legend-title\">" + title + "</p>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color1 + "\"></span>");
      htmlCode.push("<span class=\"googft-legend-range\">"+ start +"</span>");
      htmlCode.push("<br>");
    htmlCode.push("</div>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color2 + "\"></span>");
	  htmlCode.push("<span class=\"googft-legend-range\">"+ midlow +"</span>");
      htmlCode.push("<br>");
    htmlCode.push("</div>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color3 + "\"></span>");
	  htmlCode.push("<span class=\"googft-legend-range\">"+ midhigh +"</span>");
      htmlCode.push("<br>");
    htmlCode.push("</div>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color4 + "\"></span>");
      htmlCode.push("<span class=\"googft-legend-range\">"+ finish +"</span>");
    htmlCode.push("</div>");
    htmlCode.push("<input id=\"googft-legend-close\" style=\"display:none\" value=\"Hide\" type=\"button\">");
  htmlCode.push("</div>");

  document.getElementById('legenDiv').innerHTML = htmlCode.join('');
}
/*
function errGeo() {	//si potrebbe fare più figo con la libreria alertify
    alert("Non è stato possibile geolocalizzarti");
}
*/
