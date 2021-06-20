#Given a list of numbers and a number k, return whether any two numbers from the list add up to k.
#
#For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

input = [6, 15, 2, 9, 6]
k = 9

def main():
    print(sumToK(input, k))

def sumToK(list, sum):
    lookingFor = []
    for i in list:
        if(contains(i, lookingFor)):
            return True
        else:
            lookingFor.append(sum - i)

    return  False

def contains(value, list):
    for v in list:
        if(v == value):
            return True
    
    return False

if __name__ == "__main__":
    main()