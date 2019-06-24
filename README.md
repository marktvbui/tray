#Node app. 
To run the app, first pull the repo. Afterwards, open up your terminal or bash, and clone it to your machine.
Afterwards, change the director into the cloned folder, where you will see 2 files: input.txt and tray.io.
Type node tray.io into your terminal/bash, and app should run itself.

Goal
The goal of the program is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

The final hoover position (X, Y)
The number of patches of dirt the robot cleaned up
Input
Program input will be received in a file with the format described here. You can process it however you like.

The file will be named input.txt and reside in the same directory as your executable program / web page.

Example:

5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
the second line holds the hoover position
subsequent lines contain the zero or more positions of patches of dirt (one per line)
the next line then always contains the driving instructions (at least one)
Output
Program output should be printed to the standard output (STDOUT) of the terminal (or equivalent in the browser, console.log())

The first line of your program output should display the X and Y coordinates marking the position of the hoover after processing all commands.
The second line of the program output should display the number of patches of dirt the robot cleaned up
Example (matching the input above):

1 3
1
