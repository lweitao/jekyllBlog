(function() {

    function buildParam(paramArr) {
        var paramObj = [];
        for(var i=0; i<paramArr.length; i++) {
            paramObj.push(paramArr[i].key + "=" + paramArr[i].value);
        }
        console.info(paramObj);
        return paramObj.join("&");
    }
    var requestObj = new Vue({
      el: '#requestObj',
      data: {
        btnTips: 'run',
        url: 'http://',
        paramBody: [],
        result: ''
      },
      created: function () {
        this.url = localStorage.getItem("url") || "http://";
        this.paramBody = JSON.parse(localStorage.getItem("paramBody")) || [];
      },
      http: {
           headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      },
      methods: {
        goRequest: function (event) {
            localStorage.setItem("url", this.url);
            localStorage.setItem("paramBody", JSON.stringify(this.paramBody));
            this.btnTips = "running..";
            this.$http.post(this.url, buildParam(this.paramBody)).then((response) => {
                this.result = response;
                this.btnTips = "run";
            }, (response) => {
                this.result = response;
                this.btnTips = "run";
            });
        },

        addParam: function() {
            this.paramBody.push({});
        },

        deleteParam: function(index) {
            this.paramBody.splice(index, 1);
        }
      }
    })
})()