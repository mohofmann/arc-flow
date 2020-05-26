# arcflow
## A web-based visual development environment for activity recognition

⚠️ Note: **arcflow** was created as a personal scientific project for my graduate thesis. Therefore it is experimental and, just like this readme, in no means complete. At some point I do intend to continue working on it, though.

**arcflow** features a visual editor, a runtime and analytics, all designed for an improved development process. The editor enables creating activity recognition algorithms with reusable components through visual programming. The runtime can execute the resulting algorithms. Lastly, the analytics allow an immediate evaluation of the algorithm based on basic performance metrics
![arcflow interface screenshot](https://i.imgur.com/usfRqEO.png)

## Idea
Activity recognition algorithms usually consist of a chain of certain steps that build on top of each other. Starting with *1. data acquisition*, the algorithm performs *2. preprocessing* on the data, then *3. segments it* and *4. extracts features*. These features can be used to *5. label* and *6. train* a classifier and ultimately perform *7. classification*.

**arcflow** aims to simplify prototyping such algorithms by realizing them as flow consisting of nodes and edges.

## Setup
```
npm install
npm run serve
```

## Usage
#### Adding Nodes
Nodes represent pieces of modular activity recognition functionality. There are some predefined nodes available, which can be added to the canvas by clicking their names in the left sidebar.

>Add a Data Source node to the canvas

#### Modifying Nodes
When added to the canvas, nodes can be moved around by clicking and dragging them. Clicking the dark circle right to their name deletes them. And purely clicking a node opens a contextual sidebar, which shows additional information and configuration options.

>Click on the Data Source node and upload a csv file with data through the contextual sidebar

#### Connecting Nodes
Nodes have inputs and outputs, displayed through white circles on the left (input) and right (output) side of the node.
They can be connected by clicking the output of one node followed by clicking the input of another node.

>Add a **Selector** node to the canvas, and connect the Data Source's output with the Selector's input. Click on the selector node and select one axis (corresponds to a column in your data). Further add a **Log** node and connect its input to the Selector's output

#### Executing Flow
When a functioning chain of nodes has been set up, you can execute it by clicking on the green **Run** button.

>The small algorithm you created now parses a csv file, sends it row by row to the Selector which selects an attribute from that row and sends the attributes one by one to the Log node which finally prints the attribute to the console. Click the green **Run** button to execute the flow and see the outcome in the analytics console.
