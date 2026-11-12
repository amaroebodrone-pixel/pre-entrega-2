// =====================================================
// Pre-Entrega 2: Lógica de Programación y Control de Flujo
// Simulador de Ahorro Personal
// =====================================================


// ---------- CONSTANTES ----------
const MESES_POR_ANIO = 12;
const OPCION_SALIR = "4";


// ---------- VARIABLES ----------
let nombre = "";
let ahorroMensual = 0;
let opcion = "";


// ---------- 1. PEDIR EL NOMBRE (bucle while) ----------
// Se repite MIENTRAS el nombre esté vacío.
// Si el usuario toca "Cancelar", prompt devuelve null y también se vuelve a preguntar.
while (nombre === "" || nombre === null) {
    nombre = prompt("¡Bienvenido al Simulador de Ahorro! ¿Cuál es tu nombre?");

    if (nombre === "" || nombre === null) {
        alert("El nombre no puede quedar vacío. Intentá de nuevo.");
    }
}
console.log("Usuario: " + nombre);


// ---------- 2. PEDIR EL AHORRO MENSUAL (bucle do...while) ----------
// do...while se ejecuta AL MENOS UNA VEZ y repite hasta que el dato sea válido.
do {
    ahorroMensual = parseFloat(prompt(nombre + ", ¿cuánto podés ahorrar por mes? (ej: 15000)"));

    // isNaN() devuelve true si NO es un número (por ejemplo, si escribieron letras)
    if (isNaN(ahorroMensual)) {
        alert("Eso no es un número. Escribí solo números, sin $ ni puntos de miles.");
    } else if (ahorroMensual <= 0) {
        alert("El ahorro tiene que ser mayor a 0.");
    }
} while (isNaN(ahorroMensual) || ahorroMensual <= 0);

console.log("Ahorro mensual ingresado: $" + ahorroMensual);


// ---------- 3. MENÚ PRINCIPAL (bucle while + switch) ----------
// El menú se repite hasta que el usuario elija la opción 4 (Salir).
while (opcion !== OPCION_SALIR) {
    opcion = prompt(
        "MENÚ - ¿Qué querés hacer, " + nombre + "?\n" +
        "Ahorro actual: $" + ahorroMensual + " por mes\n\n" +
        "1. Ver mi ahorro mes a mes durante un año\n" +
        "2. Calcular en cuántos meses llego a una meta\n" +
        "3. Cambiar mi ahorro mensual\n" +
        "4. Salir"
    );

    switch (opcion) {

        // ----- OPCIÓN 1: bucle for con un if adentro -----
        case "1": {
            let acumulado = 0;
            console.log("===== AHORRO MES A MES =====");

            // for: sabemos que son exactamente 12 repeticiones
            for (let mes = 1; mes <= MESES_POR_ANIO; mes++) {
                acumulado = acumulado + ahorroMensual;

                // Condicional DENTRO del bucle: destacamos la mitad y el final del año
                if (mes === 6) {
                    console.log("Mes " + mes + ": $" + acumulado + "  <-- ¡Mitad de año!");
                } else if (mes === MESES_POR_ANIO) {
                    console.log("Mes " + mes + ": $" + acumulado + "  <-- ¡Total del año!");
                } else {
                    console.log("Mes " + mes + ": $" + acumulado);
                }
            }

            alert("En un año vas a juntar $" + acumulado + ". Mirá el detalle mes a mes en la consola (F12).");
            break;
        }

        // ----- OPCIÓN 2: bucle while con condicionales -----
        case "2": {
            const meta = parseFloat(prompt("¿Cuánto dinero querés juntar? (tu meta)"));

            if (isNaN(meta) || meta <= 0) {
                alert("La meta tiene que ser un número mayor a 0.");
            } else {
                let acumulado = 0;
                let meses = 0;

                // while: NO sabemos cuántas vueltas va a dar, depende de la meta
                while (acumulado < meta) {
                    meses++;
                    acumulado = acumulado + ahorroMensual;
                }

                // Mostramos el resultado según cuánto tiempo lleve
                let mensaje = "Llegás a tu meta de $" + meta + " en " + meses + " meses";

                if (meses <= MESES_POR_ANIO) {
                    mensaje = mensaje + ". ¡En menos de un año! 🎉";
                } else if (meses <= MESES_POR_ANIO * 3) {
                    mensaje = mensaje + " (unos " + Math.ceil(meses / MESES_POR_ANIO) + " años). ¡Se puede!";
                } else {
                    mensaje = mensaje + " (unos " + Math.ceil(meses / MESES_POR_ANIO) + " años). Probá aumentar tu ahorro mensual.";
                }

                console.log(mensaje);
                alert(mensaje);
            }
            break;
        }

        // ----- OPCIÓN 3: cambiar el ahorro mensual -----
        case "3": {
            const nuevoAhorro = parseFloat(prompt("¿Cuál es tu nuevo ahorro mensual?"));

            if (isNaN(nuevoAhorro) || nuevoAhorro <= 0) {
                alert("Valor inválido. Tu ahorro sigue siendo $" + ahorroMensual + ".");
            } else {
                console.log("Ahorro mensual actualizado: de $" + ahorroMensual + " a $" + nuevoAhorro);
                ahorroMensual = nuevoAhorro;
                alert("¡Listo! Tu nuevo ahorro mensual es $" + ahorroMensual + ".");
            }
            break;
        }

        // ----- OPCIÓN 4: salir -----
        case OPCION_SALIR:
            console.log("El usuario salió del simulador.");
            alert("¡Gracias por usar el simulador, " + nombre + "! Seguí ahorrando 💰");
            break;

        // ----- Cualquier otra cosa -----
        default:
            // Si toca "Cancelar" en el menú, prompt devuelve null: lo tomamos como salir
            if (opcion === null) {
                opcion = OPCION_SALIR;
                alert("Saliste del simulador. ¡Hasta pronto, " + nombre + "!");
            } else {
                alert("Opción inválida. Elegí un número del 1 al 4.");
            }
    }
}
