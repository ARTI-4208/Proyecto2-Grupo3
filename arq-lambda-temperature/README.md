0. descargaar, instalar o descomprimir los siguientes artefaactos
	kafka_2.11-0.10.2.1.tgz (descomprimir)
	mosquitto-1.4.8.tar.gz (descomprimir)
	rethinkdb-2.3.6 (instalar)
	\dashboard (usar carpeta)
	\bridge_mosquito_kafka (usar carpeta)
	
1. Arrancar mosquito con topico de temperature
	
2. Arrancar zookeeeper
	
3. arrancar kafka

4. crear topico temperature en kafka

5. arrancar bridge (\bridge_mosquito_kafka)
	
	node service_kafka.js
	
6. arrancar rethinkdb 

  service rethinkdb start

7. arrancar dashboard (\dashboard)
	node server.js
	
8. arrancar servicio integracion kafka rehtinkdb (\realtime_processor)

	node kafkarethinkdb.js

9. arrancar generador de valores aleatoreos aMQTT mosquito (\mqttclient_device)
	
	node publishtemperature.js
	
	para detener todo el proceso se puede parar el generador con "crtl + c", para que todo vuelva a comunicarse arancar el generador.
	
	
	
	
	
	
	


