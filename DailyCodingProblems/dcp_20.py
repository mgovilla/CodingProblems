# Given two singly linked lists that intersect at some point, find the intersecting node. The lists are non-cyclical.
# For example, given A = 3 -> 7 -> 8 -> 10 and B = 99 -> 1 -> 8 -> 10, return the node with value 8.
# In this example, assume nodes with the same value are the exact same node objects.
# Do this in O(M + N) time (where M and N are the lengths of the lists) and constant space.

class Node:
    def __init__(self, val, n=None):
        self.val = val
        self.n = n

# returns the length of l 
def length_of_linked_list(l):
    temp, count = l, 0
    while(temp is not None):
        temp = temp.n
        count+=1
    
    return count

def intersection(A, B):    
    # And B are singly linked lists
    a, b = length_of_linked_list(A), length_of_linked_list(B)
    
    node_a = A
    node_b = B
    if a > b:
        for i in range(a-b):
            node_a = node_a.n
    else:
        for i in range(b-a):
            node_b = node_b.n

    while(node_a.val != node_b.val):
        node_a = node_a.n
        node_b = node_b.n
    
    return node_a

if __name__ == "__main__":
    # Example lists
    list1 = Node(3, Node(7, Node(8, Node(6))))
    list2 = Node(1, Node(2, Node(10)))
    print(length_of_linked_list(list1))
    print(intersection(list1, list2))