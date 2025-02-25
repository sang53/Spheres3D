## **Spheres 3D**

This project is a 3D background developed for my portfolio page.

It features 250 randomly placed spheres that move towards the pointer, rotate and change colour.

## **Functionality**

### General:

- Each sphere has its own velocity, which is updated every frame
- Spheres move in a positive z velocity (constant after a brief period of acceleration)
- Spheres accelerate towards the real world coordinates of the pointer projected to their z coordinate
- x & y acceleration is inversely proportional to distance squared, based on the gravitational acceleration formula
- As the acceleration & velocity is calculated using the previous frame, spheres may miss a completely still cursor, allowing for more orbiting behaviour
- Spheres are reset into a random position when they leave the camera frustum or they intersect with a ray cast from the camera through the pointer
- Various settings can be set via _src/Spheres3D/Settings.ts_
- Supports toggling between dark & light modes, which does not re-render the spheres

### Dark mode:

- Spheres are lit from the back _(in respect to camera)_
- A spotlight follows the cursor from the front

### Light mode:

- Spheres are lit from the front _(in respect to camera)_

## **Technologies Used**

- React 3 Fiber
- Three js
- React
- TypeScript

## **Plan**

- I plan to add more 2D and 3D projects in this repo with a method to switch between them
- 2D circles:
  - randomly place circles in 2D space
  - visualise different graphs according to cursor position: minimum spanning tree and/or djikstra/A\* to centre
  - link spheres in a propagating manner - perhaps all spheres within x units of cursor, which decreases with every subsequent edge?
