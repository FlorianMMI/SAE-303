<?php 


require_once("Controller.php");
require_once("Repository/ClientRepository.php");


    class ClientController extends Controller {
        public ClientRepository $ClientRepository;

        public function __construct(){
            $this->ClientRepository = new ClientRepository();
        }

        protected function processGetRequest(HttpRequest $request): ?array {
            $stat = $request->getParam("stat");
            if ($stat == "findorder") {
                $id = $request->getParam("id");
                if ($id == false) {
                    return null;
                }
                else {
                    
                    return $this->ClientRepository->findorder($id);
                }
                
            }
            else {
                return $this->ClientRepository->client();    
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