# Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.
# For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.
# In this example, assume nodes with the same value are the exact same node objects.
# Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.

# Naive approach: go backwards until uncommon (assuming that the lists can be searched backwards 
#   and point to the same things)

# Not necessarily same index into the shared list


def intersection(A, B):    
    # To go backward, define the last index
    lastA = len(A) - 1
    lastB = len(B) - 1

    for i in range(len(A)):
        # Start from the last index and move backward
        indexA = lastA - i
        indexB = lastB - i

        if(A[indexA]!=B[indexB]):   # When the lists are different, then the intersection point must have been 
            return A[indexA + 1]    # the value searched before


if __name__ == "__main__":
    # Example lists
    list1 = [3, 7, 8, 10]
    list2 = [1, 8, 10]

    print(intersection(list1, list2))