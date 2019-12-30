var getTeamById = async() => {
    const root = $('.root')
    const url_params = window.location.href

    const url = new URL(url_params)
    const getval = url.hash.indexOf('?')
    const params = new URLSearchParams(url.hash.substr(getval))

    const team_id = params.get('id')
    console.log(team_id)
    if (team_id == null) {
        //show home of team page
        root.html(`Gaada parameter`)
    } else {
        //show detail team
        const api = 'https://api.football-data.org/v2/teams/[team_id]'
        const token = '65906dfb1c20470e85c965142a97d3ba'
        const options = {
            method: 'get',
            headers: {
                'X-Auth-Token': token
            }
        }

        api_team = api.replace('[team_id]', team_id)

        try {
            let getAPi = await fetch(api_team, options)
            let data = await getAPi.json()

            let table_row = ''

            data.squad.reverse().forEach(item => {
                table_row += `
					<tr>
						<td>${item.name}</td>
						<td>${item.position}</td>
						<td>${item.nationality}</td>
					</tr>
				`
            })

            let card = `
			<div class="row">
				<div class="col s12 m6">
					<div class="card">
							<div class="card-image">
							<img class="team-icon" src="${data.crestUrl.replace(/^http:\/\//i, 'https://')}">
							<span class="team-icon-title card-title">${data.name}</span>
						</div>
						<div class="card-content">
							<table class="info-club">
								<tr>
									<td>Nationality</td>
									<td>${data.area.name}</td>
								</tr>
								<tr>
									<td>Founded</td>
									<td>${data.founded}</td>
								</tr>
								<tr>
									<td>Address</td>
									<td>${data.address}</td>
								</tr>
								<tr>
									<td>Club Color</td>
									<td>${data.clubColors}</td>
								</tr>
								<tr>
									<td>Website</td>
									<td>${data.website}</td>
								</tr>
								<tr>
									<td>Email</td>
									<td>${data.email}</td>
								</tr>
							</table>
						</div>
						<div class="card-content team-squad hide" style="display: none">
							<table class="striped">
								<thead>
									<tr>
										<td>Name</td>
										<td>Position</td>
										<td>Nationaility</td>
									</tr>
								</thead>
								<tbody>
									${table_row}
								</tbody>
							</table>
						</div>
						<div class="card-action">
							<a href="#" id="show-squad">show all squad</a>
						</div>
					</div>
				</div>
			</div>
			`
            card += `
				<a class="btn-floating waves-effect waves-light btn-large red btn-back"><i class="material-icons circle">arrow_back</i></a>
				<div class="floating-bottom"> 
					<a class="btn-floating btn-large waves-effect waves-light red scroll-to-top"><i class="material-icons">expand_less</i></a>
				</div>
			`
            root.html(card)

            $('#show-squad').click((e) => {
                e.preventDefault()
                let elem = $('.team-squad')
                let btn = $('#show-squad')

                if (elem.hasClass('hide')) {
                    elem.show('slow')
                    elem.removeClass('hide')
                    btn.text('less all squad')
                } else {
                    elem.hide('slow')
                    elem.addClass('hide')
                    btn.text('show all squad')
                }
            })

            //event when btn back clicked
            $('.btn-back').click(() => {
                window.location.hash = '#starredTeam';
                route("starredTeam")
            })

            // event when scroll to top clicked
            $('.floating-bottom').click(event => {
                event.preventDefault()
                $("html, body").animate({
                    scrollTop: 0
                }, "slow");
                return false;
            })

            //hide button scroll when first loaded
            $('.scroll-to-top').hide()

            //event hide/show when scroll
            window.onscroll = function() {
                if (window.scrollY >= 500) {
                    $('.scroll-to-top').fadeIn('500')
                } else {
                    $('.scroll-to-top').fadeOut('500')
                }
            }

            //set theme now 
            getTheme()
            console.log(data)

        } catch (e) {
            RouterError(getTeamById, '')
        }
    }
}

getTeamById()