<!--This is a projct two
Name: Zaid Laffta
08-8-2016 -->
<!DOCTYPE html>
<html>
<head>
  <!--  This is an icon line   -->
 <link rel="shortcut icon" type="image/x-icon" href="icon.png" />
 <!--  Jquery DNS   -->
 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <title>Car Payment Calculater</title>
  <meta charset = "UTF-8">
  <link rel = "stylesheet" href = "style1.css">
</head>
<body>
 <h1>Welcom to carpayment calculator</h1>
 <!--  navigation bar -->
 <div id = "navi">
  <ul>
	<li><a href = "index.html">Home</a></li>
	<li><a href = "creditapp.php">credit application</a></li>
	<li> <a href = "save.php">what you can afford</a></li>
	<li> <a href = "download.php">downlad.CSV</a></li>
  </ul>
 </div>
 <h1>See What You Can Afford</h1>
 <P>In the field below, you will put your personal information and see how much care
 you can afford. All calculation will be based on your income and your credit score taking in consideration your, rent, 
 and other life expenses</p>

<!-- the action for this form is to take you to a php page in the server --> 
<form action="afford.php" method="post">
  First Name: <input type="text" name="name" value = "">
  Last Name: <input type = "text" name = "lastname">
  Last four of you SSN: <input type ="text" name = "ssn"><br><br>
  Monthly income: <input type = "text" name = "income">
  Monthly rent: <input type = "text" name = "rent">
  Other expences: <input type = "text" name= "other"><br><br>
  Creidt score: <input type = "text" name = "credit">
  Phone number: <input type ="text" name = "phone">
  E-mail: <input type="text" name="email"><br><br>
  <div style="text-align:center">
	 <input type="submit">
  </div>
</form>
</body>

</html>