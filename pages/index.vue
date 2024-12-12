<template>
  <div class="homepage">
    <header class="hero">
      <div class="hero-content">
        <h1 class="title">easyflex</h1>
        <p class="subtitle">Enhanced Allocation System for Your Flexible Labor and eXpertise Matching</p>
        <router-link class="cta-button" to="/about">Over ons</router-link>
      </div>
    </header>

    <section class="features">
      <div class="feature">
        <div class="feature-icon">👤</div>
        <h3 class="feature-title">Flexworkers</h3>
        <p class="feature-description">Find the best flexible workforce for your projects.</p>
      </div>

      <div class="feature">
        <div class="feature-icon">📋</div>
        <h3 class="feature-title">Jobs</h3>
        <p class="feature-description">Post and manage job opportunities with ease.</p>
      </div>

      <div class="feature">
        <div class="feature-icon">🧠</div>
        <h3 class="feature-title">Skills & Categories</h3>
        <p class="feature-description">Match skills to categories for optimal placements.</p>
      </div>
    </section>

    <footer class="footer">
      <p>© 2024 Easyflex. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No additional functionality needed
</script>

<style scoped>
.homepage {
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  width: 100%;
}

.hero {
  background: linear-gradient(135deg, #6a805a, #b2c7a9);
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.hero-content {
  max-width: 800px;
  margin: auto;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.cta-button {
  background-color: #fff;
  color: #6a805a;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-decoration: none;
}

.cta-button:hover {
  background-color: #e8f1e8;
}

.features {
  display: flex;
  justify-content: space-around;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

.feature {
  text-align: center;
  max-width: 300px;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 1rem;
}

.footer {
  text-align: center;
  background-color: #6a805a;
  color: white;
  padding: 10px 0;
  padding-bottom: 50%;
}
</style>
