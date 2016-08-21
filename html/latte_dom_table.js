
(function(define) {'use strict'
	define("latte_dom/c/commands/table.css", ["require", "exports", "module", "window"],
 	function(require, exports, module, window) {
 		module.exports='table {    border-spacing: 0;    border-collapse: collapse;}td,th {	padding: 0;}th {	text-align: left;}table>caption+thead>tr:first-child>th {	border-top: : 0;}.table {    width: 100%;    max-width: 100%;    margin-bottom: 20px;}.table>tbody>tr>td,.table>tbody>tr>th, .table>thead>tr>th {	padding: 8px;	line-height: 1.42857143;	vertical-align: top;	border-top: 1px solid;}.table>thead >tr>th {		vertical-align: bottom;	border-bottom: 2px solid #ddd;}.table-bordered {    border: 1px solid #ddd;}.table-bordered>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {    border: 1px solid #ddd;}.table-striped>tbody>tr:nth-of-type(odd) {    background-color: #f9f9f9;}'
 	});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
(function(define) {'use strict'
define("latte_dom/c/commands/table.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
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
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });