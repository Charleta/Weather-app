import { useState } from "react";
import { useFetchHook } from "./assets/hooks/fetchHook";

function App() {
  const [city, setCity] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { fetchWeather, errorMsg, dataWeather } = useFetchHook();

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city || city.trim() === "") return;
    console.log("Buscando clima para la ciudad:", city);
    await fetchWeather(city);
    setIsVisible(true);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white "
      style={{ backgroundImage: "url(/image/fondo-app.png)" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10 flex flex-col items-center justify-start p-6 min-h-screen">
        <div className="mt-20">
          <h1>
            <span className="text-[#FFFF1E]  text-6xl">Weather</span>
            <span className="text-[#F0F0F0]  text-4xl">App</span>
          </h1>
        </div>

        {errorMsg && (
          <p className="text-red-500 mt-4 text-center">{errorMsg}</p>
        )}

        <div className="flex items-center z-10 mt-10">
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center"
            >
              <div>
                <input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleChangeCity}
                  className="rounded-l-md p-2 w-full justify-center placeholder:text-center placeholder-[#F0F0F0] text-[#F0F0F0] "
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-full text-3xl bg-[#282828] text-[#F0F0F0] px-4 py-2 mt-4 hover:bg-[#3A3A3A] transition-colors duration-300"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          id="weather-info-card"
          className={`
                fixed bottom-0 left-0 right-0
                bg-gradient-to-t from-[#636262] to-[#282828]
                text-white p-6 rounded-t-3xl shadow-2xl
                transform transition-transform duration-700 ease-out
                ${isVisible ? "translate-y-0" : "translate-y-full"}
            `}
        >
          {isVisible && dataWeather && dataWeather.location ? (
            <div className="container mx-auto">
              {/* Icono para cerrar o arrastrar la tarjeta (opcional) */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1.5 bg-gray-600 rounded-full"></div>
              </div>

              {/* Contenido de la tarjeta del clima */}
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-2" id="city-name">
                  {dataWeather.location.name}
                </h2>
                <p className="text-6xl font-extrabold mb-4" id="temperature">
                  {dataWeather.current.temp_c}
                </p>
                <p className="text-2xl mb-4" id="weather-description">
                  {dataWeather.current.condition.text}
                </p>

                <div className="grid grid-cols-2 gap-4 text-lg">
                  <div className="flex items-center justify-center bg-gray-700 bg-opacity-50 p-3 rounded-xl">
                    <span className="mr-2">💧</span>
                    <span id="humidity">
                      Humedad: {dataWeather.current.humidity}
                    </span>
                  </div>
                  <div className="flex items-center justify-center bg-gray-700 bg-opacity-50 p-3 rounded-xl">
                    <span className="mr-2">💨</span>
                    <span id="wind-speed">
                      Viento: {dataWeather.current.wind_kph}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            isVisible && (
              <p className="text-center">
                No se encontró la ciudad. Probá con otro nombre.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
