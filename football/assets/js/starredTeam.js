getStarredTeam().then(res => {
    if (res.length == 0) {
        routeEmptyStarred()
    } else {
        let body = `<div><center><h4>My Favorite Teams</h4></center></div>`
        res.forEach(item => {
            body += `
				<div class="">
					<div class="col s12 mt-3">
						<div class="card horizontal savedTeam">
							<a href="#!" data-id="${item.team_id}" data-name="${item.team_name}" class="starred checked"><i class="small material-icons circle">grade</i></a>
							<div class="card-image icon-club">
                                <a href="#" data-id="${item.team_id}" class="team-info">
                                    <img alt="club ${item.team_path_icon}" onerror="this.src='./assets/img/icon/Icon-144.png'" src="./assets/img/icon/Icon-144.png" class="icon-club lazyload" data-src="${item.team_path_icon.replace(/^http:\/\//i, 'https://')}">
                                </a>
                            </div>
							<div class="card-stacked">
								<div class="card-content center">
									<h4>${item.team_name}</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			`
        })

        $('.root').html(body)

        $('.team-info').each(function() {
            let team_id = $(this).data('id')
            $(this).click(function(e) {
                window.location.hash = '#teams?id=' + team_id;
                e.preventDefault()
                route('teams')
            })
        })

        $('.starred').each(function() {
            let elem = $(this)
            let id = elem.data('id')
            let name = elem.data('name')
            let path_img = elem.data('url')

            let data = {
                id,
                name,
                path_img
            }

            elem.click(function(e) {
                e.preventDefault()
                let isStarred = elem.hasClass('checked')

                if (!isStarred) {
                    elem.addClass('checked')
                } else {
                    var toastHTML = '<span>Deleted</span><button class="btn-flat toast-action">Undo</button>';
                    M.toast({
                        html: toastHTML,
                        displayLength: '3000'
                    });

                    let card = elem.closest('div.savedTeam')
                    card.hide("slow")

                    let doRemove = setTimeout(() => {
                        setStarredTeam(id, data)
                        card.remove()
                        if ($('div.savedTeam').length == 0) {
                            routeEmptyStarred()
                        }
                    }, 3000)

                    $('.toast-action').click(() => {
                        card.show('slow')
                        clearTimeout(doRemove)
                        M.Toast.dismissAll();
                    })

                }

            })
        })
    }
})