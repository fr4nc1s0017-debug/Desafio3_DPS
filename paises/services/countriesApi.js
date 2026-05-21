const BASE_URL = 'https://restcountries.com/v3.1/all';

export const fetchAllCountries = async () => {
  try {
    console.log('Iniciando fetch a la API de países...');
    const response = await fetch(BASE_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`Se recibieron ${data.length} países desde la API`);

    // Mapeo seguro manejando campos faltantes
    const mappedCountries = data.map(country => {
      // Obtener capital de forma segura
      let capital = 'Sin capital';
      if (country.capital && Array.isArray(country.capital) && country.capital.length > 0) {
        capital = country.capital[0];
      } else if (country.capital && typeof country.capital === 'string') {
        capital = country.capital;
      }

      // Obtener coordenadas
      let coords = null;
      if (country.capitalInfo && country.capitalInfo.latlng && Array.isArray(country.capitalInfo.latlng) && country.capitalInfo.latlng.length === 2) {
        coords = country.capitalInfo.latlng;
      }

      // Obtener monedas
      let currencies = 'N/A';
      if (country.currencies) {
        const currencyList = Object.values(country.currencies).map(c => c.name).filter(Boolean);
        if (currencyList.length > 0) currencies = currencyList.join(', ');
      }

      // Obtener idiomas
      let languages = 'N/A';
      if (country.languages) {
        const langList = Object.values(country.languages).filter(Boolean);
        if (langList.length > 0) languages = langList.join(', ');
      }

      return {
        name: country.name?.common || 'Nombre desconocido',
        capital: capital,
        flag: country.flags?.png || 'https://via.placeholder.com/50x35?text=No+flag',
        coords: coords,
        population: country.population || 0,
        region: country.region || 'N/A',
        subregion: country.subregion || 'N/A',
        currencies: currencies,
        languages: languages,
      };
    });

    console.log('Mapeo completado exitosamente');
    return mappedCountries;
  } catch (error) {
    console.error('Error en fetchAllCountries:', error.message);
    // Lanzar un mensaje más amigable
    throw new Error(`No se pudieron cargar los países: ${error.message}`);
  }
};