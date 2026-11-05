<?php
/**
 * Misol: PHP va MySQL orqali mashinalar ro'yxatini chiqarish
 * Kesh muammosiz 100% yangi ma'lumotlar ko'rinadi
 */

// 1. Keshni o'chiruvchi faylni birinchi bo'lib chaqiramiz
require_once __DIR__ . '/cache_buster.php';

// 2. MySQL bazasiga ulanish (Misol)
/*
$db = new PDO("mysql:host=localhost;dbname=kia_auto;charset=utf8mb4", "root", "", [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
]);

// Narx yoki rasm o'zgarganda 'updated_at' ham yangilanadi
$stmt = $db->query("SELECT id, name, price, image, updated_at FROM vehicles ORDER BY id DESC");
$cars = $stmt->fetchAll();
*/

// Misol uchun ma'lumotlar:
$cars = [
    [
        'id' => 1,
        'name' => 'KIA K5',
        'price' => 369900000,
        'image' => 'assets/vehicles/k5.jpg',
        'updated_at' => date('Y-m-d H:i:s')
    ],
    [
        'id' => 2,
        'name' => 'KIA Sportage',
        'price' => 419900000,
        'image' => 'assets/vehicles/sportage.jpg',
        'updated_at' => date('Y-m-d H:i:s')
    ]
];
?>
<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KIA AUTO CENTER — Mashinalar</title>
    
    <!-- Brauzer keshini bloklovchi meta-teglar -->
    <?= renderNoCacheMetaTags(); ?>
    
    <!-- CSS fayli avtomatik yangi versiyada yuklanadi (filemtime) -->
    <link rel="stylesheet" href="<?= assetUrl('css/style.css'); ?>">
</head>
<body style="background: #111; color: #fff; font-family: sans-serif; padding: 20px;">

    <h1>KIA AUTO CENTER — Avtomobillar Katalogi</h1>
    <p>Loyiha egasi: Nasriddinova Dilfuza</p>

    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <?php foreach ($cars as $car): ?>
            <div style="background: #1c1c1c; border: 1px solid #333; padding: 15px; border-radius: 12px; width: 300px;">
                <!-- Rasmga updated_at parametri ulanadi: rasm hech qachon eski bo'lib qolmaydi -->
                <img src="<?= carImageUrl($car['image'], $car['updated_at']); ?>" 
                     alt="<?= htmlspecialchars($car['name']); ?>" 
                     style="width: 100%; height: 180px; object-fit: cover; border-radius: 8px;">

                <h3 style="margin: 10px 0;"><?= htmlspecialchars($car['name']); ?></h3>
                
                <!-- Har safar bazadagi yangi narx chiqadi -->
                <p style="font-size: 18px; font-weight: bold; color: #C8102E;">
                    <?= formatCarPrice($car['price']); ?>
                </p>
            </div>
        <?php endforeach; ?>
    </div>

    <!-- JS fayli avtomatik yangi versiyada yuklanadi (filemtime) -->
    <script src="<?= assetUrl('js/app.js'); ?>"></script>
</body>
</html>
