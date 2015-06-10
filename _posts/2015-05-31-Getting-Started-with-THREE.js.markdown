---
layout: post
title:  "Getting Started with THREE.js"
date:   2015-05-31 12:01:37
tags: [threejs, javascript]
---
Here's some boilerplate code for working with THREE.js, adapted from [http://www.awwwards.com/creating-3d-cube-a-practical-guide-to-three-js-with-live-demo.html](http://www.awwwards.com/creating-3d-cube-a-practical-guide-to-three-js-with-live-demo.html)

Experiment with changing the camera, geometry, position and rotation variables. The best way to learn is by doing.

{% highlight html %}
<html>
<head>
  <title>Simple Three.js App</title>
  <style>
  canvas {
    width: 100%;
    height: 100%;
  }
  </style>
</head>
<body>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
  <script>
  (function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    var renderer = new THREE.WebGLRenderer();
    var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
    var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
    var cube = new THREE.Mesh(geometry, material);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    scene.add(cube);
    camera.position.z = 1000;

    function render() {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    render();
  }());
  </script>
</body>
</html>
{% endhighlight %}
