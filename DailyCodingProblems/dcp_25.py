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
    # go through each node and keep a pointer to the node that was n begind

    count=0
    temp = to_remove = l
    while(temp is not None):
        if(count >= n+1):
            to_remove = to_remove.next
       
        count += 1
        temp = temp.next

    to_remove.next = to_remove.next.next

    return l

def nodeAsList(l):
    out, temp = [], l
    while temp is not None:
        out.append(temp.val)
        temp = temp.next

    return out

if __name__ == "__main__":
    test_1 = Node(1, Node(2, Node(3, Node(4, Node(5)))))
    print(nodeAsList(removeNthLast(test_1, 2)))