'use client'

import { motion } from 'framer-motion'
import { Download, Mail, Phone, MapPin, Linkedin, Github, Calendar, Briefcase, GraduationCap, Award, Code, Database, Cloud, Brain } from 'lucide-react'
import { useState, useEffect } from 'react'

const personalInfo = {
  name: 'Rushikesh Hulage',
  title: 'Software Engineer – Platform Engineering',
  location: 'Pune, Maharashtra',
  email: 'hulagerushikesh@gmail.com',
  phone: '+91-8975173649',
  linkedin: 'https://www.linkedin.com/in/rushikesh-hulage-46018522b',
  github: 'https://github.com/hulagerushikesh'
}

const experience = [
  {
    title: 'Software Engineer – Platform Engineering',
    company: 'Telstra',
    location: 'Pune, India',
    period: 'July 2023 – Present',
    description: [
      'Developed and maintained robust backend services for authentication and authorization using Java, Spring Boot, and AWS (EC2, IAM, API Gateway), ensuring secure and scalable access for internal applications.'
    ],
    achievements: [
      'Led the critical migration from AWS WAF Classic to WAFv2 for all internal Telstra applications, significantly enhancing security posture and threat detection capabilities',
      'Architected the WAFv2 integration with AWS services including CloudFront, S3, and CloudWatch, and configured Nginx reverse proxies to establish a comprehensive security monitoring and response system'
    ]
  }
]

const education = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'Veermata Jijabai Technological Institute',
    location: 'Mumbai',
    period: 'Aug 2019 – May 2023'
  },
  {
    degree: 'HSC (Maharashtra State Board)',
    institution: 'Residential Junior College',
    location: 'Ahmednagar',
    period: 'Jun 2017 – May 2019'
  }
]

const projects = [
  {
    title: 'Enterprise Generative AI Platform',
    year: '2025',
    description: [
      'Architected and led the end-to-end development of a scalable enterprise search platform using Retrieval-Augmented Generation (RAG) with LLMs on AWS SageMaker, significantly improving information retrieval accuracy.'
    ],
    achievements: [
      'Engineered robust MLOps pipelines using Kubeflow and MLflow for automated CI/CD, model versioning, and real-time performance monitoring, drastically reducing deployment cycles'
    ]
  },
  {
    title: 'AI-Powered Personalization Engine',
    year: '2024',
    description: [
      'Designed and deployed a high-throughput deep learning recommendation system on GCP Vertex AI, serving millions of users with low latency and driving a significant uplift in user engagement.'
    ],
    achievements: [
      'Drove model optimization through techniques like quantization and pruning, and established a rigorous A/B testing and explainability (SHAP) framework to validate business impact and ensure model transparency'
    ]
  }
]

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'Java', 'SQL', 'Bash'],
    icon: Code
  },
  {
    category: 'Core AI/ML',
    items: ['Natural Language Processing (NLP)', 'Computer Vision (CV)', 'Vision-Language Models (VLM)', 'Retrieval-Augmented Generation (RAG)', 'Agentic Workflows'],
    icon: Brain
  },
  {
    category: 'Frameworks & Libraries',
    items: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'LangChain', 'OpenCV', 'Scikit-learn', 'Vector Databases (FAISS, Pinecone)'],
    icon: Database
  },
  {
    category: 'Data & MLOps',
    items: ['Spark', 'Airflow', 'Kafka'],
    icon: Cloud
  },
  {
    category: 'MLOps & Cloud',
    items: ['AWS (SageMaker, WAF, EC2)', 'GCP (Vertex AI)', 'Kubeflow', 'MLflow', 'CI/CD', 'Git'],
    icon: Cloud
  },
  {
    category: 'Soft Skills',
    items: ['Leadership', 'Communication', 'Analytical Thinking', 'Mentoring'],
    icon: Award
  }
]

const achievements = [
  {
    title: 'Top 10 Rank',
    event: 'Google APAC Challenge 2025',
    icon: Award
  },
  {
    title: 'Participant',
    event: 'Agentic AI Hackathon, Bangalore 2025',
    icon: Award
  },
  {
    title: 'Open-source contributor',
    event: 'Hugging Face Transformers',
    icon: Award
  }
]

const certifications = [
  {
    title: 'Machine Learning by Stanford University',
    provider: 'Coursera'
  },
  {
    title: 'Deep Learning Specialization',
    provider: 'deeplearning.ai / Coursera'
  }
]

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

export default function ResumePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleDownload = () => {
    // In a real implementation, this would download the actual PDF
    const link = document.createElement('a')
    link.href = '/resume.pdf' // You would need to add this file to the public folder
    link.download = 'Rushikesh_Hulage_Resume.pdf'
    link.click()
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

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
              My <span className="gradient-text">Resume</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Professional experience and achievements in software engineering, AI/ML, and cloud architecture
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="bg-primary-600 text-white p-8">
              <h2 className="text-3xl font-bold mb-2">{personalInfo.name}</h2>
              <p className="text-primary-100 text-lg mb-6">{personalInfo.title}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {personalInfo.location}
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href={`tel:${personalInfo.phone}`} className="hover:underline">
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                  <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:underline">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="p-8 space-y-8">
              {/* Experience */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Briefcase className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Experience
                </h3>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-6 pb-6 border-b border-gray-200 dark:border-dark-700 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">
                      {exp.company} • {exp.location}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mb-3 ml-4">
                      {exp.description.map((desc, idx) => (
                        <li key={idx} className="list-item">{desc}</li>
                      ))}
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="list-item">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>

              {/* Education */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Education
                </h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 pb-4 border-b border-gray-200 dark:border-dark-700 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {edu.period}
                      </div>
                    </div>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {edu.institution} • {edu.location}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Projects */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Code className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Projects
                </h3>
                {projects.map((project, index) => (
                  <div key={index} className="mb-6 pb-6 border-b border-gray-200 dark:border-dark-700 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h4>
                      <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.year}
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 mb-3 ml-4">
                      {project.description.map((desc, idx) => (
                        <li key={idx} className="list-item">{desc}</li>
                      ))}
                    </ul>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                      {project.achievements.map((achievement, idx) => (
                        <li key={idx} className="list-item">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>

              {/* Skills */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Brain className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <skill.icon className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
                        {skill.category}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {skill.items.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Award className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 text-sm font-medium">
                        {achievement.event}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <GraduationCap className="h-6 w-6 mr-3 text-primary-600 dark:text-primary-400" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex flex-col md:flex-row md:items-center md:justify-between py-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 text-sm">
                        {cert.provider}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
