<?php
include 'db_connection.php'; // Include the database connection script

// SQL query to fetch tenders from the database
$sql = "SELECT * FROM tenders";
$result = $conn->query($sql);

$tenders = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $tenders[] = $row;
    }
}

// Close the database connection
$conn->close();

// Return JSON data
header('Content-Type: application/json');
echo json_encode($tenders);
?>
