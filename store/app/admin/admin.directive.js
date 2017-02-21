(function(){

    angular
        .module('admin')
        .directive('uitheme', uitheme);

    function uitheme() {
        return {
            link: function(scope, element) {
                var LTE = $.AdminLTE,
                    opt = LTE.options;

                $('body').addClass('fixed sidebar-mini skin-red-light').removeClass('hold-transition');

                LTE.layout.activate();

                if (opt.enableControlTreeView) {
                    LTE.tree('.sidebar');
                }

                if (opt.enableControlSidebar) {
                    LTE.controlSidebar.activate();
                }

                if (opt.navbarMenuSlimscroll && typeof $.fn.slimscroll != 'undefined') {
                    $('.navbar .menu').slimscroll({
                        height: opt.navbarMenuHeight,
                        alwaysVisible: false,
                        size: opt.navbarMenuSlimscrollWidth
                    }).css("width", "100%");
                }

                if (opt.sidebarPushMenu) {
                    LTE.pushMenu.activate(opt.sidebarToggleSelector);
                }

                if (opt.enableBSToppltip) {
                    $('body').tooltip({
                        selector: opt.BSTooltipSelector,
                        container: 'body'
                    });
                }

                if (opt.enableBoxWidget) {
                    LTE.boxWidget.activate();
                }

                if (opt.enableFastclick && typeof FastClick != 'undefined') {
                    FastClick.attach(document.body);
                }

                if (opt.directChat.enable) {
                    $(document).on('click', opt.directChat.contactToggleSelector, function () {
                        var box = $(this).parents('.direct-chat').first();
                        box.toggleClass('direct-chat-contacts-open');
                    });
                }

                $('.btn-group[data-toggle="btn-toggle"]').each(function () {
                    var group = $(this);
                    
                    $(this).find(".btn").on('click', function (e) {
                        group.find(".btn.active").removeClass("active");
                        $(this).addClass("active");
                        e.preventDefault();
                    });

                });

            }
        };
    }

}());