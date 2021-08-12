// For Demo Purpose [Changing input group text on focus]
$(function () {
    $('input, select').on('focus', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
    });
    $('input, select').on('blur', function () {
        $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
    });
});

document.getElementById('form-register').addEventListener('submit', performPostRequest);

function performPostRequest(e) {
    var Username = document.getElementById('Username').value;
    var Email = document.getElementById('Email').value;
    var Password = document.getElementById('Password').value;
    var ConfirmPassword = document.getElementById('ConfirmPassword').value;
    axios.post('http://localhost:39894/api/authenticate/register', {
        Username: Username,
        Email: Email,
        Password: Password,
        ConfirmPassword: ConfirmPassword
    })
    .then(function (response) {
        alert(response);
    })
    .catch(function (error) {
        alert(error);
    })
    e.preventDefault();
}