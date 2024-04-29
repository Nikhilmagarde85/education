<?php
include 'db_connection.php'; // Include the database connection script

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve application data from the request
    $tenderId = $_POST['tenderId'];
    $applicantName = $_POST['applicantName'];
    $bidAmount = $_POST['bidAmount']; // Retrieve bid amount

    // You can add more form field retrieval here

    // SQL query to insert the application into the database, including bid amount
    $sql = "INSERT INTO applications (tender_id, applicant_name, bid_amount) VALUES ('$tenderId', '$applicantName', '$bidAmount')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

// Close the database connection
$conn->close();
?>
