-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 04, 2022 at 01:32 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_database`
--
CREATE DATABASE IF NOT EXISTS `vacations_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations_database`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `FollowerID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `VacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`FollowerID`, `UserID`, `VacationID`) VALUES
(321, 2, 27),
(382, 51, 27),
(388, 2, 22),
(389, 50, 22),
(390, 50, 27),
(392, 2, 23),
(393, 52, 27),
(394, 52, 22),
(395, 52, 25);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(15) NOT NULL,
  `LastName` varchar(25) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(128) NOT NULL,
  `Role` varchar(5) NOT NULL DEFAULT 'User'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FirstName`, `LastName`, `Username`, `Password`, `Role`) VALUES
(1, 'Idan', 'laav', 'idanlaav', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Admin'),
(2, 'omer', 'laav', 'omerlaav', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'User'),
(50, 'test', 'testt', 'testtest', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'User'),
(51, 'user', 'check', 'usercheck', '1858b86f3f3a647595ac7411f443c419bd55d211514e381fde7257c4261b784c2980407bccbe436f0a34fd3607e5ad94e1e35aa41944d1cfbcc71d8aa35e6607', 'User'),
(52, 'ml', 'lm', 'mlaav', '017d301cb218a22fca1e691f73af34494547e6893fb3b763e31e5cbebac58475fe1c02f746c187f99aba15c558f7fa0e6943741ecba1d5eab75b9cdf97d2a9b9', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `VacationID` int(11) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Location` varchar(50) NOT NULL,
  `FromDate` varchar(60) NOT NULL,
  `UntilDate` varchar(60) NOT NULL,
  `Price` int(11) NOT NULL,
  `ImageName` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`VacationID`, `Description`, `Location`, `FromDate`, `UntilDate`, `Price`, `ImageName`) VALUES
(22, 'A romantic weekend in Paris, France, including a bus tour of the Eiffel Tower.', 'Paris, France', '2022-07-20', '2022-07-23', 860, '2508b3e4-358d-4364-8a0f-a2b422d79d40.jpeg'),
(23, 'Bachelorette party, alcohol, parties and lots of money at the casino.', 'Las-Vegas, Nevada', '2022-07-24', '2022-07-30', 3500, '42433e83-254d-4e72-873e-33e4aea0f6f5.jpeg'),
(25, 'A crazy week in Israel, Jerusalem and the Dead Sea region, the lowest place in the world.', 'Jerusalem and Dead Sea, Israel', '2022-07-27', '2022-08-03', 4800, '18f58cfe-e81b-4520-b8da-ada04faaf1dd.jpeg'),
(26, 'A pampering weekend in Rome, Italy, a visit to the Colosseum and the best pizzas in the world.', 'Roma, Italy', '2022-07-27', '2022-07-30', 1400, 'ed5e8f43-7679-4114-9979-3d240a94b78a.jpeg'),
(27, 'A family trip in the Black Forest in Germany, spectacular views, high mountains and a special European look.', 'The Black Forest, Germany - France - Switzerland', '2022-07-21', '2022-07-25', 3600, 'f6490d72-5f61-461e-b5bf-2272be8ae572.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`FollowerID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `VacationID` (`VacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`VacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `FollowerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=396;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `VacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`VacationID`) REFERENCES `vacations` (`VacationID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_4` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
