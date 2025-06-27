-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for sea_catering
CREATE DATABASE IF NOT EXISTS `sea_catering` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sea_catering`;

-- Dumping structure for table sea_catering.delivery_logs
CREATE TABLE IF NOT EXISTS `delivery_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subscription_id` int NOT NULL,
  `delivery_date` date NOT NULL,
  `delivery_time` time DEFAULT NULL,
  `status` enum('scheduled','delivered','failed','cancelled') NOT NULL DEFAULT 'scheduled',
  `notes` text,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `idx_delivery_logs_subscription` (`subscription_id`),
  KEY `idx_delivery_logs_date` (`delivery_date`),
  CONSTRAINT `delivery_logs_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sea_catering.delivery_logs: ~10 rows (approximately)
INSERT INTO `delivery_logs` (`id`, `subscription_id`, `delivery_date`, `delivery_time`, `status`, `notes`, `created_at`) VALUES
	(1, 1, '2025-06-20', '09:30:00', 'delivered', 'Delivered successfully to customer', '2025-06-20 02:30:00.000'),
	(2, 1, '2025-06-21', '10:15:00', 'delivered', 'Customer very satisfied with meal quality', '2025-06-21 03:15:00.000'),
	(3, 2, '2025-06-22', '08:45:00', 'delivered', 'Left at front door as requested', '2025-06-22 01:45:00.000'),
	(4, 3, '2025-06-23', '11:20:00', 'delivered', 'Handed to customer directly', '2025-06-23 04:20:00.000'),
	(5, 4, '2025-06-24', '09:00:00', 'delivered', 'Delivery completed without issues', '2025-06-24 02:00:00.000'),
	(6, 5, '2025-06-25', '10:30:00', 'failed', 'Customer not available, will retry tomorrow', '2025-06-25 03:30:00.000'),
	(7, 6, '2025-06-26', '14:15:00', 'delivered', 'Premium meal package delivered', '2025-06-26 07:15:00.000'),
	(8, 2, '2025-06-27', NULL, 'scheduled', 'Scheduled for morning delivery', '2025-06-26 13:00:00.000'),
	(9, 3, '2025-06-27', NULL, 'scheduled', 'Regular weekly delivery', '2025-06-26 13:00:00.000'),
	(10, 4, '2025-06-28', NULL, 'scheduled', 'Breakfast delivery scheduled', '2025-06-26 13:00:00.000');

-- Dumping structure for table sea_catering.meal_plans
CREATE TABLE IF NOT EXISTS `meal_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text,
  `features` json DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `meal_plans_plan_id_key` (`plan_id`),
  KEY `idx_meal_plans_plan_id` (`plan_id`),
  KEY `idx_meal_plans_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sea_catering.meal_plans: ~3 rows (approximately)
INSERT INTO `meal_plans` (`id`, `plan_id`, `name`, `price`, `description`, `features`, `image_url`, `is_active`, `created_at`, `updated_at`) VALUES
	(1, 'diet', 'Diet Plan', 30000.00, 'Perfect for those looking to maintain a healthy lifestyle with balanced nutrition and portion control.', '["Calorie controlled", "Fresh vegetables", "Lean proteins", "Low sodium", "High fiber"]', '/images/diet-plan.jpg', 1, '2025-06-23 02:25:15.000', '2025-06-26 22:27:30.000'),
	(2, 'protein', 'Protein Plan', 40000.00, 'High-protein meals designed for fitness enthusiasts and those looking to build muscle mass.', '["25-30g protein per meal", "Post-workout optimization", "Muscle building focus", "Premium proteins", "Energy boosting"]', '/images/protein-plan.jpg', 1, '2025-06-23 02:25:15.000', '2025-06-23 02:25:15.000'),
	(3, 'royal', 'Royal Plan', 60000.00, 'Premium meal experience with the finest ingredients and gourmet preparation.', '["Premium ingredients", "Gourmet preparation", "Luxury dining experience", "Chef crafted", "Fine dining quality"]', '/images/royal-plan.jpg', 1, '2025-06-23 02:25:15.000', '2025-06-23 02:25:15.000');

-- Dumping structure for table sea_catering.menus
CREATE TABLE IF NOT EXISTS `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meal_plan_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text,
  `ingredients` json DEFAULT NULL,
  `nutritional_info` json DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_menus_meal_plan_id` (`meal_plan_id`),
  KEY `idx_menus_available` (`is_available`),
  CONSTRAINT `menus_meal_plan_id_fkey` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sea_catering.menus: ~9 rows (approximately)
INSERT INTO `menus` (`id`, `meal_plan_id`, `name`, `description`, `ingredients`, `nutritional_info`, `image_url`, `is_available`, `created_at`, `updated_at`) VALUES
	(1, 1, 'Grilled Chicken Salad', 'Fresh mixed greens with grilled chicken breast, cherry tomatoes, and low-fat dressing', '["Chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Low-fat dressing"]', '{"fat": "8g", "carbs": "12g", "fiber": "4g", "protein": "25g", "calories": 280}', 'https://www.eatingbirdfood.com/wp-content/uploads/2023/06/grilled-chicken-salad-hero.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 20:57:03.000'),
	(2, 1, 'Quinoa Veggie Bowl', 'Nutrient-rich quinoa with steamed vegetables and tahini dressing', '["Quinoa", "Broccoli", "Carrots", "Bell peppers", "Tahini dressing"]', '{"fat": "10g", "carbs": "45g", "fiber": "8g", "protein": "12g", "calories": 320}', 'https://sailorbailey.com/wp-content/uploads/2022/07/Quinoa-Veggie-Bowl.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 20:58:26.000'),
	(3, 1, 'Green Smoothie Bowl', 'Antioxidant-rich smoothie bowl with fresh fruits and chia seeds', '["Spinach", "Banana", "Mango", "Chia seeds", "Almond milk"]', '{"fat": "6g", "carbs": "35g", "fiber": "10g", "protein": "8g", "calories": 250}', 'https://foodbyjonister.com/wp-content/uploads/2017/08/GreenSmoothieBowl3.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 20:59:06.000'),
	(4, 2, 'Protein Power Bowl', 'High-protein bowl with grilled salmon, sweet potato, and quinoa', '["Grilled salmon", "Sweet potato", "Quinoa", "Spinach", "Olive oil"]', '{"fat": "18g", "carbs": "35g", "fiber": "6g", "protein": "35g", "calories": 450}', 'https://www.wearesovegan.com/wp-content/uploads/2018/02/ProteinBuddhaBowl_General1.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 20:59:51.000'),
	(5, 2, 'Beef Steak & Veggies', 'Lean beef steak with roasted vegetables and brown rice', '["Lean beef steak", "Brown rice", "Asparagus", "Bell peppers", "Herbs"]', '{"fat": "20g", "carbs": "38g", "fiber": "5g", "protein": "42g", "calories": 520}', 'https://thewholecook.com/wp-content/uploads/2023/01/Steak-with-Roasted-Veggies-1-3.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 21:00:33.000'),
	(6, 2, 'Protein Pancakes', 'High-protein pancakes with Greek yogurt and berries', '["Protein powder", "Oats", "Greek yogurt", "Berries", "Honey"]', '{"fat": "8g", "carbs": "42g", "fiber": "4g", "protein": "28g", "calories": 380}', 'https://www.eatingbirdfood.com/wp-content/uploads/2023/11/protein-pancakes-hero-cropped.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 21:00:52.000'),
	(7, 3, 'Wagyu Beef Tenderloin', 'Premium wagyu beef with truffle mashed potatoes and seasonal vegetables', '["Wagyu beef", "Truffle", "Potatoes", "Seasonal vegetables", "Fine herbs"]', '{"fat": "35g", "carbs": "28g", "fiber": "4g", "protein": "45g", "calories": 650}', 'https://plumcreekwagyubeef.com/cdn/shop/articles/Wagyu_Tenderloin_Tips-_Perfect_for_Stir-Fries_Stews_and_More_1024x.webp?v=1716882051', 1, '2025-06-22 19:25:15.000', '2025-06-26 21:01:26.000'),
	(8, 3, 'Lobster Thermidor', 'Fresh lobster with creamy sauce, served with risotto and asparagus', '["Fresh lobster", "Cream sauce", "Arborio rice", "Asparagus", "Parmesan"]', '{"fat": "28g", "carbs": "35g", "fiber": "3g", "protein": "38g", "calories": 580}', 'https://www.seriouseats.com/thmb/WoGZrLtBwKNxCy6h62fM9ht-Lus=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20250212-SEA-LobsterThermidor-AmandaSuarez-hero-1d4d6f1652e649b1a883fffb54dd2c2e.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 21:02:49.000'),
	(9, 3, 'Gourmet Breakfast Platter', 'Premium breakfast with smoked salmon, avocado toast, and organic eggs', '["Smoked salmon", "Avocado", "Sourdough bread", "Organic eggs", "Caviar"]', '{"fat": "30g", "carbs": "25g", "fiber": "6g", "protein": "32g", "calories": 520}', 'https://therecipecritic.com/wp-content/uploads/2023/06/breakfast-bowl.jpg', 1, '2025-06-22 19:25:15.000', '2025-06-26 21:03:15.000');

-- Dumping structure for table sea_catering.subscriptions
CREATE TABLE IF NOT EXISTS `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `plan_id` int NOT NULL,
  `selected_plan` varchar(50) NOT NULL,
  `selected_meal_types` json NOT NULL,
  `selected_delivery_days` json NOT NULL,
  `allergies` text,
  `total_price` decimal(12,2) NOT NULL,
  `status` enum('pending','confirmed','active','paused','cancelled') NOT NULL DEFAULT 'pending',
  `pause_start_date` date DEFAULT NULL,
  `pause_end_date` date DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_subscriptions_user_id` (`user_id`),
  KEY `idx_subscriptions_status` (`status`),
  KEY `idx_subscriptions_created_at` (`created_at`),
  KEY `subscriptions_plan_id_fkey` (`plan_id`),
  CONSTRAINT `subscriptions_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `meal_plans` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `subscriptions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sea_catering.subscriptions: ~11 rows (approximately)
INSERT INTO `subscriptions` (`id`, `user_id`, `plan_id`, `selected_plan`, `selected_meal_types`, `selected_delivery_days`, `allergies`, `total_price`, `status`, `pause_start_date`, `pause_end_date`, `created_at`, `updated_at`) VALUES
	(1, 1, 2, 'protein', '["breakfast"]', '["tuesday"]', 'Peanuts', 172000.00, 'paused', '2025-06-28', '2025-06-29', '2025-06-22 20:05:22.000', '2025-06-27 11:48:14.000'),
	(2, 3, 1, 'diet', '["lunch", "dinner"]', '["monday", "wednesday", "friday"]', NULL, 774000.00, 'active', NULL, NULL, '2025-06-20 03:30:00.000', '2025-06-20 03:30:00.000'),
	(3, 4, 2, 'protein', '["breakfast", "lunch"]', '["monday", "tuesday", "wednesday", "thursday", "friday"]', 'Shellfish', 1720000.00, 'active', NULL, NULL, '2025-06-18 07:15:00.000', '2025-06-18 07:15:00.000'),
	(4, 5, 1, 'diet', '["breakfast"]', '["monday", "wednesday", "friday", "sunday"]', 'Lactose intolerant', 516000.00, 'active', NULL, NULL, '2025-06-19 02:45:00.000', '2025-06-19 02:45:00.000'),
	(5, 6, 3, 'royal', '["dinner"]', '["friday", "saturday"]', NULL, 1032000.00, 'cancelled', NULL, NULL, '2025-06-21 09:20:00.000', '2025-06-25 04:30:00.000'),
	(6, 7, 3, 'royal', '["breakfast", "lunch", "dinner"]', '["saturday", "sunday"]', 'Gluten sensitivity', 1548000.00, 'active', NULL, NULL, '2025-06-23 04:00:00.000', '2025-06-23 04:00:00.000'),
	(7, 8, 2, 'protein', '["lunch"]', '["monday", "tuesday", "wednesday", "thursday", "friday"]', NULL, 860000.00, 'pending', NULL, NULL, '2025-06-25 01:30:00.000', '2025-06-25 01:30:00.000'),
	(8, 9, 1, 'diet', '["breakfast", "lunch"]', '["monday", "wednesday", "friday"]', 'Vegetarian', 774000.00, 'active', NULL, NULL, '2025-06-24 06:45:00.000', '2025-06-24 06:45:00.000'),
	(9, 10, 2, 'protein', '["breakfast", "dinner"]', '["tuesday", "thursday", "saturday"]', NULL, 1032000.00, 'active', NULL, NULL, '2025-06-26 00:15:00.000', '2025-06-26 00:15:00.000'),
	(10, 11, 1, 'diet', '["lunch"]', '["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]', 'Nut allergy', 903000.00, 'pending', NULL, NULL, '2025-06-26 08:20:00.000', '2025-06-26 08:20:00.000'),
	(11, 1, 3, 'royal', '["breakfast", "lunch"]', '["tuesday"]', 'Seafood', 516000.00, 'pending', NULL, NULL, '2025-06-27 20:29:56.000', '2025-06-27 20:29:56.000');

-- Dumping structure for table sea_catering.testimonials
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `subscription_id` int DEFAULT NULL,
  `review_message` text NOT NULL,
  `rating` int DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_testimonials_user_subscription` (`user_id`,`subscription_id`),
  KEY `idx_testimonials_approved` (`is_approved`),
  KEY `idx_testimonials_rating` (`rating`),
  KEY `idx_testimonials_user_id` (`user_id`),
  KEY `idx_testimonials_subscription_id` (`subscription_id`),
  CONSTRAINT `testimonials_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `testimonials_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `testimonials_chk_1` CHECK (((`rating` >= 1) and (`rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sea_catering.testimonials: ~10 rows (approximately)
INSERT INTO `testimonials` (`id`, `user_id`, `subscription_id`, `review_message`, `rating`, `is_approved`, `created_at`, `updated_at`) VALUES
	(1, 1, 1, 'Protein Plan is a game changer! The high-protein menu is delicious, especially the protein pancakes for breakfast. Ive been a subscriber for 1 month and my energy level is much more stable. Worth every penny!', 5, 1, '2025-06-26 22:12:26.000', '2025-06-27 09:47:17.000'),
	(2, 3, 2, 'Diet Plan sangat membantu saya menurunkan berat badan. Porsi pas, rasa enak, dan tidak bikin lapar berlebihan. Quinoa Veggie Bowl favorit saya!', 5, 1, '2025-06-21 03:15:00.000', '2025-06-25 02:30:00.000'),
	(3, 4, 3, 'Sebagai gym enthusiast, Protein Plan benar-benar sesuai kebutuhan saya. Beef Steak & Veggies nya juara! Delivery selalu tepat waktu.', 5, 1, '2025-06-19 07:30:00.000', '2025-06-25 02:30:00.000'),
	(4, 6, 6, 'Royal Plan memang premium! Wagyu Beef Tenderloin dan Lobster Thermidor rasanya seperti fine dining restaurant. Harga sebanding dengan kualitas.', 5, 1, '2025-06-24 09:45:00.000', '2025-06-25 02:30:00.000'),
	(5, 8, 8, 'Grilled Chicken Salad nya fresh banget! Diet Plan cocok untuk yang ingin hidup sehat tanpa ribet masak. Highly recommended!', 4, 1, '2025-06-25 04:20:00.000', '2025-06-25 04:20:00.000'),
	(6, 9, 9, 'Protein Pancakes untuk breakfast adalah inovasi terbaik! Kenyang tapi tidak bikin ngantuk. SEA Catering the best!', 5, 1, '2025-06-26 01:00:00.000', '2025-06-26 01:00:00.000'),
	(7, 10, 10, 'Saya vegetarian dan Diet Plan punya banyak pilihan sayuran segar. Green Smoothie Bowl jadi favorit pagi saya.', 4, 0, '2025-06-26 12:30:00.000', '2025-06-26 12:30:00.000'),
	(8, 5, 4, 'Pelayanan bagus, makanan sehat dan bergizi. Cocok untuk yang sibuk tapi tetap ingin makan sehat.', 4, 1, '2025-06-20 05:15:00.000', '2025-06-25 02:30:00.000'),
	(9, 7, 7, 'Baru coba seminggu tapi sudah jatuh cinta dengan kualitas makanannya. Packaging rapi dan higienis.', 5, 0, '2025-06-26 13:45:00.000', '2025-06-26 13:45:00.000'),
	(10, 11, 5, 'Pernah coba Royal Plan sebulan, memang mewah tapi agak di luar budget. Sekarang pindah ke Diet Plan dan tetap puas!', 4, 1, '2025-06-22 08:30:00.000', '2025-06-25 02:30:00.000');

-- Dumping structure for table sea_catering.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table sea_catering.users: ~12 rows (approximately)
INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `phone`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
	(1, 'test', 'test@gmail.com', '$2b$12$u7Nb7yyq/xqhPs43MoSrN.2R5SBrjbTuqEVAFz0oRIt4JHryAyS/m', '08123456768', 'user', 1, '2025-06-23 00:49:02.000', '2025-06-23 00:49:02.000'),
	(2, 'Admin SEA Catering', 'admin@seacatering.com', '$2b$12$tZisx/AI9LttpIF4rHB3leNxi/IGpvk3vIkmt90.J56MW4tmcVeZa', NULL, 'admin', 1, '2025-06-25 17:17:02.000', '2025-06-25 17:17:02.000'),
	(3, 'Sari Dewi', 'sari.dewi@gmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456789', 'user', 1, '2025-06-18 02:30:00.000', '2025-06-18 02:30:00.000'),
	(4, 'Budi Santoso', 'budi.santoso@gmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456790', 'user', 1, '2025-06-17 07:15:00.000', '2025-06-17 07:15:00.000'),
	(5, 'Maya Putri', 'maya.putri@yahoo.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456791', 'user', 1, '2025-06-16 04:45:00.000', '2025-06-16 04:45:00.000'),
	(6, 'Ahmad Rahman', 'ahmad.rahman@hotmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456792', 'user', 1, '2025-06-19 09:20:00.000', '2025-06-19 09:20:00.000'),
	(7, 'Linda Kusuma', 'linda.kusuma@gmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456793', 'user', 1, '2025-06-20 03:30:00.000', '2025-06-20 03:30:00.000'),
	(8, 'Rendi Pratama', 'rendi.pratama@gmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456794', 'user', 1, '2025-06-21 01:00:00.000', '2025-06-21 01:00:00.000'),
	(9, 'Dewi Sartika', 'dewi.sartika@yahoo.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456795', 'user', 1, '2025-06-22 06:45:00.000', '2025-06-22 06:45:00.000'),
	(10, 'Fajar Nugroho', 'fajar.nugroho@gmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456796', 'user', 1, '2025-06-23 00:15:00.000', '2025-06-23 00:15:00.000'),
	(11, 'Rina Maharani', 'rina.maharani@hotmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456797', 'user', 1, '2025-06-24 08:20:00.000', '2025-06-24 08:20:00.000'),
	(12, 'Dani Firmansyah', 'dani.firmansyah@gmail.com', '$2b$12$iP6wGCDsYLDkmRhFCnb6W.4F4SViapcmpLoz.dpHRSxQFkJNo9aAy', '08123456798', 'user', 1, '2025-06-25 05:00:00.000', '2025-06-25 05:00:00.000');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
