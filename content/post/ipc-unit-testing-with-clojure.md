+++
Title = "Informatica PowerCenter unit-testing with Clojure"
Date = "2099-01-01"
Draft = true
+++

I decided to start new project to perform unit-testing and code-quality testing
of Informatica PowerCenter (IPC) code. Basic idea is the following: you get a build
with IPC code, presented as set of XML-files corresponding to IPC objects. Then
you have predefined test-cases, which enforce coding standards and naming policy
in your organization. Then you run all test-cases on each object in build and
get report of the build passing the tests or not.

This strategy can be treated like unit-testing step for IPC.

Previously, I implemented this kind of checks on Python using [py.test]
framework. Everything works fine except that in my current organization Python
is not approved on a corporate level whereas Java is everywhere.

So, I decided to use [Clojure] for this type of work.

[py.test]: http://pytest.org
[Clojure]: http://clojure.org
