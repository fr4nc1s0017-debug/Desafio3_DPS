export const getCountries = async () => {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,capitalInfo,cca3,region,languages,currencies"
    );

    const data = await response.json();

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);

    return [];
  }
};