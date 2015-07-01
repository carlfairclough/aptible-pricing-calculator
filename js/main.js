// An object to define utility functions and global variables on:
$.glob = new Object(); 
// An object to define internal stuff for the plugin:
$.glob.price = new Object();
$.glob.price.con = 5;
$.glob.price.dis = 7;
$.glob.price.dom = 11;
$.glob.price.base = 499;

// Platform account included
$.glob.inc = new Object();
$.glob.inc.con = 5;
$.glob.inc.dis = 4;
$.glob.inc.dom = 5;

// defaults
$.glob.slide = new Object();
$.glob.slide.con = 1;
$.glob.slide.dis = 3;
$.glob.slide.dom = 1;
$.glob.phi = false;

$.glob.plan = 'development';

// First of all, lets generate the sliders
$(function() {


    $( "#container-slider" ).slider({
        min: 1,
        max: 11,
        value: $.glob.slide.con,
        step: 1,
        animate: "slow",
        slide: function( event, ui ) {

            $.glob.slide.con = ui.value;
            updateKey('.containers-keys', ui.value);
            writeValAttr('#container-slider', ui.value);
            updatePrice(ui.value, $.glob.slide.dis, $.glob.slide.dom);
            blueBar(ui.value, $.glob.slide.dis, $.glob.slide.dom);

        }
    });

    $( "#disk-slider" ).slider({
        min: 1,
        max: 11,
        value: $.glob.slide.dis,
        step: 1,
        animate: "slow",
        slide: function( event, ui ) {
            
            $.glob.slide.dis = ui.value;
            updateKey('.disk-key', ui.value);
            writeValAttr('#disk-slider', ui.value);
            updatePrice($.glob.slide.con, ui.value, $.glob.slide.dom);
            blueBar($.glob.slide.con, ui.value, $.glob.slide.dom);

        }
    });

    $( "#domain-slider" ).slider({
        min: 1,
        max: 11,
        value: 1,
        step: 1,
        animate: "slow",
        slide: function( event, ui ) {

            $.glob.slide.dom = ui.value;
            updateKey('.domains-key', ui.value);
            writeValAttr('#domain-slider', ui.value);
            updatePrice($.glob.slide.con, $.glob.slide.dis, ui.value);
            blueBar($.glob.slide.con, $.glob.slide.dis, ui.value);

        }
    });
});


function blueBar(con, dis, dom) {
    var contBlueWid = (con - 1) * 10 + '%';
    var disBlueWid = (dis - 1) * 10 + '%';
    var domBlueWid = (dom - 1) * 10 + '%';

    if (!$('.bluebar').length) {
        $('.container-slider').prepend('<div class="bluebar" style="width:' + contBlueWid +'"></div>')
        $('.disk-slider').prepend('<div class="bluebar" style="width:' + disBlueWid +'"></div>');
        $('.domain-slider').prepend('<div class="bluebar" style="width:' + domBlueWid +'"></div>');
    } else {
        $('.container-slider .bluebar').width(contBlueWid);
        $('.disk-slider .bluebar').width(disBlueWid);
        $('.domain-slider .bluebar').width(domBlueWid);
    }
}


// Write the value of the slider as an attribute, only on
// USER change. This means we can revert in certain
// situations.
function writeValAttr(id, val) {
    $(id).attr('userval', val);
}

// Trigger things when
// PHI is changed
function PHIchange() {

    if ($('.phi-checkbox').is(':checked')) {


        $.glob.phi = true;
        
        $('.included').removeClass('hidden');

        // Move the container slider
        if ($('#container-slider').slider('option', 'value') < $.glob.inc.con) {
            $('#container-slider').slider('value', $.glob.inc.con);
            updateKey('.containers-keys', $.glob.inc.con);
            $.glob.slide.con = $.glob.inc.con;
        }

        // Move the disk slider
        if ($('#disk-slider').slider('option', 'value') < $.glob.inc.dis) {
            $('#disk-slider').slider('value', $.glob.inc.dis);
            updateKey('.disk-key', $.glob.inc.dis);
            $.glob.slide.dis = $.glob.inc.dis;
        }

        // Move the domains slider
        if ($('#domain-slider').slider('option', 'value') < $.glob.inc.dom) {
            $('#domain-slider').slider('value', $.glob.inc.dom);
            updateKey('.domains-key', $.glob.inc.dom);
            $.glob.slide.dom = $.glob.inc.dom;
        }

        updatePrice($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);
        blueBar($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);

        $.glob.plan = 'platform';

    } else {
        // Reverting back to non-PHI, undoing any changes made

        // hide full-service compliance option WITH animation
        $('.included').addClass('hidden');

        if ($('#container-slider').attr('userval') < $('#container-slider').slider('option', 'value')) {
            $('#container-slider').slider('value', $('#container-slider').attr('userval'));
            updateKey('.containers-keys', $('#container-slider').attr('userval'));
        }

        if ($('#disk-slider').attr('userval') < $('#disk-slider').slider('option', 'value')) {
            $('#disk-slider').slider('value', $('#disk-slider').attr('userval'));
            updateKey('.disk-key', $('#disk-slider').attr('userval'));
        }

        if ($('#domain-slider').attr('userval') < $('#domain-slider').slider('option', 'value')) {
            $('#domain-slider').slider('value', $('#domain-slider').attr('userval'));
            updateKey('.domains-key', $('#domain-slider').attr('userval'));
            $.glob.slide.dom = $('#domain-slider').attr('userval');
        }

        $.glob.phi = false;

        updatePrice($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);
        blueBar($('#container-slider').slider('option', 'value'), $('#disk-slider').slider('option', 'value'), $('#domain-slider').slider('option', 'value'));

    }
}

// Trigger things when full service
// compliance is changed
function hideFSC(animate) {
        var pcH = $('.panel-compliance').height();
        if (animate) {
            $('.panel-compliance').animate({'opacity' : 0}, 500);
            $('.panel-compliance').animate({'padding-top' : '0px', 'padding-bottom': '0px', 'margin-top' : - $('.panel-compliance').height()},500);
        } else {
            $('.panel-compliance').css({'margin-top' : - pcH})
        };

        $('.panel-compliance').removeClass('visibile-panel');
}

function showFSC() {
        $('.panel-compliance').animate({'padding-top' : '30px', 'padding-bottom': '30px', 'margin-top' : 0},500);
        $('.panel-compliance').animate({'opacity' : 1}, 500)
        $('.panel-compliance').addClass('visibile-panel');
}

function updateKey(id, val) {
    $(id + ' li').removeClass('selected-key');
    $(id + ' .key-'+val).addClass('selected-key');

}

function scaleInc() {
    $('#container-inc-scale').width((($.glob.inc.con - 1.2) * 10) + '%');
    $('#disk-inc-scale').width((($.glob.inc.dis - 1.2) * 10) + '%');
    $('#domain-inc-scale').width((($.glob.inc.dom - 1.2) * 10) + '%');
}

function needmore(type) {

    console.log(type);

    if (!type && !$('.total-wrap').hasClass('hidden-total-wrap')) {
        // do nothing

    } else if (!type && $('.total-wrap').hasClass('hidden-total-wrap')) {
        // NEED MORE to NORMAL
        needmoreslidersshow(false);

        var origH = $('.total-wrap').outerHeight();
        $('.total-wrap').height('').css({'position' : 'absolute'});
        var newH = $('.total-wrap').outerHeight();

        console.log(newH);
        $('.total-wrap').height(origH).css({'position' : ''});

        $('.total-wrap').animate({'height' : newH}, 500)
        window.setTimeout(function(){
            $('.total-wrap').animate({ 'opacity' : 1}, 500);
        }, 500);
        $('.total-wrap').removeClass('hidden-total-wrap')

    } else if (!$('.total-wrap').hasClass('hidden-total-wrap')) {

        // NORMAL TO NEED MORE
        needmoreslidersshow(true);

        origH = $('.total-wrap').outerHeight();
        $('.total-wrap').height('').css({'position' : 'absolute'});
        newH = $('.total-wrap').outerHeight();
        $('.total-wrap').height(origH).css({'position' : ''});

        $('.total-wrap').animate({ 'opacity' : 0}, 500);
        window.setTimeout(function(){
            $('.total-wrap').animate({'height' : '1px'}, 500);
        }, 500);

        $('.total-wrap').addClass('hidden-total-wrap')
    }
}

function needmoreslidersshow(show) {

    if (show) {

        // get need more height
        $('.need-more').css({'opacity' : 0, 'position' : 'absolute', 'width' : $('.domains-panel').width()});
        $('.col-summary').find('.panel').removeClass('focus-panel').css({'opacity': 0.5});
        $('.col-config').find('.panel').addClass('focus-panel');

        var conH = $('.disk-panel').outerHeight(),
            disH = $('.disk-panel').outerHeight(),
            domH = $('.domains-panel').outerHeight(),
            neeH = $('.need-more').outerHeight(),
            panH = $('.col-config').find('.panel-cont').outerHeight();

        // RESET need more
        $('.need-more').css({'opacity' : '', 'position' : '', 'width' : ''});

        if ($.glob.slide.con === 11) {

            var newPanH = neeH + conH;

            // SET CURRENT PANEL HEIGHT
            $('.col-config').find('.panel-cont').css({'height' : panH});

            // PREP NEED MORE FOR INTRO
            $('.need-more').removeClass('hidden').css({'opacity' : 0});

            // HIDE OTHER SLIDERS
            $('.disk-panel, .domains-panel').animate({'opacity' : 0}, 500).addClass('hidden-slider');

            // CHANGE THE HEIGHT
            window.setTimeout(function(){

                $('.disk-panel, .domains-panel').css({'display' : 'none'});
                $('.col-config').find('.panel-cont').animate({'height' : newPanH});

                window.setTimeout(function(){
                    $('.need-more').animate({'opacity' : 1});

                }, 500)

            }, 500)
        } else if ($.glob.slide.dis === 11) {

            var newPanH = conH + disH + neeH;

            // DISABLE PREVIOUS SLIDERS
            $( "#container-slider" ).slider( "option", "disabled", true );

            // SET CURRENT PANEL HEIGHT
            $('.col-config').find('.panel-cont').css({'height' : panH});

            // PREP NEED MORE FOR INTRO
            $('.need-more').removeClass('hidden').css({'opacity' : 0});

            // HIDE OTHER SLIDERS
            $('.domains-panel').animate({'opacity' : 0}, 500).addClass('hidden-slider');;

            // CHANGE THE HEIGHT
            window.setTimeout(function(){

                $('.domains-panel').css({'display' : 'none'});
                $('.col-config').find('.panel-cont').animate({'height' : newPanH});

                window.setTimeout(function(){
                    $('.need-more').animate({'opacity' : 1});

                }, 500)

            }, 500)
        } else if ($.glob.slide.dom === 11) {

            var newPanH = conH + disH + domH + neeH;

            // DISABLE PREVIOUS SLIDERS
            $( "#container-slider, #disk-slider" ).slider( "option", "disabled", true );

            // SET CURRENT PANEL HEIGHT
            $('.col-config').find('.panel-cont').css({'height' : panH});

            // PREP NEED MORE FOR INTRO
            $('.need-more').removeClass('hidden').css({'opacity' : 0});

            // CHANGE THE HEIGHT
            window.setTimeout(function(){

                $('.col-config').find('.panel-cont').animate({'height' : newPanH});

                window.setTimeout(function(){
                    $('.need-more').animate({'opacity' : 1});

                }, 500)

            }, 500)
        } else {

        }

    } else {

        $('.col-summary').find('.panel').addClass('focus-panel').css({'opacity': 1});
        $('.col-config').find('.panel').removeClass('focus-panel');

        // GET HIDDEN PANELS
        $('.hidden-panel').css({'opacity' : 0, 'position' : 'absolute', 'width' : $('.domains-panel').width()});

        // GET NEW HEIGHT
        var origPanH2 = $('.col-config').find('.panel-cont').outerHeight();
        var newPanH2 = 0;
        $('.slider-section').each(function() {
          newPanH2 += $(this).outerHeight();
        });

        // RE-ENABLE SLIDERS
        // DISABLE PREVIOUS SLIDERS
        $( "#container-slider, #disk-slider, #domain-slider" ).slider( "option", "disabled", false );

        // RESET HIDDEN PANELS {
        $('.hidden-panel').css({'opacity' : '', 'position' : '', 'width' : ''});

        // SET INIT HEIGHT FOR ANIMATION
        $('.col-config').find('.panel-cont').height(origPanH2);

        // FADE OUT NEED MORE
        $('.need-more').animate({'opacity' : 0}, 500);

        // SCALE THE COLUMN
        window.setTimeout(function(){
            $('.need-more').addClass('hidden');
            $('.col-config').find('.panel-cont').animate({'height' : newPanH2}, 500);

            // FADE IN SLIDERS
            window.setTimeout(function(){
                $('.hidden-slider').animate({'opacity' : 1},500).css({'position' : '', 'display' : '', 'width' : ''}).removeClass('hidden-panel');
            }, 500)

        },500);    
    }

    window.setTimeout(function(){
        $('.col-config').find('.panel-cont').height('');
    }, 1010)
    
    
}

function updatePrice(con, dis, dom) {

    // CONTAINERS
    if (con < 11) {
        if ($.glob.phi) {
            var conval = parseFloat($.glob.price.con * (con - $.glob.inc.con)).toFixed(2);
        } else {
            var conval = parseFloat($.glob.price.con * con).toFixed(2);
        }

        conval = (Math.max(conval, 0)).toFixed(2);

    } else {
        var con = 'I need more';
        var conval = 'Contact us';
    }

    // DISK SPACE
    if (dis < 11) {
        if ($.glob.phi) {
            var disval = $.glob.price.dis * (dis - $.glob.inc.dis);
        } else {
            var disval = $.glob.price.dis * dis;
        }

        disval = (Math.max(disval, 0)).toFixed(2);

        var dis = (dis / 5) + 'TB';

    } else {
        var dis = 'I need more';
        var disval = 'Contact us';
    }

    // DOMAINS
    if (dom < 11) {
        if ($.glob.phi) {
            var domval = $.glob.price.dom * (dom - $.glob.inc.dom);
        } else {
            var domval = $.glob.price.dom * dom;
        }
        
        domval = (Math.max(domval, 0)).toFixed(2);

    } else {
        var domval = 'Contact us';
        var dom = 'I need more';
    }

    // WORK OUT THE TOTAL PRICE
    if ($.glob.phi){
        var price = parseFloat($.glob.price.base) + parseFloat(domval) + parseFloat(disval) + parseFloat(conval);
    } else {
        var price = parseFloat(domval) + parseFloat(disval) + parseFloat(conval);
    }

    var curr = '$',
        concurr = '',
        discurr = '',
        domcurr = '';

    if ($.isNumeric(conval)) {
        var concurr = curr;
        if (conval > 0) {
            $('.cont-extra').text(' @ $' + parseFloat(conval).toFixed(2));
        } else {
            $('.cont-extra').text('');
        }
    } else {
        needmore(con);
        $('.cont-extra').text('');
    }

    if ($.isNumeric(disval)) {
        var discurr = curr;
        if (disval > 0) {
            $('.dis-extra').text(' @ $' + parseFloat(disval).toFixed(2));
        } else {
            $('.dis-extra').text('');
        }
    } else {
        needmore(dis);
        $('.dis-extra').text('');
    }

    if ($.isNumeric(domval)) {
        var domcurr = curr;
        if (domval > 0) {
            $('.dom-extra').text(' @ $' + parseFloat(domval).toFixed(2));
        } else {
            $('.dom-extra').text('');
        }
    } else {
        needmore(dom);
        $('.dom-extra').text('');
    }


    if ($.isNumeric(conval) && $.isNumeric(disval) && $.isNumeric(domval)) {
        $('.tot-price-number').text(curr + price);
        needmore();
    }

    $('.cont-price').text(concurr + conval);
    $('.containers-val').text(con);

    $('.dis-price').text(discurr + disval);
    $('.disk-val').text(dis);

    $('.dom-price').text(domcurr + domval);
    $('.domain-val').text(dom);    
    
}

function updatePlan() {

    // Unhide hidden summaries to get heights

    var deS = $('.Development-summary').outerHeight(),
        prS = $('.Platform-summary').outerHeight();

    if ($('.Development-summary').hasClass('hidden')) {
        $('.Development-summary').css({'opacity' : 0, 'position' : 'absolute', 'display' : 'inline-block'});
        var deS = $('.Development-summary').outerHeight();
        $('.Development-summary').css({'opacity' : 1, 'position' : '', 'display' : ''});
    }

    if ($('.Platform-summary').hasClass('hidden')) {
        $('.Platform-summary').css({'opacity' : 0, 'position' : 'absolute', 'display' : 'inline-block'});
        var prS = $('.Platform-summary').outerHeight();
        $('.Platform-summary').css({'opacity' : 1, 'position' : '', 'display' : ''});
    }

    if ($.glob.phi && !$.glob.fsc) {

        $('.key-overview').animate({'opacity' : 0}, { duration: 300, easing: 'swing' });
        $('.Platform-summary').css({'height' : deS});

        window.setTimeout(function(){
            $('.key-overview h3').text('Platform Account');
            $('.Development-summary').addClass('hidden');
            $('.Platform-summary').removeClass('hidden').animate({'height' : prS}, 500);
            $('.Production-summary').addClass('hidden');
            $('.key-overview').animate({'opacity' : 1,}, 500);
        }, 500)
        $('.plan-price').text('$499');
        
        // Animate
        showFSC();

    } else if ($.glob.phi && $.glob.fsc) {
        $('.key-overview').animate({'opacity' : 0}, { duration: 300, easing: 'swing' });
        window.setTimeout(function(){
            $('.key-overview h3').text('Production Account');
            $('.Development-summary').addClass('hidden');
            $('.Platform-summary').addClass('hidden');
            $('.Production-summary').removeClass('hidden');
            $('.key-overview').animate({'opacity' : 1}, { duration: 500, easing: 'swing' });
        }, 500)
        $('.plan-price').text('$499');
    } else {

        $('.key-overview').animate({'opacity' : 0}, { duration: 300, easing: 'swing' });
        window.setTimeout(function(){
            $('.plan-price').text('$0');
            $('.key-overview h3').text('Development Account');
            $('.Development-summary').removeClass('hidden');
            $('.Platform-summary').addClass('hidden');
            $('.Production-summary').addClass('hidden');
            $('.key-overview').animate({'opacity' : 1}, { duration: 500, easing: 'swing' });
        }, 500)
        hideFSC(true);


    }

    if ($.glob.phi) {
            console.log('phi compliance on');
        } else {
            console.log('phi compliance off');
        }
}

function getPrices(){
    $.glob.price.con = parseFloat($('input[name="container-value"]').val());
    $.glob.price.dis = parseFloat($('input[name="disk-value"]').val());
    $.glob.price.dom = parseFloat($('input[name="domain-value"]').val());
    $.glob.inc.con = parseFloat($('input[name="container-inc"').val());
    $.glob.inc.dis = parseFloat($('input[name="disk-inc"').val());
    $.glob.inc.dom = parseFloat($('input[name="domain-inc"]').val());

}


function FSCchange(){

    if ($.glob.phi && $('.compliance-checkbox').is(':checked')) {

        $.glob.fsc = true;

        $('.col-config').css({'opacity' : 0, 'display' : 'none'});
        $('.col-summary').addClass('large-summary');

        window.setTimeout(function(){
            $('.production-btn').css({'display' : 'inline-block'});
            $('.production-btn').animate({'opacity' : 1}, 500)
        }, 500);
    } else if ($.glob.phi && $('.compliance-checkbox').not(':checked')) {
        $.glob.fsc = false;

        $('.production-btn').animate({'opacity' : 0}, 500)
        window.setTimeout(function(){
            $('.main-content').width($('.main-content').width());
            $('.col-summary').removeClass('large-summary');
            $('.production-btn').css({'display' : ''});
            window.setTimeout(function(){
                $('.col-config').css({'display' : ''});
                $('.col-config').animate({'opacity' : 1}, 500);
            },500)
        }, 500);

    } else {

        $.glob.fsc = false;
        $.glob.phi = false;

        $('.production-btn').animate({'opacity' : 0}, 500)
        window.setTimeout(function(){
            $('.main-content').width($('.main-content').width());
            $('.col-summary').removeClass('large-summary');
            $('.production-btn').css({'display' : ''});
            window.setTimeout(function(){
                $('.col-config').css({'display' : ''});
                $('.col-config').animate({'opacity' : 1}, 500);
            },500)
        }, 500);

    }
    
}


$(document).ready(function(){

    getPrices();
    hideFSC();
    scaleInc();
    writeValAttr('#container-slider', $.glob.slide.con);
    writeValAttr('#domain-slider', $.glob.slide.dom);
    writeValAttr('#disk-slider', $.glob.slide.dis);
    updatePrice($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);

    $('#PHIcheck input').change(function(){
        PHIchange();
        updatePlan();
    });

    $('#FSCcheck input').change(function(){
        FSCchange();
        updatePlan();
    });

    blueBar($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);
    
    // trigger updates to 


    $('.show-settings').click(function(){
        $('.settings').toggleClass('hidden-settings');
    })

    


    $('.backend-settings').on('input', function() { 
        getPrices();
        scaleInc();
        updatePrice($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);
        blueBar($.glob.slide.con, $.glob.slide.dis, $.glob.slide.dom);
    });





});

$(window).resize(function(){
    if ($(window).width < '1170'){
        $('.main-content').css({'max-width' : $(window).width()});
    } else {
        $('.main-content').css({'max-width' : '1170px'});
    }
})