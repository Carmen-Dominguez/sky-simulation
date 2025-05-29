# Sky Simulation

A dynamic, interactive sky simulation built with Three.js that features realistic cloud systems, day/night cycles, and weather integration.

## Features

- 🌤️ Dynamic cloud system with realistic movement and layering
- 🌅 Time-of-day simulation (Day, Dusk, Night, Dawn)
- 🌟 Starfield that appears during night time
- 🌈 Dynamic sky gradients that change with time of day
- 🌦️ Weather integration with cloud density adjustments
- 🎮 Interactive camera controls
- 📱 Responsive design that adapts to window size

## Prerequisites

- A modern web browser with WebGL support
- Python 3.x

## Setup

1. Clone the repository:
```bash
git clone [your-repository-url]
cd sky-simulation
```

2. Start the Python development server:
```bash
python3 -m http.server 3000
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
sky-simulation/
├── components/
│   ├── Cloud.js         # Individual cloud implementation
│   ├── CloudSystem.js   # Cloud system management
│   ├── Sky.js          # Sky rendering and management
│   └── WeatherDisplay.js # Weather information display
├── index.html          # Main application file
├── three.module.js     # Three.js library
└── OrbitControls.js    # Camera controls
```

## Usage

- Use the "Change Time" button to cycle through different times of day
- Click and drag to rotate the camera view
- Scroll to zoom in/out
- The simulation automatically adjusts based on real-time weather data

## Weather Integration

The simulation fetches weather data from a local endpoint (`http://localhost:5173/weather`) and adjusts the following parameters:
- Cloud density based on current cloud coverage
- Time of day based on sunrise/sunset times
- Sky colors and gradients based on weather conditions

## Technologies Used

- Three.js for 3D rendering
- WebGL for hardware-accelerated graphics
- Modern JavaScript (ES6+)
- HTML5 and CSS3
- Python for serving the application

## Contributing

Feel free to submit issues and enhancement requests!

## License

[Your chosen license]

## Acknowledgments

- Three.js community for the excellent 3D library
- Weather API providers for real-time weather data
