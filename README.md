# How to run the application 

- Clone the project 
- Run npm i
- Run npm run start

## Technologies used

- React (using cra)
- Javascript

## Solving approach

- starting position will the start tile selelectes
- then move in one direction of the child till the end (directions are defined as bottom, right, top, left)
- looping through all the directions and using recurrsion to call the function inside iteself with the updated props
- base case to check if the start and end point matches it will return the path else it will keep on looping
- conditional check to check it does not go beyond 20 (as our matrix is 20 x 20 ) and not below 0 as we move in negative direction


