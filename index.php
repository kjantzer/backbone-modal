<html>
<head>

<title>Modal Component for Backbone.js Apps</title>

<meta charset="utf-8"> 

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44608486-1', 'kjantzer.github.io');
  ga('send', 'pageview');

</script>

<link href="style.css" rel="stylesheet" type="text/css">

<script src="demo-build.js"></script>

</head>
<body>


<a href="https://github.com/kjantzer/backbone-modal" class="github-corner"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#fff; color:#2196F3; position: absolute; top: 0; border: 0; right: 0;"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>

<header>
    
    <nav class="menu">
        <a class="menu-btn" onclick="this.parentNode.classList.toggle('open')"><img src="lib/list.png"></a>
        <ul>
            <?php
            $menu = file_get_contents('https://gist.githubusercontent.com/kjantzer/9abbb6cc17d1b6699221/raw');
            $menu = $menu ? json_decode($menu, true) : array();
            foreach($menu as $item):?>
            <li><a href="http://kjantzer.github.io/<?php echo $item['key'] ?>">
                <?php echo $item['label'] ?>
                <div class="description"><?php echo isset($item['description']) ? $item['description'] : '' ?></div>
            </a></li>
            <?php endforeach; ?>
        </ul>
    </nav>
    
    <h1>Modal</h1>
    
    <h3>Create clean modal windows with sleek transitions and a simple API.</h3>
    
    <div>
        <a class="button" onclick="Modal.alert('Hello There!', 'I’m a generalized alert modal')">Show Modal</a>
    </div>
    
</header>

<section>
    
    <h1>Overview</h1>
    
    <p><b>Version 1.0.1</b></p>
    
    <p>Native alert views are ugly and very limiting; this plugin was designed to replace native <code>alert()</code> and provide additional features commonly needed in apps.</p>
    
    <p>It has been developed with a simple and extensible API to make using modals easy.</p>
    
    <blockquote>
        <p>Modal.js defaults to using cutting-edge css3 <a href="http://caniuse.com/#feat=flexbox">flexbox</a> for the layout. This can be turned off if you wish to support older browsers. Flexbox ensures the text is nice and sharp.</p>
    </blockquote>
    
    
    <hr>
    
    <h1>Using Modal</h1>
    
<pre>
var myModal = new Modal({
    title: '',
    msg: '',
    btns: ['ok'],
    theme: 'ios7',
    w: null,
    effect: 1,
})
</pre>

    <hr>
    
    <h1>Modal Presets</h1>
    
    <p>Various presets have been defined for common application actions such as "alert", "confirm", "confirmDelete", "prompt" and showing a spinner.</p>
    
    <p>Most of the parameters, such as <code>title</code> and <code>msg</code> can be optional and will fallback to defaults. Therefore, params are taken in order from the right.</p>
    
    <blockquote>
        <p>For example, if params are <code>title, msg, callback</code> but only one parameter is given, it will be assumed as the <code>callback</code>. If two params, <code>msg</code> and <code>callback</code> are assumed, and so on.</p>
    </blockquote>
    
    <br>
    <h2><code>Modal.alert(msg)</code> or <code>Modal.alert(title, msg)</code></h2>
    
    <p>
        <a class="button" onclick="Modal.alert('Alert Title', 'Display any kind of message here.')">Alert</a>
        <a class="button" onclick="alertLong()">Alert with Long Message</a>
    </p>
    
    
    <br>
    <h2><code>Modal.confirm(title, msg, callback)</code></h2>
    
    <p>Title and msg are optional; if you leave them out, defaults will be used.</p>
    
    <p><a class="button" onClick="confirmBtn()">Confirm</a></p>
    
    <script>confirmBtn=function(){
        Modal.confirm(function(){
            Modal.alert('You choose to confirm the action.')
        })
    }</script>
    
<pre>
Modal.confirm(function(){
    Modal.alert('You choose to confirm the action.')
})
</pre>


    <br>
    <h2><code>Modal.confirmDelete(title, msg, callback)</code></h2>

    <p>Like confirm, title and msg are optional; if you leave them out, defaults will be used.</p>

    <p><a class="button" onClick="confirmDeleteBtn()">Confirm Delete</a></p>

    <script>confirmDeleteBtn=function(){
        Modal.confirmDelete(function(){
            Modal.alert('You choose to delete.')
        })
    }</script>

<pre>
Modal.confirmDelete(function(){
    Modal.alert('You choose to delete.')
})
</pre>

    <br>
    <h2><code>Modal.prompt(title, msg, opts, callback)</code></h2>

    <p>This preset allows for asking the user in input some data. The prompt can be set to validate based on a regexp pattern.</p>

    <p>
        <a class="button" onClick="promptBtn()">Prompt</a>
        <a class="button" onClick="promptBtn({h:100})">Prompt Textarea</a>
        <a class="button" onClick="promptBtn({pattern:'number', placeholder: 'Enter number'})">Prompt for Number</a>
    </p>

    <script>promptBtn=function(opts){
        Modal.prompt('Type Anything', '', opts||{}, function(val){
            Modal.alert('You typed:', val)
        })
    }</script>

<pre>
Modal.prompt('Type Anything', '', {}, function(val){
    Modal.alert('You typed:', val)
})
</pre>

    <p><b>Prompt Options</b></p>
    
<pre>
{
    okBtn: 'Ok',
    password: false,
    placeholder: 'Enter value...',
    val: '', // prefill the input
    pattern: null, // a regex or preset (string, integer, number, year)
    h: null // add height for textarea
}
</pre>


    <br>
    <h2><code>Modal.spinner()</code></h2>

    <p>Shows a spinner with no way to close it. Ideal when you want to show progress, but not let the user click around.</p>

    <p><a class="button" onClick="spinnerBtn()">Spinner</a></p>

    <script>spinnerBtn=function(){
        Modal.spinner();
        setTimeout(function(){ Modal.spinner(false); }, 2000);
    }</script>

<pre>
Modal.spinner();

// you can hide the spinner when ready
Modal.spinner(false);
</pre>

    <p>You can show the spinner in a regular Modal too, by using <code>title:'spinner'</code>.</p>
    
    <p><a class="button" onClick="spinnerBtnMsg()">Spinner with Message</a></p>

    <script>spinnerBtnMsg=function(){
        new Modal({ title: 'spinner', msg: 'Waiting for response', btns:['cancel']})
    }</script>

<pre>
new Modal({
    title: 'spinner',
    msg: 'Waiting for response',
    btns:['cancel']
})
</pre>

    <br>
    <h2><code>Modal.progress()</code></h2>

    <p>Shows modal with no buttons. Save the created modal to a variable and use <code>.progress()</code> method to show progress. Useful for actions such as file upload.</p>

    <p><a class="button" onClick="progressBtn()">Show Progress</a></p>

    <script>progressBtn=function(){
        var m = Modal.progress('Uploading', '');
        var p = 0;
        var i = setInterval(function(){
            m.progress(p++);
            
            if( p >= 100 ){
                clearInterval(i);
                m.close();
                Modal.alert('Upload Successful', '');
            }
        },30);
    }</script>

<pre>
progressModal = Modal.progress('Uploading', '');

// later...
progressModal.progress(10) // 10%
progressModal.progress(23) // 23%
progressModal.progress(84) // 84%

progressModal.close();
</pre>

    <blockquote>
        <p><b>Tip:</b> you can use <code>.setTitle()</code> and <code>.setMsg()</code> to change the alert title and message while uploading. This could be used when uploading multiple files to show user which file is being uploaded.</p>
    </blockquote>
    
    <hr>

    <h1>Options</h1>

    <h2><code>btns: ['ok']</code></h2>
    
    <p>Modals can have multiple buttons, each with different callback functions.</p>

<pre>
btns: [{
    label: 'Ok',
    className: 'md-close', // add this class to hide modal on click
    onClick: function(){},
    eventKey: null, // esc, enter, delete, or null
}]
</pre>

    <p>There is also a few button presets: <code>ok, cancel, close</code></p>
    
    <p>If <code>eventKey</code> is set, the <code>onClick</code> callback will be triggered when the user hits the specified key.</p>

    <p>Modal leverages <a href="https://github.com/kjantzer/basic-buttons">basic buttons</a> so you can use icons in buttons too.</p>
    
    <p><a class="button" onclick="iconBtn()">Modal with Icons</a></p>
    <script>iconBtn=function(){
        new Modal({ title: 'Modal with Icons', msg: '', btns:[
            { label: '', className: 'md-close icon-user-add green'},
            { label: '', className: 'md-close icon-trash red'},
            { label: '', className: 'md-close icon-ccw'}
        ]})
    }</script>

    <br>
    <h2><code>effect: 1</code></h2>
    
    <p>Modal comes setup with multiple different animation styles. The deafult is <code>1</code>, or "Fade in and Scale"</p>
    
    <span class="spacedout">
    <a class="button" onclick="effectBtn(1)">1: Fade in & Scale</a>
	<a class="button" onclick="effectBtn(2)">2: Slide in (right)</a>
	<a class="button" onclick="effectBtn(3)">3: Slide in (bottom)</a>
	<a class="button" onclick="effectBtn(4)">4: Newspaper</a>
	<a class="button" onclick="effectBtn(5)">5: Fall</a>
	<a class="button" onclick="effectBtn(6)">6: Side Fall</a>
	<a class="button" onclick="effectBtn(7)">7: Sticky Up</a>
	<a class="button" onclick="effectBtn(8)">8: 3D Flip (horizontal)</a>
	<a class="button" onclick="effectBtn(9)">9: 3D Flip (vertical)</a>
	<a class="button" onclick="effectBtn(10)">10: 3D Sign</a>
	<a class="button" onclick="effectBtn(11)">11: Super Scaled</a>
	<a class="button" onclick="effectBtn(12)">12: Just Me</a>
	<a class="button" onclick="effectBtn(13)">13: 3D Slit</a>
	<a class="button" onclick="effectBtn(14)">14: 3D Rotate Bottom</a>
	<a class="button" onclick="effectBtn(15)">15: 3D Rotate In Left</a>
    </span>
    
    <script>effectBtn=function(effect){
        new Modal({
            title: event.currentTarget.innerText,
            msg: 'Effect '+effect+' was used to display this modal.',
            effect:effect,
            btns:['ok']
        })
    }</script>

    <hr>

    <h1>License</h1>

    <p>MIT © <a href="http://kevinjantzer.com">Kevin Jantzer</a></p>


    <hr>

    <small>Built by <a href="http://kevinjantzer.com">Kevin Jantzer</a>, <a href="http://blackstoneaudio.com">Blackstone Audio Inc.</a></small>

</section>




<script type="text/javascript">
alertLong = function(){
    new Modal({
        title: 'Terms of Service', 
        msg: '<p>This is a really long message. You can see that the message scrolls. Meh Blue Bottle nulla consectetur dreamcatcher vero. Austin pug gastropub deserunt pour-over. Occaecat ethnic cillum, adipisicing dolore aliquip readymade Truffaut kogi McSweeney\'s do skateboard retro pork belly before they sold out. Ullamco delectus laboris, Tonx mixtape XOXO excepteur ad fashion axe irony deserunt mumblecore. Messenger bag voluptate pop-up, Intelligentsia yr selfies swag fugiat pickled. Exercitation chillwave semiotics, cupidatat placeat ad sint fugiat literally irure roof party bicycle rights. Roof party dolore gastropub fingerstache PBR pork belly, next level twee pop-up Bushwick viral fashion axe master cleanse freegan YOLO.</p><p>Banksy Neutra sunt enim ennui, ethical sapiente cray ut. Food truck typewriter mustache 3 wolf moon, eiusmod aesthetic Truffaut distillery cillum American Apparel gastropub DIY. Pitchfork butcher pug Carles culpa mollit. Selfies aesthetic actually, seitan raw denim Odd Future tattooed post-ironic pour-over squid vinyl four loko laboris Schlitz salvia. Odd Future next level elit meggings, small batch banh mi Schlitz tousled. Ex velit pour-over ennui chambray. Et Godard direct trade Etsy, aute ethnic fap duis.</p><p>Pickled anim reprehenderit Echo Park mollit, brunch Pitchfork mustache cillum High Life. Trust fund butcher wolf culpa, roof party Wes Anderson Vice iPhone. Austin Blue Bottle gastropub banh mi put a bird on it ethnic Carles. Roof party stumptown hashtag, single-origin coffee nihil dreamcatcher literally odio Banksy mollit aute paleo accusamus officia Tumblr. Echo Park chambray fap, mumblecore minim cred consequat paleo wolf drinking vinegar. Chambray cray Wes Anderson biodiesel drinking vinegar. Occupy selvage mlkshk, try-hard gluten-free non Vice banh mi trust fund.</p><p>Gentrify fashion axe whatever voluptate banjo. Vero jean shorts fanny pack bitters, cliche officia wayfarers. Assumenda farm-to-table lomo selvage, organic pour-over tousled mlkshk est craft beer. Fixie biodiesel duis, fugiat Blue Bottle roof party skateboard 8-bit cardigan pop-up banh mi irony ullamco raw denim pickled. Art party readymade banh mi, bitters quinoa 8-bit organic vegan pug Shoreditch McSweeney\'s four loko Tumblr DIY irony. Velit officia 3 wolf moon hashtag, incididunt Intelligentsia Marfa nisi chillwave. Pour-over lo-fi duis, meh sapiente kitsch nulla mixtape.</p><p>This is a really long message. You can see that the message scrolls. Meh Blue Bottle nulla consectetur dreamcatcher vero. Austin pug gastropub deserunt pour-over. Occaecat ethnic cillum, adipisicing dolore aliquip readymade Truffaut kogi McSweeney\'s do skateboard retro pork belly before they sold out. Ullamco delectus laboris, Tonx mixtape XOXO excepteur ad fashion axe irony deserunt mumblecore. Messenger bag voluptate pop-up, Intelligentsia yr selfies swag fugiat pickled. Exercitation chillwave semiotics, cupidatat placeat ad sint fugiat literally irure roof party bicycle rights. Roof party dolore gastropub fingerstache PBR pork belly, next level twee pop-up Bushwick viral fashion axe master cleanse freegan YOLO.</p><p>Banksy Neutra sunt enim ennui, ethical sapiente cray ut. Food truck typewriter mustache 3 wolf moon, eiusmod aesthetic Truffaut distillery cillum American Apparel gastropub DIY. Pitchfork butcher pug Carles culpa mollit. Selfies aesthetic actually, seitan raw denim Odd Future tattooed post-ironic pour-over squid vinyl four loko laboris Schlitz salvia. Odd Future next level elit meggings, small batch banh mi Schlitz tousled. Ex velit pour-over ennui chambray. Et Godard direct trade Etsy, aute ethnic fap duis.</p><p>Pickled anim reprehenderit Echo Park mollit, brunch Pitchfork mustache cillum High Life. Trust fund butcher wolf culpa, roof party Wes Anderson Vice iPhone. Austin Blue Bottle gastropub banh mi put a bird on it ethnic Carles. Roof party stumptown hashtag, single-origin coffee nihil dreamcatcher literally odio Banksy mollit aute paleo accusamus officia Tumblr. Echo Park chambray fap, mumblecore minim cred consequat paleo wolf drinking vinegar. Chambray cray Wes Anderson biodiesel drinking vinegar. Occupy selvage mlkshk, try-hard gluten-free non Vice banh mi trust fund.</p><p>Gentrify fashion axe whatever voluptate banjo. Vero jean shorts fanny pack bitters, cliche officia wayfarers. Assumenda farm-to-table lomo selvage, organic pour-over tousled mlkshk est craft beer. Fixie biodiesel duis, fugiat Blue Bottle roof party skateboard 8-bit cardigan pop-up banh mi irony ullamco raw denim pickled. Art party readymade banh mi, bitters quinoa 8-bit organic vegan pug Shoreditch McSweeney\'s four loko Tumblr DIY irony. Velit officia 3 wolf moon hashtag, incididunt Intelligentsia Marfa nisi chillwave. Pour-over lo-fi duis, meh sapiente kitsch nulla mixtape.</p>'});
}
</script>

</body>
</html>
