<?php
	if(isset($_POST['submit'])) {
		$to = "lukestrong47@gmail.com";
		$subject = $_POST['subject'];
		$email = $_POST['email'];
		$txt = $_POST['message'];
		$headers = "From: " .$email . "\r\n";
		mail($to, $subject, $txt, $headers);
		header("Location: contact.html");
	}




?>