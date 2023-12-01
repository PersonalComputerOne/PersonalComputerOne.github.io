<?php
    include 'dbcon.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <title>Document</title>
</head>
<body>
    <?php
    if(isset($_POST['submit'])){ 
        $EMAIL = $_POST['EMAIL'];
        $PASSWORD = $_POST['PASSWORD'];

        $sql = "INSERT INTO `user`(`EMAIL`, `PASSWORD`) VALUES ( ?, ?)";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("ss", $EMAIL, $PASSWORD);        
        
        if($stmt->execute()){ ?>

        <script type="text/javascript">
                swal("Success!", "Information has been added.", "success")
                .then(function(){
                window.location="index.php";
            });
            </script>
 
<?php 
            }
        };

        if(isset($_POST['login'])){
            $EMAIL = $_POST['EMAIL'];   
            $PASSWORD = $_POST['PASSWORD'];
    
            $sql="SELECT * FROM `user` WHERE `EMAIL`= ? AND `PASSWORD` =?";
            $stmt=$con->prepare($sql);
            $stmt->bind_param("ss", $EMAIL, $PASSWORD);
            $stmt->execute();
            $result=$stmt->get_result();
            $row=$result->fetch_assoc();
            
            if($result->num_rows==1){
                $name = "SELECT `EMAIL` FROM `user` WHERE `EMAIL`= ? AND `PASSWORD` =?";
                $st = $con->prepare($sql);
                $st->bind_param("ss", $EMAIL, $PASSWORD);
                ?>

                <script type="text/javascript">
                        swal("Success!", "Welcome <?php echo $row['EMAIL'];?>.", "success")
                        .then(function(){
;                   window.location="index.html";
                    });
                    </script>
                    
        <?php 
            }else{
               
                ?>
                <script type="text/javascript"> 
                    
                        swal("Wrong Password or Email", "Please, Try Again","error")
                        .then(function(){
                        window.location="index.php";
                    });
                    </script>
                
    <?php }
        }
        
        if(isset($_POST['admin'])){
            $email = $_POST['email'];   
            $password = $_POST['password'];
    
            $sql="SELECT * FROM `admin` WHERE `email`= ? AND `password` =?";
            $stmt=$con->prepare($sql);
            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();
            $result=$stmt->get_result();
            $row=$result->fetch_assoc();
            
            if($result->num_rows==1){
                $name = "SELECT `email` FROM `admin` WHERE `email`= ? AND `password` =?";
                $st = $con->prepare($sql);
                $st->bind_param("ss", $email, $password);
                ?>

                <script type="text/javascript">
                        swal("Success!", "Welcome <?php echo $row['email'];?>.", "success")
                        .then(function(){
;                   window.location="landingan.php";
                    });
                    </script>
                    
        <?php 
            }else{
               
                ?>
                <script type="text/javascript"> 
                    
                        swal("Wrong Password or Email", "Please, Try Again","error")
                        .then(function(){
                        window.location="index.php";
                    });
                    </script>
                
    <?php }
        }
    
        
    
?>

</body>
</html>