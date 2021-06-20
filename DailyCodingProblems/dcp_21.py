# Given an array of time intervals (start, end) for classroom lectures (possibly overlapping),
# find the minimum number of rooms required.

# For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.


class Interval():
    def __init__(self, start, end):
        self.start = start
        self.end = end


class Room():
    def __init__(self, interval):
        self.schedule = []
        self.schedule.append(interval)

    def addInterval(self, interval):
        self.schedule.append(interval)


def numRooms(intervals):
    # Start rooms array with the first interval
    rooms = [Room(intervals.pop(0))]

    for interval in intervals:  # For every interval given
        for room in rooms:      # For every room required so far

            # if the interval in question does not overlap with the current room, add it to that room
            if(not overlapSchedule(interval, room.schedule)):
                room.addInterval(interval)
                break

        else:
            rooms.append(Room(interval))

    return len(rooms)


def overlapSchedule(interval, schedule):
    for time in schedule:
        if(areOverlapping(time, interval)):
            return True

    return False


def areOverlapping(interval1, interval2):
    # if either the start or end time of interval 2 fall within interval 1 or vice versa
    return (((interval2.start >= interval1.start and interval2.start <= interval1.end)
             or (interval2.end >= interval1.start and interval2.end <= interval1.end))

            or

            ((interval1.start >= interval2.start and interval1.start <= interval2.end)
             or (interval1.end >= interval2.start and interval1.end <= interval2.end)))


if __name__ == "__main__":
    intervals = [Interval(30, 75), Interval(0, 50), Interval(80, 120), Interval(70, 130), Interval(60, 150)]
    print(numRooms(intervals))
