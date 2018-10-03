import $ from "jquery";
import Inputmask from "inputmask";


$(document).ready(() => {

    //pre-loader close timeout
    setTimeout(() => {
        $('.blackout').addClass('blackout_disabled')
    }, 5000);

    //mask for phone input
    new Inputmask("+9 (999) 999 99 99", {
        showMaskOnHover: false
    }).mask($('#phone'));

    //mask for test phone val
    const regExpPhonePatter = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    $('.form__input').change(function()
    {
        //check phone input for validate
        if(!$('#phone').val() || regExpPhonePatter.test($('#phone').val())){
            $('#phone').removeClass('form__input_error')
            $('.input-phone__error').removeClass('input-phone__error_active')
        }
        else{
            $('#phone').addClass('form__input_error')
            $('.input-phone__error').addClass('input-phone__error_active')
        }

        //check our input for fill
        if ($(this).val()) {
            $(this).next("span").addClass('form__label_fill');
            if (!$(this).hasClass('form__input_error'))
                $(this).addClass('form__input_done');
            else
                $(this).removeClass('form__input_done');
        }
        else if (!$(this).val()) {
            $(this).next("span").removeClass('form__label_fill');
            $(this).removeClass('form__input_done');
        }

        //check submit button for disable/active
        if(!$('#phone').hasClass('form__input_done') ||
            !$('#name').hasClass('form__input_done') ||
            !$('#email').hasClass('form__input_done')){
            $('#form-request__submit').attr('disabled','disabled');
        }
        else
            $('#form-request__submit').removeAttr('disabled');
    });


    //trick with svg color for hover
    /*$('.beer-feature-tab').hover(function () {
        let use = $(this).find('use')
        let useXlink = use.attr("xlink:href");
        $(this).attr("xlink:href", useXlink+'-red')
    }, function () {
        let use = $(this).find('use')
        let useXlink = use.attr("xlink:href");
        $(this).attr("xlink:href", useXlink.substring(0, useXlink.length - 4))
    });*/


    //tab click event to change text below it
    $('.beer-feature-tab').click(function (e) {
        e.preventDefault()
        dropAllTabs();
        $(this).addClass('beer-feature-tab_active');
        let textId = $(this).attr('href');
        textId = textId.substring(1, textId.length)
        dropAllTexts();
        $('#'+textId).addClass('beer-feature__text_active')
    });

    function dropAllTabs() {
        $('.beer-feature-tab').each(function () {
            $(this).removeClass('beer-feature-tab_active');
        });
    }

    function dropAllTexts() {
        $('.beer-feature__text').each(function () {
            $(this).removeClass('beer-feature__text_active');
        });
    }

    //send array of fields value to console
    $('#form-request').submit((e) => {
        e.preventDefault()
        let resultFormArray = []
        $('.form__input').each(function () {
            resultFormArray = [...resultFormArray,$(this).val()];
        });
        console.log(resultFormArray);
        $('.form__group').remove();
        $('#form-request__submit').attr('disabled','disabled');
        $('#form-request__submit').text('Заявка отправлена')
    });

})