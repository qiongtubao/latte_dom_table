var latte_lib = latte.require("latte_lib");
  var latte_dom = latte.require("latte_dom");
  var pieData = latte_lib.object.create({

  })
  var data = {
      table:[
	      ["name","user_login","user_password"],
	      ["dong", "user", "password"]
      ],
      click:function() {
       
        console.log(this.get("table"));
        
      }

  };
  var demo = latte_dom.define("demo", data);