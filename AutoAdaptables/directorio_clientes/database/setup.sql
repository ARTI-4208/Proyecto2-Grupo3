use directoryc;
create table directory (id INT NOT NULL PRIMARY KEY, nombre TEXT, telefono INT, direccion TEXT, correo TEXT, last_update DATETIME);
insert into directory (id, nombre, telefono, direccion, correo, last_update) values (80827856, 'Martin Orjuela', 7005776, 'Calle 6 #6-33', 'm.orjuela@uniandes.edu.co', NOW());
insert into directory (id, nombre, telefono, direccion, correo, last_update) values (52747396, 'Paula Vaca', 7005776, 'Calle 9 #6-33', 'paula@uniandes.edu.co', NOW());