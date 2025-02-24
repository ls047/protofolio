<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-100">
    <!-- Navbar -->
    <b-navbar toggleable="lg" type="dark" class="glass-effect fixed w-full z-50">
      <div class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" :style="{ width: `${scrollProgress}%` }"></div>
      <b-container class="flex items-center">
        <b-navbar-brand href="#" class="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
          Ali Khalil
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse" class="ml-auto border-0">
          <template #default="{ expanded }">
            <Icon 
              :icon="expanded ? 'mdi:close' : 'mdi:menu'" 
              class="text-2xl text-white transition-transform duration-300"
              :class="{ 'rotate-180': expanded }"
            />
          </template>
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav class="flex items-center">
          <b-navbar-nav class="ml-auto flex items-center">
            <b-nav-item v-for="item in navItems" 
                       :key="item.href" 
                       :href="item.href"
                       class="nav-link text-gray-200 hover:text-blue-400 flex items-center"
                       :class="{ 'active text-blue-400': activeSection === item.href.substring(1) }">
              <i :class="item.icon" class="mr-2"></i>
              {{ item.text }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <!-- Hero Section -->
    <section class="min-h-screen flex items-center relative overflow-hidden">
      <b-container>
        <div class="relative z-10 animate-fade-in">
          <h1 class="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
            Frontend Developer
          </h1>
          <p class="text-2xl text-gray-200 max-w-2xl leading-relaxed mb-8 font-light">
            {{ personalInfo.summary }}
          </p>
          <div class="flex gap-4 mb-12">
            <b-button href="#projects" class="btn-primary">
              View Projects
            </b-button>
            <b-button href="#contact" class="btn-outline">
              Contact Me
            </b-button>
          </div>
          <!-- Frontend Tech Stack Icons -->
          <div class="flex items-center gap-8">
            <i class="fab fa-vuejs text-4xl text-green-400"></i>
            <i class="fab fa-js text-4xl text-yellow-400"></i>
            <i class="fab fa-html5 text-4xl text-orange-400"></i>
            <i class="fab fa-css3-alt text-4xl text-blue-400"></i>
          </div>
        </div>
        <div class="absolute top-1/2 right-0 transform -translate-y-1/2 w-1/3 h-2/3 bg-gradient-to-bl from-blue-500/20 to-purple-500/20 blur-3xl"></div>
      </b-container>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20">
      <b-container>
        <h2 class="section-title text-gray-100">About Me</h2>
        <b-row>
          <b-col md="6" class="mb-8 md:mb-0">
            <div class="card p-6 bg-gray-800/50 backdrop-blur-sm">
              <h3 class="text-xl font-semibold mb-4 text-gray-100">Experience</h3>
              <div v-for="exp in experience" :key="exp.company" class="mb-6">
                <h4 class="text-lg font-semibold text-blue-400">{{ exp.role }}</h4>
                <p class="text-gray-300">{{ exp.company }} | {{ exp.period }}</p>
                <ul class="mt-2 space-y-2">
                  <li v-for="achievement in exp.achievements" 
                      :key="achievement"
                      class="text-gray-200 flex items-start">
                    <span class="text-blue-400 mr-2">•</span>
                    {{ achievement }}
                  </li>
                </ul>
              </div>
            </div>
          </b-col>
          <b-col md="6">
            <div class="card p-6 mb-6">
              <h3 class="text-xl font-semibold mb-4">Education</h3>
              <h4 class="text-lg font-semibold text-blue-400">{{ education.university }}</h4>
              <p class="text-gray-400">{{ education.degree }} | {{ education.period }}</p>
            </div>
            <div class="card p-6">
              <h3 class="text-xl font-semibold mb-4">Soft Skills</h3>
              <div class="grid grid-cols-2 gap-4">
                <div v-for="skill in softSkills" 
                     :key="skill.name"
                     class="flex items-center gap-2 text-gray-300">
                  <i :class="skill.icon" class="text-blue-400"></i>
                  {{ skill.name }}
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>

    <!-- Skills Section -->
    <section id="skills" ref="skillsSection" class="py-20 bg-gray-800/30">
      <b-container>
        <h2 class="section-title text-gray-100">Frontend Skills</h2>
        <div class="card p-8 bg-gray-800/50 backdrop-blur-sm">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(level, skill) in skills" 
                 :key="skill" 
                 class="skill-item group">
              <div class="flex justify-between mb-2">
                <span class="text-gray-200 font-medium">{{ skill }}</span>
                <span class="text-blue-400">{{ level }}%</span>
              </div>
              <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div class="progress-bar h-full bg-gradient-to-r from-blue-500 to-purple-500"
                     :class="{ 'animate-progress': hasAnimated }"
                     :style="{ '--progress-width': `${level}%` }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-800/30">
      <b-container>
        <h2 class="section-title">Featured Projects</h2>
        <b-row>
          <b-col md="6" lg="4" class="mb-6" v-for="project in projects" :key="project.id">
            <div class="relative">
              <!-- Info Icon -->
              <button @click="showProjectInfo(project)" 
                      class="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-900/80 hover:bg-gray-900 
                             rounded-full flex items-center justify-center 
                             text-blue-400 hover:text-blue-300 transition-all duration-300
                             backdrop-blur-sm">
                <Icon icon="mdi:information" class="text-xl" />
              </button>

              <a :href="project.demo" 
                 target="_blank"
                 class="project-card group relative bg-gray-800/50 rounded-xl overflow-hidden block cursor-pointer">
                <!-- Project Image -->
                <div class="relative h-64 overflow-hidden">
                  <img :src="project.image"
                       :alt="project.title"
                       class="w-full h-full object-cover">
                  <!-- Overlay with content -->
                  <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-gray-900/50 
                              opacity-0 group-hover:opacity-100 transition-all duration-300
                              flex flex-col justify-center items-center p-6 text-center">
                    <h3 class="text-xl font-bold text-white mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {{ project.title }}
                    </h3>
                    <p class="text-gray-300 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                      {{ project.description }}
                    </p>
                    <!-- Tech Stack -->
                    <div class="flex flex-wrap justify-center gap-2 mb-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">
                      <span v-for="tech in project.tech"
                            :key="tech"
                            class="text-xs px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                        {{ tech }}
                      </span>
                    </div>
                    <!-- View Project Button -->
                    <div class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200">
                      <span class="action-btn demo-btn">
                        <Icon icon="mdi:eye" class="text-lg" />
                        <span>View Project</span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </b-col>
        </b-row>
      </b-container>

      <!-- Project Info Modal -->
      <b-modal v-model="showModal"
               size="lg"
               hide-footer
               title-class="text-white"
               content-class="bg-gray-800 text-white"
               header-class="bg-gray-800 border-gray-700"
               body-class="p-0">
        <template #modal-title>
          <h3 class="text-xl font-bold">{{ selectedProject?.title }}</h3>
        </template>
        <div v-if="selectedProject" class="p-4">
          <p class="text-gray-300 mb-4">{{ selectedProject.longDescription }}</p>
          <h4 class="font-semibold mb-2">Key Features:</h4>
          <ul class="list-disc list-inside mb-4 text-gray-300">
            <li v-for="feature in selectedProject.features" 
                :key="feature">
              {{ feature }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="tech in selectedProject.tech"
                  :key="tech"
                  class="px-3 py-1 text-sm bg-blue-500/20 text-blue-300 rounded-full">
              {{ tech }}
            </span>
          </div>
        </div>
      </b-modal>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <b-container>
        <h2 class="section-title text-gray-100">Get In Touch</h2>
        <b-row>
          <b-col md="5" class="mb-8 md:mb-0">
            <div class="card p-6 bg-gray-800/50 backdrop-blur-sm">
              <h3 class="text-xl font-semibold mb-6 text-gray-100">
                <Icon icon="mdi:handshake" class="inline-block mr-2 text-2xl text-blue-400" />
                Let's Connect
              </h3>
              <div class="space-y-6">
                <!-- Email -->
                <div class="flex items-center gap-4 group">
                  <div class="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Icon icon="mdi:email" class="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">Email</div>
                    <a href="mailto:ism23ev_1_3@uoitc.edu.iq" 
                       class="text-gray-200 hover:text-blue-400 transition-colors">
                      ism23ev_1_3@uoitc.edu.iq
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-center gap-4 group">
                  <div class="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <Icon icon="mdi:phone" class="text-2xl text-green-400" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">Phone</div>
                    <a href="tel:+9647755655161" 
                       class="text-gray-200 hover:text-green-400 transition-colors">
                      +964 775 565 5161
                    </a>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-center gap-4 group">
                  <div class="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Icon icon="mdi:map-marker" class="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">Location</div>
                    <span class="text-gray-200">Baghdad, Karada</span>
                  </div>
                </div>

                <!-- Availability -->
                <div class="flex items-center gap-4 group">
                  <div class="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                    <Icon icon="mdi:clock" class="text-2xl text-yellow-400" />
                  </div>
                  <div>
                    <div class="text-sm text-gray-400">Availability</div>
                    <span class="text-gray-200">Open to Opportunities</span>
                  </div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="mt-8">
                <h4 class="text-lg font-semibold mb-4 text-gray-100">
                  <Icon icon="mdi:share-variant" class="inline-block mr-2 text-xl text-blue-400" />
                  Connect With Me
                </h4>
                <div class="flex gap-4">
                  <!-- GitHub -->
                  <a href="https://github.com/AliKhalil28" 
                     target="_blank"
                     rel="noopener noreferrer"
                     class="social-link bg-gray-800/50 hover:bg-gray-700/50">
                    <Icon icon="mdi:github" 
                          class="text-2xl text-gray-300 hover:text-violet-400" />
                    <span class="sr-only">GitHub Profile</span>
                  </a>

                  <!-- LinkedIn -->
                  <a href="https://www.linkedin.com/in/ali-khalil-al-ebadi-b2b2b4291/" 
                     target="_blank"
                     rel="noopener noreferrer"
                     class="social-link bg-gray-800/50 hover:bg-gray-700/50">
                    <Icon icon="mdi:linkedin" 
                          class="text-2xl text-gray-300 hover:text-blue-400" />
                    <span class="sr-only">LinkedIn Profile</span>
                  </a>

                  <!-- Telegram -->
                  <a href="https://t.me/AliKhalil28" 
                     target="_blank"
                     rel="noopener noreferrer"
                     class="social-link bg-gray-800/50 hover:bg-gray-700/50">
                    <Icon icon="mdi:telegram" 
                          class="text-2xl text-gray-300 hover:text-cyan-400" />
                    <span class="sr-only">Telegram</span>
                  </a>
                </div>
              </div>
            </div>
          </b-col>

          <!-- Contact Form -->
          <b-col md="7">
            <div class="card p-6">
              <h3 class="text-xl font-semibold mb-6 text-gray-100">Send Message</h3>
              <b-form @submit.prevent="sendEmail">
                <b-form-group class="mb-4">
                  <b-form-input
                    v-model="form.name"
                    placeholder="Your Name"
                    class="input-field"
                    :state="!formErrors.name"
                  ></b-form-input>
                  <b-form-invalid-feedback>
                    {{ formErrors.name }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4">
                  <b-form-input
                    v-model="form.email"
                    type="email"
                    placeholder="Your Email"
                    class="input-field"
                    :state="!formErrors.email"
                  ></b-form-input>
                  <b-form-invalid-feedback>
                    {{ formErrors.email }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group class="mb-4">
                  <b-form-textarea
                    v-model="form.message"
                    placeholder="Your Message"
                    rows="4"
                    class="input-field"
                    :state="!formErrors.message"
                  ></b-form-textarea>
                  <b-form-invalid-feedback>
                    {{ formErrors.message }}
                  </b-form-invalid-feedback>
                </b-form-group>

                <b-button type="submit"
                         class="btn-primary w-full"
                         :disabled="isSubmitting">
                  <span v-if="!isSubmitting">Send Message</span>
                  <div v-else class="loading-spinner"></div>
                </b-button>
              </b-form>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { Icon } from '@iconify/vue'

// Theme
const isDarkMode = ref(true)
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// Navigation & Scroll
const navItems = [
  { text: 'About', href: '#about', icon: 'fas fa-user' },
  { text: 'Skills', href: '#skills', icon: 'fas fa-code' },
  { text: 'Projects', href: '#projects', icon: 'fas fa-laptop-code' },
  { text: 'Contact', href: '#contact', icon: 'fas fa-envelope' }
]

const activeSection = ref('')
const scrollProgress = ref(0)
const isNavbarVisible = ref(true)
let lastScrollPosition = 0

// Hide navbar on scroll down, show on scroll up
onMounted(() => {
  window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset
    isNavbarVisible.value = currentScrollPosition < lastScrollPosition || currentScrollPosition < 50
    lastScrollPosition = currentScrollPosition

    // Update scroll progress
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    scrollProgress.value = (currentScrollPosition / height) * 100
  })
})

// Personal Information
const personalInfo = {
  name: "Ali Khalil Al-Ebadi",
  title: "Frontend Developer",
  location: "Baghdad, Karada",
  phone: "+9647755655161",
  email: "ism23ev_1_3@uoitc.edu.iq",
  summary: "Frontend Developer specializing in Vue.js and modern web technologies. Passionate about creating responsive, user-friendly interfaces with clean, efficient code. Experienced in building dynamic web applications using Vue.js, JavaScript, and modern CSS frameworks."
}

// Main tech stack with icons
const mainTechStack = [
  { name: 'Vue.js', icon: 'fab fa-vuejs', colorClass: 'text-green-400' },
  { name: 'JavaScript', icon: 'fab fa-js', colorClass: 'text-yellow-400' },
  { name: 'HTML5', icon: 'fab fa-html5', colorClass: 'text-orange-400' },
  { name: 'CSS3', icon: 'fab fa-css3-alt', colorClass: 'text-blue-400' },
  { name: 'Git', icon: 'fab fa-git-alt', colorClass: 'text-red-400' }
]

// Combined skills in one object
const skills = ref({
  'HTML5/CSS3': 90,
  'JavaScript': 85,
  'Vue.js': 85,
  'Tailwind CSS': 90,
  'Responsive Design': 85,
  'Frontend Architecture': 80,
  'Vue Router': 85,
  'Vuex/Pinia': 80,
  'Bootstrap Vue': 85,
  'Nuxt.js': 75,
  'Component Design': 85,
  'Git & GitHub': 85,
  'Chrome DevTools': 85,
  'npm/yarn': 80,
})

// Frontend web projects
const projects = ref([
  {
    id: 1,
    title: "Weatherino",
    description: "Real-time weather tracking application with detailed forecasts and beautiful UI",
    longDescription: "A comprehensive weather application that provides real-time weather data, detailed forecasts, and an intuitive user interface. Built with Vue.js and integrated with the OpenWeather API for accurate weather information.",
    tech: ["Vue.js", "OpenWeather API", "Tailwind CSS", "Chart.js"],
    features: [
      "Real-time weather updates",
      "7-day weather forecast",
      "Location-based weather data",
      "Detailed weather information",
      "Interactive weather maps",
      "Responsive design for all devices",
      "Beautiful UI with smooth animations"
    ],
    image: "/weatherino.png",
    demo: "https://weatherino-plum.vercel.app"
  },
  {
    id: 2,
    title: "Supernova",
    description: "A modern digital marketing agency website showcasing services and portfolio",
    longDescription: "A professional website for Supernova Digital Marketing Agency, featuring a modern design, smooth animations, and comprehensive service offerings. Built with Vue.js and Tailwind CSS for optimal performance and user experience.",
    tech: ["Vue.js", "Tailwind CSS", "Bootstrap Vue", "Responsive Design"],
    features: [
      "Modern and professional design",
      "Smooth scroll animations",
      "Service showcase sections",
      "Portfolio gallery",
      "Contact form integration",
      "Responsive across all devices",
      "Performance optimized"
    ],
    image: "/supernova-iq.com.png",
    demo: "https://supernova-iq.com"
  },
  {
    id: 3,
    title: "Get a Job",
    description: "Professional CV Generator with modern templates and real-time preview",
    longDescription: "An intuitive CV Generator application that helps users create professional resumes with ease. Features multiple modern templates, real-time preview, and easy customization options for creating standout CVs.",
    tech: ["Vue.js", "Tailwind CSS", "PDF Generation", "Local Storage"],
    features: [
      "Multiple professional CV templates",
      "Real-time CV preview",
      "Easy section management",
      "PDF download option",
      "Data auto-save feature",
      "Responsive design",
      "User-friendly interface"
    ],
    image: "/get-a-job.png",
    demo: "https://get-job-tan.vercel.app"
  }
])

// Frontend development experience
const experience = [
  {
    role: "Frontend Developer",
    company: "Supernova Agency",
    period: "2023 - Present",
    achievements: [
      "Developed responsive web applications using Vue.js and Tailwind CSS",
      "Built reusable UI components for improved development efficiency",
      "Implemented responsive designs for optimal user experience across devices",
      "Optimized frontend performance and loading times",
      "Collaborated with designers to implement pixel-perfect interfaces"
    ]
  }
]

// Education
const education = {
  university: "University of Information Technology and Communication (UOITC)",
  degree: "Information Systems Management",
  period: "2023 - Present"
}

// Soft Skills
const softSkills = [
  { name: "Problem-Solving", icon: "fas fa-puzzle-piece" },
  { name: "Critical Thinking", icon: "fas fa-brain" },
  { name: "Effective Communication", icon: "fas fa-comments" },
  { name: "Attention to Detail", icon: "fas fa-search" }
]

// Contact Information
const contactInfo = [
  { 
    type: 'Email',
    text: 'ism23ev_1_3@uoitc.edu.iq',
    link: 'mailto:ism23ev_1_3@uoitc.edu.iq',
    icon: 'fas fa-envelope'
  },
  { 
    type: 'Phone',
    text: '+9647755655161',
    link: 'tel:+9647755655161',
    icon: 'fas fa-phone'
  },
  { 
    type: 'Location',
    text: 'Baghdad, Karada',
    link: '#',
    icon: 'fas fa-map-marker-alt'
  }
]

// Project filtering with animations
const projectCategories = ['All', 'Web', 'Mobile', 'Backend', 'UI/UX']
const selectedCategory = ref('All')
const isProjectAnimating = ref(false)

const filteredProjects = computed(() => projects.value)

watch(selectedCategory, () => {
  isProjectAnimating.value = true
  setTimeout(() => {
    isProjectAnimating.value = false
  }, 300)
})

// Form validation with better feedback
const form = ref({
  name: '',
  email: '',
  message: ''
})

const formErrors = ref({})
const isSubmitting = ref(false)

const validateForm = () => {
  formErrors.value = {}
  if (!form.value.name) formErrors.value.name = 'Name is required'
  if (!form.value.email) formErrors.value.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    formErrors.value.email = 'Invalid email format'
  }
  if (!form.value.message) formErrors.value.message = 'Message is required'
  return Object.keys(formErrors.value).length === 0
}

const sendEmail = () => {
  if (!validateForm()) return

  const mailtoLink = `mailto:ism23ev_1_3@uoitc.edu.iq?subject=Portfolio Contact from ${form.value.name}&body=From: ${form.value.name}%0D%0AEmail: ${form.value.email}%0D%0A%0D%0AMessage:%0D%0A${form.value.message}`
  
  window.location.href = mailtoLink

  // Reset form after sending
  form.value = {
    name: '',
    email: '',
    message: ''
  }
}

// Skill progress animation
const getProgressVariant = (level) => {
  if (level >= 90) return 'success'
  if (level >= 75) return 'info'
  if (level >= 60) return 'primary'
  if (level >= 40) return 'warning'
  return 'danger'
}

// Intersection observer for animations
const onSectionVisible = (entry) => {
  if (entry.isIntersecting) {
    activeSection.value = entry.target.id
    if (entry.target.id === 'stats') {
      animateValue(0, 100, 2000)
    }
  }
}

// Project details modal
const showModal = ref(false)
const selectedProject = ref(null)

const showProjectInfo = (project) => {
  selectedProject.value = project
  showModal.value = true
}

// Social links with hover effects
const socialLinks = [
  { 
    name: 'GitHub', 
    url: '#', 
    icon: 'fab fa-github',
    color: '#333'
  },
  { 
    name: 'LinkedIn', 
    url: '#', 
    icon: 'fab fa-linkedin-in',
    color: '#0077b5'
  },
  { 
    name: 'Twitter', 
    url: '#', 
    icon: 'fab fa-twitter',
    color: '#1da1f2'
  }
]

// Theme colors
const themeColors = computed(() => ({
  primary: isDarkMode.value ? '#3b82f6' : '#2563eb',
  background: isDarkMode.value ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-white via-gray-50 to-white',
  text: isDarkMode.value ? 'text-white' : 'text-gray-900',
  card: isDarkMode.value ? 'bg-gray-800/30' : 'bg-white',
  border: isDarkMode.value ? 'border-gray-700/50' : 'border-gray-200'
}))

// Frontend-specific additional skills
const additionalSkills = ref([
  
])

// Quick facts about frontend development
const quickFacts = [
  { label: 'Frontend Focus', value: 'Vue.js Specialist', icon: 'fas fa-code' },
  { label: 'Projects Completed', value: '15+', icon: 'fas fa-project-diagram' },
  { label: 'UI Components Built', value: '100+', icon: 'fas fa-puzzle-piece' },
  { label: 'Development Tools', value: '8+', icon: 'fas fa-tools' }
]

const skillsSection = ref(null)
const hasAnimated = ref(false)

// Intersection Observer to trigger animation only once
onMounted(() => {
  const { stop } = useIntersectionObserver(
    skillsSection,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !hasAnimated.value) {
        hasAnimated.value = true
        stop() // Stop observing after first animation
      }
    },
    { threshold: 0.2 }
  )
})
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  /* Navigation */
  .nav-link {
    @apply px-4 py-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 relative;
  }

  .nav-link.active::after {
    content: '';
    @apply absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300;
  }

  .nav-link.active {
    @apply text-blue-400;
  }

  .nav-link.active::after {
    @apply scale-x-100;
  }

  /* Buttons */
  .btn-primary {
    @apply px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg 
           hover:from-blue-500 hover:to-purple-500 transform hover:-translate-y-0.5 
           transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25;
  }

  .btn-outline {
    @apply px-6 py-3 border-2 border-blue-400 text-blue-400 rounded-lg 
           hover:bg-blue-400/10 transform hover:-translate-y-0.5 
           transition-all duration-300;
  }

  /* Cards */
  .card {
    @apply bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl 
           hover:border-blue-500/50 transition-all duration-300 
           hover:shadow-xl hover:shadow-blue-500/10;
  }

  /* Form inputs */
  .input-field {
    @apply w-full px-4 py-3 bg-gray-800/30 rounded-lg border border-gray-700/50 
           focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 
           focus:outline-none transition-all duration-300 text-gray-200;
  }

  /* Section titles */
  .section-title {
    @apply text-4xl font-bold mb-12 relative inline-block;
  }

  .section-title::after {
    content: '';
    @apply absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 
           rounded-full transform origin-left transition-transform duration-300;
  }

  .section-title:hover::after {
    @apply scale-x-125;
  }

  /* Project cards */
  .project-card {
    @apply transform transition-all duration-300 hover:-translate-y-2 
           bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden;
  }

  /* Social links */
  .social-link {
    @apply w-12 h-12 rounded-full flex items-center justify-center 
           transition-all duration-300 backdrop-blur-sm
           hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20;
  }

  .social-link .iconify {
    @apply transition-all duration-300;
  }

  /* Pulse animation on hover */
  .social-link:hover {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1);
    }
  }
}

/* Animations */
.text-gradient-animate {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500;
  background-size: 200% 200%;
  animation: gradient 8s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.loading-spinner {
  @apply w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scrollbar */
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-blue-500/50 rounded-full hover:bg-blue-500/70 transition-colors;
}

/* Selection */
::selection {
  @apply bg-blue-500/30 text-white;
}

/* Glass effect */
.glass-effect {
  @apply bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50;
}

/* Modal */
.modal-enter-active,
.modal-leave-active {
  @apply transition-all duration-300;
}

.modal-enter-from,
.modal-leave-to {
  @apply opacity-0 scale-95;
}

.modal-enter-to,
.modal-leave-from {
  @apply opacity-100 scale-100;
}

/* Skill bars */
.skill-item {
  @apply transition-all duration-300 p-4 rounded-lg
         hover:bg-gray-700/30;
}

.progress-bar {
  width: 0;
}

.animate-progress {
  animation: fillProgress 1.5s ease-out forwards;
}

@keyframes fillProgress {
  0% {
    width: 0;
  }
  100% {
    width: var(--progress-width);
  }
}

/* Only scale the container on hover */
.skill-item:hover {
  @apply transform scale-[1.02] transition-transform duration-300;
}

/* Simple shadow effect on hover without animation */
.skill-item:hover .progress-bar {
  @apply shadow-md shadow-blue-500/20;
}

/* Image hover effects */
.image-hover {
  @apply transition-all duration-300;
}

.project-card:hover .image-hover {
  @apply scale-105 brightness-110;
}

/* Smooth scroll */
html {
  @apply scroll-smooth;
}

/* Toast notifications */
.toast {
  @apply fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300;
}

.toast-enter-from,
.toast-leave-to {
  @apply opacity-0 translate-y-full;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .section-title {
    @apply text-3xl;
  }
  
  .btn-primary,
  .btn-outline {
    @apply px-4 py-2 text-sm;
  }
}

.project-card {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 25px rgba(59, 130, 246, 0.2);
}

.project-card img {
  transition: transform 0.5s ease;
}

.project-card:hover img {
  transform: scale(1.1);
}

.action-btn {
  @apply inline-flex items-center gap-2 px-4 py-2 rounded-lg 
         font-medium transition-all duration-300 
         transform hover:-translate-y-0.5;
}

.demo-btn {
  @apply bg-gradient-to-r from-blue-500 to-blue-600 
         text-white hover:from-blue-600 hover:to-blue-700
         shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40;
}

.source-btn {
  @apply border-2 border-blue-400 text-blue-400 
         hover:bg-blue-400/10 hover:border-blue-300 
         hover:text-blue-300;
}

.project-modal {
  @apply backdrop-blur-lg;
}

.project-modal :deep(.modal-content) {
  @apply bg-gray-800/90 text-white border-gray-700;
}

.project-modal :deep(.modal-header) {
  @apply border-gray-700 bg-gray-800/50;
}

.project-modal :deep(.btn-close) {
  @apply text-white opacity-75 hover:opacity-100;
}

/* Remove default button styles */
:deep(.navbar-toggler) {
  padding: 0;
  border: none;
  box-shadow: none !important;
}

:deep(.navbar-toggler:focus) {
  box-shadow: none !important;
}

/* Mobile menu styling */
@media (max-width: 991.98px) {
  :deep(.navbar-collapse) {
    position: fixed;
    top: 60px; /* Adjust based on your navbar height */
    right: 0;
    width: 250px;
    height: auto;
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(10px);
    padding: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
  }

  :deep(.navbar-collapse.show) {
    transform: translateX(0);
  }

  :deep(.navbar-nav) {
    flex-direction: column;
    align-items: flex-start !important;
    width: 100%;
  }

  :deep(.nav-item) {
    width: 100%;
    padding: 0.5rem 0;
  }

  :deep(.nav-link) {
    padding: 0.5rem 0;
    width: 100%;
    transition: all 0.3s ease;
  }
}
</style>
