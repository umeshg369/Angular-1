/*** Modify path url as pe your folder structure ***/
path = window.location.origin + "/Umesh/Angular-1/Day2/project/js/"; 
//alert(path);
appname = angular.module("eshoper",["ngRoute"]);
//console.log(appname);
appname.config(function($routeProvider){
	//console.log($routeProvider);
	$routeProvider
	.when("/login",{
		template: "<h1>Login Page</h1>"
	})
	.when("/cart",{
		template: "<h1>Cart Page</h1>"
	})
	.when("/",{
		template: "<h1>Home Page</h1>"
	})
	.otherwise({
		template: "<h1>404 Page</h1>"
	})
});

appname.controller("brandCtr",function($scope,$http,$rootScope){
	$http.get(path+"brand.json").then(function(res){
		//console.log("Found");
		$scope.brand = res.data;
		//console.log(res.data);
	},function(err){
		//console.log("Not Found");
	});
	$scope.filter_brand_data = function(bid){
		//alert(bid);
		$rootScope.$broadcast("brdata", bid);
	}
});
appname.controller("categoryCtr",function($scope,$http,$rootScope){
	$http.get(path+"category.json").then(function(res){
		//console.log("Found");
		$scope.result = res.data;
		//console.log(res.data);
	},function(err){
		console.log("Not Found");
	});
	$scope.filter_cat_data = function(cid){
		//alert(cid);
		$rootScope.$broadcast("catdata", cid);
	}
});
appname.controller("productCtr",function($scope,$http,$rootScope){
	$http.get(path+"product.json").then(function(res){
		//console.log("Found");
		$scope.result = res.data;
		//console.log(res.data);
	},function(err){
		console.log("Not Found");
	});
	$rootScope.$on("catdata",function(e,r){
		//console.log(r);
		//filterL{brndid:2}
		$scope.final_filter_data = {catid:r}
	});
	$rootScope.$on("brdata",function(e,r){
		//console.log(r);
		//filterL{brndid:2}
		$scope.final_filter_data = {brandid:r}
	});
});