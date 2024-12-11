<?php

class Product implements JsonSerializable {
    
    private int $id; // id de la categorie
    private string $product_name; // nom du produit 
    private string $category ; // nom de la categeorie
    private float $price ; // prix du produit
    private int $quantity ; // quantité du produit
    private int $stock; // stock du produit


    public function __construct(int $id){
        $this->id = $id;
    }

    public function jsonSerialize() : array {
        return [
            'id' => $this->id,
            'product_name' => $this->product_name,
            'category' => $this->category,
            'price' => $this->price,
            'quantity' => $this->quantity,
            'stock' => $this->stock
        ];
    }

    public function getId(): int {
        return $this->id;
    }

    public function getProductName(): string {
        return $this->product_name;
    }

    public function setProductName(string $product_name): void {
        $this->product_name = $product_name;
    }

    public function getCategory(): string {
        return $this->category;
    }

    public function setCategory(string $category): void {
        $this->category = $category;
    }

    public function getPrice(): float {
        return $this->price;
    }

    public function setPrice(float $price): void {
        $this->price = $price;
    }

    public function getQuantity(): int {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void {
        $this->quantity = $quantity;
    }

    public function getStock(): int {
        return $this->stock;
    }

    public function setStock(int $stock): void {
        $this->stock = $stock;
    }



    



}