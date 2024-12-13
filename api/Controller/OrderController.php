<?php 


require_once("Controller.php");
require_once("Repository/OrderRepository.php");
require_once("Repository/SaleRepository.php");

    class OrderController extends Controller {
        public OrderRepository $orderRepository;

        public function __construct(){
            $this->orderRepository = new OrderRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            $id = $request->getId("id");
            $order_status = $request->getParam("countorderstatus");
            $stat = $request->getParam("stat");
            if ($stat == "sale") {
                return $this->orderRepository->getTopSellingProducts();
            }
            if ($stat == "sale6month") {
                return $this->orderRepository->sales6month();
            }
            if ($stat == "sale6monthbycat") {
                return $this->orderRepository->sales6monthbycat();
            }
            if ($stat == "month"){
                return $this->orderRepository->month();
            }
            if ($id) {
                return $this->orderRepository->find($id);
            }
            if ($order_status) {
                return $this->orderRepository->countbyorderstatut($order_status);
            }
            else {
                return $this->orderRepository->findAll();
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