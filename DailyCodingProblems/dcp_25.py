"""
Given a singly linked list and an integer k, remove the kth last element from the list. k is guaranteed to be smaller than the length of the list.

The list is very long, so making more than one pass is prohibitively expensive.

Do this in constant space and in one pass.
"""

class Node: 
    def __init__(self, val, next=None) -> None:
        self.val = val
        self.next = next

def removeNthLast(l, n):
    # go through each node
    # remove the node and save, then if we were wrong, add it back
    # 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 remove (2nd to last = 6)
    # 1 -> x -> 3 -> 4 -> 5 -> 6 -> 7 remove (2nd to last = 6)
    
    # one pass, constant space
    # 

    return l

def nodeAsList(l):
    out, temp = [], l
    while temp is not None:
        out.append(temp.val)
        temp = temp.next

    return out

if __name__ == "__main__":
    test_1 = Node(1, Node(2, Node(3)))
    print(nodeAsList(removeNthLast(test_1, 2)))