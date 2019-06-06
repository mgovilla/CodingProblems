#
#
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def main():
    node = Node('root', Node('left', Node('left.left')), Node('right'))
    #print(deserialize(serialize(node)).left.left.val)
    serialize(node)
    print(node.val)
    

def serialize(node):
    if(node.left.val == None and node.right.val == None):
        return
    
    

def deserialize(string):
    return


if __name__ == "__main__":
    main()