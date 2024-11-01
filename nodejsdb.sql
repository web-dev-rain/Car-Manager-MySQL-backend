-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 01 2024 г., 17:18
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `nodejsdb`
--

-- --------------------------------------------------------

--
-- Структура таблицы `auto`
--

CREATE TABLE `auto` (
  `id` int NOT NULL,
  `model` varchar(250) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Не заполнено',
  `type_auto_id` int UNSIGNED NOT NULL,
  `enginecapacity` double DEFAULT NULL,
  `insurance_type_id` int NOT NULL,
  `insurance_end_date` date DEFAULT NULL,
  `remaining_days` int DEFAULT NULL,
  `tech_inspection_date` date DEFAULT NULL,
  `next_tech_inspection` date DEFAULT NULL,
  `days_until_next_tech` int DEFAULT NULL,
  `fuel_consumption` double DEFAULT NULL,
  `distance_traveled` double DEFAULT NULL,
  `spent_fuel` double UNSIGNED DEFAULT NULL,
  `tire_season_type` varchar(250) DEFAULT NULL,
  `replace_tires_need` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `auto`
--

INSERT INTO `auto` (`id`, `model`, `description`, `type_auto_id`, `enginecapacity`, `insurance_type_id`, `insurance_end_date`, `remaining_days`, `tech_inspection_date`, `next_tech_inspection`, `days_until_next_tech`, `fuel_consumption`, `distance_traveled`, `spent_fuel`, `tire_season_type`, `replace_tires_need`) VALUES
(98, 'BMW X7', '', 3, 3, 2, '2023-12-30', 9, '2023-07-26', '2024-07-26', 218, 7, 7894, 552.58, 'Зимние', 'Нет'),
(99, 'Nissan GT-R', '', 1, 3.8, 2, '2024-02-02', 43, '2023-07-25', '2024-07-25', 217, 12, 4562, 547.44, 'Зимние', 'Нет'),
(100, 'Land Rover', '', 4, 4.4, 3, '2024-02-22', 63, '2023-10-03', '2024-10-03', 287, 8.4, 6781, 569.604, 'Зимние', 'Нет'),
(101, 'BMW X7', '', 3, 4.4, 1, '2023-11-08', -43, '2023-11-29', '2024-11-29', 344, 10, 7878, 787.8, 'Зимние', 'Нет'),
(102, 'Porsche 911', '', 1, 3.8, 1, '2023-12-14', -7, '2022-12-12', '2023-12-12', -9, 20, 8485, 1697, 'Летние', 'Да'),
(103, 'Audi R8', 'Для души', 1, 5.2, 1, '2024-10-01', 281, '2022-10-26', '2023-10-26', -60, 14, 9123, 1277.22, 'Летние', 'Да'),
(112, 'BMW M52', 'help(', 1, 3, 1, '2023-12-22', -3, '2023-12-16', '2024-12-16', 357, 10, 555, 55.5, 'Летние', 'Да'),
(113, 'ТЕСТ', '', 1, 7, 1, '2024-06-10', 168, '2023-12-22', '2024-12-22', 363, 9, 888, 79.92, 'Летние', 'Да');

-- --------------------------------------------------------

--
-- Структура таблицы `employee`
--

CREATE TABLE `employee` (
  `id` int NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `address` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `salary` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `employee`
--

INSERT INTO `employee` (`id`, `name`, `email`, `address`, `salary`) VALUES
(1, 'Eduardo Salamanca ', 'lalosalamanca@gmail.com', 'Mexico', '19999'),
(2, 'cairocoders ednalan', 'cairocoders@gmail.com', 'Olangapo City', '150'),
(5, 'Tarantino', 'pulpfiction@gmail.com', 'Hollywood', '1996'),
(6, 'Kimberly Wexler', 'lawer@gmail.com', 'Albuqerque', '2000'),
(7, 'admin', 'admin@gmail.com', 'Network', '1010');

-- --------------------------------------------------------

--
-- Структура таблицы `insurance_type`
--

CREATE TABLE `insurance_type` (
  `id` int NOT NULL,
  `services_package` varchar(250) DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `price` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `insurance_type`
--

INSERT INTO `insurance_type` (`id`, `services_package`, `duration`, `price`) VALUES
(1, 'Базовая', 12, 200),
(2, 'Расширенная', 12, 299),
(3, 'Делюкс', 12, 500);

-- --------------------------------------------------------

--
-- Структура таблицы `type_auto`
--

CREATE TABLE `type_auto` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lifting_capacity` double NOT NULL,
  `seats_number` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `type_auto`
--

INSERT INTO `type_auto` (`id`, `name`, `lifting_capacity`, `seats_number`) VALUES
(1, 'Седан', 6, 6),
(2, 'Универсал', 200, 5),
(3, 'Кроссовер', 250, 5),
(4, 'Внедорожник', 270, 5),
(5, 'Пикап', 400, 5),
(6, 'Легковой фургон', 900, 7),
(7, 'Минивэн', 450, 7),
(8, 'Грузовой', 1200, 3),
(9, 'Хэтчбек', 150, 3),
(10, 'Лимузин', 250, 9);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(3, 'admin', 'admin@gmail.com', '$2b$10$sbx2IK55i3VMAObRgk9QNuZ/upK3ZONl0TYlsNHaT7lSJ3QxNf7wW'),
(20, 'user', 'user@gmail.com', '$2b$10$OC3k6dBYNX2gtrUMUEE96eElgJsIVn9ygRpZCcbOR5nJpIT1OLFCK');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `insurance` (`insurance_type_id`),
  ADD KEY `auto_type` (`type_auto_id`);

--
-- Индексы таблицы `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `insurance_type`
--
ALTER TABLE `insurance_type`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `type_auto`
--
ALTER TABLE `type_auto`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `auto`
--
ALTER TABLE `auto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT для таблицы `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `insurance_type`
--
ALTER TABLE `insurance_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `type_auto`
--
ALTER TABLE `type_auto`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `auto_type` FOREIGN KEY (`type_auto_id`) REFERENCES `type_auto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `insurance` FOREIGN KEY (`insurance_type_id`) REFERENCES `insurance_type` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
