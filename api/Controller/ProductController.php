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