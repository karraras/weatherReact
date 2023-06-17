import React from "react";
import { useEffect } from "react";
import searchImg from "./assets/Searchicon.png";
import Cloud from "./assets/Clouds.png";
import Temp from "./assets/temp.png";
import Clear from "./assets/Clear.png";
import Drizzle from "./assets/Drizzle.png";
import Haze from "./assets/Haze.png";
import loading from "./assets/loading.png";
import Mist from "./assets/Mist.png";
import NotFound from "./assets/NotFound.png";
import Rain from "./assets/Rain.png";
import Smoke from "./assets/Smoke.png";
import Snow from "./assets/Snow.png";
import axios from "axios";
function App() {
  const [country, setCountry] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [city, setCity] = React.useState("");
  const [value, setValue] = React.useState("");
  const [stat, setStat] = React.useState("");
  const [lo, setLo] = React.useState(true);
  const apik = "30d4741c779ba94c470ca1f63045390a";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apik}`;
  // useEffect(() => {
  //   async function fetchData() {
  //     setLo(true);
  //     try {
  //       const res = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apik}`
  //       );
  //       setCountry(res.data);
  //       setStat(res.data.weather[0].main);
  //       setOpen(false);
  //       return res;
  //     } catch (error) {
  //       setLo(false);
  //       console.log(error);
  //     }
  //   }
  //   fetchData();
  //   setLo(false);

  // }, [city]);

  const fetchData = async () => {
    setLo(true);
    try {
      const res = await axios.get(url);
      setCountry(res.data);
      setStat(res.data.weather[0].main);
      setOpen(false);
      setLo(false);
      return res;
    } catch (error) {
      setLo(false);
      console.log(error);
    }
    setLo(false);
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  const handleWrite = (e) => {
    setValue(e.target.value);
  };
  return (
    <section className="h-screen bg-slate-900 flex place-items-center place-content-center ">
      <div
        className={`flex place-items-center flex-col  place-content-cente max-w-[250px] w-[250px] bg-white rounded`}
      >
        <div
          className={`search flex items-center justify-between  rounded bg-white  w-full  p-2  `}
        >
          <input
            type="text"
            onChange={handleWrite}
            value={value.toUpperCase()}
            placeholder="ENTER YOUR LOCATION"
            className="placeholder:text-black outline-none py-1 placeholder:text-xs text-xs font-semibold flex-1 border-b border-solid border-slate-300"
          />
          <img
            src={searchImg}
            alt="search"
            className="h-4 w-4 cursor-pointer"
            onClick={() => setCity(value.toLowerCase())}
          />
        </div>

        <div
          className={`w-full duration-300  flex items-center justify-center flex-col  overflow-hidden bg-white rounded first-letter ${
            open ? "p-0 h-0" : "h-[278px] py-5"
          } `}
        >
          <p className=" font-medium">
            {country?.name},<span>{country?.sys?.country}</span>
          </p>
          <img
            src={
              lo
                ? loading
                : stat === "Clouds"
                ? Cloud
                : stat === "Clear"
                ? Clear
                : stat === "Rain"
                ? Rain
                : stat === "Smoke"
                ? Smoke
                : stat === "Drizzle"
                ? Drizzle
                : stat === "Haze"
                ? Haze
                : stat === "Mist"
                ? Mist
                : stat === "Snow"
                ? Snow
                : NotFound
            }
            alt="cloud"
            className="h-[150px] w-[150px]"
          />
          <p className="font-semibold my-2">{stat}</p>
          <div className="flex items-center">
            <img src={Temp} alt="temp" className="h-5 w-5 " />
            <h1 className="font-semibold">
              {country?.main?.temp} <sup className="-mx-1 text-xs">O</sup> C
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
export default App;
