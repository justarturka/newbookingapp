"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Instagram, MessageCircle, CheckCircle, X } from "lucide-react";

const mockData = [
  // Отели
  {
    id: 1,
    name: "Sheraton Astana Hotel",
    type: "Отель",
    price: "Цена за ночь: 54 900 KZT",
    image: "/hotel1.jpg",
    description:
      "Пятизвездочный отель в центре Астаны с 191 номером, ресторанами, спа-комплексом и конференц-залами.",
    website:
      "https://www.booking.com/hotel/kz/sheraton-nur-sultan-hotel.ru.html",
  },
  {
    id: 2,
    name: "Hilton Garden Inn",
    type: "Отель",
    price: "Цена за ночь: 44 727 KZT",
    image: "/hotel2.jpg",
    description:
      "Современный отель в центре Астаны с 248 номерами, рестораном, фитнес-центром и бесплатным Wi-Fi.",
    website:
      "https://www.booking.com/hotel/kz/hilton-garden-inn-astana.ru.html",
  },
  {
    id: 3,
    name: "St. Regis Astana",
    type: "Отель",
    price: "Цена за ночь: 78 400 KZT",
    image: "/hotel3.jpg",
    description:
      "Роскошный отель в центре Астаны с люксами, ресторанами, спа-центром и конференц-залами.",
    website:
      "https://www.booking.com/hotel/kz/the-st-regis-astana.ru.html",
  },

  // Рестораны
  {
    id: 4,
    name: "Чайхана Navat",
    type: "Ресторан",
    price: "Средний чек: 10 000 KZT",
    image: "/rest1.jpg",
    description:
      "Сеть ресторанов восточной кухни с уютной атмосферой, узбекскими и казахскими блюдами.",
    website: "https://www.navat.kz",
    instagram: "https://www.instagram.com/navat_astana/",
  },
  {
    id: 5,
    name: "Ресторан Sandyq",
    type: "Ресторан",
    price: "Средний чек: 15 000 KZT",
    image: "/rest2.jpg",
    description:
      "Аутентичное заведение с национальной казахской кухней и уникальными ремесленными изделиями.",
    website: "https://sandyq.kz",
    instagram: "https://www.instagram.com/sandyq_restaurant/",
  },
  {
    id: 6,
    name: "Кофейня Coffee BOOM",
    type: "Ресторан",
    price: "Средний чек: 8 000 KZT",
    image: "/rest3.jpg",
    description:
      "Сеть кофеен с уютной атмосферой, авторскими десертами и широким выбором кофе.",
    website: "https://coffeeboom.kz",
    instagram: "https://www.instagram.com/coffeeboom2010/",
  },

  // Туры
  {
    id: 7,
    name: "Тур в Боровое",
    type: "Тур",
    price: "150 000 KZT за 3 дня",
    image: "/tour1.jpg",
    description:
      "Живописный отдых среди озёр, сосновых лесов и гор. Прогулки, лодки, свежий воздух!",
    whatsapp: "http://wa.me/77777395230",
  },
  {
    id: 8,
    name: "Сакральный Туркестан",
    type: "Тур",
    price: "200 000 KZT за 3 дня",
    image: "/tour2.jpg",
    description:
      "Путешествие по древним святыням, мавзолеям и историческим местам Казахстана.",
    whatsapp: "http://wa.me/77777395230",
  },
  {
    id: 9,
    name: "По горам Алматы",
    type: "Тур",
    price: "250 000 KZT за 3 дня",
    image: "/tour3.jpg",
    description:
      "Захватывающие панорамы, треккинг, чистый воздух и отдых в ущельях Тянь-Шаня.",
    whatsapp: "http://wa.me/77777395230",
  },
];

export default function BookingMVP() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");

  // Состояния для модальных окон бронирования и успешной заявки
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccessOpen, setBookingSuccessOpen] = useState(false);

  // Поля формы бронирования
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [formError, setFormError] = useState("");

  // Фильтрация данных
  const filteredData = mockData.filter(
    (item) =>
      (category === "Все" || item.type === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  const openBookingModal = () => {
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
    setFormError("");
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate) {
      setFormError("Пожалуйста, заполните все поля.");
      return;
    }
    // Имитация отправки заявки
    setBookingModalOpen(false);
    setBookingSuccessOpen(true);
    // Очистка формы
    setBookingName("");
    setBookingPhone("");
    setBookingDate("");
    setFormError("");
  };

  const closeSuccessModal = () => {
    setBookingSuccessOpen(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Бронирование отелей, ресторанов и туров
      </h1>

      {/* Фильтр по категориям */}
      <div className="flex space-x-4 mb-4">
        {["Все", "Отель", "Ресторан", "Тур"].map((tab) => (
          <button
            key={tab}
            onClick={() => setCategory(tab)}
            className={`px-4 py-2 rounded-lg ${
              category === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Поле поиска */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      {/* Отображение карточек */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredData.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            className="rounded-lg overflow-hidden shadow-lg bg-white"
          >
            <div className="p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover mb-2"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.type}</p>
              <p className="text-gray-800 font-bold">{item.price}</p>
              <p className="text-gray-600 mt-2">{item.description}</p>

              {/* Ссылки (сайт, Instagram, WhatsApp) */}
              <div className="flex space-x-4 mt-2">
                {item.website && (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Globe size={24} />
                  </a>
                )}
                {item.instagram && (
                  <a
                    href={item.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Instagram size={24} />
                  </a>
                )}
                {item.whatsapp && (
                  <a
                    href={item.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle size={24} />
                  </a>
                )}
              </div>

              {/* Кнопка "Забронировать" */}
              <div className="mt-4">
                <button
                  onClick={openBookingModal}
                  className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition"
                >
                  Забронировать
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Модальное окно бронирования (без затемнения фона) */}
      <AnimatePresence>
        {bookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeBookingModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 relative w-96 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeBookingModal}
                className="absolute top-2 right-2 text-gray-500"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">Бронирование</h2>
              <form onSubmit={handleBookingSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Имя</label>
                  <input
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">
                    Номер телефона
                  </label>
                  <input
                    type="text"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1">Дата</label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
                {formError && (
                  <p className="text-red-500 mb-2">{formError}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                >
                  Отправить заявку
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно успеха (без затемнения фона) */}
      <AnimatePresence>
        {bookingSuccessOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={closeSuccessModal}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-lg p-6 relative w-80 flex flex-col items-center shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <CheckCircle size={48} className="text-green-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">
                Спасибо, скоро мы свяжемся с вами
              </h2>
              <button
                onClick={closeSuccessModal}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
