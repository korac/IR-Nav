app.factory('toyService', ['$q', 'esFactory', '$location', function ($q, elasticsearch, $location) {
	var client = elasticsearch({
		host: $location.host() + ':9200'
	});

	/**
	* Given a term and an offset, load another round of 10 toys
	*/

	var search = function(term, offset){
		var deferred = $q.defer();
		var query = {
			match: {
				_all: term
			}
		};

		client.search({
			index: 'trial2',
			type: 'toyTypes',
			body: {
				size: 9,
				from: (offset || 0) * 9,
				query: query
			}
		}).then(function(result){
			console.log(result);
			var i = 0, hits_in, hits_out = [];

			hits_in = (result.hits || {}).hits || [];

			for(; i < hits_in.length; i++){
				hits_out.push(hits_in[i]._source);
			}

			deferred.resolve(hits_out);
		}, deferred.reject);

		return deferred.promise;
	};

	return{
		search: search
	};
}]);