---

layout: post  
title: Quick sort in Haskell and Python  
categories: haskell python  

---

While reading [Learn you a Haskell for great good][learn-haskell] I found [realization][haskell-qsort] of quick sort algorithm. It's easy to understand in terms of recursion -- for each element sorted array is `"sorted array of elements which are less then current" + "current element" + "sorted array of elements which are greater or equal then current"`.

Realization in Haskell:

    quicksort :: (Ord a) => [a] -> [a]  
    quicksort [] = []  
    quicksort (x:xs) =   
        let smallerSorted = quicksort [a | a <- xs, a <= x]  
            biggerSorted = quicksort [a | a <- xs, a > x]  
        in  smallerSorted ++ [x] ++ biggerSorted

I tried to realize this in Python. That's what I get:

    def qsort(input):
      if input == []: return [] 
      x, xs = input[0], input[1:]
      bigger = qsort(filter(lambda e: e >= x, [ a for a in xs ]))
      smaller = qsort(filter(lambda e: e < x, [ a for a in xs ]))
      return smaller + [x] + bigger

It works pretty well:

    >>> qsort([4,2,6,3,6,4,23,76,3,5,2])
    [2, 2, 3, 3, 4, 4, 5, 6, 6, 23, 76]    
    >>> qsort('Sample text')
    [' ', 'S', 'a', 'e', 'e', 'l', 'm', 'p', 't', 't', 'x']

[learn-haskell]: http://learnyouahaskell.com/chapters
[haskell-qsort]: http://learnyouahaskell.com/recursion#quick-sort
