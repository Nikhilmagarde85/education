<?php
include 'db_connection.php'; // Include the database connection script

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve data from the request
    $dmTitle = $_POST['dmTitle'];
    $description = $_POST['description'];
    $link = $_POST['link'];

    // SQL query to insert the data into the database
    $sql = "INSERT INTO dm (title, description, link) VALUES ('$dmTitle', '$description', '$link')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

// Close the database connection
$conn->close();
?>
