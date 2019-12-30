$(document).ready(() => {
    loadAccount() //indexDb

    $('button[name=action]').click(event => {
        event.preventDefault()
        const form = $('#form-settings')

        let nickname = form.find('#nickname').val()
        let name = form.find('#name').val()
        let gender = form.find('input[name=gender]:checked').val()

        if (nickname.length > 10 || name.length > 20) return

        updateAccount(nickname, name, gender)
    })

    $('#nickname,#name').characterCounter()
})