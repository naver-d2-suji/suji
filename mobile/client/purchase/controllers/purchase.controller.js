angular.module("suji").controller("purchaseCtrl", ['$scope', '$meteor',
    function($scope, $meteor) {
        $scope.now = new Date();

        $scope.sort = {
            time: -1
        };

        $meteor.autorun($scope, function() {
            $meteor.subscribe('purchase', {}).then(function() {
                console.log('Got purchase');
            });
        });

        $scope.purchaseList = $meteor.collection(function() {
            return Purchase.find({}, {
                sort: $scope.getReactively('sort')
            });
        });

        $scope.receiptModal = (item) => {
            var totalCnt = 0,
                totalPrice = 0;
            var str = '<style>th{text-align: center}</style><table class="table" style="text-align: center">';
            str += '<thead><tr><th>Name</th><th>Quantity</th><th>Total Price</th></tr></thead>';
            for (var i = 0; i < item.sale.length; i++) {
                str += '<tr><td>' + item.sale[i].itemId + '</td><td>' + item.sale[i].orderedItemCnt + '</td><td>' + item.sale[i].totalPrice + '</td></tr>';
                totalCnt += item.sale[i].orderedItemCnt;
                totalPrice += item.sale[i].totalPrice;
            }
            str += '<tr><td>TOTAL</td><td>' + totalCnt + '</td><td>' + totalPrice + '</td></tr></table>';
            bootbox.dialog({
                title: "Receipt",
                message: str,
                buttons: {
                    success: {
                        label: "OK",
                        className: "btn-success"
                    }
                }
            });
        };

        $scope.removeItem = (item) => {
            Purchase.remove({
                _id: item._id
            });
        };

        //Sort
        $scope.sortType     = 'time'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';     // set the default search/filter term
    }
]);
