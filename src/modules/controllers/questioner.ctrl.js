'use strict';

QuestionerController.$inject = ['$rootScope', '$state', '$scope','$http'];
function QuestionerController($rootScope, $state, $scope, $http){
  var vm      = this;
  vm.hide     = true;
  vm.listResults = listResults;

  function listResults(){
    $http.get('http://localhost:3000/api/v1/list_data')
    .success(function(res){
      console.info('response ',res);
      vm.results = res;
      // vm.table = _.forEach(vm.results,function(r, ir){
      //     console.info('load results',r);
      //     var group = _.groupBy(r, function(res){
      //       return res.name;
      //     },'name');
      //     var name = r.name;
      //     console.info('load group',group);
      //   _.forEach(r.answer, function(a, ia){
      //     if(name == a.user){
      //       // console.info('load answer',a);
      //       // console.info('load kategori',a.kategori);
      //     }
      //   })
      // })
      var kategori = [];
      for(var i=0, j=0;i<res.length;i++,j=10){
        for(var j=0; j<20; j++){
          for(var k=0; k<10; k++){
          var name = res[i].answer[j].kategori[k].name;
          var value = res[i].answer[j].kategori[k].value;
          kategori.push({name:name, value:value});
          }
        }
      }

      var kategoriGroup = _.groupBy(kategori,'name');
      vm.kategori = _.keysIn(kategoriGroup);
    })
    .error(function(err,status) {
      console.info('error');
    });
  }

  (function(){
    listResults();
  })();

}

module.exports = QuestionerController;

