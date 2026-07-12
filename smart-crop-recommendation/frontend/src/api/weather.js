export const getWeather = async (city, apiKey) => {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  if (!res.ok) {
    throw new Error("City not found or API error");
  }
  return res.json();
};
