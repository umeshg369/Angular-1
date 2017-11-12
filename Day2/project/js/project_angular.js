path = window.location.origin + "/angular1/Day2/project/js/";
//alert(path);
appname = angular.module("eshoper",[]);
appname.controller("brandCtr",function($scope,$http){
	$http.get(path+"brand.json").then(function(res){
		//console.log("Found");
		$scope.brand = res.data;
		//console.log(res.data);
	},function(err){
		//console.log("Not Found");
	});
});
appname.run(function($rootScope){
	console.log($rootScope);
	$rootScope.name = ["Category","Brands","Price Range"];
});