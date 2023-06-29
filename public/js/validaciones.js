// Obtiene los campos del formulario con los ID
var campos = document.querySelectorAll("#cedula, #telefono");

// Agrega un evento de escucha a los campos del formulario
campos.forEach(function(campo) {
campo.addEventListener("input", function() {
// Verifica si el campo de los que solo utilizan numeros
if (this.id === "cedula", "telefono") {
// Reemplaza cualquier caracter que no sea un número con una cadena vacía
this.value = this.value.replace(/[^0-9]/g, "");
}
});
});


var campos = document.querySelectorAll("#nombre, #apellido");
campos.forEach(function(campo) {
campo.addEventListener("input", function() {
if (this.id === "nombre", "apellido") {
this.value = this.value.replace(/[^a-zA-Z]/g, "");
}
});
});