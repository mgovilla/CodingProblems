# You run an e-commerce website and want to record the last N order ids in a log.
# Implement a data structure to accomplish this, with the following API:

# You should be as efficient with time and space as possible.
 
class OrderLog: # Data structure for log
    def __init__(self):
        self.orders = [] # Create an array for the IDs

    def get_last(self, i): # Gets the ith last element from the log.
        lastIndex = len(self.orders) - 1
        return self.orders[lastIndex - i: lastIndex]

    def record(self, order_id): # Adds the order_id to the log
        self.orders.append(order_id)

def main(): 
    log = OrderLog()
    for i in range(20):
        log.record(i)
    print(log.get_last(5))
    print(log.get_last(1))

if __name__ == "__main__":
    main()