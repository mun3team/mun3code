import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import de.siegmar.fastcsv.reader.*;
import de.siegmar.fastcsv.writer.*;

public class DataCreator {
	public static int max = 100;
	public static void main(String[] args) throws IOException{
		// TODO Auto-generated method stub
		File testFile1 = new File("C:\\Users\\Andrea\\Documents\\GitHub\\mun3code\\Dati\\Dati Test\\test1.csv");
		List<String[]> contenuto = new ArrayList<>();
		String[] header = {"SEZ2011", "DATO NUMERICO"};
		contenuto.add(header);
		long start = (long) 151460000001.0;
		long end = (long) 151460006107.0;
		for(long sez2011 = start; sez2011 <= end; sez2011++) {
			Random generatore = new Random();
			String[] riga = {Long.toString(sez2011) + ".00000000", Integer.toString(generatore.nextInt(max))};
			contenuto.add(riga);
		}
		CsvWriter csvWriter = new CsvWriter();
		csvWriter.setFieldSeparator(';');
		csvWriter.setLineDelimiter("\r\n".toCharArray());
		csvWriter.write(testFile1, StandardCharsets.UTF_8, contenuto);
		
	}

}
