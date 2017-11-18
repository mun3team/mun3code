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
		File file = new File("C:\\Users\\Andrea\\Documents\\GitHub\\mun3code\\Dati\\Lombardia_Localita\\R03_indicatori_2011_localita.csv");
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
		        	System.out.println("Regione: " + row.getField(1)+"	Provincia: "+row.getField(3)+"	Comune: "+row.getField(5)+"	Localita: "+row.getField(9)+"	P1: "+row.getField(14));	        
		        	Geocoder coder = new Geocoder();
		        	if(row.getField(10).equals("1") || row.getField(10).equals("2"))
		        		coder.geocode("Italy "+row.getField(1)+" "+ row.getField(3)+" "+row.getField(5)+" "+row.getField(9));
		        	else
		        		coder.geocode("Italy "+row.getField(1)+" "+ row.getField(3)+" "+row.getField(5));
		        	if(coder.lat == 0 && coder.lon == 0)
		        		coder.geocode("Italy "+row.getField(1)+" "+ row.getField(3)+" "+row.getField(5));
			        System.out.println("Lat: "+coder.lat+" Lon: "+coder.lon);
			        boolean flag = false;
			        for(String[] temp: lista) {
			        	if(temp[1].equals(coder.latS) && temp[2].equals(coder.lonS)) {
			        		temp[0] = String.valueOf(Double.parseDouble(temp[0])+Double.parseDouble(row.getField(14)));
			        		flag = true;
			        		System.out.println("Effettuata addizione");
			        		break;
			        	}
			        }
			        if(flag== false)
			        lista.add(new String[] { row.getField(14), coder.latS, coder.lonS});
		        }
		        
		    }
		} catch (IOException e) {
			e.printStackTrace();
		}
		File fileO = new File("C:\\Users\\Andrea\\Documents\\GitHub\\mun3code\\Dati\\Finali\\datiP1.csv");
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
