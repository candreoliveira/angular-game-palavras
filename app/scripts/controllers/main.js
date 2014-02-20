'use strict';

angular.module('writewordsApp')
		.controller('MainCtrl', function ($scope) {
				var index,
					usedIndexes = [],
					wordList = [
					'Agulha',
					'Anel',
					'Anzol'
				],
				maxIndex = wordList.length;
				$scope.wordName = '';
				$scope.wordNameNormalized = '';
				$scope.response = [];
				$scope.responseOne = '';
				$scope.win = false;
				$scope.endGame = false;
				$scope.score = 0;
				
				// Returns a random number between min and max
				function getRandomArbitrary(min, max) {
					return Math.random() * (max - min) + min;
				}
				$scope.checkLetter = function(e){
					var letter = $scope.wordName.split('');
					console.log($scope.response[e.$index].letter, letter[e.$index])
					if($scope.response[e.$index].letter.toLowerCase() !== letter[e.$index].toLowerCase()){
						$scope.response[e.$index].letter = '';
					}
					$scope.checkWord();
				};
				$scope.changeWord = function(){
					$scope.wordName = wordList[index];
					$scope.win = false;
					$scope.responseOne = '';
					$scope.response = [];
					for(var i = 0, l = $scope.wordName.length; i<l; i++ ){
						$scope.response.push({letter:''});
					}
					$scope.wordNameNormalized = $scope.wordName.toLowerCase();
				};
				$scope.checkWord = function(){
					var response = '';
					if($scope.responseOne){
						response = $scope.responseOne;
					}else{
						for(var i = 0, l = $scope.wordName.length; i<l; i++ ){
							response += $scope.response[i].letter;
						}
					}
					$scope.win = ($scope.wordName.toLowerCase() === response.toLowerCase());
					if(!!$scope.win){
						$scope.nextWord();
					}
				};
				$scope.nextWord = function(force){
					var newIndex,
						tried = [];
					if(!force && !$scope.win){
						return false;
					}
					//nao existe como utilizado, adiciona
					if(usedIndexes.indexOf(index) < 0){
						usedIndexes.push(index);
					}
					//busca valor nao utilizado
					while(usedIndexes.indexOf(newIndex) >= 0 && tried.length <= maxIndex){
						tried.push(newIndex);
						newIndex = Math.floor(getRandomArbitrary(0, maxIndex));
					}
					index = newIndex;
					// atualiza score
					$scope.score = usedIndexes.length -1;
					// verifica se nao existe mais alternativas e finaliza o jogo
					if(tried.length > maxIndex){
						$scope.endGame = true;
					}else{
						$scope.changeWord();
					}
				};
				$scope.nextWord(true);
			});
