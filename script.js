// Referencias a los elementos del DOM
const loaderContainer = document.getElementById('loader-container');
const loaderText = document.getElementById('loader-text');
const mainContent = document.getElementById('main-content');
const predictButton = document.getElementById('predict-button');
const predictionOutput = document.getElementById('prediction-output');
const statusOutput = document.getElementById('status-output'); // Nuevo elemento para el estado

const APPROVAL_THRESHOLD = 10.52; // Umbral para aprobar

async function main() {
    // ------------------- FASE 1: INICIAR PYODIDE -------------------
    let pyodide = await loadPyodide();
    loaderText.textContent = "Cargando paquetes (sklearn, pandas)...";
    
    // Instalar los paquetes que el modelo necesita
    await pyodide.loadPackage(["scikit-learn", "pandas", "numpy", "joblib"]);
    
    // ------------------- FASE 2: CARGAR EL MODELO -------------------
    loaderText.textContent = "Descargando el modelo...";
    
    // La URL desde donde se servirá el modelo. En GitHub Pages, es una ruta relativa.
    const modelURL = 'modelo_notas.joblib'; 
    const response = await fetch(modelURL);
    const buffer = await response.arrayBuffer(); // Obtener el archivo como un buffer de datos

    // Guardar el modelo en el sistema de archivos virtual de Pyodide
    pyodide.FS.writeFile("modelo.joblib", new Uint8Array(buffer));

    // ------------------- FASE 3: DEFINIR LA FUNCIÓN DE PREDICCIÓN -------------------
    // Definir una función en Python que será llamada desde JavaScript
    pyodide.runPython(`
        import joblib
        import pandas as pd
        import numpy as np

        # Cargar el modelo desde el archivo virtual
        model = joblib.load("modelo.joblib")

        def predecir(datos):
            # Convertir el objeto de JS a un DataFrame de Pandas
            df = pd.DataFrame(datos.to_py())
            # Realizar la predicción
            prediccion = model.predict(df)
            # Devolver el resultado
            return prediccion[0][0]
    `);
    
    // Obtener una referencia a la función de Python desde JavaScript
    const pyPredict = pyodide.globals.get('predecir');

    // ------------------- FASE 4: CONFIGURAR LA INTERFAZ Y MOSTRARLA -------------------
    // Ocultar el loader y mostrar el contenido principal
    loaderContainer.classList.add('hidden');
    mainContent.classList.remove('hidden');

    predictButton.addEventListener('click', () => {
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);
        const nota3 = parseFloat(document.getElementById('nota3').value);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
            predictionOutput.textContent = "Por favor, ingresa las 3 notas.";
            statusOutput.textContent = ""; // Limpiar el estado si hay error
            return;
        }
        
        // Crear el objeto de datos que se pasará a Python
        const datosParaPredecir = {
            'Nota_01': [nota1],
            'Nota_02': [nota2],
            'Nota_03': [nota3]
        };
        
        // Llamar a la función de Python y obtener el resultado
        const resultado = pyPredict(datosParaPredecir);
        
        predictionOutput.textContent = resultado.toFixed(2);

        // Determinar y mostrar el estado de aprobación
        if (resultado >= APPROVAL_THRESHOLD) {
            statusOutput.textContent = "APROBADO";
            statusOutput.className = "status-approved"; // Clase para aprobado
        } else {
            statusOutput.textContent = "DESAPROBADO";
            statusOutput.className = "status-disapproved"; // Clase para desaprobado
        }
    });
}

// Iniciar todo el proceso
main();