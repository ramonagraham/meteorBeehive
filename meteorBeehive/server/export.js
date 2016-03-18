// Reference:  http://rafaelquintanilha.com/export-your-json-data-to-csv-format/

Meteor.methods({
	exportAllHives: function() {
		var fields = [
			"Hive Name",
			"Observation Date",
			"Duration",
			"Mite Count",
			"Creation Date"
		];

		var data = [];

		var observation = Observations.find().fetch();
		_.each(observation, function(o) {
			data.push([
				o.hiveName,
				o.observationDate,
				moment.utc(o.createdAt).format("DD/MM/YYYY"),
				o.duration,
				o.miteCount,
        o.createdOn
			]);
		});

		return {fields: fields, data: data};
	}

});
