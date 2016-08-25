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