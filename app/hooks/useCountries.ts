import countries from "world-countries";

const formattedCountries = countries.map((country) => (
  {
    value: country.cca2,
    label: country.translations.por.common || country.name.common,
    flag: country.flag,
    latIng: country.latlng,
    region: country.region
  }
));

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    return formattedCountries.find((items) => items.value === value);
  };

  return {
    getAll,
    getByValue
  };
};

export default useCountries;
