"""
Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. 
If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.

For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
"""

# dic is the dictionary of words, sent is the sentence to deconstruct
def find_words(dic, sent, i):
    if i == len(sent):
        return []

    for w in dic:
        # print(f'checking {w} at position {i}')
        if(sent.startswith(w, i)):
            rest = find_words(dic, sent, len(w) + i)
            if(rest is not None):
                return [w] + rest

    return None



def main(dic, sent):
    return find_words(dic, sent, 0)

if __name__ == "__main__":
    # print(process_dict(['the', 'quick', 'brown', 'fox']))
    print(main(['the', 'quick', 'brown', 'fox'], 'thequickbrownfox'))
    print(main(['app', 'apple', 'length'], 'applength'))
    print(main(['bed', 'bath', 'bedbath', 'and', 'beyond'], 'bedbathandbeyond'))
    print(main(['aa', 'aaaa', 'aaaaaa', 'aaaaaaaa', 'a'], 'aaaaaaaaaa'))

    # M = len(dict), N = len(sent)
    # O(M*N)