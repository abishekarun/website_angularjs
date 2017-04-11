(function(){

var demoApp=angular.module('demoApp',['ngRoute','ionic.utils','ngAnimate']);

demoApp.config(function ($routeProvider){
	$routeProvider
	.when('/index',
	{
		controller:'PinController',
		templateUrl:'Partials/index.html'
		})
	.when('/login',
	{
		controller:'LoginController',
		templateUrl:'Partials/login.html'
		})
	.when('/register',
	{
		controller:'RegisterController',
		templateUrl:'Partials/register.html'
		})
	.when('/index1',
	{
		controller:'PinController',
		templateUrl:'Partials/index1.html'
		})
	.when('/index2',
	{
		controller:'PinController',
		templateUrl:'Partials/index2.html'
		})
	.when('/index3',
	{
		controller:'VendorController',
		templateUrl:'Partials/index3.html'
		})
	.when('/cart',
	{
		controller:'CartController',
		templateUrl:'Partials/cart.html'
		})
	.when('/getItems/:vendor_id',
	{
		controller:'ItemsController',
		templateUrl:'Partials/getItems.html'
		})
	.when('/getItems/:vendor_id/:id',
	{
		controller:'ItemsController',
		templateUrl:'Partials/getItems.html'
		})
	.otherwise({ redirectTo:'/index'});

});
demoApp.factory('UserService', function() {
    var userService = {};

    userService.pin =600036;
    userService.email='aqel@gmail.com';
    userService.flag=false;
    userService.ChangeName = function (value) {

       userService.pin = value;
    };
	userService.ChangeEmail = function (value) {

       userService.email = value;
    };
    return userService;
});

demoApp.controller('PinController',['$scope','$location','$http','$localstorage','UserService', function($scope, $location,$http,$localstorage,UserService){
	
	var availPins = [600036, 673638];
	
	$scope.update=function()
	{
		var isTrue = false;
		UserService.ChangeName($scope.pin);
		var x=$localstorage.get('total');
		for (var i=x;i>0;i--){
			$localstorage.clear('names'+i);	
			$localstorage.clear('count'+i);
		}
		
		$localstorage.set('total',0);
		for (var i = availPins.length - 1; i >= 0; i--) {
			if (availPins[i] == $scope.pin){

				isTrue = true;
			}
		};
	
		if (isTrue){
			$location.path('/'+'index3');
		}else{
			$location.path('/'+'index1');		
		}
	};

	$scope.pass=function()
	{
		UserService.ChangeEmail($scope.email);
		
	}

	$scope.check=function()
	{
		$location.path('/'+'index2');
		
	}
	$scope.register=function()
	{
		total=UserService.pin;
		var req = 
		{  	 method: 'POST',
			 url: 'api/getEmail.php', 
			 headers: { 'Content-Type':'application/x-www-form-urlencoded' },
			 data: $.param({ pin: UserService.pin , email: UserService.email }),
		 } 
		
		 $http(req)
		 .success(
		 	function(response){
		 		
		 	})
		 .error(
		 	function(response){
		 		
		 	});
		 $scope.check();
	}

	$scope.getPin=function()
	{
		return UserService.pin;
	}
	$scope.getEmail=function()
	{
		return UserService.email;
	}
	
}]);

demoApp.controller('VendorController',['$scope','$location','$http','UserService', function($scope, $location,$http,UserService){
function myFunc(){
			var toBeSendData = $.param({pin : UserService.pin });
				$http({
		    		method: 'POST', 
		    		url: 'api/getMyVendors.php',
		    		data:  toBeSendData,
		    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).
			  	success(function(response) {
		    		$scope.vendors = response.data;
		    		UserService.vendor_id=response.data.vendor_id;
		    		return response;
		  		}).
		 		error(function(response) {
		  		});
		};

		$scope.vendors = myFunc();
}]);

demoApp.controller('ItemsController',['$scope','$http','$localstorage','UserService','$routeParams', function($scope,$http,$localstorage,UserService,$routeParams)
{	
	if(UserService.name){
		$scope.first_name=UserService.name;
		UserService.flag=true;
	}
	else{
		UserService.flag=false;
	}
	
	$scope.getFlag=function(){
		return UserService.flag;
	}
	$scope.vendor_id=$routeParams.vendor_id;
	UserService.id=$scope.vendor_id;
	function myFunc()
	{		
			
			if($routeParams.id)
			{
				var toBeSendData = $.param({vendor_id : $routeParams.vendor_id,sub_category: $routeParams.id });
			}
			else
			{
				var toBeSendData = $.param({vendor_id : $routeParams.vendor_id });
			}
				$http({
		    		method: 'POST', 
		    		url: 'api/getItems.php',
		    		data:  toBeSendData,
		    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).
			  	success(function(response) {
		    		$scope.items = response.data;
		    		return response;
		  		}).
		 		error(function(response) {
		  		});
	};

		$scope.items = myFunc();
		var total=$localstorage.get('total');
		$scope.name='';
		$scope.update=function(value)
		{	
			var $temp=true;
			value.flag=true;
			$scope.name=value.name;
			var total= $localstorage.get('total');
			for (var i =1; i< total+1; i++) {
				if(value.name == $localstorage.get('names'+i))
				{	
					$temp=false;
					var update=$localstorage.get('count'+i);
					++update;
					$localstorage.set('count'+i,update);
					$scope.count=$localstorage.get('count'+i);
				}
			}
			if($temp)
				{	
					++total;
					$localstorage.set('names'+total,value.name);
					$localstorage.set('count'+total,1);
					$scope.count=$localstorage.get('count'+total);
				}
			$localstorage.set('total',total);
		}
}]);

demoApp.directive('demoDirective', function() {
    return {
      template: '<div>{{name}}  {{count}} </div>',
      replace: true,
	}
});
demoApp.controller('RegisterController',['$scope','$http','UserService','$routeParams', function($scope,$http,UserService,$routeParams)
{	
	$scope.vendor_id=UserService.id;
	$scope.newuser = function (user)
	{
				user.pin=UserService.pin;
				var toBeSendData = $.param(user);
				$http({
		    		method: 'POST', 
		    		url: 'api/createuser.php',
		    		data:  toBeSendData,
		    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).
			  	success(function(response) {
		    		$scope.items = response.data;
		    		console.log("success");
		    		return response;
		  		}).
		 		error(function(response) {
		  		});
	};

}]);

demoApp.controller('LoginController',['$scope','$location','$http','UserService','$routeParams', function($scope,$location,$http,UserService,$routeParams)
{	
	$scope.vendor_id=UserService.id;
	$scope.login = function (user)
	{
				var toBeSendData = $.param(user);
				$http({
		    		method: 'POST', 
		    		url: 'api/login.php',
		    		data:  toBeSendData,
		    		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			    }).
			  	success(function(response) {
		    		
		    		if(response.status == 2){
		    			$location.path('/'+'register');
		    		}
		    		else if(response.status == 3){
		    			$location.path('/'+'login');
		    		}
		    		else
		    		{
		    			UserService.name=response.data.first_name;
		    			$location.path('/'+'index3');	
		    		}
		    		return response;
		  		}).
		 		error(function(response) {
		  		});
	};

}]);

demoApp.controller('CartController',['$scope','$http','$localstorage','UserService','$routeParams', function($scope,$http,$localstorage,UserService,$routeParams)
{	
		var total=$localstorage.get('total');
		$scope.cart=[];
		for(var i=1;i < total+1 ; i++)
		{
			$scope.cart.push(
			{	
				items:$localstorage.get('names'+i),
				count:$localstorage.get('count'+i)
			});
		}
		$scope.reduce=function(index){
			$scope.cart[index].count=$scope.cart[index].count-1;
		}
		$scope.remove=function(index)
		{
			var i= index+1;
			$localstorage.clear('names'+i);
			$localstorage.clear('count'+i);
			var a=$localstorage.get('total');
			--a;
			$localstorage.set('total',a);
			$scope.cart.splice(index,1);
		}
}]);
})();

angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key) {
      return $window.localStorage[key];
    },
    clear:function(key){
    	delete $window.localStorage[key];
    },
  }
}]);