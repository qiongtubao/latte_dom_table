var latte_lib = latte.require("latte_lib");
  var latte_dom = latte.require("latte_dom");
  var pieData = latte_lib.object.create({

  })
  var data = {
      table:[
	      ["name","user_login","user_password"],
	      ["dong", "user", "password"],
        ["a", "b", "c"],
        ["d", "e", "f"]
      ],
      clickA:function() {
       
        this.get("table.1").set("0", "wokao");
        
      },
      clickB: function() {
        console.log(this.get("table").toJSON());
      },
      clickC: function() {
        this.set("table.1", ["fk", "wt", "ry"]);
      },
      clickD: function() {
        this.get("table").push(["fk", "wt", "ry"]);
      },
      clickE: function() {
        this.get("table").pop();
        this.get("table").push(["fk", "wt", "ry"]);
      },
      clickF: function() {
        this.get("table").splice(2, 1, ["o", "p", "q"],["x", "y", "z"],["sb", "sa", "sc"]);
      },
      clickG: function() {
        this.set("table", [
          ["a","b","c"],
          [1,2,3] 
        ])
      }

  };
  var demo = latte_dom.define("demo", data);