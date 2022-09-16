# React rendering event senior

## Launch project

First clone the project, then npm install & start and you're good to go !

## Steps

1 - Find end time adding duration to the start time

2 - Sort slots by duration and start time

3 - Find for each slot how many other slots are overlapping

4 - Determine width of slots - width

5 - Find the horizontal position of slots on the screen (1/3, 2/3 ...) - position

6 - Find the ratio divided by the width. 
This is a special case needed when slots A<->B<->C and C<->D overlap. A, B and C will be 1/3 of the screen each and D will be 2/3. - widthRatio

So the style of each component is determined like so :
width = (widthRatio / width) * 100
left = (position / width) * 100