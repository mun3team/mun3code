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
    var numRows = response.getDataTable().getNumberOfRows();
    var numCols = response.getDataTable().getNumberOfColumns();

    var ftdata = ['<table><thead><tr>'];
    for (var i = 0; i < numCols; i++) {
      var columnTitle = response.getDataTable().getColumnLabel(i);
      ftdata.push('<th>' + columnTitle + '</th>');
    }
    ftdata.push('</tr></thead><tbody>');

    for (var i = 0; i < numRows; i++) {
      ftdata.push('<tr>');
      for(var j = 0; j < numCols; j++) {
        var rowValue = response.getDataTable().getValue(i, j);
        ftdata.push('<td>' + rowValue + '</td>');
      }
      ftdata.push('</tr>');
    }
    ftdata.push('</tbody></table>');
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