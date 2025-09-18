'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award, GraduationCap, Briefcase, Users, Code, Database, Cloud, Brain, Star } from 'lucide-react'

const experience = [
  {
    title: 'Software Engineer – Platform Engineering',
    company: 'Telstra',
    location: 'Pune, India',
    period: 'July 2023 – Present',
    description: 'Developed and maintained robust backend services for authentication and authorization using Java, Spring Boot, and AWS. Led critical migration from AWS WAF Classic to WAFv2 for all internal Telstra applications.',
    achievements: [
      'Enhanced security posture and threat detection capabilities',
      'Architected WAFv2 integration with AWS services',
      'Configured Nginx reverse proxies for comprehensive security monitoring'
    ]
  }
]

const education = [
  {
    degree: 'B.Tech in Information Technology',
    institution: 'Veermata Jijabai Technological Institute',
    location: 'Mumbai',
    period: 'Aug 2019 – May 2023',
    description: 'Focused on software engineering, data structures, algorithms, and system design.'
  },
  {
    degree: 'HSC (Maharashtra State Board)',
    institution: 'Residential Junior College',
    location: 'Ahmednagar',
    period: 'Jun 2017 – May 2019',
    description: 'Completed higher secondary education with focus on science and mathematics.'
  }
]

const achievements = [
  {
    title: 'Top 10 Rank',
    event: 'Google APAC Challenge 2025',
    icon: Award,
    description: 'Achieved top 10 ranking in the prestigious Google APAC Challenge'
  },
  {
    title: 'Participant',
    event: 'Agentic AI Hackathon, Bangalore 2025',
    icon: Users,
    description: 'Participated in cutting-edge AI hackathon focusing on agentic workflows'
  },
  {
    title: 'Open-source contributor',
    event: 'Hugging Face Transformers',
    icon: Code,
    description: 'Contributing to the open-source AI community through Hugging Face'
  }
]

const certifications = [
  {
    title: 'Machine Learning',
    provider: 'Stanford University (Coursera)',
    icon: GraduationCap
  },
  {
    title: 'Deep Learning Specialization',
    provider: 'deeplearning.ai / Coursera',
    icon: Brain
  }
]

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'C++', 'Java', 'SQL', 'Bash'],
    icon: Code
  },
  {
    category: 'AI/ML',
    items: ['NLP', 'Computer Vision', 'RAG', 'Agentic Workflows', 'PyTorch', 'TensorFlow'],
    icon: Brain
  },
  {
    category: 'Backend & Data',
    items: ['Spring Boot', 'Spark', 'Airflow', 'Kafka', 'Microservices'],
    icon: Database
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'MLOps'],
    icon: Cloud
  }
]

const testimonials = [
  {
    quote: "Rushikesh's expertise in AI/ML and cloud architecture has been instrumental in our platform's success. His ability to design scalable solutions is exceptional.",
    author: "Senior Engineering Manager",
    company: "Telstra"
  },
  {
    quote: "Working with Rushikesh on the enterprise AI platform was a great experience. His deep understanding of MLOps and RAG systems is impressive.",
    author: "Data Science Lead",
    company: "Previous Project"
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

export default function AboutPage() {
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
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Passionate software engineer with expertise in AI/ML, backend development, and cloud architecture. 
              Currently building scalable solutions at Telstra while contributing to the open-source community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <div className="relative w-80 h-80 mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                  alt="Rushikesh Hulage"
                  fill
                  className="rounded-full object-cover shadow-2xl"
                  unoptimized
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Hi, I'm Rushikesh Hulage
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  I'm a Software Engineer at Telstra, specializing in AI/ML, backend development, and cloud architecture. 
                  With a strong foundation in computer science and hands-on experience in enterprise-scale projects, 
                  I'm passionate about building innovative solutions that solve real-world problems.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  My journey in technology started with a curiosity about how things work, which led me to pursue 
                  Information Technology at VJTI Mumbai. Today, I'm focused on pushing the boundaries of AI/ML 
                  applications in enterprise environments while maintaining a commitment to clean, scalable code.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-600 dark:text-gray-300">Software Engineer</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-600 dark:text-gray-300">Team Player</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  <span className="text-gray-600 dark:text-gray-300">Problem Solver</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Building scalable solutions and leading critical infrastructure projects
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 dark:text-gray-300">
                      <span className="font-semibold">{exp.company}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {exp.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Education
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Strong academic foundation in Information Technology
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mr-4">
                    <GraduationCap className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-semibold">
                      {edu.institution}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-3">
                  <p className="font-medium">{edu.location}</p>
                  <p className="text-sm">{edu.period}</p>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive expertise across multiple technology domains
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg mb-4 mx-auto">
                  <skill.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Achievements & Certifications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Recognition and continuous learning in technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Achievements
              </h3>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex-shrink-0">
                      <achievement.icon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                        {achievement.event}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Certifications
              </h3>
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-700 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex-shrink-0">
                      <cert.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium">
                        {cert.provider}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What People Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Feedback from colleagues and collaborators
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-primary-600 dark:text-primary-400 text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
