# redis-monitor

Nodejs/Express based Redis monitor

<h1>Redis-Monitor in Nodejs/Express</h1>
<h2>Tech Stack</h2>
<ul>
  <li>Nodejs</li>
  <li>Express</li>
  <li>Sqlite</li>
  <li>Sequelize</li>
</ul>  
<p><b>Note:</b>All other dependencies can be viewed in Package.JSON</p>
<h1>How to run this Project</h1>
<h3>Project is hosted on heroku and can be accessed on <a href="https://redis-monitor-kritikal.herokuapp.com/">this </a>link</h3>
<p><b>Note:</b>You can create your own redis server at <a href ="https://redislabs.com/" >Redis Labs </a> </p>


<h3>To access project locally. Follow the following steps </h3>
<p><b>Note</b>Nodejs version 4 or above , npm and Redis must be installed on the computer</p>
<ol>
  <li>Clone this repository</li>
  <li>In terminal: npm install </li>
  <li>npm start</li>
  <li>In the browser go to the following URL : 127.0.0.1:1234 </li>
</ol>

<h2>Following API has been used on the Backend side </h2>
<ol>
  <li>GET: /api/redis_list</li>
  <li>GET: /api/redis_info</li>
  <li>GET: /api/ping</li>
  <li>GET: /api/redis_monitort</li>
  <li>GET: /api/redis/flushall</li>
  <li>POST: /api/add</li>
  <li>POST: /api/del</li>
</ol>

<h2>Screenshots</h2>
<img src="docs/a.jpg">

<hr >
<img src="docs/b.jpg">
<hr >
<img src="docs/c.jpg">
<hr >
<img src="docs/d.jpg">
<hr >
<img src="docs/e.jpg">
<hr >
<img src="docs/f.jpg">
<hr >

<p><b>Note:</b>As this was a Backend assignement front-end part of the code has been used from from the NetEaseGame/redis-monitor repository. Porting of Backend to Nodejs/Express is done by me as asked in assignment</p>
