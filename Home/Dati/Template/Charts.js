var key = "AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ";

google.load('visualization', '1');
google.load('visualization', '1', {packages:['table', 'corechart']});
//google.load('visualization', '1', { packages: ['corechart'] });
//google.setOnLoadCallback(drawTable);
//google.setOnLoadCallback(drawTableChart);
google.setOnLoadCallback(drawBarChart);
loadData();


function loadData() {
  var dataSourceUrl = "https://www.googleapis.com/fusiontables/v2/query?sql=";
  var query = "SELECT 'SEZ2011' as Sez2011, " +
      "'POP_2010' as pop2010, " +
      "'DATO NUMERICO' as Dato";
  var limit = " LIMIT 20";
  var from = " FROM 17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP";
  var url = dataSourceUrl + query + from + "&key=" + key;
  $.getJSON(encodeURI(url), function(data){
    //console.log(data);
    google.setOnLoadCallback(drawTable(data));
  }); 
}

/*
  Tabella
*/
/*
//LIMITATO A 500 LINEE
function drawTable() {
  // Costruzione della "stringa" da mandare alla fusion table per ottenere i dati.
  var query = "SELECT 'SEZ2011' as Sez2011, " +
      "'POP_2010' as pop2010, 'DATO NUMERICO' as Dato " +
      'FROM 17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP';
  var queryText = encodeURIComponent(query);
  var gvizQuery = new google.visualization.Query(
      'http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

  // Invio della richiesta e creazione dei tag della tabella
  gvizQuery.send(function(response) {
	//Salvataggio del numero di righe nella tabella (500 max)
    var numRows = response.getDataTable().getNumberOfRows();
	//Salvataggio del numero di colonne nella tabella
    var numCols = response.getDataTable().getNumberOfColumns();
	//Creazione dei tag iniziali della tabella
    var ftdata = ['<table><thead><tr>'];
	  //Iterazione per le varie colonne, per aggiungere ciascun campo dell'header
    for (var i = 0; i < numCols; i++) {
      var columnTitle = response.getDataTable().getColumnLabel(i);
      ftdata.push('<th>' + columnTitle + '</th>');
    }
	//Chiusura dell'header della tabella
    ftdata.push('</tr></thead><tbody>');
	//Iterazione per le righe
    for (var i = 0; i < numRows; i++) {
	//Creazione del tag di inizio della riga
      ftdata.push('<tr>');
	//Iterazione per le colonne all'interno della riga
      for(var j = 0; j < numCols; j++) {
	//Salvataggio dell valore alla colonna alla riga
        var rowValue = response.getDataTable().getValue(i, j);
	//Caricamento del valore sulla stringa della tabella
        ftdata.push('<td>' + rowValue + '</td>');
      }
	//Chiusura della riga
      ftdata.push('</tr>');
    }
	//Chiusura della tabella
    ftdata.push('</tbody></table>');
	//Caricamento della stringa della tabella sulla div 'table'
    document.getElementById('table').innerHTML = ftdata.join('');
  });
}
*/

/*
//LIMITATO A 500 LINEE
function drawTableChart() {
  var data = new google.visualization.DataTable();
  google.visualization.drawChart({
    containerId: 'tableChart',
    dataSourceUrl: 'http://www.google.com/fusiontables/gvizdata?tq=',
    query: "SELECT 'SEZ2011' as Sez2011, " +
      "'POP_2010' as pop2010, 'DATO NUMERICO' as Dato " +
      'FROM 17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP',
    chartType: 'Table',
    options: {
      title: 'Tabella',
      height: '400',
      width: '40%'
    }
  });
}
*/


/*
  Grafico a Barre
*/

function drawBarChart() {
  google.visualization.drawChart({
    containerId: 'barChart',
    dataSourceUrl: 'http://www.google.com/fusiontables/gvizdata?tq=',
    query: "SELECT 'SEZ2011' as Sez2011, " +
      "'POP_2010' as pop2010, 'DATO NUMERICO' as Dato " +
      'FROM 17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP',
    chartType: 'BarChart',
    options: {
      title: 'Grafico a barre',
      vAxis: {
        title: 'sez2011'
      },
      hAxis: {
        title: 'Dati'
      }
    }
  });
}

function drawTable(jsonData) {
  var numCols = jsonData.columns.length;
  var numRows = jsonData.rows.length;
  var ftdata = ['<table><thead><tr>'];
  for (var i = 0; i < numCols; i++) {
    var columnTitle = jsonData.columns[i];
    ftdata.push('<th>' + columnTitle + '</th>');
  }
  ftdata.push('</tr></thead><tbody>');
  for (var i = 0; i < numRows; i++) {
    ftdata.push('<tr>');
    for(var j = 0; j < numCols; j++) {
      var rowValue = jsonData.rows[i][j];
        ftdata.push('<td>' + rowValue + '</td>');
    }
    ftdata.push('</tr>');
  }
  ftdata.push('</tbody></table>');
  document.getElementById('table').innerHTML = ftdata.join('');
}
