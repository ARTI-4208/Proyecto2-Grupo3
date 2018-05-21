#!/bin/sh

# Run the MySQL container, with a database named 'directoryc' and credentials
# for a user_service user which can access it.
echo "Starting DB..."
docker run --name dbdirectoryc -d \
  -e MYSQL_ROOT_PASSWORD=123 \
  -e MYSQL_DATABASE=directoryc -e MYSQL_USER=user_service -e MYSQL_PASSWORD=1234 \
  -p 3306:3306 \
  mysql:latest

# Wait for the database service to start up.
echo "Waiting for DB to start up..."
docker exec dbdirectoryc mysqladmin --silent --wait=30 -uuser_service -p1234 ping || exit 1

# Fucking pre-setup
echo "Setting up initial user..."
docker exec -i dbdirectoryc mysql -uroot -p123 directoryc -e "GRANT ALL PRIVILEGES ON insumos.* TO '${MYSQL_USER}'@'%' WITH GRANT OPTION"

# Run the setup script.
echo "Setting up initial data..."
docker exec -i dbdirectoryc mysql -uuser_service -p1234 directoryc < setup.sql