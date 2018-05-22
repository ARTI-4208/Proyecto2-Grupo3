#include <FilterDerivative.h>
#include <FilterOnePole.h>
#include <Filters.h>
#include <FilterTwoPole.h>
#include <FloatDefine.h>
#include <RunningStatistics.h>

float testFrequency = 60;                     // test signal frequency (Hz)
float windowLength = 60.0/testFrequency;     // how long to average the signal, for statistist
int sensorValue = 0;
float intercept = -0.155; // to be adjusted based on calibration testing
float slope = 0.037; // to be adjusted based on calibration testing
float current_amps; // estimated actual current in amps

unsigned long printPeriod = 1000; // in milliseconds
// Track time in milliseconds since last reading 
unsigned long previousMillis = 0;

void setup() {
  Serial.begin( 57600 );    // start the serial port
}

void loop() {
  RunningStatistics inputStats;                 // create statistics to look at the raw test signal
  inputStats.setWindowSecs( windowLength );
   
  while( true ) {   
    sensorValue = analogRead(A0);  // read the analog in value:
    inputStats.input(sensorValue);  // log to Stats function
        
    if((unsigned long)(millis() - previousMillis) >= printPeriod) {
      previousMillis = millis();   // update time
      
      // display current values to the screen
      //Serial.print( "\n" );
      // output sigma or variation values associated with the inputValue itsel
      //Serial.print( "\tsigma: " ); Serial.print( inputStats.sigma() );
      // convert signal sigma value to current in amps
      current_amps = abs(intercept + slope * inputStats.sigma());
      Serial.println( current_amps, 3 );
    }
  }
}



