const fs = require('fs');
// The goal of the program is to take the room dimensions, the locations of the dirt patches, 
// the hoover location and the driving instructions as input and to then output the following:
// The final hoover position (X, Y)
// The number of patches of dirt the robot cleaned up

fs.readFile('input.txt', 'utf8', (err, data) => {

    if (err) {
        return console.log(err);
    }

    // function to convert data from txt file to useable data
    const extractData = (data) => {
        let parsedInput = [];
        let split = data.split("\n");
        // splitting each line of data and pushing each line into an array
        split.forEach(line => {
            if (( !isNaN(parseInt(line[0]))) && ( !isNaN(parseInt(line[2])))){
                parsedInput.push({x: parseInt(line[0]), y: parseInt(line[2])});
            }
        });
        let directions = split[split.length-1];
        parsedInput.push({directions: directions});
        
        movement(parsedInput);
    };

    // taking directions and moving the roomba around, updating it's location based upon the directions
    const movement = (data) => {
        let moves = data[data.length-1].directions.toUpperCase();
        let maxX = parseInt(data[0].x);
        let maxY = parseInt(data[0].y);
        let startingPos = data[1];
        let newCords = [];
        // looping through all the directions
        for (i = 0; i < moves.length; i++){
            let dir = moves[i];
            // updating location of roomba based upon direction given, pushing new coords into a new array
            switch (dir) {
                case 'N':
                    if (newCords.length == 0) {
                        if (startingPos.y + 1 <= maxY){
                            let currentX = startingPos.x;
                            let currentY = startingPos.y + 1;
                            newCords.push({x: currentX, y: currentY});
                        } else {
                            let currentX = startingPos.x;
                            let currentY = maxY;
                            newCords.push({x: currentX, y: currentY});
                        }
                    } else {
                        if (newCords[newCords.length-1].y + 1 <= maxY){
                            let currentX = newCords[newCords.length-1].x;
                            let currentY = newCords[newCords.length-1].y + 1;
                            newCords.push({x: currentX, y: currentY});
                        } else {
                            let currentX = newCords[newCords.length-1].x;
                            let currentY = maxY;
                            newCords.push({x: currentX, y: currentY});
                        }
                    }
                    break;
                case 'S':
                    if ( (newCords.length == 0)) {
                        if (startingPos.y - 1 >= 0){
                            let currentX = startingPos.x;
                            let currentY = startingPos.y - 1;
                            newCords.push({x: currentX, y: currentY});
                        } else {
                            let currentX = startingPos.x;
                            let currentY = 0;
                            newCords.push({x: currentX, y: currentY});
                        }
                    } else {
                        if (newCords[newCords.length-1].y - 1 >= 0){
                            let currentX = newCords[newCords.length-1].x;
                            let currentY = newCords[newCords.length-1].y - 1;
                            newCords.push({x: currentX, y: currentY});
                        } else {
                            let currentX = newCords[newCords.length-1].x;
                            let currentY = 0;
                            newCords.push({x: currentX, y: currentY}); 
                        }
                    }
                    break;
                case 'E':
                    if ( (newCords.length == 0)) {
                        if (startingPos.x + 1 <= maxX){
                            let currentX = startingPos.x + 1;
                            let currentY = startingPos.y;
                            newCords.push({x: currentX, y: currentY});
                        } else {
                            let currentX = maxX;
                            let currentY = startingPos.y;
                            newCords.push({x: currentX, y: currentY});
                        }
                    } else {
                        if (newCords[newCords.length-1].x + 1 <= maxX){
                            let currentX = newCords[newCords.length-1].x+1;
                            let currentY = newCords[newCords.length-1].y;
                            newCords.push({x: currentX, y: currentY});
                        } else {
                            let currentX = maxX;
                            let currentY = newCords[newCords.length-1].y;
                            newCords.push({x: currentX, y: currentY});
                        }
                    }
                    break;
                case 'W':
                    if ( (newCords.length == 0)) {
                        if (startingPos.x - 1 >= 0){
                            let currentX = startingPos.x -1;
                            let currentY = startingPos.y;
                            newCords.push({x: currentX, y: currentY});
        
                        } else {
                            let currentX = 0;
                            let currentY = startingPos.y;
                            newCords.push({x: currentX, y: currentY});
        
                        }
                    }else {
                        if (newCords[newCords.length-1].x - 1 >= 0){
                            let currentX = newCords[newCords.length-1].x-1;
                            let currentY = newCords[newCords.length-1].y;
                            newCords.push({x: currentX, y: currentY});
        
                        } else {
                            let currentX = 0;
                            let currentY = newCords[newCords.length-1].y;
                            newCords.push({x: currentX, y: currentY});
         
                        }
                    }
                    break;
            }
        }
        findDirt(data, newCords);
    };

    // final function that will calculate number of dirts cleaned: displaying final hoover position, and dirts cleaned
    const findDirt = (data, newCords) => {
        let finalX = newCords[newCords.length-1].x;
        let finalY = newCords[newCords.length-1].y;
        console.log(finalX, finalY);
        let foundDirt = [];
        let newData = data.splice(2,data.length);
        newData.pop();
        // looping through the dirt patches and if it matches the path the roomba takes, will push into an array
        for ( var i = 0; i < newData.length; i++ ) {
            for ( var e = 0; e < newCords.length; e++ ) {
                // console.log('data ', newData[i]);
                if (( newData[i].x === newCords[e].x) && ( newData[i].y === newCords[e].y)) {
                    foundDirt.push( newData[i] );
                }
            }
        }
        let unique = [...new Set(foundDirt)]; 
        console.log(unique.length);
    }

    const startRoomba = () => {
        extractData(data);
    }

    startRoomba();
});