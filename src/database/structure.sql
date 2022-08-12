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
/*FOREIGN KEY (marca_id) REFERENCES marcas(id)*/
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
pais INT NOT NULL,
provincia TEXT NOT NULL,
ciudad INT NOT NULL,
codPostal INT NOT NULL,
fechaNac INT NOT NULL,
PRIMARY KEY (id)
);
CREATE TABLE musicalidades.productosUsuarios (
id INT NOT NULL AUTO_INCREMENT,
cantidad INT NOT NULL,
productos_id INT NOT NULL,
usuarios_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (productos_id) REFERENCES musicalidades.productos(id),
FOREIGN KEY (usuarios_id) REFERENCES musicalidades.usuarios(id)
);

ALTER TABLE musicalidades.productos
ADD CONSTRAINT marca_id
  FOREIGN KEY (marca_id)
  REFERENCES musicalidades.marcas(id),
  
ADD CONSTRAINT categoria_id
  FOREIGN KEY (categoria_id)
  REFERENCES musicalidades.categorias(id)
; 