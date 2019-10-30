"""
You are given an M by N matrix consisting of booleans that represents a board. Each True boolean represents a wall. Each False boolean represents a tile you can walk on.
Given this matrix, a start coordinate, and an end coordinate, return the minimum number of steps required to reach the end coordinate from the start. 
If there is no possible path, then return null. You can move up, left, down, and right. You cannot move through walls. You cannot wrap around the edges of the board.
For example, given the following board:
"""
board = [[False, False, False, False], 
         [True, False, False, True],
         [False, False, False, False], 
         [False, False, False, False]]
         
travelledTo = []

def main():
    stepsToEnd((3,0), (0,0))

done = False

# Takes in 2 tuples and will recurse until solution is found
def stepsToEnd(start, end, count=0):
    global done
    # Recursion ends when start == end
    if(start == end): 
        done = True
        print(count)
        return

    if(done):
        return
    
    # Step 1: Find the possible movements, do not retrace steps?
    validMoves = [] # Array of moves IN ORDER

    # Up one is [m-1][n]
    up = (start[0] - 1, start[1])
    if(up[0] >= 0):
        if(not board[up[0]][up[1]] and not beenTo(up)):
            validMoves.append(up)
    
    # Down one is [m+1][n]
    down = (start[0] + 1, start[1])
    if(down[0] < len(board)):
        if(not board[down[0]][down[1]] and not beenTo(down)):
            validMoves.append(down)

    # Left one is [m][n-1]
    left = (start[0], start[1] - 1)
    if(left[1] >= 0):
        if(not board[left[0]][left[1]] and not beenTo(left)):
            validMoves.append(left)

    # Right one is [m][n+1]
    right = (start[0], start[1] + 1)
    if(right[1] < len(board[0])):
        if(not board[right[0]][right[1]] and not beenTo(right)):
            validMoves.append(right)

    # In the case that no valid moves are left, the end must be impossible to reach
    if(len(validMoves) == 0):
        print('Not Possible')
        done = True
        return
    # Step 2: Calculate the Euclidean distance from the end for each Valid Move
    # This can probably be combined with the previous step

    orderedMoves = [validMoves.pop(0)]

    for t in validMoves:
        h = dist(t, end)                        # Calculate the heuristic
        for i in range(len(orderedMoves)):      # For the ordered values so far
            if h < dist(orderedMoves[i], end):  # Slightly inefficient, because same distance is being calculated multiple times 
                orderedMoves.insert(i, t)       # Insert the new value at the index where it is less than the 
                break
        else: orderedMoves.append(t)            

    # Step 3: Recurse
    travelledTo.append(start)
    for st in orderedMoves:
        stepsToEnd(st, end, count+1)

# This function checks if the space in question has been visited 
def beenTo(space):
    global travelledTo

    for t in travelledTo:
        if(t == space):
            return True
    
    return False

# Takes in tuples only 
def dist(p1, p2):
    return (p1[0]-p2[0])**2 + (p1[1]-p2[1])**2

if __name__ == "__main__":
    main()
