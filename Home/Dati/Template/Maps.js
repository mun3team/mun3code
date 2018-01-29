function initMap() {
  //Inizializzazione della var contenete la mappa, con definizione del centro, del livello di zoom e della div su cui far partire la cosa
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.476780, lng: 9.259794},
    zoom: 14
  });
  //Inizializzazione del layer di poligoni derivato dalla fusion table, con definizione del tipo, della tabella, e di vari elementi di stile
  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: 'geometry',
      from: '17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP'
    },
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
  });
  //Caricamento del layer sopra alla mappa inizializzata in precedenza
  layer.setMap(map);
}