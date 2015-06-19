//DEFAULT PRODUCT VALS 

$(document).ready(function(){
    var accountTypeName = 'Platform';
    var basePrice = 499;
    var containers = 6; // 6 CONTAINERS INCLUDED IN PRICE
    var disk = 5; // 5x200GB = 1 TERABYTE INCLUDED IN PRICE
    var domains = 4; // 4 DOMAINS INCLUDED IN PRICE

    containerCost = $('input[name="container-value"]').val(); //$58.40 per container
    diskCost = $('input[name="disk-value"]').val(); //$37 per 200GB
    domainCost = $('input[name="domain-value"]').val(); //$18.25 per month
});



function sliderValue(sliderName, slideVal) {

    var containerCost = $('input[name="container-value"]').val(); //$58.40 per container
    var diskCost = $('input[name="disk-value"]').val() //$37 per 200GB
    var domainCost = $('input[name="domain-value"]').val(); //$18.25 per month

    var contVal = $('#container-slider').slider( "option", "value" );
    var disVal = $('#disk-slider').slider( "option", "value" );
    var domVal =$('#domain-slider').slider( "option", "value" );

    // CHECK ACCOUNT TYPE NAME
    if ($('.phi-checkbox').is(':checked')) {
        accountTypeName = 'Platform';
    };
    
    // JQUERY IS ALWAYS ONE STEP BEHIND THE ONE BEING ADJUSTED... FIX THAT
    if (sliderName === 'container') {
        var contVal = slideVal;
    } else if (sliderName === 'disk') {
        var disVal = slideVal;
    } else if (sliderName === 'domain') {
        var domVal = slideVal;
    }


    console.log(slideVal);

    // DO THE MATHS
    if ($('.phi-checkbox').is(':checked')) {
        var totContVal = Math.max(containerCost * (contVal - containers), 0);
        var totDisVal = Math.max(diskCost * (disVal - disk), 0);
        var totDomVal = Math.max(domainCost * (domVal-domains), 0);
        var totCost = totContVal + totDisVal + totDomVal + basePrice;
        console.log(totCost);
    } else {
        var totContVal = containerCost * contVal;
        var totDisVal = diskCost * disVal;
        var totDomVal = domainCost * domVal;
        var totCost = totContVal + totDisVal + totDomVal + basePrice;
        console.log('test');
    }

    console.log(contVal);

    // BLUE BARS
    var contBlueWid = (contVal - 1) * 10 + '%';
    var disBlueWid = (disVal - 1) * 10 + '%';
    var domBlueWid = (domVal - 1) * 10 + '%';
    if (!$('.bluebar').length) {
        $('.container-slider').prepend('<div class="bluebar" style="width:' + contBlueWid +'"></div>')
        $('.disk-slider').prepend('<div class="bluebar" style="width:' + disBlueWid +'"></div>');
        $('.domain-slider').prepend('<div class="bluebar" style="width:' + domBlueWid +'"></div>');
    } else {
        $('.container-slider .bluebar').width(contBlueWid);
        $('.disk-slider .bluebar').width(disBlueWid);
        $('.domain-slider .bluebar').width(domBlueWid);
    }
    

      //////////////////
     // WRITE VALUES //
    //////////////////

    // CONTAINER NUMBERS
    if ( contVal === 11 ) {
        $('.cont-extra').text('Contact us');
    } else if (totContVal > 0) {
        $('.cont-extra').text(' @ $' + totContVal.toFixed(2) + '/month')
        $('.cont-price').text('$' + totContVal.toFixed(2));
    } else {
        $('.cont-extra').text('');
        $('.cont-price').text('$0');
    }

    // DISK NUMBERS
    if ( disVal === 11 ) {
        $('.dis-extra').text('I need more');
        $('.dis-price').text('Contact us');
    } else if (totDisVal > 0) {
        $('.dis-extra').text(' @ $' + totDisVal.toFixed(2) + '/month')
         $('.dis-price').text('$' + totDisVal.toFixed(2));
    } else {
        $('.dis-extra').text('');
         $('.dis-price').text('$0');
    }

    // DOMAIN NUMBERS
    if ( domVal === 11 ) {
        $('.dom-extra').text('I need more');
        $('.dom-price').text('Contact us');
    } else if (totDomVal > 0) {
        $('.dom-extra').text(' @ $' + totDomVal.toFixed(2) + '/month')
        $('.dom-price').text('$' + totDomVal.toFixed(2));
    } else {
        $('.dom-extra').text('');
        $('.dom-price').text('$0');
    }

    // UPDATE TOTAL PRICE
    $('.tot-price-number').text('$' + totCost.toFixed(2));
    
}

function configFocus(){
    $('.col-config').find('.panel').addClass('focus-panel');
    $('.col-summary').find('.panel').removeClass('focus-panel').css('opacity', 0.5);
}

function summaryFocus(){
    $('.col-config').find('.panel').removeClass('focus-panel');
    $('.col-summary').find('.panel').addClass('focus-panel').css('opacity', '');
}

function accountType() {

	if ($('.phi-checkbox').is(':checked')) {
		//DEFAULT PRODUCT VALS 
        accountTypeName = 'Platform';
        basePrice = 499;
        containers = $('input[name="container-inc"]').val(); // 6 CONTAINERS INCLUDED IN PRICE
        disk = $('input[name="disk-inc"]').val(); // 5x200GB = 1 TERABYTE INCLUDED IN PRICE
        domains = $('input[name="domain-inc"]').val(); // 4 DOMAINS INCLUDED IN PRICE

        var containerIncWidth = ((containers - 1)*10) + '%';
        $('.containers-panel .included').removeClass('hidden').css({'width' : containerIncWidth});

        var diskIncWidth = ((disk - 1)*10) + '%';
        $('.disk-panel .included').removeClass('hidden').css({'width' : diskIncWidth});

        var domainIncWidth = ((domains - 1)*10) + '%';
        $('.domains-panel .included').removeClass('hidden').css({'width' : domainIncWidth});

		$('.panel-compliance').removeClass('hidden');


		if ($('.compliance-checkbox').is(':checked')){
			accountTypeName = 'Production';
            basePrice = 'Contact Us';
            containers = 0;
            disk = 0;
            domains = 0;

            $('.container').addClass('production-account');
            summaryfocus();
		} else {
            $('.container').removeClass('production-account');
        }

	} else {

        $('.container').removeClass('production-account');

	    accountTypeName = 'Development';
        basePrice = 0;
        containers = 0;
        disk = 0;
        domains = 0;
		$('.compliance-checkbox').prop('checked', false);
		$('.panel-compliance, .included').addClass('hidden');
	}
	$('.col-summary').find('h3').text(accountTypeName + ' Account');
    $('.plan-val').text(accountTypeName);
    $('.plan-price').text('$' + basePrice);
    $('.plan-summary-list').addClass('hidden');
    $('.' + accountTypeName + '-summary').removeClass('hidden');
}

$(document).click(function(){
	accountType();
    sliderValue();
});

$(function() {


	$( "#container-slider" ).slider({
		min: 1,
    	max: 11,
    	value: 1,
    	step: 1,
    	slide: function( event, ui ) {

            sliderValue('container', ui.value);
            $('.containers-keys li').removeClass('selected-key');
            $('.containers-keys .key-'+ui.value).addClass('selected-key');

    		if (ui.value === 11) {
    			$(".containers-val").text( 'I need more' );
                configFocus();
    			if (!$(".need-more").hasClass('container-show')) {
    				$(".need-more").addClass('container-show');
    				$(".containers-panel").addClass('showing');
    				$(".swap-text").text( 'Need more containers?' );
    			}
    		} else {
    			$(".containers-val").text( ui.value );
                summaryFocus();
    			if ($(".need-more").hasClass('container-show')) {
    				$(".need-more").removeClass('container-show');
    				$(".containers-panel").removeClass('showing');

    			}
    		}
	    }
    });

    $( "#disk-slider" ).slider({
		min: 1,
    	max: 11,
    	value: 1,
    	step: 1,
    	slide: function( event, ui ) {
            sliderValue('disk', ui.value);
            $('.disk-keys li').removeClass('selected-key');
            $('.disk-keys .key-'+ui.value).addClass('selected-key');
    		if (ui.value === 1) {
    			$(".disk-val").text( '200GB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 2) {
    			$(".disk-val").text( '400GB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 3) {
    			$(".disk-val").text( '600GB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 4) {
    			$(".disk-val").text( '800GB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 5) {
    			$(".disk-val").text( '1TB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 6) {
    			$(".disk-val").text( '1.2TB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 7) {
    			$(".disk-val").text( '1.4TB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 8) {
    			$(".disk-val").text( '1.6TB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 9) {
    			$(".disk-val").text( '1.8GB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else if (ui.value === 10) {
    			$(".disk-val").text( '2TB' );
                summaryFocus();
    			if ($(".need-more").hasClass('disk-show')) {
    				$(".need-more").removeClass('disk-show');
    				$(".disk-panel").removeClass('showing');
    			}
    		} else {
    			$(".disk-val").text( 'I need more' );
    			$(".swap-text").text( 'Need more disk space?' );
                configFocus();
    			if (!$(".need-more").hasClass('disk-show')) {
    				$(".need-more").addClass('disk-show');
    				$(".disk-panel").addClass('showing');
    			}
    		}
	    }
    });

    $( "#domain-slider" ).slider({
		min: 1,
    	max: 11,
    	value: 1,
    	step: 1,
    	slide: function( event, ui ) {
            sliderValue('domain', ui.value);
            $('.domains-keys li').removeClass('selected-key');
            $('.domains-keys .key-'+ui.value).addClass('selected-key');
    		if (ui.value === 11) {
                configFocus();
    			$(".domain-val").text( 'I need more' );
    			$(".need-more").addClass('domains-show');
    			$(".swap-text").text( 'Need more domains?' );
    			$(".summary-domain").text('Unknown');
    			$(".summary-domain-value").text('Contact us');
    		} else {
                summaryFocus();
    			$(".domain-val").text( ui.value );
    			$(".summary-domain").text( ui.value );
    			
    			if ($(".need-more").hasClass('domains-show')) {
    				$(".need-more").removeClass('domains-show');
    			}
    		}
	    }
    });
});

$(document).ready(function(){
    accountType();
    sliderValue();
});

$('.backend-settings').on('input', function() { 
    sliderValue();
    accountType();
});
