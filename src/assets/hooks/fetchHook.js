import { useState } from "react";

export const useFetchHook =  () =>  {

    const [dataWeather, setDataWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const fetchWeather = async (city) => {
      if(!city || city.trim() === "") {
        setErrorMsg("Por favor, ingresa un nombre de ciudad válido.");
        return;
      }


      setLoading(true);
      setErrorMsg(""); 
      try {
        const ApiKey = "b9b8ddee3cf44246a6f232054251007";
        const api = `http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`;
        const response = await fetch(api);
        const data = await response.json();


        if (data.error) {
          setErrorMsg("Ciudad no encontrada. Verificá el nombre.");
          setDataWeather(null);
        } else {
          setDataWeather(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al buscar el clima:", error);
      }
    }; return {dataWeather, fetchWeather, loading , errorMsg};
}