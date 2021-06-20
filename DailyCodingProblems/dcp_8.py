# A unival tree (which stands for "universal value") is a tree where all nodes under it have the same value.
# Given the root to a binary tree, count the number of unival subtrees.
# For example, the following tree has 6 unival subtrees:

#    0
#   / \
#  1   0
#     / \
#    1   0
#   / \   \
#  1   1   0

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def getRoots(self):
        # requires each node to be treated as a root
        arr = [] # variable that will store each node
        def encode(node):
            if node:
                arr.append(node)
                encode(node.left)
                encode(node.right)
        
        encode(self) # Add the current Node and its children to the array
        return arr

    def isUnival(self):
        
        # For each node there are 4 possible cases:
        #         
        if(self.left and self.right): # Both children exist
            if(self.left.isUnival() and self.right.isUnival() and self.left.val == self.val and self.right.val == self.val):
                return True # Return true when both children are Unival and share the same value as the root
            else:
                return False

        elif(self.left and not self.right): # Only the left child exists
            if(self.left.isUnival and self.left.val == self.val):
                return True # Return true when the left child is Unival and shares the same value as the root
            else:
                return False

        elif(self.right and not self.left): # Only the right child exists
            if(self.right.isUnival and self.right.val == self.val):
                return True # Return true when the right child is Unival and shares the same value as the root
            else:
                return False

        elif(not self.left and not self.right): # Neither child exists
            return True # Always return true
        
        
        

def main():
    numOfUnivalTrees = 0
    node = Node(0, Node(1), Node(0, Node(1, Node(1), Node(1)), Node(0, None, Node(0))))
    
    # Unival tree is when the value of each child equals the value of the root 
    # Step 1: break the tree into each subtree
    roots = node.getRoots()

    # Step 2: run each subtree through isUnival to determine if the subtree is unival and 
    for r in roots:
        if(r.isUnival()):
            numOfUnivalTrees += 1 # increment counter for the number of trees

    print(numOfUnivalTrees)
        


if __name__ == "__main__":
    main()