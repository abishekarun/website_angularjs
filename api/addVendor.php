<?php
session_start();
$server='localhost';
$user='root';
$passwd='root';
$db='test';
$name = $email = $pass = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST["userid"]) && isset($_POST["email"])) {
$name=$_POST["userid"]; 
$email=$_POST["email"];
$pass=md5($_POST["password"]);
$conn=new PDO("mysql:host=$server;dbname=$db", $user, $passwd);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $conn->prepare("INSERT INTO newloginform (Name,Email,password) 
	VALUES (:name, :email,:pass)");
$stmt->bindParam(':name', $name);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':pass', $pass); 
$stmt->execute();
$count++;
  $_SESSION["email"]=$email;
  $_SESSION["password"]=$pwd;
  $_SESSION["name"]=$name;
  $_SESSION["id"]=$count;
  header("Location: http://localhost/mithra/forums");}
catch(PDOException $e)
    {
    echo 'Error: ' . $e->getMessage();
    }
}
else{
	echo "Email already Exists";
}
}
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['emailid'])) {
$pwd = $email = $result = '';
$pwd=md5($_POST['pass']);
$conn1=new PDO("mysql:dbname=$db;host=$server", $user, $passwd);
$conn1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
if(preg_match("/[\.0-9a-zA-Z]{1,30}@[a-zA-Z0-9]+[\.a-zA-Z]+/i",$_POST['emailid']))
{
	$email=$_POST['emailid'];
	$stmt = $conn1->prepare("SELECT * FROM newloginform WHERE Email = :email AND password = :pass");
	$stmt->bindParam(':email', $email);
	$stmt->bindParam(':pass', $pwd);
	$stmt->execute();
  $result = $stmt->fetch();
}
if(empty($result))
{
echo "No such user";
}
else
{
$_SESSION["email"]=$email;
$_SESSION["password"]=$pwd;
$_SESSION["name"]=$result["Name"];
$_SESSION["id"]=$result["Id"];
header("Location: http://localhost/mithra/forums");
}
}
?>