angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope, $cordovaBarcodeScanner) {

        var publicKey = "TEST-ad365c37-8012-4014-84f5-6c895b3f8e0a";
        var prefId = "176234066-fc6d5d5e-2671-4073-ab49-362a98b720b5";

        /**
         *
         */
        $scope.startCheckout = function () {

            // Espera los resultados del checkout
            var success = function (payment) {
                if (payment != null) {
                    // Listo! El pago ya fue procesado por MP.
                    console.log(JSON.parse(payment).id);
                } else {
                    alert("El usuario no concretó el pago.");
                }
            };
            var failure = function (error) {
                // Error llamando a MercadoPago Plugin
                console.log("Error MercadoPagoPlugin : " + error);
            };

            // Iniciar el checkout de MercadoPago
            MercadoPago.startCheckout(publicKey, prefId, null, false, success, failure);
        };


        /**
         *
         */
        $scope.scanBarcode = function () {
            document.addEventListener("deviceready", function () {

                $cordovaBarcodeScanner
                    .scan()
                    .then(function (barcodeData) {
                        console.log(barcodeData);
                    }, function (error) {
                        // An error occurred
                        console.log(error);

                    });

            }, false);
        };


    }).controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
