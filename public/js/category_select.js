$('.select_dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.select_dropdown-menu').slideToggle(300);
});
$('.select_dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.select_dropdown-menu').slideUp(300);
});
$('.select_dropdown .select_dropdown-menu li').click(function () {
    $(this).parents('.select_dropdown').find('span').text($(this).text());
    $(this).parents('.select_dropdown').find('input').attr('value', $(this).attr('id'));
});
let input = [];
$('.select_dropdown-menu').click(function () {
    let name = event.target.parentElement.id;
    input[name] = event.target.id;

    // input - ассоциативный массив, где хранится выобр пользователя
});