$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        // Make request to github
        $.ajax({
            url:'https://api.github.com/users/'+username,
            data:{
                client_id:'81be716f747c1bab5eb2',
                client_secret:'6411fa417f359558898b1c171b5b43ff27ba32fe'
            }
        }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'81be716f747c1bab5eb2',
                    client_secret:'6411fa417f359558898b1c171b5b43ff27ba32fe',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                    <div class="no-border card"> 
                        <div class="row align-items-center">
                            <div class="col-md-7 card-header">
                                <legend>${repo.name}</legend>${repo.description}
                            </div>
                            <div class="col-md-2">
                                <span class="badge badge-warning">Forks: ${repo.forks_count}</span> <br>
                                <span class="badge badge-danger">Watchers: ${repo.watchers_count}</span><br>
                                <span class="badge badge-info">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class="col-md-2">
                                <a href="${repo.html_url}" target="_blank" class="btn btn-outline-success btn-block">Reposity Link</a>
                            </div>
                        </div>
                    </div>
                    `);
                });
            });

            $('#profile').html(`
            <div class="card">
                <div class="card-header">
                    <h5>${user.name}</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar" src="${user.avatar_url}">
                            <a target="_blank" class="btn btn-success btn-block" href="${user.html_url}">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge badge-warning">Public Repos: ${user.public_repos}</span>
                            <span class="badge badge-danger">Gists: ${user.public_gists}</span>
                            <span class="badge badge-primary">Followers: ${user.followers}</span>
                            <span class="badge badge-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item"><strong>Company:</strong> ${user.company} </li>
                                <li class="list-group-item"><strong>Website:</strong> ${user.blog} </li>
                                <li class="list-group-item"><strong>Location:</strong> ${user.location} </li>
                                <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at} </li>
                            </ul>
                        </div>
                </div>
            </div>
            <div class="container">
                <h3 class="page-header"> Last 5 Repositories: </h3>
                <div id="repos"></div>
            </div>
            `);
        })
    })
});