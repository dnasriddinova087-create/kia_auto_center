<?php
/**
 * ==============================================================================
 * KIA AUTO CENTER — Central Cache Buster & Anti-Stale Data Manager
 * Muallif / Loyiha Egasi: Nasriddinova Dilfuza
 * ==============================================================================
 * Ushbu modul mobil brauzerlar va kompyuterlarda narxlar, rasmlar va stillar
 * keshlanib qolishini ILDIZI BILAN to'xtatadi.
 */

// 1. HTTP SARLAVHALAR (HEADERS) — Brauzer keshini majburiy o'chirish
function setNoCacheHeaders() {
    if (!headers_sent()) {
        header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
        header("Cache-Control: post-check=0, pre-check=0", false);
        header("Pragma: no-cache");
        header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
    }
}

// Har doim ushbu fayl chaqirilganda sarlavhalarni avtomatik yuborish
setNoCacheHeaders();

// 2. HTML META-TEGLARINI CHIQARISH FUNKSIYASI
function renderNoCacheMetaTags() {
    return '
    <!-- Brauzer keshini bloklash uchun majburiy meta-teglar -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    ';
}

// 3. STATIK FAYLLAR (CSS, JS) UCHUN AVTOMATIK CACHE-BUSTING
// Fayl o'zgarganda fayl vaqti (timestamp) avtomatik versiya bo'lib ulanadi
function assetUrl($relativePath) {
    $fullPath = __DIR__ . '/' . ltrim($relativePath, '/');
    if (file_exists($fullPath)) {
        return $relativePath . '?v=' . filemtime($fullPath);
    }
    return $relativePath . '?v=' . time();
}

// 4. MASHINA RASMLARI VA MYSQL BAZASI BILAN ISHLASH
// Bazada mahsulot narxi yoki rasmi o'zgarganda telefon yangi rasmni darhol oladi
function carImageUrl($imagePath, $updatedAt = null) {
    if (empty($imagePath)) {
        return 'assets/vehicles/default.jpg?v=' . time();
    }
    
    // Agar MySQL bazasidan updated_at vaqti berilgan bo'lsa
    if (!empty($updatedAt)) {
        $timestamp = is_numeric($updatedAt) ? $updatedAt : strtotime($updatedAt);
        return $imagePath . '?t=' . $timestamp;
    }
    
    // Aks holda diskdagi fayl o'zgarish vaqti
    $fullPath = __DIR__ . '/' . ltrim($imagePath, '/');
    if (file_exists($fullPath)) {
        return $imagePath . '?v=' . filemtime($fullPath);
    }
    
    return $imagePath . '?v=' . time();
}

// 5. NARXNI CHIQARISH FORMATERI (UZS)
function formatCarPrice($amountUzs) {
    return number_format((float)$amountUzs, 0, '.', ' ') . ' UZS';
}
