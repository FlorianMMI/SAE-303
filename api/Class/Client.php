<?php

class Client implements JsonSerializable {
    
    private int $id; 
    private string $firs_name; 
    private string $last_name ; 
    private string $email ; 
    private string $country ;
    private string $city;
    private float $lat;
    private float $lng; 


    public function __construct(int $id){
        $this->id = $id;
    }

    public function jsonSerialize() : array {
        return [
            'id' => $this->id,
            'firs_name' => $this->firs_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'country' => $this->country,
            'city' => $this->city,
            'lat' => $this->lat,
            'lng' => $this->lng
        ];
    }

    public function getId(): int {
        return $this->id;
    }

    public function getFirstName(): string {
        return $this->firs_name;
    }

    public function setFirstName(string $firs_name): void {
        $this->firs_name = $firs_name;
    }

    public function getLastName(): string {
        return $this->last_name;
    }

    public function setLastName(string $last_name): void {
        $this->last_name = $last_name;
    }

    public function getEmail(): string {
        return $this->email;
    }

    public function setEmail(string $email): void {
        $this->email = $email;
    }

    public function getCountry(): string {
        return $this->country;
    }

    public function setCountry(string $country): void {
        $this->country = $country;
    }

    public function getCity(): string {
        return $this->city;
    }

    public function setCity(string $city): void {
        $this->city = $city;
    }

    public function getLat(): float {
        return $this->lat;
    }

    public function setLat(float $lat): void {
        $this->lat = $lat;
    }

    public function getLng(): float {
        return $this->lng;
    }

    public function setLng(float $lng): void {
        $this->lng = $lng;
    }

    

    



}