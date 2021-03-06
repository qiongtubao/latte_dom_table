
(function(define) {'use strict'
define("latte_dom/c/commands/table/auto/index.js", ["require", "exports", "module", "window"],
function(require, exports, module, window) {
(function(){
	var Controller = require("../../../controller.js");
	var latte_lib = require("latte_lib");
	var equal = latte_lib.object.equal;
	this.create = function(data, dom, controller) {
		var tableData = dom.attr("latte-table-data");
		var childNode = dom.children[0];
		if(childNode) {
			dom.removeChild(childNode);
			console.log(childNode.tagName);
			if(childNode.tagName == "TBODY") {
				//chrome上出现的问题 
				childNode = childNode.children[0];
			}
			
			
			
		}
		var createDom = function(d, od) {
			for(var i = 0, len = dom.children.length; i < len; i++) {
				var c = dom.children[0];
				Controller.remove(c);
				dom.removeChild(c);
			}
			//var htr = document.createElement("tr");
					var thead = document.createElement("thead");
					//thead.appendChild(htr);

					var tbody = document.createElement("tbody");
				var table = document.createElement("table");
				
				dom.appendChild(thead);
				dom.appendChild(tbody);
				
					var head = d.get("0");
					//设置head
						var hth = document.createElement("th");
						hth.innerHTML = "#";
					var htr = document.createElement("tr");
					htr.appendChild(hth); 
					head.forEach(function(o, index) {
						var th = document.createElement("th");
						th.setAttribute("latte-duplex", index);
						htr.appendChild(th);
					});
					thead.appendChild(htr);
					Controller.create(htr, head);
					var type = !!d.get("1").forEach;
				
					/**
						基于head  不变的前提下的处理
					*/
					var createChild = function(i) {
						if(childNode) {
							var cloneChild = childNode.cloneNode(true);
							
							//暂时 没有第几列
							return cloneChild;
						}else{
							var tr = document.createElement("tr");
							var th = document.createElement("th");
								th.innerHTML = i;
								tr.appendChild(th);
							head.forEach(function(o, index) {
								var th = document.createElement("th");
								if(type) {
									th.setAttribute("latte-duplex", index);
								}else{
									th.setAttribute("latte-duplex", o);
								}
								
								tr.appendChild(th);
							});
							return tr;
						}
						
					};

					//设置body
					
					for(var i = 1, len = d.length; i < len; i++) {
						var row = d.get(i);
						var tr = createChild(i);
						Controller.create(tr, row);
						tbody.appendChild(tr);
					}
					
				

					var spliceFunc = function(startIndex, removes, adds) {
						console.log(startIndex, removes, adds);
						if(startIndex < 1) {
							console.log("no run head");
							return;
						}
						var num = removes.length;

						for(var i = 0;i < num; i++) {
							var o = tbody.children[startIndex-1];
							tbody.removeChild(o);
							Controller.remove(o);
						}
						var afterDom = tbody.children[startIndex-1];
						var list = this;
						adds.forEach(function(add, index) {
							
							var tr = createChild(startIndex  + index);
							Controller.create(tr, add);
							
							if(afterDom) {
								tbody.insertBefore(tr, afterDom);
							}else{
								tbody.appendChild(tr);
							}
							
						});
						//重新排序
						for(var i = startIndex - num +adds.length, len =  tbody.children.length ; i < len; i++) {
							tbody.children[i].children[0].innerHTML = i+1;
						}
					};
					var setFunc = function(path, now, old) {
						if(path == 0) {
							return;
						}
						if(!equal(now ,old)) {
							//console.log(path, now, old);
							
							Controller.remove(tbody.children[path-1], old);
							
							Controller.create(tbody.children[path-1], now);
								//需要注意 添加多了一行或一列
							
							

							
							
						}
					};
					var Func0 = function(now, old) {
						Controller.remove(thead.children[0], old);
						Controller.remove(thead.children[0], now);

						//需要注意 添加多了一行或一列
						//如果object的话位置换了可能还会有其他问题
					}


				if(od) {
					od.off("splice", spliceFunc);
					od.off("set", setFunc);
					od.off("0", Func0);
				}
				//数组删除以及添加
				d.on("splice", spliceFunc);
				//数组修改
				d.on("set", setFunc);
				d.on('0', Func0);
		};
		createDom(data.get(tableData));
		controller.bind("data", tableData, createDom);
	}
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });
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
		var tableType = dom.attr("latte-table");
		if(tableType) {
			var tableHandle = require("./table/"+tableType+"/index.js");
			tableHandle.create(data, dom, controller);
		}
		/**
		var table = dom.attr("latte-table-data");

		if(table) {
			var child1 = view.children[0];
			view.removeChild(child1);
			var child2 = view.children[0];
			if(child2) {
				view.removeChild(child2);
			}else{
				child2 = child1;
			}
			var d = data.get(table);
			var createDom = function(data) {
				
				
						//var htr = document.createElement("tr");
					var thead = document.createElement("thead");
					//thead.appendChild(htr);

					var tbody = document.createElement("tbody");
				var table = document.createElement("table");
				
				table.appendChild(thead);
				table.appendChild(tbody);

				if(d.forEach) {
					var head = d.get("0");
					var cloneChild = child1.cloneNode(true);					
					thead.appendChild(cloneChild);
					Controller.create(cloneChild, head);
					
					for(var i = 1, len= d.length; i < len; i++) {
						//var tr = document.createElement("tr");
						var cc = child2.cloneNode(true);	
						tbody.appendChild(cc);
						Controller.create(cc, d.get(i));
					}
					
				}else{

				}
			}
			
		}
		*/
		/**
		if(table) {
			console.log(table);
			
			var d = data.get(table);
			var createDom = function(d) {
				console.log(d);
				if(d.length < 1) {
					return;
				} 
				var head = d.get("0");
				var ths = "<th>#</th>" + head.map(function(o) {
					return "<th>"+o+"</th>";
				}).join("");
				var trs = "";
				for(var i = 1, len = d.length; i < len; i++) {
					var row = d.get(i);
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
			createDom(d);
			controller.bind("data", table, function(now, old) {
				dom.innerHTML = "";
				createDom(now);
			});
		}
		*/

	}
	require("latte_dom/utils/css.js").importCssString(require("./table.css"), "latte_table_css");
}).call(module.exports);
});
})(typeof define === "function"? define: function(name, reqs, factory) { factory(require, exports, module); });