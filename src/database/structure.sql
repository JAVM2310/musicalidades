CREATE SCHEMA musicalidades;

CREATE TABLE musicalidades.productos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(90) NOT NULL,
  descripcion TEXT NOT NULL,
  descLarga TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  descuento INT NOT NULL,
  stock INT NOT NULL,
  imagenes TEXT NOT NULL,
  marca_id INT NOT NULL,
  categoria_id INT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE musicalidades.marcas (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(90) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE musicalidades.categorias (
  id INT NOT NULL AUTO_INCREMENT,
  tipo VARCHAR(90) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE musicalidades.usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(90) NOT NULL,
  apellido TEXT NOT NULL,
  email TEXT NOT NULL,
  `password` TEXT NOT NULL,
  pais VARCHAR(90) NOT NULL,
  provincia VARCHAR(90) NOT NULL,
  ciudad VARCHAR(90) NOT NULL,
  direccion VARCHAR(90) NOT NULL,
  codPostal INT NOT NULL,
  fechaNac DATE NOT NULL,
  avatar VARCHAR(200) NOT NULL,
  permisos INT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE musicalidades.productosUsuarios (
  id INT NOT NULL AUTO_INCREMENT,
  cantidad INT NOT NULL,
  producto_id INT NOT NULL,
  usuario_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (producto_id) REFERENCES musicalidades.productos(id),
  FOREIGN KEY (usuario_id) REFERENCES musicalidades.usuarios(id)
);
CREATE TABLE `musicalidades`.`passwordreset` (
  id INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(45) NOT NULL,
  `fecha` INT NOT NULL,
	email TEXT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE `musicalidades`.`ventas` (
  id INT NOT NULL AUTO_INCREMENT,
  `monto` INT NOT NULL,
  `comprador_id` INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (comprador_id) REFERENCES musicalidades.usuarios(id)
);


ALTER TABLE musicalidades.productos
ADD CONSTRAINT marca_id
  FOREIGN KEY (marca_id)
  REFERENCES musicalidades.marcas(id),
  
ADD CONSTRAINT categoria_id
  FOREIGN KEY (categoria_id)
  REFERENCES musicalidades.categorias(id)
; 