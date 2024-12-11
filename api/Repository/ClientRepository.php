<?php


require_once "EntityRepository.php";
require_once "Class/Client.php";

class ClientRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function findorder($id) {
        $requete = $this->cnx->prepare(
            "SELECT 
            p.category,
            p.product_name,
            SUM(oi.quantity) AS total_quantity
            FROM 
            Orders o
            JOIN 
            OrderItems oi ON o.id = oi.order_id
            JOIN 
            Products p ON oi.product_id = p.id
            WHERE 
            o.customer_id = :id
            GROUP BY 
            p.category, p.product_name
            ORDER BY 
            p.category ASC, total_quantity DESC;"
        );
        $requete->bindParam(":id", $id);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }


    public function client(){
        $requete = $this->cnx->prepare(
            "SELECT 
            id, firs_name, last_name
            FROM
            Customers
            ORDER BY
            last_name ASC;
             "
        );
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }

}


?>