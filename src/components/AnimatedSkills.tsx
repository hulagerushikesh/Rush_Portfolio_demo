'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Database, Cloud, Brain, GitBranch, Server } from 'lucide-react'

const skills = [
  {
    category: 'Backend Development',
    iconName: 'Database',
    description: 'Enterprise-grade backend solutions',
    technologies: [
      'Java & Spring Boot',
      'Python & FastAPI',
      'Microservices Architecture',
      'RESTful API Design',
      'Database Design & Optimization'
    ]
  },
  {
    category: 'AI/ML & Data Science',
    iconName: 'Brain',
    description: 'Advanced machine learning solutions',
    technologies: [
      'Machine Learning & Deep Learning',
      'NLP & Computer Vision',
      'RAG Systems & LLMs',
      'PyTorch & TensorFlow',
      'MLOps & Model Deployment'
    ]
  },
  {
    category: 'Cloud & DevOps',
    iconName: 'Cloud',
    description: 'Scalable cloud infrastructure',
    technologies: [
      'AWS (EC2, S3, Lambda, SageMaker)',
      'GCP (Vertex AI, BigQuery)',
      'Docker & Kubernetes',
      'CI/CD Pipelines',
      'Infrastructure as Code'
    ]
  },
  {
    category: 'Programming Languages',
    iconName: 'Code',
    description: 'Multi-language expertise',
    technologies: [
      'Python',
      'Java',
      'JavaScript/TypeScript',
      'C++',
      'SQL '
    ]
  }
]

const iconMap = {
  Code,
  Brain,
  Cloud,
  Database,
  Server,
  GitBranch
}

interface TechnologyItemProps {
  technology: string
  delay: number
}

function TechnologyItem({ technology, delay }: TechnologyItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center space-x-3 py-2"
    >
      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></div>
      <span className="text-gray-700 dark:text-gray-300 font-medium">
        {technology}
      </span>
    </motion.div>
  )
}

export default function AnimatedSkills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {skills.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mr-4">
              {iconMap[category.iconName as keyof typeof iconMap] ? 
                React.createElement(iconMap[category.iconName as keyof typeof iconMap], { className: "h-6 w-6 text-primary-600 dark:text-primary-400" }) :
                <Code className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              }
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {category.category}
            </h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {category.description}
            </p>
            {category.technologies.map((technology, techIndex) => (
              <TechnologyItem
                key={technology}
                technology={technology}
                delay={categoryIndex * 0.2 + techIndex * 0.1}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
