<?php
// Include your database connection config
require_once 'config/productDB.php';

// Clear the "Database connected successfully!" echo from productDB.php if it breaks JSON parsing
// Ideally, remove line 24 ("echo 'Database connected...';") from your config/productDB.php file.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allows your JS to fetch data seamlessly

try {
    $stmt = $pdo->query("SELECT * FROM products");
    $dbProducts = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Map database column names to match your JavaScript format exactly
    $products = [];
    foreach ($dbProducts as $row) {
        $products[] = [
            "id" => $row['id'],
            "image" => $row['image'],
            "name" => $row['name'],
            "rating" => [
                "stars" => (float)$row['rating_stars'],
                "count" => (int)$row['rating_count']
            ],
            "priceCents" => (int)$row['price_cents']
        ];
    }

    echo json_encode($products);
} catch (PDOException $e) {
    echo json_encode(["error" => "Failed to fetch products: " . $e->getMessage()]);
}