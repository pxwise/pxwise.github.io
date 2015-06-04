window.Background = (function(win, $) {
    var sidebarEl = document.getElementById('stars');
    var scene2 = new THREE.Scene();
    var camera2 = new THREE.PerspectiveCamera(75, sidebarEl.offsetWidth / (sidebarEl.offsetHeight), 1, 10000);
    var cubes = new THREE.Object3D();

    var $el;
    var Three = this.THREE;
    var camera;
    var debouncer;
    var renderer;
    var scene;
    var standStill = true;

    function init($element) {
        var STARS = 2000;
        var i;
        var point;

        $el = $element;
        setupBaseScene();
        addLights();

        for (i = 0; i < STARS; i = i + 1) {
            point = addPoint(0xffffff, 2, 3, 3);
            point.position.x = getRandomArbitrary(-400, 400);
            point.position.y = getRandomArbitrary(-20, -2000);
            point.position.z = getRandomArbitrary(-400, 100);
        }

        update();
        render();
    }

    function setupBaseScene() {
        var FAR = 1000;
        var FOV = 45;
        var NEAR = 0.2;
        var SCENE_WIDTH = sidebarEl.offsetWidth;
        var SCENE_HEIGHT_SCALE = 1;
        var ASPECT = SCENE_WIDTH / (win.innerHeight * SCENE_HEIGHT_SCALE);

        scene = new Three.Scene();
        camera = new Three.PerspectiveCamera(FOV, ASPECT, NEAR, FAR);
        renderer = new Three.WebGLRenderer({
          antialias: true,
          alpha: true
        });
        renderer.autoClear = false;
        renderer.setClearColor(0x000000, 0);
        renderer.shadowMapEnabled = true;
        renderer.setSize(SCENE_WIDTH, win.innerHeight * SCENE_HEIGHT_SCALE);
        $el.append(renderer.domElement);

        // logo
        addLogo();
        // logo

        //-- Pull the camera up 120 and outwards 300:
        camera.position.x = 0;
        camera.position.y = 120;
        camera.position.z = 500;
    }

    function addLogo() {


          var boxSize = 4;
          var boxSpacing = 5;

          var logo = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,1,0,0,1,0,1,0,1,0,0,0,1,0,1,0,0,1,1,0,0,1,0],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1],
            [1,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,0,1,0,0,1,1,1],
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0],
            [1,1,1,0,1,0,1,0,0,1,0,1,0,0,1,0,1,1,0,0,0,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          ];

          for(var k = 0; k < logo.length; k++ ) {
            for(var i = 0; i < logo[k].length; i++ ) {
              if (logo[k][i] === 1) {
                var grayness = Math.random() * 0.5 + 0.25,
                        geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize),
                        material = new THREE.MeshBasicMaterial(),
                        cube = new THREE.Mesh(geometry, material),
                        x,
                        y,
                        z;

                material.color.setRGB(Math.random() * 0.25, Math.random() * 0.20 + 0.55, Math.random() * 0.25 + 0.65);

                x = (boxSpacing * i) - (logo[0].length * boxSpacing / 2);
                y = (boxSpacing * k) - (logo.length * boxSpacing / 2);
                z = 0;

                cube.position.set(x, y, z);
                cube.grayness = grayness;
                cubes.add(cube);
              }
            }
          }
          //cubes.rotation.x = Math.PI;

        scene2.add(cubes);
    }

    function addLights() {
        var light = new Three.PointLight(0xffffff);
        light.intensity = 3;
        light.position.x = 500;
        light.position.y = 500;
        light.position.z = 500;
        scene.add(light);
    }

    function render() {
        if (!standStill) {
            renderer.clear();
            renderer.render(scene, camera);
            renderer.clearDepth();
            renderer.render(scene2, camera);
        }
    }

    function addPoint(color, radius, widthSegments, heightSegments) {
        var geometry;
        var material;
        var shape;

        geometry = new Three.SphereGeometry(radius, widthSegments, heightSegments);
        material = new Three.MeshLambertMaterial({
            emissive: 0x000000,
            color: color,
            transparent: true,
            opacity: 0.8
        });

        shape = new Three.Mesh(geometry, material);
        scene.add(shape);

        return shape;
    }

    function update() {
        var MAX_CAM = 45;
        var MIN_CAM = -45;
        var scrollPercentage;
        var LOGO_VERTICAL_POSITION = 85;
        var LOGO_STAY_ON_SCREEN_Y_FACTOR = -91;

        standStill = false;

        debouncer = clearTimeout(debouncer);
        debouncer = setTimeout(function() {
            standStill = true;
        }, 100);

        scrollPercentage = $(win).scrollTop() / $(win).height();
        camera.position.y = -(MAX_CAM - MIN_CAM) * scrollPercentage + MIN_CAM;
        camera2.position.y += 1;
        cubes.rotation.x = (scrollPercentage * (Math.PI / 2.5)) - (Math.PI / 7) + Math.PI;// * 0.001;
        cubes.position.y = scrollPercentage * LOGO_STAY_ON_SCREEN_Y_FACTOR + LOGO_VERTICAL_POSITION; // * 0.001;
    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    return {
        init: init,
        update: update,
        render: render
    };

})(window, this.jQuery);
