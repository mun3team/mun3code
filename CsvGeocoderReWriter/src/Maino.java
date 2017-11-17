import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

import de.siegmar.fastcsv.reader.*;
import de.siegmar.fastcsv.writer.*;
public class Maino {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		File file = new File("C:\\CodeStuff\\WebStuff\\MapsStuff\\csv-heatmap-master\\csv-heatmap-master\\dati.csv");
		CsvReader csvReader = new CsvReader();
		csvReader.setFieldSeparator(';');
		csvReader.setContainsHeader(true);
		List<String[]> lista = new ArrayList<>();
		lista.add(new String[] { "weight", "lat", "lon"});
		try (CsvParser csvParser = csvReader.parse(file, StandardCharsets.UTF_8)) {
		    CsvRow row;
		    while ((row = csvParser.nextRow()) != null) {
		        //System.out.println("Read line: " + row);
		        
		        if(row.getField(3).equals("Milano")) {
		        	System.out.println("Regione: " + row.getField(1)+"	Provincia: "+row.getField(3)+"	Comune: "+row.getField(5)+"	P1: "+row.getField(8));	        
		        	Geocoder coder = new Geocoder();
		        	coder.geocode("Italy "+row.getField(1)+" "+ row.getField(3)+" "+row.getField(5));
			        System.out.println("Lat: "+coder.lat+" Lon: "+coder.lon);
			        lista.add(new String[] { row.getField(8), coder.latS, coder.lonS});
		        }
		        
		    }
		} catch (IOException e) {
			e.printStackTrace();
		}
		File fileO = new File("C:\\\\CodeStuff\\\\WebStuff\\\\MapsStuff\\\\csv-heatmap-master\\\\csv-heatmap-master\\\\datiP1.csv");
		CsvWriter csvWriter = new CsvWriter();
		csvWriter.setFieldSeparator(';');
		csvWriter.setLineDelimiter("\r\n".toCharArray());
		
		try {
			csvWriter.write(fileO, StandardCharsets.UTF_8, lista);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
