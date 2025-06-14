# 🤖 Predictor de Promedio de Notas

Este proyecto es una aplicación web interactiva que utiliza un modelo de regresión para predecir el promedio de notas de un estudiante basado en tres notas de entrada. La aplicación está construida con HTML, CSS y JavaScript, y utiliza Pyodide para ejecutar el modelo de Python (`modelo_notas.joblib`) directamente en el navegador.

## Características

- **Predicción de Promedio**: Ingresa tres notas y obtén un promedio predicho por un modelo de regresión.
- **Estado de Aprobación/Desaprobación**: El resultado de la predicción indica si el estudiante está "APROBADO" (promedio >= 10.52) o "DESAPROBADO".
- **Carga Dinámica**: Muestra un indicador de carga mientras el entorno de Python (Pyodide) y el modelo se inicializan en el navegador.

## Estructura del Proyecto

- `index.html`: La estructura principal de la página web.
- `style.css`: Contiene los estilos CSS para el diseño y la apariencia de la aplicación.
- `script.js`: La lógica principal de la aplicación, incluyendo la interacción con Pyodide, la carga del modelo y la manipulación del DOM para mostrar los resultados.
- `modelo_notas.joblib`: El modelo de regresión pre-entrenado en formato `joblib`.
- `X_regression.csv`: Datos de entrada utilizados para entrenar el modelo.
- `Y_regression.csv`: Datos de salida (promedios) utilizados para entrenar el modelo.
- `regresion_notas.ipynb`: Notebook de Jupyter con el código utilizado para entrenar y guardar el modelo de regresión.

## Cómo Usar

Puedes acceder a la aplicación web directamente aquí: [Predictor de Notas (Pyodide)](https://gabi-q.github.io/Regresion-Lineal_Notas_AVG/)

Si deseas ejecutarlo localmente:
1. Clona o descarga este repositorio.
2. Abre el archivo `index.html` en tu navegador web.
3. Espera a que el motor de Python y el modelo se carguen (verás un indicador de carga).
4. Una vez cargado, ingresa las tres notas en los campos correspondientes.
5. Haz clic en el botón "Predecir Promedio" para obtener el resultado y el estado de aprobación.

## Desarrollo

El modelo de regresión fue entrenado utilizando `scikit-learn` y `pandas` en Python. El archivo `regresion_notas.ipynb` detalla el proceso de entrenamiento y la exportación del modelo a `modelo_notas.joblib`.

La integración de Python en el navegador se logra mediante [Pyodide](https://pyodide.org/en/stable/), que permite ejecutar código Python y sus librerías (como `scikit-learn` y `pandas`) directamente en el entorno del navegador, sin necesidad de un servidor backend.

## Requisitos

- Un navegador web moderno (Chrome, Firefox, Edge, Safari, etc.) compatible con WebAssembly.