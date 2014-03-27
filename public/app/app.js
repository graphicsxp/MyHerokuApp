var scotchTodo = angular.module('scotchTodo', ['ui.router', 'samdev.authentication']);

scotchTodo.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '',
            views: {
                '': {
                    templateUrl: 'app/views/home.html'
                }
            }
        })
}]);


scotchTodo.run(function ($http, $rootScope) {
    $http.get('/login')
        .success(function (data) {
            $rootScope.isAuthenticated = data.isAuthenticated;

            if ($rootScope.isAuthenticated) {
                $rootScope.user = data.user;
            }
        });
});

function mainController($scope, $http, $window) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function () {
        $http.post('/api/todos', $scope.formData)
            .success(function (data) {
                $('input').val('');
                $scope.todos = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function (id) {
        $http.delete('/api/todos/' + id)
            .success(function (data) {
                $scope.todos = data;
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}
