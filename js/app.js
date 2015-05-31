(function($, win, background) {
    function render() {
        background.render();
        requestAnimationFrame(render);
    }

    $(win).ready(function() {
        $(win).scroll(function() {
            background.update();
        });
        background.init($('#stars'));
        render();
    });
})(this.jQuery, window, window.Background);
