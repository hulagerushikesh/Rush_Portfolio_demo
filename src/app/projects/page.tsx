'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, Filter, Calendar, Users, Award, X } from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Enterprise Generative AI Platform',
    description: 'Architected and led the end-to-end development of a scalable enterprise search platform using Retrieval-Augmented Generation (RAG) with LLMs on AWS SageMaker, significantly improving information retrieval accuracy.',
    longDescription: 'This comprehensive enterprise AI platform revolutionizes how organizations access and utilize their internal knowledge. Built with cutting-edge RAG technology, it provides intelligent search capabilities across vast document repositories, ensuring accurate and contextual information retrieval.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    technologies: ['Python', 'AWS SageMaker', 'RAG', 'LLMs', 'MLOps', 'Kubeflow', 'MLflow'],
    category: 'AI/ML',
    year: '2025',
    status: 'Completed',
    github: '#',
    live: '#',
    features: [
      'Retrieval-Augmented Generation (RAG) implementation',
      'AWS SageMaker integration for model deployment',
      'MLOps pipelines using Kubeflow and MLflow',
      'Automated CI/CD for model versioning',
      'Real-time performance monitoring',
      'Scalable document processing pipeline'
    ],
    impact: 'Significantly improved information retrieval accuracy and reduced deployment cycles by 60%',
    team: 'Lead Developer'
  },
  {
    id: 2,
    title: 'AI-Powered Personalization Engine',
    description: 'Designed and deployed a high-throughput deep learning recommendation system on GCP Vertex AI, serving millions of users with low latency and driving a significant uplift in user engagement.',
    longDescription: 'A sophisticated recommendation engine that leverages deep learning algorithms to provide personalized content and product recommendations. The system processes millions of user interactions in real-time to deliver highly relevant suggestions.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    technologies: ['Python', 'GCP Vertex AI', 'Deep Learning', 'TensorFlow', 'A/B Testing', 'SHAP'],
    category: 'AI/ML',
    year: '2024',
    status: 'Completed',
    github: '#',
    live: '#',
    features: [
      'Deep learning recommendation algorithms',
      'GCP Vertex AI deployment',
      'Model optimization through quantization and pruning',
      'A/B testing framework',
      'SHAP explainability framework',
      'Real-time inference pipeline'
    ],
    impact: 'Drove significant uplift in user engagement and improved recommendation accuracy by 40%',
    team: 'Lead Developer'
  },
  {
    id: 3,
    title: 'AWS WAFv2 Migration Platform',
    description: 'Led the critical migration from AWS WAF Classic to WAFv2 for all internal Telstra applications, significantly enhancing security posture and threat detection capabilities.',
    longDescription: 'A comprehensive security platform migration that modernized the entire web application firewall infrastructure. The project involved migrating hundreds of applications while maintaining zero downtime and improving security monitoring capabilities.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    technologies: ['AWS WAFv2', 'CloudFront', 'S3', 'CloudWatch', 'Nginx', 'Terraform'],
    category: 'Cloud/DevOps',
    year: '2023',
    status: 'Completed',
    github: '#',
    live: '#',
    features: [
      'AWS WAF Classic to WAFv2 migration',
      'CloudFront integration',
      'S3 static website hosting',
      'CloudWatch monitoring and alerting',
      'Nginx reverse proxy configuration',
      'Infrastructure as Code with Terraform'
    ],
    impact: 'Enhanced security posture and improved threat detection capabilities across all applications',
    team: 'Lead Engineer'
  },
  {
    id: 4,
    title: 'Authentication & Authorization Service',
    description: 'Developed and maintained robust backend services for authentication and authorization using Java, Spring Boot, and AWS, ensuring secure and scalable access for internal applications.',
    longDescription: 'A comprehensive identity and access management system that provides secure authentication and fine-grained authorization for enterprise applications. Built with microservices architecture for high availability and scalability.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    technologies: ['Java', 'Spring Boot', 'AWS EC2', 'IAM', 'API Gateway', 'OAuth2', 'JWT'],
    category: 'Backend',
    year: '2023',
    status: 'Completed',
    github: '#',
    live: '#',
    features: [
      'OAuth2 and JWT-based authentication',
      'Role-based access control (RBAC)',
      'Multi-factor authentication support',
      'API Gateway integration',
      'AWS IAM integration',
      'Microservices architecture'
    ],
    impact: 'Ensured secure and scalable access for all internal applications with 99.9% uptime',
    team: 'Senior Developer'
  }
]

const categories = ['All', 'AI/ML', 'Backend', 'Cloud/DevOps', 'Frontend']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A showcase of my work in AI/ML, backend development, and cloud architecture. 
              Each project represents a unique challenge and innovative solution.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 shadow-md hover:shadow-lg'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white dark:bg-dark-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.year}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {project.team}
                      </div>
                      <div className="flex space-x-2">
                        <motion.a
                          href={project.github}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 rounded-lg transition-colors duration-200"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-dark-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-xl"
                  unoptimized
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-all duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full">
                      {selectedProject.category}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      selectedProject.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-6 mb-6 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {selectedProject.year}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {selectedProject.team}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedProject.longDescription}
                </p>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Key Features
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Award className="h-4 w-4 text-primary-600 dark:text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Impact
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.github}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View Code
                  </motion.a>
                  <motion.a
                    href={selectedProject.live}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200"
                  >
                    Live Demo
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
