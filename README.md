for (var i = 1; i <=5; i++) {
                var date;
                var temp;
                var icon;
                var wind;
                
                date = data.daily[i].dt;
                date = moment.unix(date).format("MM/DD/YYYY");
                temp = data.daily[i].temp.day;
                icon = data.daily[i].weather[0].icon;
                wind = data.daily[i].wind_speed;

                var card = document.createElement('div');
                card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

                var cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
                cardBody.innerHTML


            }
