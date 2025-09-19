'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code, Database, Cloud, Brain, GitBranch, Server } from 'lucide-react'

const skills = [
  {
    category: 'Programming Languages',
    iconName: 'Code',
    skills: [
      { name: 'Python', level: 95, color: 'bg-blue-500' },
      { name: 'Java', level: 90, color: 'bg-orange-500' },
      { name: 'JavaScript/TypeScript', level: 85, color: 'bg-yellow-500' },
      { name: 'C++', level: 80, color: 'bg-purple-500' },
      { name: 'SQL', level: 88, color: 'bg-green-500' }
    ]
  },
  {
    category: 'AI/ML & Data Science',
    iconName: 'Brain',
    skills: [
      { name: 'Machine Learning', level: 92, color: 'bg-pink-500' },
      { name: 'Deep Learning', level: 88, color: 'bg-indigo-500' },
      { name: 'NLP', level: 85, color: 'bg-teal-500' },
      { name: 'Computer Vision', level: 82, color: 'bg-cyan-500' },
      { name: 'RAG Systems', level: 90, color: 'bg-emerald-500' }
    ]
  },
  {
    category: 'Cloud & DevOps',
    iconName: 'Cloud',
    skills: [
      { name: 'AWS', level: 90, color: 'bg-orange-600' },
      { name: 'GCP', level: 85, color: 'bg-blue-600' },
      { name: 'Docker', level: 88, color: 'bg-blue-500' },
      { name: 'Kubernetes', level: 82, color: 'bg-blue-700' },
      { name: 'CI/CD', level: 87, color: 'bg-green-600' }
    ]
  },
  {
    category: 'Backend & Databases',
    iconName: 'Database',
    skills: [
      { name: 'Spring Boot', level: 88, color: 'bg-green-500' },
      { name: 'Microservices', level: 85, color: 'bg-purple-600' },
      { name: 'PostgreSQL', level: 90, color: 'bg-blue-500' },
      { name: 'MongoDB', level: 82, color: 'bg-green-600' },
      { name: 'Redis', level: 80, color: 'bg-red-500' }
    ]
  },
  {
    category: 'MLOps & Tools',
    iconName: 'Server',
    skills: [
      { name: 'MLflow', level: 88, color: 'bg-purple-500' },
      { name: 'Kubeflow', level: 85, color: 'bg-blue-600' },
      { name: 'Airflow', level: 82, color: 'bg-cyan-500' },
      { name: 'Spark', level: 80, color: 'bg-orange-500' },
      { name: 'Kafka', level: 78, color: 'bg-gray-600' }
    ]
  },
  {
    category: 'Version Control & Collaboration',
    iconName: 'GitBranch',
    skills: [
      { name: 'Git', level: 95, color: 'bg-orange-600' },
      { name: 'GitHub', level: 92, color: 'bg-gray-800' },
      { name: 'GitLab', level: 85, color: 'bg-orange-500' },
      { name: 'Agile/Scrum', level: 88, color: 'bg-blue-500' },
      { name: 'Code Review', level: 90, color: 'bg-green-500' }
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

interface SkillBarProps {
  name: string
  level: number
  color: string
  delay: number
}

function SkillBar({ name, level, color, delay }: SkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {name}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: delay + 0.5 }}
          className="text-sm font-bold text-primary-600 dark:text-primary-400"
        >
          {level}%
        </motion.span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${level}%` : 0 }}
          transition={{ 
            duration: 1.5, 
            delay: delay,
            ease: "easeOut"
          }}
        />
      </div>
    </div>
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
          
          <div className="space-y-4">
            {category.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
                delay={categoryIndex * 0.2 + skillIndex * 0.1}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
