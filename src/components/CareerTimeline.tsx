'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, MapPin, ChevronDown, ChevronUp, Award, Briefcase, GraduationCap } from 'lucide-react'

const timelineData = [
  {
    id: 1,
    type: 'experience',
    title: 'Software Engineer – Platform Engineering',
    company: 'Telstra',
    location: 'Pune, India',
    period: 'July 2023 – Present',
    description: 'Developed and maintained robust backend services for authentication and authorization using Java, Spring Boot, and AWS.',
    achievements: [
      'Led critical migration from AWS WAF Classic to WAFv2 for all internal applications',
      'Enhanced security posture and threat detection capabilities significantly',
      'Architected WAFv2 integration with AWS services including CloudFront, S3, and CloudWatch',
      'Configured Nginx reverse proxies for comprehensive security monitoring'
    ],
    technologies: ['Java', 'Spring Boot', 'AWS', 'WAFv2', 'CloudFront', 'Nginx'],
    iconName: 'Briefcase',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    type: 'achievement',
    title: 'Top 10 Rank – Google APAC Challenge 2025',
    company: 'Google',
    location: 'Asia Pacific',
    period: '2025',
    description: 'Achieved top 10 ranking in the prestigious Google APAC Challenge, showcasing advanced problem-solving and technical skills.',
    achievements: [
      'Competed against thousands of participants across Asia Pacific',
      'Demonstrated expertise in algorithms and data structures',
      'Showcased ability to solve complex technical challenges under time pressure'
    ],
    technologies: ['Algorithms', 'Data Structures', 'Problem Solving'],
    iconName: 'Award',
    color: 'bg-yellow-500'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Agentic AI Hackathon Participant',
    company: 'Bangalore Tech Community',
    location: 'Bangalore, India',
    period: '2025',
    description: 'Participated in cutting-edge AI hackathon focusing on agentic workflows and autonomous AI systems.',
    achievements: [
      'Explored latest trends in agentic AI and autonomous systems',
      'Collaborated with diverse team of AI researchers and engineers',
      'Developed innovative solutions using modern AI frameworks'
    ],
    technologies: ['AI Agents', 'LLMs', 'Autonomous Systems', 'Python'],
    iconName: 'Award',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    type: 'education',
    title: 'B.Tech in Information Technology',
    company: 'Veermata Jijabai Technological Institute',
    location: 'Mumbai, India',
    period: 'Aug 2019 – May 2023',
    description: 'Completed Bachelor of Technology in Information Technology with focus on software engineering and system design.',
    achievements: [
      'Specialized in software engineering and system design',
      'Completed projects in web development and database management',
      'Gained strong foundation in computer science fundamentals'
    ],
    technologies: ['Software Engineering', 'System Design', 'Web Development', 'Database Management'],
    iconName: 'GraduationCap',
    color: 'bg-green-500'
  }
]

const iconMap = {
  Briefcase,
  Award,
  GraduationCap
}

interface TimelineItemProps {
  item: typeof timelineData[0]
  index: number
  isInView: boolean
}

function TimelineItem({ item, index, isInView }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        x: isInView ? 0 : (isEven ? -50 : 50)
      }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} mb-12`}
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 to-primary-600 dark:from-primary-800 dark:to-primary-400"></div>
      
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
        className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${item.color} rounded-full border-4 border-white dark:border-dark-800 shadow-lg z-10`}
      />
      
      {/* Content Card */}
      <div className={`w-5/12 ${isEven ? 'pr-8' : 'pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-white dark:bg-dark-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`p-2 ${item.color} rounded-lg mr-3`}>
                  {iconMap[item.iconName as keyof typeof iconMap] ? 
                    React.createElement(iconMap[item.iconName as keyof typeof iconMap], { className: "h-5 w-5 text-white" }) :
                    <Briefcase className="h-5 w-5 text-white" />
                  }
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">
                    {item.company}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-full transition-colors duration-200"
              >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              <Calendar className="h-4 w-4 mr-2" />
              {item.period}
              <MapPin className="h-4 w-4 ml-4 mr-2" />
              {item.location}
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {item.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {item.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                >
                  {tech}
                </span>
              ))}
              {item.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                  +{item.technologies.length - 3} more
                </span>
              )}
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-2">
                      {item.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className={`w-2 h-2 ${item.color} rounded-full mt-2 mr-3 flex-shrink-0`} />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function CareerTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="relative">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Career Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          A timeline of my professional growth and achievements
        </motion.p>
      </div>
      
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            isInView={isInView}
          />
        ))}
      </div>
    </div>
  )
}
