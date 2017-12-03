path = window.location.origin + "/Umesh/angular-project/js/";
//alert(path);
appname = angular.module("eshoper",["ngRoute"]);
//console.log(appname);
appname.config(function($routeProvider){
	//console.log($routeProvider);
	$routeProvider
	.when("/",{
		template: "Home Page",
		controller: "homeCtr"
	})
	.when("/login",{
		template: "Login Page",
		controller: "loginCtr"
	})
	.when("/cart",{
		templateUrl: "cart_page.html",
		controller: "cartCtr"
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
	/*************Cart****************/
	$scope.add_to_cart = function(pid){
		alert(pid);
		if(!localStorage.products){
			localStorage.products = pid;
			alert("Product Added");
		}
		else{
			oldid = localStorage.products;
			//alert(oldid);
			//chk product exist or not
			arr = localStorage.products.split(",");
			console.log(arr);
			pos = arr.indexOf(pid.toString());
			console.log(pos);
			if(pos > -1){
				alert("Product Exist");
			}
			else{
				newid = localStorage.products + "," + pid;
				localStorage.products = newid;
				alert("Product Added");
				console.log(newid);
			}
		}
		cnt = localStorage.products.split(",").length;
		$rootScope.cart_count = cnt;
	}
});
appname.run(function($rootScope){
	$rootScope.label = ["Brand Name", "Category Name"];

	$rootScope.slider_div = true;
	$rootScope.maincontent_div = true;

	if(!localStorage.products){
		$rootScope.cart_count = 0;
	}
	else{
		cnt = localStorage.products.split(",").length;
		$rootScope.cart_count = cnt;
	}
});
appname.controller("cartCtr",function($scope,$http,$rootScope){
	$rootScope.slider_div = false;
	$rootScope.maincontent_div = false;

	$http.get(path+"product.json").then(function(res){
		//console.log("Found");
		//$scope.result = res.data;
		//console.log(res.data);
		//console.log(localStorage.products);
		loc_pro_id = localStorage.products.split(",");
		//console.log(loc_pro_id);
		finalArr = [];
		angular.forEach(res.data,function(output){
			//console.log(output);
			//console.log(output.id);
			pos = loc_pro_id.indexOf(output.id.toString());
			console.log(pos);

			if(pos != -1){
				finalArr.push(output);
				//console.log(finalArr);
			}
		})
		$scope.result = finalArr;

	},function(err){
		console.log("Not Found");
	});
});
appname.controller("homeCtr",function($scope,$http,$rootScope){
	$rootScope.slider_div = true;
	$rootScope.maincontent_div = true;
});
appname.controller("loginCtr",function($scope,$http,$rootScope){
	$rootScope.slider_div = false;
	$rootScope.maincontent_div = false;
});