// ThreeDStructure.jsx
import React from "react";
import { THREE, OrbitControls } from './ThreeInstance.js';
import { Box, Text, Flex, CloseButton, VStack, Button, HStack } from "@chakra-ui/react";

class ThreeDStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoBox: false,
      sensorInfo: null,
      infoPosition: { x: 0, y: 0 }
    };

    this.containerRef = React.createRef();
    this.camera = null;
    this.controls = null;
    this.renderer = null;
    this.scene = null;
    this.structure = null;
    this.animationId = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.clickedSensor = null; // Reference to the currently selected sensor

    // Bind methods
    this.setIsometricView = this.setIsometricView.bind(this);
    this.onClick = this.onClick.bind(this);
    this.animate = this.animate.bind(this);
    this.closeInfoBox = this.closeInfoBox.bind(this);
    this.moveCameraLeft = this.moveCameraLeft.bind(this);
    this.moveCameraRight = this.moveCameraRight.bind(this);
    this.moveCameraUp = this.moveCameraUp.bind(this);
    this.moveCameraDown = this.moveCameraDown.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.getScreenPosition = this.getScreenPosition.bind(this);
  }

  componentDidMount() {
    const container = this.containerRef.current;
    if (!container) return;

    // Get container dimensions - modified to use actual container dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) {
      console.error("Container has zero width or height");
      // Try again in a moment when the container might be rendered
      setTimeout(() => this.componentDidMount(), 100);
      return;
    }

    // Create scene and structure group
    this.scene = new THREE.Scene();
    this.structure = new THREE.Group();

    // Set up the camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.set(2, 1, 3);

    // Set up the renderer with antialiasing and pixel ratio adjustment
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0xffffff); // Use hex color format

    // Clear any existing canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    container.appendChild(this.renderer.domElement);

    // Add resize handler
    window.addEventListener('resize', this.handleResize.bind(this));

    // Set up OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Build 3D Structure
    this.buildStructure();

    // Add event listener for click interactions
    this.renderer.domElement.addEventListener("click", this.onClick, false);

    // Start the animation loop
    this.animate();
  }

  handleResize() {
    if (!this.containerRef.current || !this.renderer || !this.camera) return;

    const container = this.containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  buildStructure() {
    // Materials
    const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // grey
    const originMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // white
    const silverMaterial = new THREE.MeshBasicMaterial({ color: 0xc0c0c0 }); // silver
    const greenMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // yellow

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(1);
    this.structure.add(axesHelper);

    // Origin marker (small sphere at (0,0,0))
    const originGeometry = new THREE.SphereGeometry(0.02);
    const originSphere = new THREE.Mesh(originGeometry, originMaterial);
    originSphere.position.set(0, 0, 0);
    this.structure.add(originSphere);

    // Columns
    const rodRadius = 0.015;
    const columnGeometry = new THREE.CylinderGeometry(rodRadius, rodRadius, 1.6);
    const columnPositions = [
      [0.0, 0, 0.0],
      [0.4, 0, 0.0],
      [0.0, 0, 0.4],
      [0.4, 0, 0.4],
    ];
    const beamPositions = [
      [0.2, 0.4, 0.4, "z"], [0.2, 0.8, 0.4, "z"], [0.2, 1.2, 0.4, "z"], [0.2, 1.6, 0.4, "z"],
      [0.2, 0.4, 0.0, "z"], [0.2, 0.8, 0.0, "z"], [0.2, 1.2, 0.0, "z"], [0.2, 1.6, 0.0, "z"],
      [0.4, 0.4, 0.2, "x"], [0.4, 0.8, 0.2, "x"], [0.4, 1.2, 0.2, "x"], [0.4, 1.6, 0.2, "x"],
      [0.0, 0.4, 0.2, "x"], [0.0, 0.8, 0.2, "x"], [0.0, 1.2, 0.2, "x"], [0.0, 1.6, 0.2, "x"],
    ];
    // Example sensor positions array
    const Satpura = [
      [0, 0.6, 0], [0.4, 0.2, 0], [0.4, 0.4, 0.4], [0, 0.4, 0.4],
      [0, 0.8, 0], [0.4, 0.8, 0], [0.4, 0.8, 0.4], [0, 0.8, 0.4],
      [0, 1.4, 0], [0.4, 1.2, 0], [0.4, 1.2, 0.4], [0.2, 1.2, 0.4],
      [0, 1.6, 0], [0.4, 1.6, 0], [0.4, 1.4, 0.4], [0, 1.6, 0.4],
    ];
    columnPositions.forEach(pos => {
      const column = new THREE.Mesh(columnGeometry, blackMaterial);
      // Offset by 0.8 in Y so the bottom is at y=0
      column.position.set(pos[0], 0.8, pos[2]);
      this.structure.add(column);
    });

    // Beams
    const beamGeometry = new THREE.CylinderGeometry(rodRadius, rodRadius, 0.4);

    beamPositions.forEach(pos => {
      const beam = new THREE.Mesh(beamGeometry, silverMaterial);
      beam.position.set(pos[0], pos[1], pos[2]);
      const axis = pos[3];
      const angle = Math.PI / 2;
      if (axis === "x") beam.rotation.x = angle;
      else if (axis === "y") beam.rotation.y = angle;
      else if (axis === "z") beam.rotation.z = angle;
      this.structure.add(beam);
    });

    // Structure: Support Bases
    const baseGeometry = new THREE.BoxGeometry(0.1, 0.01, 0.1);
    columnPositions.forEach(pos => {
      const base = new THREE.Mesh(baseGeometry, greenMaterial);
      base.position.set(pos[0], -0.01, pos[2]);
      this.structure.add(base);
    });

    // Structure: Sensors
    const sensorSphereGeometry = new THREE.SphereGeometry(rodRadius * 1.5);

    // Generate sample sensor data
    const sensorData = Satpura.map((pos, index) => ({
      id: index + 1,
      position: pos,
      temperature: (20 + Math.random() * 10).toFixed(1),
      vibration: (Math.random() * 5).toFixed(2),
      lastReading: new Date().toLocaleTimeString(),
      status: Math.random() > 0.2 ? "Normal" : "Warning"
    }));

    this.createSensors(sensorData, sensorSphereGeometry);

    // Add the structure to the scene
    this.scene.add(this.structure);

    // Center the structure
    const box = new THREE.Box3().setFromObject(this.structure);
    const center = new THREE.Vector3();
    box.getCenter(center);
    this.structure.position.sub(center);

    // Adjust the camera 
    const newBox = new THREE.Box3().setFromObject(this.structure);
    const boundingSphere = new THREE.Sphere();
    newBox.getBoundingSphere(boundingSphere);
    const newRadius = boundingSphere.radius;
    const fov = this.camera.fov * (Math.PI / 180);
    const distance = (newRadius / Math.sin(fov / 2)) * 1.2;
    const camDir = new THREE.Vector3().copy(this.camera.position).normalize();
    this.camera.position.copy(camDir.multiplyScalar(distance));
    this.camera.lookAt(0, 0, 0);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
  }

  createSensors(sensorData, sphereGeometry) {
    sensorData.forEach((sensor) => {
      const pos = sensor.position;
      // Create sensor sphere
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // green
      const sphere = new THREE.Mesh(sphereGeometry, sphereMat);
      sphere.userData.isSensor = true; // Tag as sensor
      sphere.userData.sensorData = sensor; // Store sensor data in the object
      sphere.position.set(pos[0], pos[1], pos[2]);
      this.structure.add(sphere);

      // Create text label - using a more efficient approach
      const sprite = this.createSensorLabel(sensor.id.toString());
      sprite.position.set(pos[0] + 0.1, pos[1], pos[2] + 0.1);
      this.structure.add(sprite);
    });
  }

  createSensorLabel(text) {
    // Create a canvas for the label (this won't be added to DOM)
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    // Clear the canvas and render the text
    context.clearRect(0, 0, size, size);
    context.fillStyle = "black";
    context.font = "bold 48px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.1, 0.1, 0.1);
    return sprite;
  }

  // Helper method to get screen position from world position
  getScreenPosition(object) {
    const worldPos = object.position.clone();
    const vector = worldPos.project(this.camera);

    const rect = this.renderer.domElement.getBoundingClientRect();

    return {
      x: (vector.x * 0.5 + 0.5) * rect.width + rect.left,
      y: (-vector.y * 0.5 + 0.5) * rect.height + rect.top
    };
  }

  onClick(event) {
    // Get the original click position for the info box
    const clickX = event.clientX;
    const clickY = event.clientY;

    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Filter for sensor objects
    const sphereObjects = this.structure.children.filter(
      obj => obj.geometry && obj.geometry.type === "SphereGeometry" && obj.userData.isSensor
    );

    const intersects = this.raycaster.intersectObjects(sphereObjects);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const sensorData = clickedObject.userData.sensorData;

      if (sensorData) {
        // Highlight the selected sensor
        clickedObject.material.color.set(0x00cc00); // Brighter green for selected

        // Restore other sensors to normal color
        sphereObjects.forEach(obj => {
          if (obj !== clickedObject) {
            obj.material.color.set(0x00ff00); // Regular green
          }
        });

        // Store reference to the clicked object
        this.clickedSensor = clickedObject;

        // Calculate info box position based on the clicked sensor's position
        const sensorScreenPosition = this.getScreenPosition(clickedObject);
        const offset = 15; // pixels offset from sensor position

        this.setState({
          showInfoBox: true,
          sensorInfo: sensorData,
          infoPosition: {
            x: sensorScreenPosition.x + offset,
            y: sensorScreenPosition.y - offset
          }
        });
      }
    } else {
      // Reset all sensor colors
      sphereObjects.forEach(obj => {
        obj.material.color.set(0x00ff00); // Regular green
      });

      this.clickedSensor = null;
      this.closeInfoBox();
    }
  }

  closeInfoBox() {
    this.setState({ showInfoBox: false });
    this.clickedSensor = null;
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();

    // Update info box position if it's visible and we have a clicked sensor
    if (this.state.showInfoBox && this.clickedSensor) {
      const sensorScreenPosition = this.getScreenPosition(this.clickedSensor);
      const offset = 15;

      if (
        this.state.infoPosition.x !== sensorScreenPosition.x + offset ||
        this.state.infoPosition.y !== sensorScreenPosition.y - offset
      ) {
        this.setState(prevState => ({
          ...prevState,
          infoPosition: {
            x: sensorScreenPosition.x + offset,
            y: sensorScreenPosition.y - offset
          }
        }));
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  setIsometricView() {
    if (this.camera && this.controls) {
      const targetPos = new THREE.Vector3(1,2,2).normalize().multiplyScalar(2);
      const duration = 1000; // ms
      const startTime = performance.now();
      const startPos = this.camera.position.clone();

      const animateCamera = (time) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);
        this.camera.position.lerpVectors(startPos, targetPos, t);
        this.camera.lookAt(2, 2, 3);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        if (t < 1) {
          requestAnimationFrame(animateCamera);
        }
      };
      requestAnimationFrame(animateCamera);
    }
  }

  moveCameraLeft() {
    if (this.camera && this.controls) {
      const direction = new THREE.Vector3();
      this.camera.getWorldDirection(direction);
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(up, direction).normalize();

      const moveAmount = 0.5;
      this.camera.position.addScaledVector(right, moveAmount);
      this.controls.target.addScaledVector(right, moveAmount);
      this.controls.update();
    }
  }

  moveCameraRight() {
    if (this.camera && this.controls) {
      const direction = new THREE.Vector3();
      this.camera.getWorldDirection(direction);
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(up, direction).normalize();

      const moveAmount = -0.5;
      this.camera.position.addScaledVector(right, moveAmount);
      this.controls.target.addScaledVector(right, moveAmount);
      this.controls.update();
    }
  }

  moveCameraUp() {
    if (this.camera && this.controls) {
      const moveAmount = 0.5;
      this.camera.position.y += moveAmount;
      this.controls.target.y += moveAmount;
      this.controls.update();
    }
  }

  moveCameraDown() {
    if (this.camera && this.controls) {
      const moveAmount = 0.5;
      this.camera.position.y -= moveAmount;
      this.controls.target.y -= moveAmount;
      this.controls.update();
    }
  }

  zoomIn() {
    if (this.camera) {
      const direction = new THREE.Vector3();
      direction.subVectors(this.controls.target, this.camera.position).normalize();

      const zoomAmount = 0.5;
      this.camera.position.addScaledVector(direction, zoomAmount);
      this.controls.update();
    }
  }

  zoomOut() {
    if (this.camera) {
      const direction = new THREE.Vector3();
      direction.subVectors(this.controls.target, this.camera.position).normalize();

      const zoomAmount = -0.5;
      this.camera.position.addScaledVector(direction, zoomAmount);
      this.controls.update();
    }
  }

  componentWillUnmount() {
    // Clean up event listeners
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.removeEventListener("click", this.onClick);
    }
    window.removeEventListener('resize', this.handleResize);

    if (this.containerRef.current && this.renderer) {
      this.containerRef.current.removeChild(this.renderer.domElement);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  renderInfoBox() {
    const { showInfoBox, sensorInfo } = this.state;

    if (!showInfoBox || !sensorInfo) return null;

    const boxStyle = {
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      zIndex: 1000,
      maxWidth: '250px',
      minWidth: '180px',
      bottom: '120px', // Position above control buttons (which are at bottom: 20px)
      right: '20px',   // Align with control buttons
      pointerEvents: 'all',
    };

    // Status color
    const statusColor = sensorInfo.status === "Normal" ? "green.500" : "red.500";

    return (
      <Box style={boxStyle}>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text fontWeight="bold">Sensor #{sensorInfo.id}</Text>
          <CloseButton size="sm" onClick={this.closeInfoBox} />
        </Flex>
        <VStack spacing={1} align="stretch">
          <Text fontSize="sm">Position: ({sensorInfo.position.join(', ')})</Text>
          <Text fontSize="sm">Temperature: {sensorInfo.temperature}°C</Text>
          <Text fontSize="sm">
            Status: <Text as="span" color={statusColor} ml={1} fontWeight="bold">{sensorInfo.status}</Text>
          </Text>
          <Text fontSize="xs" color="gray.500">Last reading: {sensorInfo.lastReading}</Text>
        </VStack>
      </Box>
    );
  }


  renderControlButtons() {
    return (
      <Box
        position="absolute"
        bottom="20px"
        right="20px"
        zIndex={100}
        bg="rgba(255,255,255,0.7)"
        p={2}
        borderRadius="md"
        boxShadow="md"
      >
        <VStack spacing={2}>
          {/* Isometric View Button */}
          <Button
            size="sm"
            colorScheme="blue"
            onClick={this.setIsometricView}
            width="100%"
          >
            Isometric View
          </Button>

          {/* Camera Navigation Controls */}
          <HStack spacing={2} justify="center">
            <Button size="sm" onClick={this.moveCameraLeft}>
              ←
            </Button>
            <VStack spacing={2}>
              <Button size="sm" onClick={this.moveCameraUp}>
                ↑
              </Button>
              <Button size="sm" onClick={this.moveCameraDown}>
                ↓
              </Button>
            </VStack>
            <Button size="sm" onClick={this.moveCameraRight}>
              →
            </Button>
          </HStack>

          {/* Zoom Controls */}
          <HStack spacing={2} justify="center" width="100%">
            <Button size="sm" flex={1} onClick={this.zoomIn}>
              Zoom +
            </Button>
            <Button size="sm" flex={1} onClick={this.zoomOut}>
              Zoom -
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  }

  render() {
    return (
      <Box w="100%" h="100%" position="relative">
        <Box ref={this.containerRef} w="100%" h="100%" />
        {this.renderInfoBox()}
        {this.renderControlButtons()}
      </Box>
    );
  }
}

export default ThreeDStructure;