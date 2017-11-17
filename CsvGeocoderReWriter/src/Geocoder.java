import java.io.*;
import java.net.*;
import java.util.StringTokenizer;

public class Geocoder {
	private static final long serialVersionUID = 1L;
    // Constants
    public static final String OUTPUT_CSV = "csv";
    public static final String OUTPUT_XML = "xml";
    public static final String OUTPUT_KML = "kml";
    public static final String OUTPUT_JSON = "json";
    private final String output = OUTPUT_JSON;

	double lat;
	double lon;
	String latS;
	String lonS;
	public Geocoder() {
		
	}
	public void decode(String response){
		//response is json in string format, should be formatted
        /*StringTokenizer gLatLng = new StringTokenizer(response, ",");

        String status = gLatLng.nextToken();
        gLatLng.nextToken(); // skip precision
        String latitude = gLatLng.nextToken();
        String longitude = gLatLng.nextToken();
        lat = Double.parseDouble(latitude);
        lon = Double.parseDouble(longitude);*/
		System.out.println(response);
		String delimiter = "[,{} :\n\r\"]+";
		String[] tokens = response.split(delimiter);
		for(int i = 0; i < tokens.length; i++) {
			if(tokens[i].equals("location")) {
				latS = tokens[i+2];
				lonS = tokens[i+4];
				lat = Double.parseDouble(latS);
				lon = Double.parseDouble(lonS);
				//System.out.println("Stringhe: "+latS+" "+lonS);
			}
			System.out.println(tokens[i]);
		}
		
    }
	public void geocode(final String address) throws IOException{
        InputStream is = invokeService(encode(address));
        if (is != null){
            try{
                String content = toString(is);
                decode(content);
            }
            finally{
                is.close();
            }
        }
	}
	protected InputStream invokeService(final String address) throws IOException{
        URL url = new URL(address);
        return url.openStream();
    }
	public String encode(final String address){
        return "https://maps.googleapis.com/maps/api/geocode/"+output+"?address="+urlEncode(address)+"&key=AIzaSyBCXShW7LBmtgz4Ncdsl3FWBsRcym6jvkc";
    }
	private String urlEncode(final String value){
        try{
            return URLEncoder.encode(value, "UTF-8");
        }
        catch (UnsupportedEncodingException ex){
            throw new RuntimeException(ex.getMessage());
        }
    }
	
	public String toString(InputStream input) throws IOException{
		StringWriter sw = new StringWriter();
		copy(input, sw);
		return sw.toString();
	}
	public static void  copy(final InputStream input, final Writer output) throws IOException{
		InputStreamReader in = new InputStreamReader(input);
		copy(in, output);
	}
	public static int copy(final Reader input, final Writer output) throws IOException{
		char[] buffer = new char[1024 * 4];
		int count = 0;
		int n = 0;
		while (-1 != (n = input.read(buffer))) {
			output.write(buffer, 0, n);
			count += n;
		}
		return count;
	}
}
