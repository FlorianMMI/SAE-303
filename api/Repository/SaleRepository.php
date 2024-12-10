<?php


require_once "EntityRepository.php";

class SaleRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function sales6month(){
        $requete = $this->cnx->prepare(
            "SELECT 
            DATE_FORMAT(o.order_date, '%Y-%m') AS month,
            SUM(oi.quantity * p.price) AS total_sales
            FROM 
            OrderItems oi
            JOIN 
            Orders o ON oi.order_id = o.id
            JOIN 
            Products p ON oi.product_id = p.id
            WHERE 
            o.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            GROUP BY 
            DATE_FORMAT(o.order_date, '%Y-%m')
            ORDER BY 
            month ASC;
        ");

        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }
}




?>