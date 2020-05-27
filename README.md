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
##### Mini-Tutorial
>When opening arcflow, you see a blank canvas with only one node inside: The start node. It serves as the entry point and clock for the algorithm. Now add a new Data Source node to the canvas

#### Modifying Nodes
When added to the canvas, nodes can be moved around by clicking and dragging them. Clicking the dark circle right to their name deletes them. And purely clicking a node opens a contextual sidebar, which shows additional information and configuration options.
##### Mini-Tutorial
>Click on the Data Source node and upload a csv file with data through the contextual sidebar. Make sure the csv file has its column names in the first line so it gets correctly parsed.

#### Connecting Nodes
Nodes have inputs and outputs, displayed through white circles on the left (input) and right (output) side of the node.
They can be connected by clicking the output of one node followed by clicking the input of another node.
##### Mini-Tutorial
>Connect the Start node's output with the Data Source node's input. Add a **Selector** node to the canvas, and connect the Data Source's output with the Selector's input. Click on the selector node and select one axis (corresponds to a column in your data). Further add a **Log** node and connect its input to the Selector's output, like shown below

![arcflow tutorial screenshot](https://i.imgur.com/RoCDz5V.png)

#### Executing Flow
When a functioning chain of nodes has been set up, you can execute it by clicking on the green **Run** button.
##### Mini-Tutorial
>The small algorithm you created now parses a csv file, sends it row by row to the Selector which selects an attribute from that row and sends the attributes one by one to the Log node which finally prints the attribute to the console. Click the green **Run** button to execute the flow and see the outcome in the analytics console.

## Included Nodes
| Name														| Inputs  										| Outputs  						| Description  				|
| ------------------------------- | --------------------				| ------------------- | ------------------- |
| Datasource 											| -     											| Sample 							| Reads and parses a CSV file and sends it row by row |
| Selector 												| Sample     									| Filtered Sample 		| Selects any axes from a sample and outputs it |
| Segmentation 										| Values, Index Sample  			| Segment 						| Builds a segment around a given index |
| Magnitude 											| Sample     									| Magnitude Value 		| Calculates the magnitude of the input sample |
| Squared Magnitude 							| Sample     									| Sq. Magnitude Value | Calculates the squared mag- nitude of the input sample |
| Lowpass Filter							 		| Values     									| Filtered Values		 	| Applies a lowpass filter |
| Peak Detector 									| Values     									| Peak Index, Values 	| Detects peaks in a stream of values 
| Subsegmentor								 		| Segment     								| Subsegments 				| Splits a segment into n subsegments |
| Mean Extractor							 		| Segment     								| Mean value 					| Calculates the mean over a sample |
| Median Extractor 								| Segment     								| Median value 				| Calculates the median over a sample |
| SMA Extractor 									| Segment     								| SMA Value 					| Calculates the SMA over a sample |
| Min Extractor 									| Segment     								| Minimum Value 			| Calculates the minimum over a sample |
| Max Extractor 									| Segment											| Maximum Value 			| Calculates the maximum over a sample |
| SD Extractor 										| Segment											| SD Value 				 		| Calculates the standard deviation over a sample |
| Variance Extractor 							| Segment											| Variance Value 			| Calculates the variance over a sample |
| Feature Vector 									| Features										| Vector 							| Merges n features into a feature vector |
| Feature Table 									| Feature Vectors							| Feature Table				| Builds a feature table out of n feature vectors |
| KNN Classifier							 		| Feature Table, Lables Table | - 									| Predicts features through KNN |
| SVM Classifier 									| Feature Table, Lables Table	| -									 	| Predicts features through SVM | 
| Event Labeler								 		| Peak Indices     						| Event Labels 				| Reads and parses a CSV file containing ground truth labels and maps them to segments |
| Splitter							 					| Signal	     								| Data 			 					| Splits incoming signal onto multiple outputs |
| Log 														| Signal	     								| Signal 			 				| Prints the incoming values in the console |

## Extensibility
By running
`
npm run generate
`
a little CLI helps you scaffold a new node, which you can then overwrite with custom functionality

## License
tbd
