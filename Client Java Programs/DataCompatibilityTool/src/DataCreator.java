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
		String pathName = "Resources/FasceEtaPasolini";
		String extension = ".csv";
		int length = 33;
		File file = new File(pathName+extension);
		CsvReader csvReader = new CsvReader();
		csvReader.setFieldSeparator(',');
		csvReader.setContainsHeader(false);
		List<String[]> lista = new ArrayList<>();
		int rowCounter = 0;
		try (CsvParser csvParser = csvReader.parse(file, StandardCharsets.UTF_8)) {
			CsvRow row;
			while ((row = csvParser.nextRow()) != null) {
				System.out.println("Read line: " + row);
				if(rowCounter != 0){
					String SEZ2011 = row.getField(0)/*+".00000000"*/;
					String[] stringArrayRow = new String[length+1];
					stringArrayRow[0] = SEZ2011;
					for(int i = 1; i < length; i++){
						if(row.getField(i).equals("#DIV/0!"))
							stringArrayRow[i] = "0";
						else
							stringArrayRow[i] = row.getField(i);
					}
					double shape;
					if(row.getField(26).equals(""))
					    shape = 0;
					else
                        shape = Double.parseDouble(row.getField(26)) / 100;
					if(shape==0)
					    shape=1;
					double p1 = Double.parseDouble(row.getField(1));
					stringArrayRow[length]= Double.toString(p1/shape);
					lista.add(stringArrayRow);
				}
				else{
					String[] stringArrayRow = new String[length+1];
					for(int i = 0; i < length; i++){
						stringArrayRow[i] = row.getField(i);
					}
					stringArrayRow[length]="P1divSHAPE";
					lista.add(stringArrayRow);
				}
				rowCounter++;

			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		File fileO = new File(pathName+"Mod"+extension);
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
