'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'

// Helper function to format dates consistently
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const blogPosts = [
  {
    id: 1,
    title: 'Building Scalable RAG Systems with AWS SageMaker',
    excerpt: 'A comprehensive guide to implementing Retrieval-Augmented Generation (RAG) systems at enterprise scale using AWS SageMaker, including best practices for model deployment and monitoring.',
    content: 'In this deep dive, we explore the architecture and implementation of enterprise-grade RAG systems...',
    author: 'Rushikesh Hulage',
    date: '2025-01-15',
    readTime: '12 min read',
    category: 'AI/ML',
    tags: ['RAG', 'AWS', 'SageMaker', 'Enterprise AI'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    slug: 'building-scalable-rag-systems-aws-sagemaker'
  },
  {
    id: 2,
    title: 'MLOps Best Practices: From Development to Production',
    excerpt: 'Learn how to implement robust MLOps pipelines using Kubeflow and MLflow, ensuring smooth transitions from model development to production deployment.',
    content: 'MLOps is crucial for maintaining model performance and reliability in production environments...',
    author: 'Rushikesh Hulage',
    date: '2025-01-10',
    readTime: '8 min read',
    category: 'MLOps',
    tags: ['MLOps', 'Kubeflow', 'MLflow', 'CI/CD'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    slug: 'mlops-best-practices-development-production'
  },
  {
    id: 3,
    title: 'AWS WAFv2 Migration: Lessons Learned',
    excerpt: 'A detailed account of migrating from AWS WAF Classic to WAFv2 across hundreds of applications, including challenges faced and solutions implemented.',
    content: 'Migrating web application firewalls at scale requires careful planning and execution...',
    author: 'Rushikesh Hulage',
    date: '2025-01-05',
    readTime: '10 min read',
    category: 'Cloud Security',
    tags: ['AWS', 'WAF', 'Migration', 'Security'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    slug: 'aws-wafv2-migration-lessons-learned'
  },
  {
    id: 4,
    title: 'Deep Learning Model Optimization Techniques',
    excerpt: 'Explore advanced techniques for optimizing deep learning models including quantization, pruning, and knowledge distillation for production deployment.',
    content: 'Model optimization is essential for deploying deep learning models in resource-constrained environments...',
    author: 'Rushikesh Hulage',
    date: '2024-12-28',
    readTime: '15 min read',
    category: 'AI/ML',
    tags: ['Deep Learning', 'Optimization', 'Quantization', 'Pruning'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    slug: 'deep-learning-model-optimization-techniques'
  },
  {
    id: 5,
    title: 'Building Microservices with Spring Boot and AWS',
    excerpt: 'A practical guide to designing and implementing microservices architecture using Spring Boot, with AWS cloud services for scalability and reliability.',
    content: 'Microservices architecture offers numerous benefits but also introduces complexity...',
    author: 'Rushikesh Hulage',
    date: '2024-12-20',
    readTime: '11 min read',
    category: 'Backend',
    tags: ['Spring Boot', 'Microservices', 'AWS', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    slug: 'building-microservices-spring-boot-aws'
  },
  {
    id: 6,
    title: 'A/B Testing Framework for ML Models',
    excerpt: 'Implementing robust A/B testing frameworks for machine learning models, including statistical significance testing and business impact measurement.',
    content: 'A/B testing is crucial for validating the effectiveness of machine learning models...',
    author: 'Rushikesh Hulage',
    date: '2024-12-15',
    readTime: '9 min read',
    category: 'AI/ML',
    tags: ['A/B Testing', 'ML Models', 'Statistics', 'Experimentation'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&crop=center',
    slug: 'ab-testing-framework-ml-models'
  }
]

const categories = ['All', 'AI/ML', 'MLOps', 'Cloud Security', 'Backend']

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

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

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
              My <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Insights, tutorials, and experiences in AI/ML, backend development, and cloud architecture. 
              Sharing knowledge and lessons learned from building enterprise-scale solutions.
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

      {/* Featured Post */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Article
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Latest insights and deep dives into technology
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden mb-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-64 lg:h-full">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium rounded-full">
                    {blogPosts[0].category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(blogPosts[0].date)}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {blogPosts[0].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {blogPosts[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Articles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore more insights and tutorials
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.slice(1).map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-dark-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 text-xs font-medium rounded">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-600 dark:bg-primary-700 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-primary-100 mb-8 text-lg">
              Get notified when I publish new articles about AI/ML, backend development, and cloud architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
