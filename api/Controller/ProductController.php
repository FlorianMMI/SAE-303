<?php 


require_once("Controller.php");
require_once("Repository/ProductRepository.php");


    class ProductController extends Controller {
        public ProductRepository $productRepository;

        public function __construct(){
            $this->productRepository = new ProductRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            $stat = $request->getParam("stat");
            if ($stat == "stock") {
                return $this->productRepository->findlessstock();
            }
            if ($stat == "salesbyproduct") {
                $id = $request->getParam("id");
                if ($id == false) {
                    return null;
                }
                else {
                    
                    return $this->productRepository->salesbyproduct($id);
                }
                
            }
            if ($stat == "productbyname") {
                return $this->productRepository->productbyname();
            }
            if ($stat == "salesbycountry") {
                $month = $request->getParam("month");
                if ($month == false) {
                        return $this->productRepository->salesbycountry2();
                }
                else {
                    
                    return $this->productRepository->salesbycountry($month);
                }
                
                
            }
            if ($stat == "country") {
                return $this->productRepository->country();
            }
            else {
                return null;    
            }
            
            
        }

        protected function processPostRequest(HttpRequest $request): ?Order {
            return null;
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            return null;
        }
    }

?>