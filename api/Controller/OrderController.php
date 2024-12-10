<?php 


require_once("Controller.php");
require_once("Repository/OrderRepository.php");

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
            $order = new Order($request->getParam('id'));
            $order->setCustomerId($request->getParam('customer_id'));
            $order->setOrderDate($request->getParam('order_date'));
            $order->setOrderStatus($request->getParam('order_status'));
            $order->setWeigth($request->getParam('weigth'));
            $order->setShippingCost($request->getParam('shipping_cost'));
            $this->orderRepository->save($order);
            return $order;
        }

        protected function processDeleteRequest(HttpRequest $request): ?array {
            $id = $request->getParam('id');
            $this->orderRepository->delete($id);
            return null;
        }

        protected function processPatchRequest(HttpRequest $request){
            $order = new Order($request->getParam('id'));
            $order->setCustomerId($request->getParam('customer_id'));
            $order->setOrderDate($request->getParam('order_date'));
            $order->setOrderStatus($request->getParam('order_status'));
            $order->setWeigth($request->getParam('weigth'));
            $order->setShippingCost($request->getParam('shipping_cost'));
            $this->orderRepository->update($order);
            return $order;
        }
    }

?>