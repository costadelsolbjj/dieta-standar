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
          <p><strong>Fibra (g/unidad):</strong> {selectedData.fibra.g_por_unidad}</p>
          <p><strong>Fibra (Tipo):</strong> {selectedData.fibra.tipo}</p>
          <p><strong>Na (mg/unidad):</strong> {selectedData.na_mg_por_unidad}</p>
          <p><strong>K (mg/unidad):</strong> {selectedData.k_mg_por_unidad}</p>
          <p><strong>Observaciones:</strong> {selectedData.observaciones}</p>
          <p><strong>Sabor:</strong> {selectedData.sabor}</p>
        </div>
      )}
    </div>
  );
}

export default App;
