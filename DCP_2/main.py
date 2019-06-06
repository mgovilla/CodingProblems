#Given an array of integers, return a new array such that each element at index i of the new array is the product of all the numbers in the original array except the one at i.
#
#For example, if our input was [1, 2, 3, 4, 5], the expected output would be [120, 60, 40, 30, 24]. If our input was [3, 2, 1], the expected output would be [2, 3, 6].
#
#Follow-up: what if you can't use division?

input = [1, 2, 3, 4, 5]
index = 0

def main():
    print(products(input))


def products(list):
    global index
    product = getProductOf(list)
    output = []
    for i in list:
        output.append(product / i)
        index = index + 1
    return  output

def getProductOf(list):
    product = 1
    for v in list:
        product = product * v
    
    return product


if __name__ == "__main__":
    main()