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