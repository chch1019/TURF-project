# Demonstration of Model Builder Extension for Turf.js

<h1>About us:</h1>
<ul>
<b>This project was created by GeoSpinn, a team of MSc (International) Geomatics students 
	at the Karlsruhe University of Applied Sciences. The task was to create an extension 
	of the existing turf.js spatial analysis library with additional functionalities that 
	make it possible to describe a spatial analysis model using a combination of more than 
	one turf-algorithm, in one step. The application does this by having one button to 
	run a specific model as though it was a core algorithm of the turf.js library. 
	The application is based on openlayers 3 and implements the model functionality using 
	a combination of the following functions: buffer, intersect, union, difference, combine 
	of turf.js. The web application makes use of a dataset consisting of two layers: 
	administrative areas of Baden-Wurttemberg and points with radiation.<br></b>
	 
 <b>Developer of Model Builder Extension for Turf.JS, the Team Members are: </i> <br>
        <li>1. Chaitanya Krishna Chirumamilla</li>
        <li>2. Shahab Ahmed</li>
        <li>3. Belayet Mohammad Fuad Amin</li>
        <li>4. Keneuoe Anne Maliehe</li>
         <br>
      
</ul>
<h1>Example data:</h1>
Two example datasets were used: 
<br>
<ul>
<li>A series of radiation measurements obtained from different stations distributed all over Germany. Data has been downloaded from 
		the <a target="_blank" href="https://raw.githubusercontent.com/HsKA-OSGIS/EurOS/master/Radiation.csv"> 
		website </a> as (CSV-file). Then this file was added to QGIS (add Delimited text layer) and setting the 
		geographic reference to WGS84. In order to extract one time slice a selection by exrpression was uesd 
		by selecting the radiation measurements at this date (10.12.2015) and time (00:00:00), then the selected 
		data point has been exported as GeoJson.</li>
<li>Administrative areas of Germany as a shape-file downloaded from 
<a target="_blank" href="http://www.geodatenzentrum.de/geodaten/gdz_rahmen.gdz_div?gdz_spr=eng&gdz_akt_zeile=5&gdz_anz_zeile=1&gdz_unt_zeile=15&gdz_user_id=0">BKG</a>. 
The areas are of the type “MultiPolygons”. QGIS was used to convert the areas to the type “Polygon” then exported to a GeoJson afterwards. Regarding 
the use of the data, please refer to <a target="_blank" href="http://www.geodatenzentrum.de/geodaten/gdz_rahmen.gdz_div?gdz_spr=eng&gdz_akt_zeile=5&gdz_anz_zeile=1&gdz_unt_zeile=15&gdz_user_id=0">BKG</a>
. © GeoBasis-DE / <a target="_blank" href="https://www.bkg.bund.de/DE/Home/home.html">BKG</a> 2017.
<li>Administrative areas of Baden-Wurttemberg. Administrative areas of the whole of Germany in the form of a
		 shape-file were downloaded from 
		<a target="_blank" href="http://www.diva-gis.org/datadown">DIVA-GIS</a>. The areas were of the type “Polygons” 
		and were processed in QGIS. A select by attribute statement was used to isolate only the areas of Baden-Wurttemberg from the dataset. 
		The resultant polygons were then exported as ."geojson. The application uses data of type ".geojson" Regarding the 
		use of the data, please refer to 
		<a target="_blank" href="http://www.diva-gis.org/about">DIVA-GIS.</a>
		
</ul>
<h1>Setup:</h1>
<ul>
Download the code, then insert it under a localhost / hosted server environment. Make sure 
that you have internet connection when you use localhost, because the base layer tiles are 
requested from the <a target="_blank" href="https://www.openstreetmap.org/">OpenStreetMap</a> server. 
The website used <a target="_blank" href="https://docs.angularjs.org/api/ngRoute/provider/$routeProvider">Angular.js routing</a>, 
so make sure that you change the base href value to match with your environment's <a target="_blank" href="http://www.w3schools.com/tags/tag_base.asp">base url</a>. 
The default .geojson layers are inside the Data folder. You can add additional layers using the drag and drop functionality.
</ul>

```html
In case of: localhost/projectname/
<head>
    <base href="/projectname/">
</head>
In case of: www.yourdomain.xyz/
<head>
    <base href="/">
</head>
```
Moreover User of this application can also download the radiation-webgis-app-modelbuilder file and use python to run it - 
`python -m SimpleHTTPServer 8000` from python sell.
<h1>Functionalities:</h1>
<ul>
  <li>1. Map window: contains the base map and the vector layers</li> <br>
  <li>2. Layer switcher: helps you to keep track of your layers ( layer-tree )</li> <br>
    
      <ul>
        <li>2.1. Remove layers</li>
        <li>2.2. Set visibility</li>
        <li>2.3. Layer sorting</li>
        <li>2.4. Layer-group sorting</li>
        <li>2.5. Downloading the vector layer's source as .geojson</li>
        <li>2.6. Set the layers to editable/non-editable</li> <br>
      </ul>
    
  <li>3. Toolbox: contains the available tools</li>
    
        <ul>
          <li>3.1. Buffer ( point, line, polygon, multipolygon, multilinestring, featurecollection )</li>
          <li>3.2. Union ( two or more polygons )</li>
          <li>3.3. Within ( finds the points of a seelcted point layer within a polygon/multipolygon )</li>
          <li>3.4. Nearest ( finds the nearest point to the selected point )</li>
          <li>3.5. Voronoi ( generates voronoi polygons on three or more points )</li>
          <li>3.6. Model ( adds the above operations to a toolbox and executes them in one function )</li> <br>
      </ul>
      
        <li>4.	Model dialogue box</li> <br>
    
        <ul>
          <li>4.1. Model title: assign a name for the model</li>
          <li>4.2. Model selection: Possibility to choose the model (json format)</li>       
          <li>4.3 Help tab: user guidelines pertaining to how to create own model and add new layers</li>
          <li>4.4. A JSON example tab: user guidelines on how to create a model</li>
          <li>4.5. Create: visualise/build the selected model</li>
          <li>4.6. Close: close the model dialogue box </li> <br>
      </ul>
    
  <li>5. Modals</li>
  
    <ul>
      <li>Form validation</li>
      <li>Styling</li>
      <li>Help box</li>
    </ul>
</ul>
<h1>Libraries used:</h1>
<ul>
  <li><a target="_blank" href="https://angularjs.org/">Angular.js</a> for: routing, template management (directives)</li>
  <li><a target="_blank" href="https://jquery.com/">JQuery</a> for: template management</li>
  <li><a target="_blank" href="http://jqueryui.com/">JQuery UI</a> for: event based user interface functionalities, for example: draggables, sortables, dialogs</li>
  <li><a target="_blank" href="http://mjsarfatti.com/sandbox/nestedSortable/">nestedSortable plugin for jQueryUI</a> for: Tree sorting</li>
  <li><a target="_blank" href="http://requirejs.org/">Require.js</a> for: .js codebase management.</li>
  <li><a target="_blank" href="https://openlayers.org/">OpenLayers 3</a> for: layer rendering, core map functionality</li>
  <li><a target="_blank" href="http://blog.ivank.net/voronoi-diagram-in-javascript.html">Voronoi</a></li>
  <li><a target="_blank" href="http://turfjs.org/">Turf.js</a> for: geospatial tools</li>
  <li><a target="_blank" href="https://bgrins.github.io/spectrum/">Spectrum.js</a> for: color picker</li>
  <li><a target="_blank" href="http://getbootstrap.com/">Bootstrap 3</a> for: layout</li>
</ul>
<h1>Known bugs:</h1>
<ul>
The buffer polygons created by turf.js are rendered with distortion when the application's 
default rendering projection is set to 
<a target="_blank" href="http://spatialreference.org/ref/sr-org/7483/">EPSG:3857</a>, 
known as Web Mercartor. 
<br><br>
This happens, because the turf.js library calculates only with 
<a target="_blank" href="http://spatialreference.org/ref/epsg/wgs-84/">EPSG:4326</a> 
coordinates and does not consider the Earth's curvature when generating the buffer geometry. 
This results in distorted geometries. The distortion increases with distances from the equator.
<br><br>
Because of that we decided to set the application's default projection to EPSG:4326. In 
this case the base OSM raster tiles are slightly distorted, but the generated geometries 
are correct. We made this decision because the aim of the project was the implementation 
of turf.js for creating correct geometries, and achieving that was more important than the baselayer. 
<br><br>

</ul>

<h1>Known limitations:</h1>
<ul>
Loading of big layers from a folder may take long time, depending on your internet connection.
 It happens because that way the page must download the layers from the webserver every time 
 when you load the page. Please use smaller .geojson files in order to avoid the slow pageloads. 
 It is possible to fix this effect by implementing a layer loading strategy for the given 
 map extent. You can do this with for example with WMS services using GeoServer / MapServer 
 or with direct ajax get requests using GEOPHP + PGSQL. Using them, you have the ability to 
 create a layer request strategy for the current extent.
</ul>

<h1>License information:</h1>
<ul>
<b><a href="https://opensource.org/licenses/MIT">MIT license:</a> </b>Permission is 
hereby granted, free of charge, to any person obtaining a copy of this software and 
associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:
<br>
<br>
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</ul>
