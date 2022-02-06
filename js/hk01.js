 var c = document.querySelector("#c");
    var ctx = c.getContext("2d");
 
    //making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;
 
    //chinese characters - taken from the unicode charset
    var chinese = "🌱Minecraft FOREVERRRR🌱";
    //converting the string into an array of single characters
    chinese = chinese.split("");
 
    var font_size = 15;
    var columns = c.width / font_size; //number of columns for the rain
	var bottom_y = Math.floor(c.height / font_size);
    //an array of drops - one per column
    var drops = [];
	var j = [];
	var flag = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++){
		drops[x] = bottom_y;
		j[x] = chinese.length - 1;
		flag[x] = true;
	}
        
	//drops[0] = bottom_y;
	
	
    //drawing the characters
    function draw() {
        //Black BG for the canvas
        //translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.025)";
        ctx.fillRect(0, 0, c.width, c.height);
 
        ctx.fillStyle = "#0F0"; //green text
        ctx.font = font_size + "px arial";
        //looping over drops
        for (var i = 0; i < drops.length; i++) {
            //a random chinese character to print
            var text = chinese[j[i]];
            //x = i*font_size, y = value of drops[i]*font_size
			
			if(flag[i]){
				ctx.fillText(text, i * font_size, drops[i] * font_size);
			}
            
			if(j[i]>0){
				j[i]--;
			}else{
				j[i] = chinese.length - 1;
				flag[i] = false;
			}
			
            //sending the drop back to the top randomly after it has crossed the screen
            //adding a randomness to the reset to make the drops scattered on the Y axis
            if (drops[i] * font_size < 0 && Math.random() > 0.975){
				drops[i] = bottom_y;
				flag[i] = true;
			}
                
            //incrementing Y coordinate
            drops[i]--;
        }
    }
 
    setInterval(draw, 75);
