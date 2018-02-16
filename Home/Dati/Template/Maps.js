var tableId = "17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP";

function initMap() {
  //Inizializzazione della var contenete la mappa, con definizione del centro, del livello di zoom e della div su cui far partire la cosa
  var coordDuomo = {lat:45.464211, lng:9.191383}
  var map = new google.maps.Map(document.getElementById('map'), {
    center: coordDuomo,
    zoom: 14
  });

  finInfo= new google.maps.InfoWindow;
  if (navigator.geolocation) {//richiesta permessi di geolocalizzazione
    navigator.geolocation.getCurrentPosition(function(position) {
      var posUtente = { //settaggio posizione utente
        lat: position.coords.latitude,//latitudine utente
        lng: position.coords.longitude//longitudine utente
      };

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
        finInfo.setContent('Tu sei qui');  //si può aprire una finestra 'Tu sei qui' al posto del marker
        finInfo.open(map);
        map.setCenter(posUtente);//setta il centro della mappa sulla posizione dell'utente
      }
    }, function() {
      console.log("Errore di geolocalizzazione");
      //gestioneErrori(true, finInfo, map.getCenter());
    });
  } else {
    //se il browser non supporta la geolocalizzazione
    console.log("Errore di geolocalizzazione");
    //gestioneErrori(false, finInfo, map.getCenter());
  }


  //Inizializzazione del layer di poligoni derivato dalla fusion table, con definizione del tipo, della tabella, e di vari elementi di stile
  var layer = new google.maps.FusionTablesLayer(layerSelector(1));
  //Caricamento del layer sopra alla mappa inizializzata in precedenza
  layer.setMap(map);
  var mod1 = document.getElementById('mod1');
  var mod2 = document.getElementById('mod2');
  var mod3 = document.getElementById('mod3');
  //add event listener
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

  $(window).on('resize', function() {
    var currCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currCenter);
  })
}
function layerSelector(mode){
  var layer;
  if(mode == 1){
    layer = {
    query: {
      select: 'geometry',
      from: tableId
    },
    templateId: 2,
    styles: [{
      polygonOptions: {
        fillColor: '#00FF00',
        fillOpacity: 0.3
      }
    }, {
      where: 'POP_2010 > 15',
      polygonOptions: {
        fillColor: '#0000FF'
      }
    }, {
      where: 'POP_2010 < 15',
      polygonOptions: {
        fillOpacity: 1.0
      }
    }]
    };
  }
  else if(mode == 2){
    layer = {
    query: {
      select: 'geometry',
      from: tableId
    },
    templateId: 2,
    styles: [{
      polygonOptions: {
        fillColor: '#AAFF0A',
        fillOpacity: 0.3
      }
    }, {
      where: 'POP_2010 > 15',
      polygonOptions: {
        fillOpacity: 1.0
      }
    }, {
      where: 'POP_2010 < 15',
      polygonOptions: {
        fillOpacity: 0.1
      }
    }]
    };
  }
  else{
    layer = {
    query: {
      select: 'geometry',
      from: tableId
    },
    templateId: 2,
    styles: [{
      polygonOptions: {
        fillColor: '#00FFFF',
        fillOpacity: 0.3
      }
    }, {
      where: 'POP_2010 > 15',
      polygonOptions: {
        fillOpacity: 0.6
      }
    }, {
      where: 'POP_2010 < 15',
      polygonOptions: {
        fillOpacity: 0.1
      }
    }]
    };
  }
  return layer;
}



function gestioneErrori(browserHasGeolocation, finInfo, posUtente) {
    finInfo.setPosition(coordDuomo);
    finInfo.setContent(browserHasGeolocation ?
      'Errore: Impossibile trovare la tua posizione' :
      'Errore: Il tuo browser non supporta la geolocalizzazione');
    finInfo.open(map);
    console.log("Errore di geolocalizzazione");
}