#include <DHT.h>

 
// Definimos el pin digital 2 dht11
#define DHTPIN 2
//Defin pin soilmoisture
#define sensor A0

#define DHTTYPE DHT11
 

DHT dht(DHTPIN, DHTTYPE);
 
void setup() {
  Serial.begin(9600);
  pinMode(sensor, INPUT);
  dht.begin();
 
}
 
void loop() {
    // Esperamos 5 segundos entre medidas
  delay(5000);
 
  float  soilmoisture = map(analogRead(sensor), 0, 1023, 100, 0); 
  float humidity = dht.readHumidity();
  float temp = dht.readTemperature();

 Serial.print(temp);
  if (isnan(humidity) || isnan(temp) || isnan(soilmoisture) ) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
   
  }else{
       String jsonString=String("{\"humidity\":")+humidity+String(",\"soilmoisture\":")+soilmoisture+String(",\"temp\":")+temp+String("}");
       Serial.println(jsonString);
    }

}
