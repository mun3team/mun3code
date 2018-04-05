var key = "AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ";
var tableId = "1hQjxQGi15DbdZEUdSU28SEgBrWEQf1dQY7U9xk6i";
var jsonCache;
google.load('visualization', '1');
google.load('visualization', '1', {packages:['table', 'corechart']});

var globalQuery = "SELECT " +
      "'SEZ2011' as 'Sezione di censimento', " +
      "'P1' as 'Popolazione', " +
      "'%ST' as '%Stranieri', " +
      "'%MST' as '%Stranieri maschi', " +
      "'%STCONTEU' as '%Stranieri dal continente europeo', " +
      "'%STCONTAF' as '%Stranieri dal continente Africa', " +
      "'%STCONTAS' as '%Stranieri dal continente Asia', " +
      "'%STCONTAM' as '%Stranieri dalle Americhe', " +
      "'%STCONTOC' as '%Stranieri dal continente Oceania'";
//google.load('visualization', '1', { packages: ['corechart'] });
//google.setOnLoadCallback(drawTable);
//google.setOnLoadCallback(drawTableChart);
//google.setOnLoadCallback(drawBarChart);
loadData();
//loadChartData();

function loadData() {
  var dataSourceUrl = "https://www.googleapis.com/fusiontables/v2/query?sql=";
  var query = globalQuery;
  var limit = " LIMIT 20"; //Solo per debuggare
  var from = " FROM " + tableId;
  var url = dataSourceUrl + query + from +"&key=" + key;
  $.getJSON(encodeURI(url)).done( function(data){
    //console.log(data);
    jsonCache = data;
    google.setOnLoadCallback(drawTableChart(data));
    google.setOnLoadCallback(drawBarChart(data));
    google.setOnLoadCallback(drawScatterChart(data));

    $(window).resize(function(){
      drawBarChart(jsonCache);
      drawScatterChart(jsonCache);
    });

  }).fail(function(){
    google.setOnLoadCallback(drawTableChartSmall);
    google.setOnLoadCallback(drawBarChartSmall);
    google.setOnLoadCallback(drawScatterChartSmall);
  });
}

/*
  Tabella
*/

//LIMITATO A 500 LINEE
function drawTableSmall() {
  // Costruzione della "stringa" da mandare alla fusion table per ottenere i dati.
  var query = globalQuery +
      ' FROM ' +tableId;
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
    document.getElementById('tabella').innerHTML = ftdata.join('');
  });
}



//LIMITATO A 500 LINEE
function drawTableChartSmall() {
  var data = new google.visualization.DataTable();
  google.visualization.drawChart({
    containerId: 'tableChart',
    dataSourceUrl: 'http://www.google.com/fusiontables/gvizdata?tq=',
    query: "SELECT " +
      "'SEZ2011' as 'Sezione di censimento', " +
      "'P1' as 'Popolazione', " +
      "'%ST' as '%Stranieri'" +
      ' FROM ' +tableId,
    chartType: 'Table',
    options: {
      title: 'Tabella',
      height: '400',
      width: '40%'
    }
  });
}


/*
  Grafico a Barre
*/

function drawBarChartSmall() {
  google.visualization.drawChart({
    containerId: 'barChart',
    dataSourceUrl: 'http://www.google.com/fusiontables/gvizdata?tq=',
    query: "SELECT " +
      "'SEZ2011' as 'Sezione di censimento', " +
      "'P1' as 'Popolazione', " +
      "'%ST' as '%Stranieri'" +
      ' FROM ' +tableId,
    chartType: 'BarChart',
    options: {
      height: '800',
      width: '70%',
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

function drawScatterChartSmall() {
  google.visualization.drawChart({
    containerId: 'barChart',
    dataSourceUrl: 'http://www.google.com/fusiontables/gvizdata?tq=',
    query: "SELECT " +
      "'P1' as 'Popolazione', " +
      "'%ST' as '%Stranieri'" +
      ' FROM ' +tableId,
    chartType: 'ScatterChart',
    options: {
      height: '800',
      width: '70%',
      title: 'Grafico a dispersione',
      vAxis: {
        title: 'Dato Numerico'
      },
      hAxis: {
        title: 'Popolazione'
      }
    }
  });
}

function drawBarChart(jsonData) {
  //console.log(jsonData);
  var data = new google.visualization.DataTable();
  data.addColumn('number', jsonData.columns[2]);
  data.addColumn('number', jsonData.columns[3]);

  jsonData.rows.forEach(function (row) {
    /*
    console.log(row[0]);
    console.log(row[1]);
    console.log(row[2]);
    */
    data.addRow([
      Number(row[2]),
      Number(row[3])
    ]);
  });
  //console.log(data);
  // Instantiate and draw our chart, passing in some options.
  //console.log(data.toJSON());
  var chart = new google.visualization.BarChart(document.getElementById('barChart'));
  var options = {
      height: '800',
      width: '70%',
      title: 'Grafico a barre',
      enableInteractivity: 'false',
      vAxis: {
        title: 'Percentuale di stranieri'
      },
      hAxis: {
        title: 'Percentuale di stranieri maschi'
      }
    }
  chart.draw(data, options);
}


function drawTable(jsonData) {
  var numCols = jsonData.columns.length;
  var numRows = jsonData.rows.length;
  var ftdata = ['<table cellpadding="10"><thead><tr>'];
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
  document.getElementById('tabella').innerHTML = ftdata.join('');
}

function drawScatterChart(jsonData) {
  //console.log(jsonData);
  var data = new google.visualization.DataTable();
  data.addColumn('number');
  data.addColumn('number');

  jsonData.rows.forEach(function (row) {
    /*
    console.log(row[0]);
    console.log(row[1]);
    console.log(row[2]);
    */
    data.addRow([
      Number(row[1]),
      Number(row[2])
    ]);
  });
  // Instantiate and draw our chart, passing in some options.
  //console.log(data.toJSON());
  var chart = new google.visualization.ScatterChart(document.getElementById('scatterChart'));
  var options = {
    height: '800',
    width: '70%',
    title: 'Grafico a dispersione',
    enableInteractivity: 'true',
    legend: 'none',
    crosshair: { trigger: 'both' },
    vAxis: {
      title: '%Stranieri'
    },
    hAxis: {
      title: 'Popolazione'
    }
  }
  chart.draw(data, options);
}

function drawTableChart(jsonData) {
  //console.log(jsonData);
  var data = new google.visualization.DataTable();
  data.addColumn('number', jsonData.columns[0]);
  data.addColumn('number', jsonData.columns[1]);
  data.addColumn('number', jsonData.columns[2]);
  data.addColumn('number', jsonData.columns[3]);
  data.addColumn('number', jsonData.columns[4]);
  data.addColumn('number', jsonData.columns[5]);
  data.addColumn('number', jsonData.columns[6]);
  data.addColumn('number', jsonData.columns[7]);
  data.addColumn('number', jsonData.columns[8]);

  jsonData.rows.forEach(function (row) {
    /*
    console.log(row[0]);
    console.log(row[1]);
    console.log(row[2]);
    */
    data.addRow([
      Number(row[0]),
      Number(row[1]),
      Number(row[2]),
      Number(row[3]),
      Number(row[4]),
      Number(row[5]),
      Number(row[6]),
      Number(row[7]),
      Number(row[8])
    ]);
  });
  // Instantiate and draw our chart, passing in some options.
  //console.log(data.toJSON());
  var chart = new google.visualization.Table(document.getElementById('tabella'));
  var options = {
    title: 'Tabella',
    width: '65%',
    page: 'enable',
    pageSize: '15'
  }
  chart.draw(data, options);
}
