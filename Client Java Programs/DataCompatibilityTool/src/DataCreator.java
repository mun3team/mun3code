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
		System.out.println("Inizio");
		File file = new File("Resources/FasceEta.csv");
		CsvReader csvReader = new CsvReader();
		csvReader.setFieldSeparator(',');
		csvReader.setContainsHeader(false);
		List<String[]> lista = new ArrayList<>();
		int rowCounter = 0;
		try (CsvParser csvParser = csvReader.parse(file, StandardCharsets.UTF_8)) {
			CsvRow row;
			while ((row = csvParser.nextRow()) != null) {
				rowCounter++;
				System.out.println("Read line: " + row);
				if(rowCounter != 1){
					String SEZ2011 = row.getField(0)+".0000000";
					String[] stringArrayRow = new String[22];
					stringArrayRow[0] = SEZ2011;
					for(int i = 1; i < 22; i++){
						stringArrayRow[i] = row.getField(i);
					}
					lista.add(stringArrayRow);
				}
				else{
					String[] stringArrayRow = new String[22];
					for(int i = 0; i < 22; i++){
						stringArrayRow[i] = row.getField(i);
					}
					lista.add(stringArrayRow);
				}

			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		File fileO = new File("Resources/FasceEtaMod.csv");
		CsvWriter csvWriter = new CsvWriter();
		csvWriter.setFieldSeparator(',');
		csvWriter.setLineDelimiter("\r\n".toCharArray());

		try {
			csvWriter.write(fileO, StandardCharsets.UTF_8, lista);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
