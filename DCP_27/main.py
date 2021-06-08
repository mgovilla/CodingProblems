"""
Given a string of round, curly, and square open and closing brackets, return whether the brackets are balanced (well-formed).
"""

"""
Idea 1: 
"""
def main():
    string = "([])[]"
    print(wellFormed(string))

def wellFormed(brackets):
    if(len(brackets) % 2 == 1):
        return False

    print(brackets)



if __name__ == "__main__":
    main()