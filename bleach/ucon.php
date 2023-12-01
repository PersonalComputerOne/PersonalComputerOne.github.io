<?php
    include 'dbcon.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.25/b-1.7.1/b-html5-1.7.1/b-print-1.7.1/datatables.min.css"/>
    <title>CRUD</title>

    <style>
        body, html{
            padding: 20px;
        
            background-color: lightgray;
        }
    </style>
</head>
<body>
    <table table id="example" class="table table-striped table-bordered" style="width:100%">
        <thead>
        <tr>
            <th scope="col">EMAIL</th>
            <th scope="col">PASSWORD</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
            <th scope="col">Logout</th>
            </tr>
        </thead>
        <tbody>
            <?php

                $sql="SELECT * FROM user";
                $stmt=$con->prepare($sql);
                $stmt->execute();
                $result=$stmt->get_result();
                while($row=$result->fetch_assoc()){
            ?>
            <tr>
            <td><?php echo $row['EMAIL']; ?></td>
            <td><?php echo $row['PASSWORD']; ?></td>
            
           
            <td>
                <button type="button" class="btn btn-success"  data-toggle="modal" data-target="#updatemodal-<?php echo $row['id']; ?>">Update</button>
            </td>
            <td>
                <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deletemodal-<?php echo $row['id']; ?>">Delete</button>
            </td>
            <td>
            <a href="logout.php" class="btn btn-danger">Logout</a>
            </td>
            </tr>

            <!-- Update Modal -->
            <div class="modal fade" id="updatemodal-<?php echo $row['id']; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            
                <form action="controller.php" method="POST">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><?php echo $row['id']; ?></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div class="modal-body">
                                <div class="form-group">
                                    <label for="EMAIL">EMAIL:</label>
                                    <input type="text" class="form-control" value="<?php echo $row['EMAIL']; ?>" id="EMAIL" name="EMAIL">
                                </div>
                    
                                <div class="form-group">
                                    <label for="PASSWORD">PASSWORD:</label>

                                    <input type="password" class="form-control" value="<?php echo $row['EMAIL']; ?>"  name="EMAIL" id="EMAIL">
                                </div>

                        </div>
                        <div class="modal-footer" method="post">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <input type="hidden" class="form-control" value="<?php echo $row['id']; ?>" id="id" name="id">
                            <button type="submit" name="update" class="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Delete Modal -->
            <div class="modal fade" id="deletemodal-<?php echo $row['id']; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

                <form action="controller.php" method="POST">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel"><?php echo $row['id']; ?></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        <div class="modal-body">
                        <h4> Do you want to delete this particular data?</h4>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <input type="hidden" class="form-control" value="<?php echo $row['id']; ?>" id="id" name="id">
                            <button type="submit" name="delete" class="btn btn-primary">Continue</button>
                        </div>
                        </div>
                    </div>
                </form>
            </div>
            
            <?php } ?>
        </tbody>
    </table>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/jszip-2.5.0/dt-1.10.25/b-1.7.1/b-html5-1.7.1/b-print-1.7.1/datatables.min.js"></script>

    <script type="text/javascript">
    $(document).ready(function(){
        $('#example').DataTable({
            dom: 'Blfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        });
    });
    </script>
</body>
</html>