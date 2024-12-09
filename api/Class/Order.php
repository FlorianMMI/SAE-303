<?php

class Order implements JsonSerializable {
    private int $id; // id de la categorie
    private int $customer_id; // nom de la categeorie
    private string $order_date; // date de la commande
    private string $order_status; // statut de la commande
    private string $weigth; // poids de la commande
    private string $shipping_cost; // cout de la livraison


    public function __construct(int $id){
        $this->id = $id;
    }

    public function jsonSerialize() : array {
        return [
            'id' => $this->id,
            'customer_id' => $this->customer_id,
            'order_date' => $this->order_date,
            'order_status' => $this->order_status,
            'weigth' => $this->weigth,
            'shipping_cost' => $this->shipping_cost
        ];
    }

    public function getId(): int {
        return $this->id;
    }

    public function getCustomerId(): int {
        return $this->customer_id;
    }

    public function setCustomerId(int $customer_id): void {
        $this->customer_id = $customer_id;
    }

    public function getOrderDate(): string {
        return $this->order_date;
    }

    public function setOrderDate(string $order_date): void {
        $this->order_date = $order_date;
    }

    public function getOrderStatus(): string {
        return $this->order_status;
    }

    public function setOrderStatus(string $order_status): void {
        $this->order_status = $order_status;
    }

    public function getWeigth(): string {
        return $this->weigth;
    }

    public function setWeigth(string $weigth): void {
        $this->weigth = $weigth;
    }

    public function getShippingCost(): string {
        return $this->shipping_cost;
    }

    public function setShippingCost(string $shipping_cost): void {
        $this->shipping_cost = $shipping_cost;
    }



}