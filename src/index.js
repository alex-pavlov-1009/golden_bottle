import $ from "jquery";
import Inputmask from "inputmask";


$(document).ready(() => {

    setTimeout(() => {
        $('.blackout').addClass('blackout_disabled')
    }, 5000);

    new Inputmask("+9 (999) 999 99 99", {
        showMaskOnHover: false
    }).mask($('#phone'));

    const regExpPhonePatter = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    $('.form__input').change(function()
    {
        if(!$('#phone').val() || regExpPhonePatter.test($('#phone').val())){
            $('#phone').removeClass('form__input_error')
            $('.input-phone__error').removeClass('input-phone__error_active')
        }
        else{
            $('#phone').addClass('form__input_error')
            $('.input-phone__error').addClass('input-phone__error_active')
        }


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

        if(!$('#phone').hasClass('form__input_done') ||
            !$('#name').hasClass('form__input_done') ||
            !$('#email').hasClass('form__input_done')){
            $('#form-request__submit').attr('disabled','disabled');
        }
        else
            $('#form-request__submit').removeAttr('disabled');
    });

    $('#form-request').submit((e) => {
        e.preventDefault()
        $('.form__input').each(function () {
            console.log( $(this).val() );
        });
    });

})