<?php


require_once "EntityRepository.php";
require_once "Class/Product.php";

class ProductRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function findlessstock() {
        $requete = $this->cnx->prepare(
            "SELECT 
        id,
        product_name,
        stock
        FROM 
        Products
        ORDER BY 
        stock ASC
        LIMIT 10;"
    );
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);


        return $answer;	
    }

    public function salesbyproduct($id) {
        $requete = $this->cnx->prepare(
            "SELECT 
            DATE_FORMAT(o.order_date, '%Y-%m') AS month,
            p.product_name,
            SUM(oi.quantity) AS total_sales
            FROM 
            OrderItems oi
            JOIN 
            Orders o ON oi.order_id = o.id
            JOIN 
            Products p ON oi.product_id = p.id
            WHERE 
            p.id = :id
            AND o.order_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
            GROUP BY 
            month, p.product_name
            ORDER BY 
            month ASC;"
        );
        $requete->bindParam(":id", $id);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
        
        
    }

    public function productbyname(){
        $requete = $this->cnx->prepare(
            "SELECT 
            id,
            product_name
            FROM 
            Products
            ORDER BY 
            product_name ASC;"
        );
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }

    public function salesbycountry($month){
        $requete = $this->cnx->prepare(
            "SELECT 
            DATE_FORMAT(o.order_date, '%Y-%m') AS month,
            c.country AS country,
            SUM(oi.quantity) AS total_items_shipped
            FROM 
            Orders o
            JOIN 
            OrderItems oi ON o.id = oi.order_id
            JOIN 
            Customers c ON o.customer_id = c.id
            WHERE 
            DATE_FORMAT(o.order_date, '%Y-%m') = :month
            GROUP BY 
            month, country
            ORDER BY 
            month ASC, total_items_shipped DESC;"
        );
        $requete->bindParam(":month", $month);
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }
    
    public function country(){
        $requete = $this->cnx->prepare(
            "SELECT 
            country
            FROM 
            Customers
            GROUP BY 
            country
            ORDER BY 
            country ASC;"
        );
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        return $answer;
    }
    
    


}




?>