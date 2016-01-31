app.controller("toyCont", ['toyService', '$scope', '$location' ,function(toys, $scope, $location){

	//Initializing the scope defaults
	$scope.toys = [];
	$scope.page = 0;
	$scope.allResults = true;

	$scope.showResults = false;

	//The search - triggered when the button is clicked and query is sent
	$scope.search = function(term){
		$scope.page = 0;
		$scope.toys = [];
		$scope.allResults = false;
		$scope.searchTerm = term;
		console.log($scope.searchTerm);
		$location.search({'q': $scope.searchTerm});
		$scope.loadMore();
	};

	//Loading the results
	$scope.loadMore = function(){
		toys.search($scope.searchTerm, $scope.page++).then(function(results){
			if(results.length !== 9){
				$scope.allResults = true;
			}

			for(var i = 0; i < results.length; i++){
				if(results[i].price){
					console.log(results[i].price);
					results[i].price = results[i].price.replace(/,/g, '.');	
				}else{
					results[i].price = 0;
				}
				
				$scope.toys.push(results[i]);
			}
			console.log($scope.toys);
			console.log(results);
		});
	};

	//Load the results on the first run
	//$scope.loadMore();
}]);