let Model=function(XMLHTTPRequest) {
    this.XMLHttpRequest=XMLHTTPRequest;
};

Model.prototype.getPage = function (index, fn) {
    let request = new this.XMLHttpRequest();
    request.onload = function (e) {
        let ajaxResponse = " "; // наш html код
        let page=ajaxResponse(index);
        page.index=index;
        page.count = ajaxResponse.length;
        fn(page);
    };

    request.open("GET", "", true);
    request.send();
};

let View = function (element) {
    this.element = element;
    this.onclickGet = null;
};

View.prototype.render = function (viewModel) {
    this.element.innerHTML = " ";

};

