borderchart
===========

Author: Daniel Simons<br />
Author Email: daniel.simons1@gmail.com<br />
Version: 1.0.0<br />
License: Free General Public License (GPL)<br />

<h2>Brief</h2>
jQuery Charting Plugin.  You supply the data and borderchart builds a chart in the form of a colored border around your html element. 

Very easy to implement please follow the instructions below:

<h3>HTML</h3>

Include jquery and jquery.borderchart.js
Define the element on which you want to create a borderchart.
```html
<!DOCTYPE html>
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script src="jquery.borderchart.js"></script>
<link href="borderchart.css" rel="stylesheet" type="text/css">
</head>
<body>
  <img style="height:150px;width:220px" class="borderchart" src="profile.jpg">
</body>
</html>
```

<h3>Javascript</h3>

Add the following code to your JavaScript file typically on a document.ready:

```javascript
 $(function() {
 	$('.borderchart').borderchart();
 });
```

<h3>Plugin Options</h3>
```javascript

$('.borderChart').borderchart({
          //the width of the chart border
          strokeWidth: 15,
          //the data used to construct your chart
	        dataset: [{
	            data: 10,
	            color: '#2c3969'
	        }, {
	            data: 10,
	            color: '#415989'
	        }, {
	            data: 10,
	            color: '#a4bfd2'
	        }, {
	            data: 10,
	            color: '#a4c892'
	        }, {
	            data: 10,
	            color: '#bce0ae'
	        }, {
	            data: 10,
	            color: '#ffac29'
	        }, {
	            data: 10,
	            color: '#edf0f2'
	        }, {
	            data: 10,
	            color: '#f2e8da'
	        }, {
	            data: 10,
	            color: '#c6beb4'
	        }, {
	            data: 10,
	            color: '#e74e34'
	        }]
	    });
```

<h3>Minimum CSS styles</h3>

```css
.color-line-wrapper {position:absolute;}
.color-line {display:inline-block;position:absolute; }
.color-border-wrapper {position:relative;}
.color-border-wrapper img {position:relative;}

```
