<?php 


require_once("Controller.php");
require_once("Repository/SaleRepository.php");

    class SaleController extends Controller {
        public SaleRepository $saleRepository;

        public function __construct(){
            $this->saleRepository = new SaleRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
                return $this->saleRepository->sales6month();

        }

        protected function processPostRequest(HttpRequest $request): ?array {
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