# 
#

class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def main():
    node = Node('root', Node('left', Node('left.left')), Node('right'))
    node2 = Node('root', Node('left', Node('left.left')), Node('right', None, 'right.right'))
    #print(deserialize(serialize(node)).left.left.val) # == 'left.left'
    print(serialize(node2))
    #print(deserialize(serialize(node)))
    
def serialize(dot):
    layer = [dot]
    serialized = ''

    for n in layer:
        if n == None:
            break

        layer.append(n.left)
        layer.append(n.right)

        serialized = serialized + n.val + ', '

    return serialized[:-2]      

def deserialize(data):
    array = data.split(", ")

    return array


if __name__ == "__main__":
    main()