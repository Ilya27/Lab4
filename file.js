var colorFigure = null;
var figure = null;

    function rect(color, x, y, width, height) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.draw = function() {
            context.fillStyle = this.color;
            var returnObj = JSON.parse(localStorage.getItem("value"));
			if( returnObj['item2'] != 'rectangle'){
				context.fillRect(this.x, this.y, this.width, this.height);
			}else {
				context.fillRect(this.x, this.y, returnObj['item3']*(this.width+30), returnObj['item3']*(this.height));


			}
        };
    }

    function draw() {
        game.draw();
		ball.draw();
    }

    function update() {
        ball.x += ball.vX;
        ball.y += ball.vY;
    }
    function play() {
        draw();
        update();
    }

    function init() {
        game = new rect("#ffffff", 2,2, 1300,675);
		    var returnObj = JSON.parse(localStorage.getItem("value"));
		    ball = new rect(returnObj['item1'], 40, game.height / 2 - 10, returnObj['item3']*10, returnObj['item3']*10);
        ball.vX = parseInt(returnObj['item4']); // speed into х
        ball.vY = parseInt(returnObj['item4']); // speed into у
        canvas = document.getElementById("js_game");
        canvas.width = game.width;
        canvas.height = game.height;
        context = canvas.getContext("2d");
        setInterval(play, 1000 / 50);
    }



	    function update() {
        if (ball.y<0 || ball.y+ball.height>game.height) {
            ball.vY = -ball.vY;
        }
        if (ball.x<0) {
            ball.vX = -ball.vX;
        }
        if (ball.x+ball.width>game.width) {
            ball.vX = -ball.vX;
        }

        ball.x += ball.vX;
        ball.y += ball.vY;
    }

	function change(){
		var selind = document.getElementById("color").options.selectedIndex;console.log(selind);
		var txt= document.getElementById("color").options[selind].text;console.log(txt);
		var colorFigure;
		if (txt == 'Orange'){
			colorFigure= 'rgb(255, 176, 0)';
		}
		if (txt == 'Red'){
			colorFigure = 'rgb(255, 0, 0)';
		}
		if (txt == 'Green'){
			colorFigure = 'rgb(9, 255, 85)';
		}

		var checkboxes = document.getElementsByClassName('checkbox');
		var figure = '';
			for (var index = 0; index < checkboxes.length; index++) {
				if (checkboxes[index].checked) {
					figure = checkboxes[index].value;
				}
			}

		if (figure == 'rectangle'){
			 if (window.figure == undefined) {
                    window.figure='rectangle';
					figure = 'rectangle';
			}
		}else {
			figure = 'square';
		}

		var rng=document.getElementById('size').value;
		var speed=document.getElementById('speed').value;

		var obj = {
			item1: colorFigure,
			item2: figure,
			item3: rng,
			item4: speed
		};

		var serialObj = JSON.stringify(obj);
		localStorage.setItem("value", serialObj);
		init();

}
