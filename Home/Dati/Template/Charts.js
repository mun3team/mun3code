google.load('visualization', '1');
function drawTable() {
  // Construct query
  var query = "SELECT 'SEZ2011' as Sez2011, " +
      "'POP_2010' as pop2010, 'DATO NUMERICO' as Dato " +
      'FROM 17LYcPq8I-54Yzozqnq6xUus2RyQsPU1fkUH5KKqP';
  var queryText = encodeURIComponent(query);
  var gvizQuery = new google.visualization.Query(
      'http://www.google.com/fusiontables/gvizdata?tq='  + queryText);

  // Send query and draw table with data in response
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
