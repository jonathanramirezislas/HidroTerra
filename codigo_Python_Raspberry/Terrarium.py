import RPi.GPIO as GPIO
import time
import pymysql.cursors
import time
import serial
import json
import os

#Serial connection to Arduino
ser= serial.Serial('/dev/ttyACM0',9600)
ser.flushInput()

#Connection to the server
connection= pymysql.connect(host='proyectosita.com',
                             port=3306,
                             user='proyec73_terra',
                             password='jonathan123',
                             db='proyec73_terrarium',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

#Relay 3
spotlight_channel = 21
#Relay 4
waterpump_channel = 26
#Relay 2
humidifier_channel = 20

#Relay 1
fan_channel = 16


#SETUP FOR GPIOs
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(spotlight_channel, GPIO.OUT)
GPIO.setup(waterpump_channel, GPIO.OUT)
GPIO.setup(humidifier_channel, GPIO.OUT)
#---turn off in the beginning
GPIO.output(spotlight_channel, GPIO.HIGH)
GPIO.output(waterpump_channel, GPIO.HIGH)
GPIO.output(humidifier_channel, GPIO.HIGH)



#variables to  make changes in compopnents
minTemp=0
maxTemp=0
minHumidity=0
maxHumidity=0
minSoilMoisture=0
maxSoilMoisture=0

spotlight_status=0
pump_status=0
humidifier_status=0
fun_status=0

#functions to ralays
def relay_off(pin):
    GPIO.output(pin, GPIO.HIGH)  # Turn  off
def relay_on(pin):
    GPIO.output(pin, GPIO.LOW)  # Turn  on



#Main 
if __name__ == '__main__':
    try:
        while True:
            
            #Read from serial in format json
            data=ser.readline()
            datasensor=json.loads(data)
            
            #Get values from sensors(serial communication
            humidity = (datasensor["humidity"])
            temp = (datasensor["temp"])
            soilmoisture = (datasensor["soilmoisture"])
              
            with connection.cursor() as cursor:
                
                # INSERT values from sensors to Server
                sql = """ UPDATE sensor SET humidity= %s, soilmoisture= %s, temperature= %s WHERE idterrarium=1 """
                data_to_send= (humidity,soilmoisture,temp)
                cursor.execute(sql,data_to_send)
                connection.commit()
            
                # Read values from servers(components)  for the components in arduino
                sql = "SELECT * from parameters where idterrarium=1"
                cursor.execute(sql)
                result = cursor.fetchall()
                #Get values from server
                for row in result:
                    minTemp=row['minTemp']
                    maxTemp=row['maxTemp']
                    minHumidity=row['minHumidity']
                    maxHumidity=row['maxHumidity']
                    minSoilMoisture=row['minSoilMoisture']
                    maxSoilMoisture=row['maxSoilMoisture']

                    

            #Check parameters for temperature
            if temp<minTemp:
                if spotlight_status==0:
                    spotlight_status=1
                    relay_on(spotlight_channel)
                    os.system('echo "' +' Spotlight is on' + '" | festival --tts')
                      
    
             
            if temp>maxTemp:
                if spotlight_status==1:
                    spotlight_status=0
                    relay_off(spotlight_channel)
                    os.system('echo "' +' Spotlight is off' + '" | festival --tts')
            
            
        
            
            #Check parameters for humidity
            if humidity<minHumidity:
                if humidifier_status==0:
                    humidifier_status=1
                    relay_on(humidifier_channel)
                    os.system('echo "' +' humidifier is on' + '" | festival --tts')
            if humidity>maxHumidity:
                if humidifier_status==1:
                    humidifier_status=0
                    relay_off(humidifier_channel)
                    os.system('echo "' +' humidifier is off' + '" | festival --tts')
            
            midlerangehumidity=(maxHumidity-minHumidity)/2
            if humidity>(minHumidity+midlerangehumidity):
                if humidifier_status==1:
                    humidifier_status=0
                    relay_off(humidifier_channel)
                    os.system('echo "' +' humidifier is off' + '" | festival --tts')
                
                

            #Check parameters for SoilMoisture
            if soilmoisture<minSoilMoisture:
                 if pump_status==0:
                    pump_status=1
                    relay_on(waterpump_channel)
                    os.system('echo "' +'water pump is on' + '" | festival --tts')
            
               
            if soilmoisture>maxSoilMoisture:
                 if pump_status==1:
                    pump_status=0
                    relay_off(waterpump_channel)
                    os.system('echo "' +'water pump  is off' + '" | festival --tts')
            
            midlerangesoilmoisture=(maxSoilMoisture-minSoilMoisture)/2
            print("turn off if water pump reach the midle of range humidity Moisture:"+str(midlerangesoilmoisture+minSoilMoisture))
            if soilmoisture>(minSoilMoisture+midlerangesoilmoisture):
                if pump_status==1:
                    pump_status=0
                    relay_off(waterpump_channel)
                    os.system('echo "' +'water pump  is off' + '" | festival --tts')
                
               

            time.sleep(2)    

            #Turn off all 
            #if "clean"=="clean":
                #GPIO.cleanup()
                #break           
            
        GPIO.cleanup()
    except KeyboardInterrupt:
        GPIO.cleanup()
    finally:
        connection.close()
    