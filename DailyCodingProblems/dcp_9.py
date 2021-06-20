# Given a list of integers, write a function that returns the largest sum of non-adjacent numbers. Numbers can be 0 or negative.
# For example, [2, 4, 6, 2, 5] should return 13, since we pick 2, 6, and 5. [5, 1, 1, 5] should return 10, since we pick 5 and 5.

# Follow-up: Can you do this in O(N) time and constant space?
"""
    [2, 4, 6, 2, 5] -> choose between 2 and 4
    2: has options 6 and 2 -> pass in [6, 2, 5] and choose between 6 or 2
        6: has options 5 -> return 11
        2: has options none -> return 2
    2: chooses 11 -> return 13
    4: has options 2 and 5 -> pass in [2, 5]
        2: has options none -> return 2
        5: has options none -> return 5
    4: chooses 5 -> return 9
    return max(13, 9)
"""
# def largest_sum(l):
#     # choose the larger sum possible from index 0 or 1
#     # by choosing the larger of each option
    
#     # Base case
#     if len(l) <= 2: return max(l, default=0) 

#     o1 = l[0] + largest_sum(l[2:])
#     o2 = l[1] + largest_sum(l[3:]) if len(l) >= 4 else l[1]
#     return max(o1, o2)

def largest_sum(array):
    previous, largest = 0, 0
    for amount in array:
        print("amount: {}; previous: {}; largest: {}".format(amount, previous, largest))
        previous, largest = largest, max(largest, previous + amount)
        print("new_previous: {}; new_largest: {}".format(previous, largest))
    return largest

if __name__ == "__main__":
    # test basics
    print(largest_sum([2, 4, 6, 2, 5]) == 13)
    print(largest_sum([5, 1, 1, 5]) == 10)
    print(largest_sum([5, 2, -1, 1, 7, 9, 10, 21, 0, 1]) == 37)
    print(largest_sum([]) == 0)
    