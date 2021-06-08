def sort_stack(s):
  l = []
  while (not s.isEmpty()):
    l.append(s.pop())

  # l should have every item that was in the stack
  for o in sorted(l, reverse=True):
    s.push(o)
  

  def sort_stack_with_stack(s):
    buffer = []
    buffer.append(s.pop())
    while not s.isEmpty():
      b = buffer.peek()
      n = s.peek()
      if b >= n:
        buffer.push(s.pop())
      else:
        n = s.pop()
        while b < n or buffer.isEmpty():
          s.push(buffer.pop())
          b = buffer.peek()
        s.push(n)