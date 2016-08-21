(function() {
	var LatteObject = require("../../m/data");
	var tableHtml = "<table><thead><tr>{{ths}}</tr></thead><tbody>{{trs}}</tbody></table>"
	this.after = function(data, dom, controller) {
		var table = dom.attr("latte-table");
		if(table) {
			var head = data.get("0");
			var ths = "<th>#</th>" + head.map(function(o) {
				return "<th>"+o+"</th>";
			}).join("");
			var trs = "";
			for(var i = 1, len = data.length; i < len; i++) {
				var row = data.get(i);
				trs += "<tr><th>"+i+"</th>"+row.map(function(o){
					return "<td>"+o+"</td>";
				}).join("")+"</tr>"
			}
			var html = latte_lib.format.templateStringFormat(tableHtml, {
				ths: ths,
				trs: trs
			});
			dom.html(html);
			console.log(html);
		}
	}
	require("latte_dom/utils/css.js").importCssString(require("./table.css"), "latte_table_css");
}).call(module.exports);