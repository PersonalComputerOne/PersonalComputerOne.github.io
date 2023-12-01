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
        // insert statement
        if(isset($_POST['submit'])){ 
            $NAME = $_POST['NAME'];
            $BLEACH = $_POST['BLEACH'];
            $BLEACHost = $_POST['BLEACHost'];

            $sql = "INSERT INTO `bleach`(`NAME`, `BLEACH`, `BLEACHost`) VALUES ( ?, ?, ?)";
            $stmt = $con->prepare($sql);
            $stmt->bind_param("sss", $NAME, $BLEACH, $BLEACHost);        
            
            if($stmt->execute()){ ?>

            <script type="text/javascript">
                    swal("Success!", "Information has been added.", "success")
                    .then(function(){
                    window.location="index.html";
                });
                </script>
                
    <?php }
    
        };
        
    
        if(isset($_POST['update'])){
            $NAME = $_POST['NAME'];
            $BLEACH = $_POST['BLEACH'];
            $BLEACHost = $_POST['BLEACHost'];
            $id = $_POST['id'];

            $sql="UPDATE `bleach` SET `NAME` = ?,`BLEACH` = ?, `BLEACHost` = ? WHERE id = ?";
            $stmt=$con->prepare($sql);
            $stmt->bind_param("ssss", $NAME, $BLEACH, $BLEACHost, $id);
            if($stmt->execute()){ ?>
                <script type="text/javascript">
                    swal("Success!", "Information has been updated.", "success")
                    .then(function(){
                    window.location="landingan.php";
                });
                </script>
<?php }
    }if(isset($_POST['delete'])){
        $id = $_POST['id'];
        
        $sql="DELETE FROM user WHERE id = ?";
        $stmt=$con->prepare($sql);
        $stmt->bind_param("s", $id);
        if($stmt->execute()){ ?>
            <script type="text/javascript">
                swal("Success!", "Information has been deleted.", "success")
                .then(function(){
                window.location="landingan.php";
            });
            </script>

<?php }
    }
?>

</body>
</html>