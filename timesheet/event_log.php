
<!DOCTYPE html>
<html>
<head>
  <!--  This is an icon line   -->
 <link rel="shortcut icon" type="image/x-icon" href="/images/th.jpeg" />
 <!--  Jquery DNS   -->
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <title>Timesheet</title>
  <meta charset = "UTF-8">
  <link rel="stylesheet" href="/stylesheets/style1.css">
  <link rel="stylesheet" href="/stylesheets/timesheet.css">
</head>
<body>
 <h1>Welcom to Transport  Hub</h1><br>
 <h2> The first and only HR solution for transportation companies<h2><br>
 <!--  navigation bar -->
 <div id = "navi">
  <ul>
	<li><a href = "Put something here">Home</a></li>
	<li><a href = "put something here">something</a></li>
	<li> <a href = "put something here">something</a></li>
	<li> <a href = "event_log.php">downlad.CSV</a></li>
  </ul>
 </div>
 <h1>This is the company event log.</h1>
 <P>In the field below, you need to full out the information. 
 Once you hit submit your event will be saved in a secured server. This log event is build according to the highest security standards.</p>
 
 
 
<?php
// this is another data validation 
// Initialize variables to null.
$nameError ="";
$lastnameError = "";
$ssnError = "";
$IDError = "";
$emailError ="";
// On submitting form below function will execute.
if(isset($_POST['submit'])){
	
if (empty($_POST["name"])) {
$nameError = "Name is required";
} else {
$name = test_input($_POST["name"]);
// check name only contains letters and whitespace
if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
$nameError = "Only letters and white space allowed";
}
}
if (empty($_POST["lastname"])) {
$lastnameError = "Last Name is required";
} else {
$lastname = test_input($_POST["lastname"]);
// check name only contains letters and whitespace
if (!preg_match("/^[a-zA-Z ]*$/",$lastname)) {
$lastnameError = "Only letters and white space allowed";
}
}
if (empty($_POST["ssn"])) {
$ssnError = "social security number requird";
} else {
$ssn = test_input($_POST["ssn"]);
// check name only contains letters and whitespace
if (!preg_match("/^[1-9]*$/",$ssn)) {
$ssnError = "Only numbers and white space allowed";
}
}
if (empty($_POST["emplyeeID"])) {
$IDError = "emplyee Id is requird";
} else {
$eplyeeID = test_input($_POST["emplyeeID"]);
// check name only contains letters and whitespace
if (!preg_match("/^[1-9]*$/",$eplyeeid)) {
$IDError = "Only numbers and white space allowed";
}
}
if (empty($_POST["email"])) {
$emailError = "Email is required";
} else {
$email = test_input($_POST["email"]);
// check if e-mail address syntax is valid or not
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/",$email)) {
$emailError = "Invalid email format";
}
}

/// saving information in an event log. 

	$name = $_POST['name'];
	$lastname = $_POST['lastname'];
	$email = $_POST['email'];
	$eplyeeID = $_POST['emplyeeID'];
	$ssn = $_POST['ssn'];
	$comment = $_POST['comment'];
	

		// Title of the colm in the CSV FILE 
		$Content = "name,  lastname,  ssn,  emplyeeID,  email, comment\n";
		//set the data of the CSV
		$Content .= "$name,  $lastname,  $ssn,  $eplyeeID, $email $comment\n";
		// set the file name and create CSV file
		$FileName = "log_".date("d-m-y").".csv";
		//open the file and append date to it.
		$fh = fopen($FileName,'a');
		fprintf($fh,"$Content");
		fclose($fh);
		echo "Thanks for using Transport Hub HR solution. Your event are loged in.<br> Your HR will be notifyed via email.<br> Log_ data-today_date.CSV.<br>";
		echo "below is the information you entered<br>";
		echo $Content;
		exit();


}
function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}
//php code ends here when it comes to data validation

?>
 

<div>
<form action="timesheet/save" method="post">
<h2>Event log sheet</h2>
<span class="error">* required field.</span><br><br>
First Name:
  <input class="input" name="name" type="text" value="">
  <span class="error">* <?php echo $nameError;?></span>
Last Name:
  <input class="input" name="lastname" type="text" value="">
  <span class="error">* <?php echo $lastnameError;?></span><br><br>
Last 4 of your SSN#:
  <input class="input" name="ssn" type="text" value="">
  <span class="error">* <?php echo $ssnError;?></span>
Emplyee ID:
  <input class="input" name="emplyeeID" type="text" value="">
  <span class="error">* <?php echo $IDError;?></span><br><br>
E-mail:
  <input class="input" name="email" type="text" value="">
  <span class="error">* <?php echo $emailError;?></span><br><br>
Comment:
  <br><textarea name='comment' id='comment' type ="text" value = "" rows="15" cols="80"></textarea><br><br>
 <input class="submit" name="submit" type="submit" value="Submit">
</form>
</div>

</body>

</html>