var tableId = "1RoCD7nwylw842-iRdPqi6TzvfTWisNrmoLLEiEJ2";
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
    var color1 = "#fff9e6";
    var color2 = "#ffecb3";
    var color3 = "#ffd966";
    var color4 = "#ffbf00";
    var start = "0%";
    var finish = "100%";
    var title = "Popolazione";
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
        where: 'P1 > 50',
        polygonOptions: {
          fillColor: color2,
          fillOpacity: 0.35
        }
      }, {
        where: 'P1 > 100',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.4
        }
      }, {
        where: 'P1 > 200',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.45
        }
      }, {
        where: 'P1 > 400',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.47
        }
      }, {
        where: 'P1 > 600',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.53
        }
      }, {
        where: 'P1 > 800',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.56
        }
      }, {
        where: 'P1 > 1000',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.60
        }
      }]
    };
    generateLegend(title, start, finish, color1, color2, color3, color4);
  }
  else if(mode == 2){
    var color1 = "#e6e6ff";
    var color2 = "#b3b3ff";
    var color3 = "#6666ff";
    var color4 = "#0000ff";
    var start = "Meno densa";
    var finish = "Più densa";
    var title = "Densità di popolazione";
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
        where: 'P1divSHAPE > 1',
        polygonOptions: {
          fillColor: color2,
          fillOpacity: 0.35
        }
      }, {
        where: 'P1divSHAPE > 2',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.4
        }
      },
      {
        where: 'P1divSHAPE > 3',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.45
        }
      },
      {
        where: 'P1divSHAPE > 4',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.50
        }
      },
      {
        where: 'P1divSHAPE > 5',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.60
        }
      },
      {
        where: 'P1divSHAPE > 6',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.70
        }
      }]
    };
    generateLegend(title, start, finish, color1, color2, color3, color4);
  }
  else{
    var color1 = "#ffe6e6";
    var color2 = "#ffb3b3";
    var color3 = "#ff6666";
    var color4 = "#ff0000";
    var start = "0%";
    var finish = "100%";
    var title = "Anzianità";
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
        where: 'over65anni>20',
        polygonOptions: {
          fillColor: color2,
          fillOpacity: 0.35
        }
      }, {
        where: 'over65anni>30',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.4
        }
      },
      {
        where: 'over65anni>50',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.55
        }
      },
      {
        where: 'over65anni>60',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.65
        }
      },
      {
        where: 'over65anni>70',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.73
        }
      },
      {
        where: 'over65anni>90',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.80
        }
      }]
    };
    generateLegend(title, start, finish, color1, color2, color3, color4);
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


function generateLegend(title, start, finish, color1, color2, color3, color4){
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
      htmlCode.push("<br>");
    htmlCode.push("</div>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color3 + "\"></span>");
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
