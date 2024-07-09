"use client";
import ThemeSwitcher from "@/app/components/navigation/ThemeSwitcher";
import "@/app/styles/NavBar.css";
import Link from "next/link";
import { FaGithub, FaLinkedinIn, FaDownload } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from 'next/image';

const NavBar = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          setError("Error fetching weather data");
        }

        const data = await response.json();

        if (data && data.main && data.weather) {
          setWeather(data);
        } else {
          setError("Error fetching weather data");
        }
      } catch (error) {
        setError("Error fetching weather data");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          setError("Error getting location");
        }
      );
    }
  }, []);

  const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;

  return (
    <div className="navbar">
      <div className="nav-content">
        <div className="nav-links">
          <Link href="/assets/resume.pdf" download>
            <span className="resume-download">
              Download Resume
              <FaDownload className="download-icon" />
            </span>
          </Link>
          <div className="social-links">
            <a
              href="https://linkedin.com/in/felipelv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="social-icon" />
            </a>
            <a
              href="https://github.com/FelipeLVieira"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="social-icon" />
            </a>
          </div>
        </div>
        {weather && weather.main && weather.weather && (
          <div className="weather-info">
            <span>{weather.name} </span>
            <span>{weather.main.temp} °C - {convertToFahrenheit(weather.main.temp).toFixed(2)} °F</span>
            <Image
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              title={weather.weather[0].description}
              width={40}
              height={40}
            />
          </div>
        )}
        <ThemeSwitcher />
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default NavBar;
