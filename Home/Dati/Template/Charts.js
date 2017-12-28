/*
  Tabella
*/
google.load('visualization', '1');
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
google.setOnLoadCallback(drawTable);

/*
  Grafico a Barre
*/

google.load('visualization', '1', { packages: ['corechart'] });

function drawTableChart() {
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

google.setOnLoadCallback(drawTableChart);
