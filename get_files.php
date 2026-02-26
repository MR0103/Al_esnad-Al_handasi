<?php
// تحديد المسار باستخدام المسار الكامل للسيرفر لضمان الوصول
$relative_path = "electric_unit/";
$directory = __DIR__ . DIRECTORY_SEPARATOR . $relative_path;
$files = [];

// فحص المجلد وجلب الملفات
if (is_dir($directory)) {
    // جلب ملفات PDF والصور فقط
    $allowed_extensions = ['pdf', 'jpg', 'jpeg', 'png', 'PDF', 'JPG', 'PNG'];
    
    $all_items = scandir($directory);
    foreach ($all_items as $item) {
        $ext = pathinfo($item, PATHINFO_EXTENSION);
        if (in_array($ext, $allowed_extensions)) {
            $files[] = $item;
        }
    }
}

// إرسال النتيجة كـ JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // للسماح بالوصول من أي مكان داخل السيرفر
echo json_encode($files);
?>
