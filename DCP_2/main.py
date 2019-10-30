#Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
#
#For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
#
#Follow-up: what if you can't use division?

input = [1, 2, 3, 4, 5]
j = 0
def main():
    print()
    



def products(list):
    plist = []
    product = findProduct(list)

    for i in list:
        plist[i] = i

    return  plist

def findProduct(list):
    for i in list:
        

if __name__ == "__main__":
    main()