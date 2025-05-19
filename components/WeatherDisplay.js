export default class WeatherDisplay {
  constructor(containerId = 'weather-info') {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = containerId;
      this.container.style.position = 'fixed';
      this.container.style.top = '20px';
      this.container.style.right = '20px';
      this.container.style.zIndex = '20';
      this.container.style.background = 'rgba(255,255,255,0.18)';
      this.container.style.color = '#222';
      this.container.style.padding = '16px 24px';
      this.container.style.borderRadius = '16px';
      this.container.style.fontSize = '1.1rem';
      this.container.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
      this.container.style.minWidth = '220px';
      this.container.style.maxWidth = '320px';
      this.container.style.pointerEvents = 'none';
      this.container.style.backdropFilter = 'blur(12px)';
      this.container.style.border = '1.5px solid rgba(255,255,255,0.35)';
      this.container.style.borderTop = '1.5px solid rgba(255,255,255,0.7)';
      this.container.style.borderLeft = '1.5px solid rgba(255,255,255,0.7)';
      document.body.appendChild(this.container);
    }
  }

  setNightMode(isNight) {
    this.container.style.color = isNight ? '#fff' : '#222';
  }

  update(weather) {
    if (!weather) {
      this.container.innerHTML = '<b>Weather data unavailable</b>';
      return;
    }
    this.container.innerHTML = `
      <b>${weather.name}, ${weather.sys?.country || ''}</b><br>
      <b>${weather.weather[0].main}</b> (${weather.weather[0].description})<br>
      <b>Temp:</b> ${weather.main.temp}°C (feels like ${weather.main.feels_like}°C)<br>
      <b>Clouds:</b> ${weather.clouds.all}%<br>
      <b>Humidity:</b> ${weather.main.humidity}%<br>
      <b>Wind:</b> ${weather.wind.speed} m/s
    `;
  }
}
