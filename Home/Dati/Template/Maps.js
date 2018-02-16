var tableId = "17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP";

function initMap() {
  //Inizializzazione della var contenete la mappa, con definizione del centro, del livello di zoom e della div su cui far partire la cosa
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.476780, lng: 9.259794},
    zoom: 14
  });
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
