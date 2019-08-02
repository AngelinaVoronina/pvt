'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('start', 'start.html', true),
            new Route('game', 'game.html'),
            new Route('rules', 'rules.html'),
            new Route('records', 'records.html')
        ]);
    }
    init();
}());
