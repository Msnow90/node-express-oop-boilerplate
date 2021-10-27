# Matthew Snow's Alternate Node.js/Express Back End Boilerplate


## Purpose
TL;DR (Advantages) - 
- Reuse
- Dependency Injection for Unit Testing
- OOP Oriented for a Standardized Approach and Encapsulation of that Process
- Manager to Engine Relationship (Controller to Services)


To practice a bit of untraditional OOP while structuring an API's tasks to a standardized approach that enables reuse. This approach is inspired from *Righting Software* and *Clean Architecture*. Basically, an express route is called, which passes the request and response into a Controller instance with a method for that route. That controller's method that corresponds to the route then calls any number of services which are required to fulfill that route's mission. Each service call is an instantiated class, which responds with properties relevant for the controller to make a decision on how to handle them.


