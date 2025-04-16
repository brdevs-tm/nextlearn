"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import "./CenterMap.css";

const CenterMap = ({ centers }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Yandex Maps API ni dinamik yuklash
  useEffect(() => {
    const loadYandexMap = async () => {
      try {
        if (typeof window.ymaps !== "undefined") {
          setIsMapLoaded(true);
          return;
        }

        const script = document.createElement("script");
        script.src =
          "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=91551576-2dcb-4e39-8688-b4a209a4549e"; // API kalitingizni qo‘ying
        script.async = true;
        script.onload = () => {
          window.ymaps.ready(() => {
            setIsMapLoaded(true);
          });
        };
        script.onerror = () => {
          console.error("Yandex Maps API yuklanmadi");
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error("Yandex Maps yuklashda xato:", error);
      }
    };

    loadYandexMap();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, []);

  // Xaritani boshlash
  useEffect(() => {
    if (!isMapLoaded || !mapContainer.current) return;

    const initMap = () => {
      try {
        mapInstance.current = new window.ymaps.Map(
          mapContainer.current,
          {
            center: [41.2995, 69.2401], // Toshkent markazi
            zoom: 10,
          },
          {
            searchControlProvider: "yandex#search",
          }
        );

        // Markazlarni xaritaga qo‘shish
        centers.forEach((center) => {
          const placemark = new window.ymaps.Placemark(
            center.coords,
            {
              balloonContent: `
                <strong>${center.name}</strong><br/>
                Manzil: ${center.location}<br/>
                Kurslar: ${center.courses.join(", ")}<br/>
                Narx: $${center.price}<br/>
                Reyting: ${center.rating}
              `,
            },
            {
              preset: "islands#blueEducationCircleIcon",
            }
          );
          mapInstance.current.geoObjects.add(placemark);
        });

        // Xarita chegaralarini sozlash
        if (centers.length > 0) {
          mapInstance.current.setBounds(
            mapInstance.current.geoObjects.getBounds(),
            { checkZoomRange: true }
          );
        }
      } catch (error) {
        console.error("Xaritani boshlashda xato:", error);
      }
    };

    window.ymaps.ready(initMap);
  }, [isMapLoaded, centers]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "600px" }}
      aria-label="O‘quv markazlari xaritasi"
    />
  );
};

// SSR ni o‘chirish uchun dinamik import
export default dynamic(() => Promise.resolve(CenterMap), { ssr: false });
