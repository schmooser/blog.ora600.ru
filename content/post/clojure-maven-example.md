+++
Title = "Clojure Maven example"
Date = "2015-07-15"
+++

Standard mechanism to dealing with Clojure projects is Leiningen. But if you
want to use Clojure code in big enterprize where most things are writte in Java
chances that you don't have Leiningen available. But there is Maven as a tool to
build and deploy Java projects.

So, in such case you might want to use Maven to build Clojure project. To build
Clojure with Maven there is a plugin [clojure-maven-plugin]. The trickiest part
here is to prepare `pom.xml` file which will be used by Maven to build the
project.

Without further words, I show you the code - [clojure-maven-example]. The most interesting part is the
`pom.xml` file.

To run the code, install Maven (and git), then clone repository somewhere, cd
there and run:

    $ mvn clean install && java -jar target/clojure-maven-example-1.0-SNAPSHOT.jar

Useful links:

* [How to use Maven to build Clojure code](http://alexott.net/en/clojure/ClojureMaven.html)
* [Example Clojure project plotting Mandelbrot set building with Maven](https://github.com/yogthos/clojure-maven-examples)

[clojure-maven-plugin]: https://github.com/talios/clojure-maven-example
[clojure-maven-example]: https://github.com/schmooser/clojure-maven-example
