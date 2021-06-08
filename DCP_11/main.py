"""
Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.
For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].
"""

# could sort lexicographically and then searches are in log(n) time

def autocomplete(start, dictionary):
    # perform binary search
    lo = 0
    hi = len(dictionary)-1
    i = (lo+hi) // 2
    l = []

    while lo <= hi:
        i = (lo + hi) // 2

        if start < dictionary[i]:
            hi = i - 1
        elif start > dictionary[i]:
            lo = i + 1 
        else:
            break

    if dictionary[i].startswith(start):
        l.append(dictionary[i])

    while True:
        i+=1
        if i >= len(dictionary) or not dictionary[i].startswith(start):
            break
        
        l.append(dictionary[i])
        
    return l


def main():
    # sort the dictionary 
    dictionary = ['dog', 'deer', 'deal']
    d = sorted(dictionary)
    print(autocomplete('dee', d))

if __name__ == "__main__":
    main()