(function ($) {
    $.fn.pagination = function (options) {
        options = options || {};

        var el = this;
        var settings = $.extend({
            maxBlockCount: 7,
            countPerPage: 20
        }, options);
        var totalCounty = 0;
        var currentPage = 1;
        var maxPagesCount = 1;


        function render() {
            var startPage = 1;
            var showPrevNext = false;
            var pagesCount = maxPagesCount;
            if (pagesCount > settings.maxBlockCount) {
                pagesCount = settings.maxBlockCount;
                showPrevNext = true;
            }
            var k = Math.ceil(settings.maxBlockCount / 2);
            if (currentPage > k) {
                if (currentPage + k > maxPagesCount ) {
                    startPage = maxPagesCount - pagesCount + 1;
                } else {
                    startPage = currentPage - k + 1;
                }
                // if (currentPage < pagesCount - k) {
                //     startPage = currentPage - k;
                // } else {
                //     startPage = pagesCount - settings.maxBlockCount;
                // }
            }

            el.empty();
            if (showPrevNext) {
                var previous = $('<li class="page-item"><a class="page-link" href="#">&laquo;</a></li>');
                previous.click(function () {
                    setPage(1);
                    return false;
                });
                el.append(previous);
            }

            for (var i = startPage; i < pagesCount + startPage; ++i) {

                var active = i == currentPage ? 'active' : '';
                var block = $('<li class="page-item ' + active + '" data-page="' + i + '"><a class="page-link" href="#">' + i + '</a></li>');
                block.click(function () {
                    setPage($(this).data('page'));
                    return false;
                });
                el.append(block);
            }

            if (showPrevNext) {
                var next = $('<li class="page-item"><a class="page-link" href="#">&raquo;</a></li>');
                next.click(function () {
                    setPage(maxPagesCount);
                    return false;
                });
                el.append(next);
            }
        }

        function setPage(page) {
            if (page > maxPagesCount) {
                page = maxPagesCount;
            }
            if (page < 1) {
                page = 1;
            }
            if (currentPage != page) {
                currentPage = page;
                render();
                el.trigger("change");
            }
        }

        el.setTotalCont = function(totalCountLocal) {
            totalCounty = totalCountLocal;
            maxPagesCount = Math.ceil(totalCounty / settings.countPerPage);
            currentPage = 1;
            render();
        };

        el.getCurrentPage = function() {
            return currentPage;
        };

        // el.trigger("change");

        return el;
    }
}(jQuery));