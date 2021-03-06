var tableId = "1wV7ezib1-KkxVz1hjKyQli2E-fTB2ro487UvQL32";

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
    var color1 = "#3366ff";
    var color2 = "#ff3399";
    var color3 = "#33cc33";
    var desc1 = "Muratura portante";
    var desc2 = "Calcestruzzo armato";
    var desc3 = "Altro materiale (acciaio, legno, ecc.)"
    var title = "Materiale di costruzione<br>edifici residenziali";
    layer = {
      query: {
        select: 'geometry',
        from: tableId
      },
      templateId: 2,
      styles: [{
        polygonOptions: {
          fillColor: color1,
          fillOpacity: 0.4
        }
      }, {
        where: "CALCESTRUZZOARMATO>MURATURAPORTANTE AND CALCESTRUZZOARMATO>ALTROMATERIALE",
        polygonOptions: {
          fillColor: color2,
          fillOpacity: 0.4
        }
      }, {
        where: "ALTROMATERIALE>CALCESTRUZZOARMATO AND ALTROMATERIALE>MURATURAPORTANTE",
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.4
        }
      }]
    };
    generateLegendRef(title, desc1, desc2, desc3, color1, color2, color3);
  }
  else if(mode == 2){
    var color1 = "#e6e6ff";
    var color2 = "#b3b3ff";
    var color3 = "#6666ff";
    var color4 = "#0000ff";
    var start = "0%";
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
          fillOpacity: 0.35
        }
      }, {
        where: 'pMST > 75',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.4
        }
      },
      {
        where: 'pMST > 89',
        polygonOptions: {
          fillColor: color4,
          fillOpacity: 0.45
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
          fillOpacity: 0.35
        }
      }, {
        where: 'pSTCONTEU < 30 AND pST > 0',
        polygonOptions: {
          fillColor: color3,
          fillOpacity: 0.4
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
function generateLegendRef(title, desc1, desc2, desc3, color1, color2, color3){
  var htmlCode = ["<input id=\"googft-legend-open\" style=\"display:none\" value=\"Legend\" type=\"button\">"];
  htmlCode.push("<div id=\"googft-legend\">");
    htmlCode.push("<p id=\"googft-legend-title\">" + title + "</p>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color1 + "\"></span>");
      htmlCode.push("<span class=\"googft-legend-range\">"+ desc1 +"</span>");
      htmlCode.push("<br>");
    htmlCode.push("</div>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color2 + "\"></span>");
      htmlCode.push("<span class=\"googft-legend-range\">"+ desc2 +"</span>");
      htmlCode.push("<br>");
    htmlCode.push("</div>");
    htmlCode.push("<div>");
      htmlCode.push("<span class=\"googft-legend-swatch\" style=\"background-color: " + color3 + "\"></span>");
      htmlCode.push("<span class=\"googft-legend-range\">"+ desc3 +"</span>");
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
