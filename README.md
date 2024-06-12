# Getting Started with the diet React App

# React Application with Hierarchical Dropdowns

This project demonstrates how to create a React application that displays all the "Nombre comercial" attributes after selecting from a series of dropdowns (hierarchy: categoria, tipo, variedad, nombre_comercial).

## Setting Up the Application

### Step 1: Create a React App

Open your terminal and run the following commands to create and set up your React app:

```bash
npx create-react-app my-app
cd my-app
```

###  Step 2: Create a Data File
In the src directory, create a new file named data.js and add the following JSON data:

```bash
// src/data.js
const data = [
    {
        "categoria": "DIETAS ESTANDAR",
        "tipo": "POLIMERICAS",
        "variedad": "NORMOPROTEICAS",
        "nombre_comercial": "FRESUBIN ORIGINAL",
        "presentacion": "500 ml",
        "kcal_por_unidad": 500,
        "kcal_por_ml": 1,
        "mosm_por_l": 220,
        "kcal_no_prot_por_g_N": 143,
        "proteinas": {
            "energia_porcentaje": 15,
            "g_por_unidad_por_1000_kcal": "19/38",
            "fuente": "Caseína, Soja"
        },
        "h_carbono": {
            "energia_porcentaje": 55,
            "g_por_unidad_por_1000_kcal": "69/138",
            "fuente": "Mdx 73%, Sacarosa 27%"
        },
        "lipidos": {
            "energia_porcentaje": 30,
            "g_por_unidad_por_1000_kcal": "17/34",
            "fuente": "Girasol, Pescado",
            "AGS_AGM_AGP": "MCT 38%"
        },
        "fibra": {
            "g_por_unidad": 0,
            "tipo": "Sin fibra"
        },
        "na_mg_por_unidad": 375,
        "k_mg_por_unidad": 625,
        "observaciones": "Lactosa ≤ 0,05 g, No gluten",
        "sabor": "Vainilla"
    },
    {
        "categoria": "DIETAS ESTANDAR",
        "tipo": "POLIMERICAS",
        "variedad": "NORMOPROTEICAS",
        "nombre_comercial": "OSMOLITE HN RTH",
        "presentacion": "500 ml",
        "kcal_por_unidad": 500,
        "kcal_por_ml": 1,
        "mosm_por_l": 244,
        "kcal_no_prot_por_g_N": 135,
        "proteinas": {
            "energia_porcentaje": 16,
            "g_por_unidad_por_1000_kcal": "20/40",
            "fuente": "Caseinatos, Soja"
        },
        "h_carbono": {
            "energia_porcentaje": 54,
            "g_por_unidad_por_1000_kcal": "68/135.6",
            "fuente": "Mdx 100%"
        },
        "lipidos": {
            "energia_porcentaje": 30,
            "g_por_unidad_por_1000_kcal": "17/34",
            "fuente": "Girasol rico oleico 48%, Cánola 29%, MCT 19%"
        },
        "fibra": {
            "g_por_unidad": 0,
            "tipo": "Sin fibra"
        },
        "na_mg_por_unidad": 440,
        "k_mg_por_unidad": 740,
        "observaciones": "No lactosa, No gluten (No apto galactosémicos)",
        "sabor": "Neutro"
    },
    {
        "categoria": "DIETAS ESTANDAR",
        "tipo": "POLIMERICAS",
        "variedad": "

```



###  Step 3: Update App.js to Import Data
Modify src/App.js to import the data from data.js and use it within the component:

```bash
import React, { useState } from 'react';
import data from './data';

function App() {
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedVariedad, setSelectedVariedad] = useState('');
  const [selectedNombreComercial, setSelectedNombreComercial] = useState('');
  const [selectedData, setSelectedData] = useState(null);

  const categorias = [...new Set(data.map(item => item.categoria))];
  const tipos = [...new Set(data.filter(item => item.categoria === selectedCategoria).map(item => item.tipo))];
  const variedades = [...new Set(data.filter(item => item.categoria === selectedCategoria && item.tipo === selectedTipo).map(item => item.variedad))];
  const nombreComerciales = data.filter(item => item.categoria === selectedCategoria && item.tipo === selectedTipo && item.variedad === selectedVariedad);

  const handleNombreComercialChange = (e) => {
    const selected = e.target.value;
    setSelectedNombreComercial(selected);
    const foundData = nombreComerciales.find(item => item.nombre_comercial === selected);
    setSelectedData(foundData);
  };

  return (
    <div className="App">
      <h1>Seleccione el Hierarquía</h1>

      <div>
        <label>Categoria: </label>
        <select value={selectedCategoria} onChange={(e) => setSelectedCategoria(e.target.value)}>
          <option value="">Seleccione Categoria</option>
          {categorias.map(categoria => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
      </div>

      {selectedCategoria && (
        <div>
          <label>Tipo: </label>
          <select value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)}>
            <option value="">Seleccione Tipo</option>
            {tipos.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
      )}

      {selectedTipo && (
        <div>
          <label>Variedad: </label>
          <select value={selectedVariedad} onChange={(e) => setSelectedVariedad(e.target.value)}>
            <option value="">Seleccione Variedad</option>
            {variedades.map(variedad => (
              <option key={variedad} value={variedad}>{variedad}</option>
            ))}
          </select>
        </div>
      )}

      {selectedVariedad && (
        <div>
          <label>Nombre Comercial: </label>
          <select value={selectedNombreComercial} onChange={handleNombreComercialChange}>
            <option value="">Seleccione Nombre Comercial</option>
            {nombreComerciales.map(item => (
              <option key={item.nombre_comercial} value={item.nombre_comercial}>{item.nombre_comercial}</option>
            ))}
          </select>
        </div>
      )}

      {selectedData && (
        <div>
          <h2>Detalles de {selectedData.nombre_comercial}:</h2>
          <p><strong>Presentación:</strong> {selectedData.presentacion}</p>
          <p><strong>Kcal por unidad:</strong> {selectedData.kcal_por_unidad}</p>
          <p><strong>Kcal por ml:</strong> {selectedData.kcal_por_ml}</p>
          <p><strong>mOsm/L:</strong> {selectedData.mosm_por_l}</p>
          <p><strong>Kcal no prot por g N:</strong> {selectedData.kcal_no_prot_por_g_N}</p>
          <p><strong>Proteinas (Energía %):</strong> {selectedData.proteinas.energia_porcentaje}</p>
          <p><strong>Proteinas (g/unidad/1000 Kcal):</strong> {selectedData.proteinas.g_por_unidad_por_1000_kcal}</p>
          <p><strong>Proteinas (Fuente):</strong> {selectedData.proteinas.fuente}</p>
          <p><strong>H. Carbono (Energía %):</strong> {selectedData.h_carbono.energia_porcentaje}</p>
          <p><strong>H. Carbono (g/unidad/1000 Kcal):</strong> {selectedData.h_carbono.g_por_unidad_por_1000_kcal}</p>
          <p><strong>H. Carbono (Fuente):</strong> {selectedData.h_carbono.fuente}</p>
          <p><strong>Lípidos (Energía %):</strong> {selectedData.lipidos.energia_porcentaje}</p>
          <p><strong>Lípidos (g/unidad/1000 Kcal):</strong> {selectedData.lipidos.g_por_unidad_por_1000_kcal}</p>
          <p><strong>Lípidos (Fuente):</strong> {selectedData.lipidos.fuente}</p>
          <p><strong>AGS/AGM/AGP (%):</strong> {selectedData.lipidos.AGS_AGM_AGP}</p>
          <p><strong>Fibra (g/unidad):</strong> {selectedData.fibra.g_por_unidad

```


###  Step 4: Start the Development Server
Run the following command to start the development server:

```bash
npm start
This will open your React app in the default web browser at http://localhost:3000.
```

###  Step 5: Build the React App for Production
Once you have completed the development and want to build the app for production, run the following command:

```bash
npm run build
This command creates an optimized build of your React app in the build directory.
```
