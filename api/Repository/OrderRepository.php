<?php


require_once "EntityRepository.php";
require_once "Class/Order.php";

class OrderRepository extends EntityRepository {

    public function __construct() {
        parent::__construct();
    }

    public function find($id) {
        $requete = $this->cnx->prepare("select * from Orders where id = :id");
        $requete->execute(['id' => $id]);
        $answer = $requete->fetch(PDO::FETCH_OBJ);
        
        if ($answer==false) return null;


            $p = new Order($answer->id);
            $p->setCustomerId($answer->customer_id);
            $p->setOrderDate($answer->order_date);
            $p->setOrderStatus($answer->order_status);
            $p->setWeigth($answer->weight);
            $p->setShippingCost($answer->shipping_cost);
            return $p;

    }

    public function findAll(): array {
        $requete = $this->cnx->prepare("select * from Orders");
        $requete->execute();
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);

        $res = [];
        foreach ($answer as $obj){
            $p = new Order($obj->id);
            $p->setCustomerId($obj->customer_id);
            $p->setOrderDate($obj->order_date);
            $p->setOrderStatus($obj->order_status);
            $p->setWeigth($obj->weight);
            $p->setShippingCost($obj->shipping_cost);
            array_push($res, $p);
        }

        return $res;	
    }

    public function countbyorderstatut ($order_status) {
        $requete = $this->cnx->prepare("select count(*) from Orders where order_status = :order_status");
        $requete->execute(['order_status' => $order_status]);
        $answer = $requete->fetchAll(PDO::FETCH_CLASS);
        $res = [
            'count' => $answer[0]->{'count(*)'}
        ];
        return $res;
    }


    public function getTopSellingProducts() {
        
        $query = "
            SELECT p.product_name, oi.product_id, SUM(oi.quantity) AS total_sales
            FROM OrderItems oi
            JOIN Orders o ON oi.order_id = o.id
            JOIN Products p ON oi.product_id = p.id
            WHERE o.order_date >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
            GROUP BY oi.product_id, p.product_name
            ORDER BY total_sales DESC
            limit 3
        ";

        $stmt = $this->cnx->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function save($order) {
        $query = "INSERT INTO Orders (customer_id, order_date, order_status, weigth, shipping_cost) VALUES (:customer_id, :order_date, :order_status, :weigth, :shipping_cost)";
        $stmt = $this->cnx->prepare($query);
        $stmt->execute([
            'customer_id' => $order->getCustomerId(),
            'order_date' => $order->getOrderDate(),
            'order_status' => $order->getOrderStatus(),
            'weigth' => $order->getWeigth(),
            'shipping_cost' => $order->getShippingCost()
        ]);
        $order->setId($this->cnx->lastInsertId());
        return true;
    }

    public function delete($id) {
        $query = "DELETE FROM Orders WHERE id = :id";
        $stmt = $this->cnx->prepare($query);
        $stmt->execute(['id' => $id]);
        return true;
    }

    public function update($order) {
        $query = "UPDATE Orders SET customer_id = :customer_id, order_date = :order_date, order_status = :order_status, weigth = :weigth, shipping_cost = :shipping_cost WHERE id = :id";
        $stmt = $this->cnx->prepare($query);
        $stmt->execute([
            'id' => $order->getId(),
            'customer_id' => $order->getCustomerId(),
            'order_date' => $order->getOrderDate(),
            'order_status' => $order->getOrderstatus(),
            'weigth' => $order->getWeigth(),
            'shipping_cost' => $order->getShippingCost()
        ]);
        return true;

    }
}




?>