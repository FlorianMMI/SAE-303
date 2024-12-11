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
    
    
    


}




?>