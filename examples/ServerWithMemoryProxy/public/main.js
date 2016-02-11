/*jslint node: true */
"use strict";

var ko = require("knockout");

var createProxy = require("../../../src/proxy/rest");
var createModel = require("../../../src/model/model");
var createStore = require("../../../src/store/store");

var proxy = createProxy({
	idProperty: "id",
	route: "/user"
});
var model = createModel({
	fields: {
		id: {
			type: "number"
		},
		email: {
			type: "string"
		},
		name: {
			type: "string"
		},
		title: {
			type: "string"
		}
	},
	proxy: proxy
});
var store = createStore({
	model: model
});

//*
//seed
//atom
var seed = true;
function handleResponse(err, result) {
	//console.log(err, result);
}
if (seed) {
	var names = ["Bob", "Rob", "Olga", "Helga"];
	var titles = ["CEO", "CTO", "Slave"];
	for (var idx = 0; idx < 100; idx += 1) {
		var actName = names[idx % 4];
		store.add({
			id: idx,
			email: actName.toLowerCase() + "_" + idx + "@supercorp.com",
			name: actName,
			title: titles[idx % 3]
		}, handleResponse);
	}
}
//*/


var createInfiniteLoader = require("../../../src/ko-components/lists/infiniteList.js");
var createPagedList = require("../../../src/ko-components/lists/pagedList.js");

ko.components.register("paged-list", {
	viewModel: {
		createViewModel: function(params, componentInfo) {
			return createPagedList(params);
		}
	},
	template: require("../../../src/ko-components/lists/pagedList.html")
});


/*
var list = createInfiniteLoader({
	store: store,

	fields: ["id", "email", "name", "title"],

	labels: {
		email: "E-mail",
		name: "Név",
		title: "Beosztás"
	},

	sorters: {
		id: 1,
		email: 0,
		name: 0
	},

	numOfItems: 10,
	numOfItemsToLoad: 10
});
//*/

var pagedListConfig = {
	store: store,

	fields: ["id", "email", "name", "title"],

	labels: {
		email: "E-mail",
		name: "Name",
		title: "Very title"
	},

	filters: {
		name: "regex"
	},

	sorters: {
		id: 1,
		email: 0
	},

	pagination: {
		currentPage: 0,
		itemsPerPage: 5,

		afterHead: 1,
		beforeTail: 1,
		afterCurrent: 1,
		beforeCurrent: 1
	}
};

/*
var list = createPagedList(pagedListConfig);
//*/


ko.applyBindings(pagedListConfig);

